import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(
      req.validated.body
    );

    const user = result.user.toObject();

    delete user.passwordHash;

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(
      req.validated.body
    );

    const user = result.user.toObject();

    delete user.passwordHash;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};