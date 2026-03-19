import rateLimit from "express-rate-limit";
import type { Request } from "express";

const getUserOrIpKey = (req: Request) => {
  const sessionUserId = (req.session as { userId?: string })?.userId;
  return sessionUserId || req.ip || "unknown";
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many auth attempts. Please wait and try again." },
});

export const thumbnailGenerateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  keyGenerator: getUserOrIpKey,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Generation limit reached. Please wait before creating more thumbnails.",
  },
});
