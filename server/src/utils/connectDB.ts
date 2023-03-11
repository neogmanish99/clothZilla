import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connectDB() {
    const dbUri = config.get<string>("dbUri");
    try {
        await mongoose.connect(dbUri);
        logger.info("DB connection established");
    } catch (err) {
        logger.error("Error connecting to database");
        process.exit(1);
    }
}

export default connectDB;
