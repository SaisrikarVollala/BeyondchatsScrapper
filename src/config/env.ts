import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
  BeyondChats_URL:
    process.env.BeyondChats_URL || "https://beyondchats.com/blogs/",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};