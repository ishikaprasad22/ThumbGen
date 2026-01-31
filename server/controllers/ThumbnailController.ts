import { Request, Response } from "express";
import cloudinary from "../configs/cloudinary.js";
import Thumbnail from "../models/Thumbnail.js";
import { stylePrompts, colorSchemeDescriptions } from "../configs/prompts.js";
import { formatThumbnailTitle, getFontSize, getFontStyle, generateThumbnailPrompt } from "./thumbnailsHelpers.js";
import { generateImageWithImagen } from "../services/imagen.js";
import { generateImageWithClipdrop } from "../services/clipdrop.js";

/*  LAYOUT PRESETS */
const getLayout = (layout: string = "bottom") => {
  switch (layout) {
    case "center":
      return { gravity: "center", x: 0, y: 0 };
    case "left":
      return { gravity: "west", x: 80, y: 0 };
    default:
      return { gravity: "south", x: 0, y: 70 }; // YouTube-safe bottom
  }
};

/*GENERATE THUMBNAIL */
export const generateThumbnail = async (req: Request, res: Response) => {
  let thumbnail: any = null;

  try {
    const { userId } = req.session as { userId?: string };
    if (!userId) return res.status(401).json({ message: "User not authenticated" });

    const { title, style, aspectRatio, colorSchemeId, additionalDetails, textLayout } = req.body;
    if (!title || !style || !aspectRatio || !colorSchemeId)
      return res.status(400).json({ message: "Missing required fields" });

    //STYLE & COLOR
    const stylePrompt = stylePrompts[style as keyof typeof stylePrompts];
    if (!stylePrompt) return res.status(400).json({ message: "Invalid style" });

    const normalizedColorSchemeId = String(colorSchemeId).trim().toLowerCase().replace(/\s+/g, "-") as keyof typeof colorSchemeDescriptions;
    const colorPrompt = colorSchemeDescriptions[normalizedColorSchemeId];
    if (!colorPrompt) return res.status(400).json({ message: "Invalid color scheme" });

    //FORMAT TITLE & FONT
    const { rawTitle, displayTitle, lineCount } = formatThumbnailTitle(title);
    const fontSize = getFontSize(lineCount);
    const fontStyle = getFontStyle(style);
    const layout = getLayout(textLayout);

    //  AI PROMPT (NO TEXT)
    const prompt = generateThumbnailPrompt( aspectRatio, stylePrompt, colorPrompt, additionalDetails);

    // DB INIT
    thumbnail = await Thumbnail.create({
      userId,
      title: rawTitle,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: normalizedColorSchemeId,
      user_prompt: additionalDetails,
      prompt_used: prompt,
      isGenerating: true,
      image_url: "",
    });

    // IMAGE GENERATION -
    let imageBuffer: Buffer;
    try {
      imageBuffer = await generateImageWithImagen(prompt);
    } catch {
      imageBuffer = await generateImageWithClipdrop(prompt);
    }

    // CLOUDINARY UPLOAD 
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "thumbnails", resource_type: "image" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(imageBuffer);
    });

    if (!uploadResult?.public_id) throw new Error("Cloudinary upload failed");

    // CLOUDINARY TEXT OVERLAY 
    // Dynamic font sizing and line breaks
    const finalImageUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        { width: 1280, height: 720, crop: "fill" },
        {
          overlay: {
            font_family: fontStyle.fontFamily,
            font_size: fontSize,
            font_weight: "bold",
            text: displayTitle,
            stroke: fontStyle.stroke,
            stroke_color: fontStyle.stroke,
            effect: fontStyle.shadow ? `shadow:${fontStyle.shadow}` : undefined,
          },
          gravity: layout.gravity,
          x: layout.x,
          y: layout.y,
          color: "#ffffff",
        },
      ],
    });

    // ---------------- DB UPDATE ----------------
    const updated = await Thumbnail.findByIdAndUpdate(
      thumbnail._id,
      { image_url: finalImageUrl, isGenerating: false },
      { new: true }
    );

    return res.json({ message: "Thumbnail generated successfully", thumbnail: updated });

  } catch (error: any) {
    console.error("[generateThumbnail]", error);
    if (thumbnail) await Thumbnail.findByIdAndUpdate(thumbnail._id, { isGenerating: false }).catch(() => {});
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session as { userId?: string };

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const deleted = await Thumbnail.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: 'Thumbnail not found or unauthorized',
      });
    }

    return res.json({ message: 'Thumbnail deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || 'Internal Server Error',
    });
  }
};