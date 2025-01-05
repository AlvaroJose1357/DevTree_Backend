import mongoose from "mongoose";
import { MONGODB_URL } from "./Process";

export const connectBD = async () => {
  try {
    const URL = MONGODB_URL;
    const { connection } = await mongoose.connect(URL);
    const urlBase = `${connection.host}:${connection.port}/${connection.name}`;
    console.log("Database connected on", urlBase);
  } catch (error) {
    console.error("Error connecting to database");
    console.error(error);
    process.exit(1);
  }
};
