import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL!);
    const url = `${connection.connection.host}:  ${connection.connection.port}  /  ${connection.connection.name}`;
    console.log(colors.cyan(`MongoDB connected: ${url}`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(colors.bgRed(`Error: ${error.message}`));
    } else {
      console.error(colors.bgRed(`Error: ${error}`));
    }
    exit(1);
  }
};
