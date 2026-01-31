import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import mongoose from 'mongoose';

// Controllers to get All User Thumbnails
export const getUsersThumbnails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log(`[DEBUG] Fetching thumbnails for userId: ${userId}`);

    // IMPORTANT: lean() returns plain JSON — REQUIRED for React!!
    const thumbnails = await Thumbnail.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    console.log(`[DEBUG] Found ${thumbnails.length} thumbnails`);

    // Log each thumbnail before serialization
    thumbnails.forEach((t, idx) => {
      console.log(`[DEBUG] Thumbnail ${idx + 1} from DB:`, {
        _id: t._id,
        title: t.title,
        image_url: t.image_url,
        image_url_type: typeof t.image_url,
        image_url_length: t.image_url?.length,
        hasImageUrl: !!(t.image_url && t.image_url.trim() !== ''),
        isGenerating: t.isGenerating
      });
    });

    // Normalize fields for frontend
    const thumbnailsData = thumbnails.map((t) => {
      const normalized = {
        _id: t._id.toString(),
        userId: t.userId?.toString(),
        title: t.title || "",
        description: t.description || "",
        style: t.style,
        aspect_ratio: t.aspect_ratio || "16:9",
        color_scheme: t.color_scheme || "",
        text_overlay: !!t.text_overlay,
        image_url: t.image_url || "",    // <--- ENSURES React sees string, not undefined
        prompt_used: t.prompt_used || "",
        user_prompt: t.user_prompt || "",
        isGenerating: t.isGenerating || false,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      };
      
      console.log(`[DEBUG] Normalized thumbnail ${t.title}:`, {
        image_url: normalized.image_url,
        image_url_length: normalized.image_url.length,
        hasImageUrl: normalized.image_url.trim() !== ''
      });
      
      return normalized;
    });

    console.log(`[DEBUG] Sending ${thumbnailsData.length} thumbnails to client`);
    return res.json({ thumbnails: thumbnailsData });

  } catch (error: any) {
    console.error("getUsersThumbnails ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
// Controllers to get single Thumbnail of a User
export const getThumbnailbyId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;

    const thumbnail = await Thumbnail.findOne({ userId, _id: id });
    res.json({ thumbnail });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};