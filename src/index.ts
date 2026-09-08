import app from "./config/app";
import dotenv from "dotenv";
import { AppDataSource } from "./config/psqlDb.config";

dotenv.config();

const PORT = process.env.SERVER_PORT || 5556;

const startServer = async () => {
  try {
    console.log("connecting to postgresql..");
    await AppDataSource.initialize();
    console.log("Postfres connected successfully")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("server setup failed");
  }
};

startServer();
