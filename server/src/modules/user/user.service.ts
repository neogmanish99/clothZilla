import User from "./user.model";
import { IUser } from "./user.types";
import { omit } from "lodash";
import logger from "../../utils/logger";

export async function createUser(input: IUser) {
    try {
        const user = await User.create(input);
        return omit(user.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function findUserByEmail(email: string, select?: string) {
    try {
        return User.findOne({ email }).select(select);
    } catch (e: unknown) {
        logger.error("something went wrong while searching for user");
    }
}
