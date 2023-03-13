import { object, string, TypeOf } from "zod";

// Register User Schema
export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First name is required",
        }),
        lastName: string({
            required_error: "Last name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email address"),
        userinfo: string({
            required_error: "Userinfo is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password must be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;

// Login User Schema

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),

        password: string({ required_error: "Password is required" }),
    }),
});

export type CreateLoginUserInput = TypeOf<typeof loginUserSchema>["body"];
