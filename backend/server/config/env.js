import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,
};

export default env;