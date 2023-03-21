import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { ROLE, IUserDocument } from "./user.types";

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userinfo: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: ROLE.USER,
        },
        purchases: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// hashing(encrypting) the password before saving
userSchema.pre("save", async function (next) {
    let user = this as IUserDocument;

    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as IUserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// creating and returning jwtToken
userSchema.methods.getJwtToken = function (): string {
    const jwtSecret = config.get<string>("jwtSecret");
    const jwtExpiry = config.get<string>("jwtExpiry");

    return jwt.sign({ id: this._id }, jwtSecret, {
        expiresIn: jwtExpiry,
    });
};

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export default UserModel;
