import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import {
  hashPassword,
  comparePassword,
  hashToken,
  compareToken
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

export const registerUser = async ({
  fullName,
  email,
  password,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new AppError(
      "Email is already registered",
      409
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    passwordHash,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const refreshTokenHash = await hashToken(
    refreshToken
  );

  user.refreshTokenHash = refreshTokenHash;

  await user.save();
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({
  email,
  password,
}) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+passwordHash +refreshTokenHash");

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const passwordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!passwordValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const refreshTokenHash = await hashToken(
    refreshToken
  );

  user.refreshTokenHash = refreshTokenHash;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};