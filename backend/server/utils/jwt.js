import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      userId,
      type: "access",
    },
    env.jwt.accessSecret,
    {
      expiresIn: env.jwt.accessExpiresIn,
    }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      userId,
      type: "refresh",
    },
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn,
    }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    env.jwt.accessSecret
  );
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    env.jwt.refreshSecret
  );
};