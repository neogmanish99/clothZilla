import app from "./app";
import config from "config";
import connectDB from "./utils/connectDB";
import logger from "./utils/logger";

const PORT = config.get<number>("port");

// CONNECT TO DATABASE

const server = app.listen(PORT, async () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
    // logger.info(`Docs are at http://localhost:${PORT}/api-docs`);
    await connectDB();
});
