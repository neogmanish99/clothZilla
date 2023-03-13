import { Document } from "mongoose";
import { Request } from "express";

export enum ROLE {
    ADMIN = "admin",
    USER = "user",
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userinfo: string;
    password: string;
    role?: ROLE;
    purchases?: [];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
    comparePassword: (userPassword: string) => Promise<boolean>;
    getJwtToken: () => string;
}
