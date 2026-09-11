import { verifyAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Invalid authorization format",
        401
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(
        "Access token is required",
        401
      );
    }

    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};
