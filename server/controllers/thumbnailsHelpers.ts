/* -------------------------------------------------------------------------- */
/* 🎨 THUMBNAILS HELPERS                                                      */
/* -------------------------------------------------------------------------- */

import { AspectRatio } from "../src/assets.js";

/* ---------------- TITLE FORMAT ---------------- */
const MAX_CHARS_PER_LINE = 25;

/**
 * Wrap title into multiple lines, remove repeated words,
 * trim extra spaces, and return both raw and display-ready title.
 */
export const formatThumbnailTitle = (title: string) => {
  const words = title
    .trim()
    .split(/\s+/)
    .filter((w, idx, arr) => arr.indexOf(w) === idx); // remove repeated words

  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= MAX_CHARS_PER_LINE) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  const rawTitle = words.join(" ");
  const displayTitle = lines.join("\n").toUpperCase(); // uppercase for dramatic effect

  return {
    rawTitle,
    displayTitle,
    lineCount: lines.length,
  };
};

/* ---------------- DYNAMIC FONT SIZE ---------------- */
export const getFontSize = (lineCount: number) => {
  if (lineCount <= 1) return 96;
  if (lineCount === 2) return 86;
  if (lineCount === 3) return 76;
  return 68;
};

/* ---------------- FONT STYLE BY CATEGORY ---------------- */
export interface FontStyleConfig {
  fontFamily: string;
  stroke?: string;        // Outline color
  strokeWidth?: number;   // Outline thickness
  shadow?: string;        // Optional shadow (x,y,blur,color)
  uppercase?: boolean;    // Force all caps
}

export const getFontStyle = (style: string): FontStyleConfig => {
  switch (style.toLowerCase()) {
    case "bold":
    case "dramatic":
      return {
        fontFamily: "Anton",
        stroke: "#000000",
        strokeWidth: 4,
        shadow: "2,2,5,#000000",
        uppercase: true,
      };
    case "minimal":
      return {
        fontFamily: "Montserrat",
        stroke: "#ffffff",
        strokeWidth: 2,
        uppercase: false,
      };
    case "tech":
      return {
        fontFamily: "Roboto",
        stroke: "#000000",
        strokeWidth: 1,
        shadow: "1,1,3,#000000",
        uppercase: false,
      };
    default:
      return {
        fontFamily: "Montserrat",
        stroke: "#ffffff",
        strokeWidth: 2,
        uppercase: false,
      };
  }
};

/* ---------------- IMAGE PROMPT (AI) ---------------- */
export const generateThumbnailPrompt = (
  aspectRatio: AspectRatio,
  stylePrompt: string,
  colorPrompt: string,
  additionalDetails?: string
): string => {
  return `
Create a high-quality YouTube thumbnail BACKGROUND only.

IMPORTANT:
- NO text, letters, words, or captions
- ENSURE NO SPELLING ERRORS

Visual style:
${stylePrompt}

Color scheme:
${colorPrompt}

Aspect ratio:
${aspectRatio}

Scene details:
${additionalDetails ?? "Clean, cinematic background"}
`;
};
