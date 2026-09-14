import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV ,
  clientUrl: process.env.CLIENT_URL ,
  mongoUri: process.env.MONGODB_URI,
  geminiApiKey: process.env.GEMINI_API_KEY,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpiresIn:
      process.env.ACCESS_TOKEN_EXPIRES ,

    refreshExpiresIn:
      process.env.REFRESH_TOKEN_EXPIRES ,
  },
  cloudinary: {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME,

    apiKey:
      process.env.CLOUDINARY_API_KEY,

    apiSecret:
      process.env.CLOUDINARY_API_SECRET,
  },

};

export default env;