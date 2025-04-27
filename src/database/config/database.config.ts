
import { registerAs } from "@nestjs/config";
import { MongoConfig } from "./database-config.type";

export default registerAs<MongoConfig>('mongo', (): MongoConfig => ({
  mongoUri: process.env.MONGO_URI || "",
  maxConnection: Number(process.env.MONGO_MAX_CONNECTION) || 100,
  poolSize: Number(process.env.MONGO_MAX_POOL) || 32
}));