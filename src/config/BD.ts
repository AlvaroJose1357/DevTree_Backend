import mongoose from "mongoose";
import colors from "colors";
import { MONGODB_URL } from "./Process";

let count = 2;
export const connectBD = async () => {
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }
    const { connection } = await mongoose.connect(MONGODB_URL);
    const urlBase = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.cyan.bold(`Database connected on ${urlBase}`));
  } catch (error) {
    console.error(
      colors.bgRed.white.bold(`Error connecting to the database ${error}`)
    );
    if (count > 0) {
      count--;
      console.log(
        colors.yellow(
          `Retrying connection to the database. remaining attempts: ${
            count + 1
          }`
        )
      );
      setTimeout(connectBD, 5000); // Retry after 5 seconds
    } else process.exit(1);
  }
};
