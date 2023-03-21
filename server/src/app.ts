import express, { Request, Response, NextFunction } from "express";
import config from "config";
import logger from "./utils/logger";
var cookieParser = require("cookie-parser");

import { BaseError, ErrorHandler } from "./utils/index";
import { HttpStatusCode } from "./types/http.model";

// import routes
import user from "./modules/user/user.router";

const app = express();
const errorHandler = new ErrorHandler(logger);

// regular middleware
app.use(express.json());
app.use(cookieParser());

// using routes
app.use("/api", user);

// Handling Errors
app.use(errorMiddleware);

process.on("uncaughtException", async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
    throw reason;
});

async function errorMiddleware(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!errorHandler.isTrustedError(err)) {
        res.json({
            error: "Something went wrong!!",
            code: HttpStatusCode.INTERNAL_SERVER,
        });
        next(err);
        return;
    }
    await errorHandler.handleError(err);
    res.json({ error: err.message, code: err.httpCode });
}

export default app;
