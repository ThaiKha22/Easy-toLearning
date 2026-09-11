import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (
  password,
  passwordHash
) => {
  return bcrypt.compare(password, passwordHash);
};

export const hashToken = async (token) => {
  return bcrypt.hash(token, 12);
};

export const compareToken = async (
  token,
  tokenHash
) => {
  return bcrypt.compare(token, tokenHash);
};