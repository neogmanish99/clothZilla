import express from "express";
import config from "config";
import logger from "./utils/logger";
import connectDB from "./utils/connectDB";

const port = config.get<string>("port");

const app = express();

app.listen(port, async () => {
    logger.info("App listening on port " + port);
    await connectDB();
});
