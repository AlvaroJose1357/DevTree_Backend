import mongoose from "mongoose";
import colors from "colors";
import { MONGODB_URL } from "./Process";

export const connectBD = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URL);
    const urlBase = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.cyan.bold(`Database connected on ${urlBase}`));
  } catch (error) {
    console.error(
      colors.bgRed.white.bold(`Error connecting to the database ${error}`)
    );
    process.exit(1);
  }
};
