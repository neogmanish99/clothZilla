import { NextFunction, Request, Response } from "express";
import { createUser, findUserByEmail } from "./user.service";
import logger from "../../utils/logger";
import { CreateUserInput, CreateLoginUserInput } from "./user.schema";
import { cookieToken, APIError } from "../../utils";
import { BigPromise } from "../../middleware/index";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        // calls creates a user service
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function loginHandler(
    req: Request<{}, {}, CreateLoginUserInput>,
    res: Response,
    next: NextFunction
) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email, "+password");

    cookieToken(user!, res); // 👈️ non-null assertion
}
