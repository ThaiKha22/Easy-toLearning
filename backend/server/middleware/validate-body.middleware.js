export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.flatten(),
        });
      }

      req.validatedBody = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};