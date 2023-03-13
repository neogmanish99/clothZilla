import express from "express";
import config from "config";
import logger from "./utils/logger";
import connectDB from "./utils/connectDB";

const port = config.get<number>("port");

// import routes
import user from "./modules/user/user.router";

const app = express();

app.use(express.json());

app.use("/api", user);

app.listen(port, async () => {
    logger.info("App listening on port " + port);
    await connectDB();
});
