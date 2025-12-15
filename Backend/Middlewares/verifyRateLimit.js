import rateLimit from "express-rate-limit";

export const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // 100 requests per IP
  message: {
    message: "Too many verification requests. Please try again later."
  }
});
