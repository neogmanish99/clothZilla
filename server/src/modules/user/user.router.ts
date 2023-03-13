import { Router } from "express";
import validateResource from "../../middleware/validateResource";
import { createUserSchema, loginUserSchema } from "./user.schema";
import { createUserHandler, loginHandler } from "./user.controller";

const router = Router();

router
    .route("/signup")
    .post(validateResource(createUserSchema), createUserHandler);

router.route("/signin").post(validateResource(loginUserSchema), loginHandler);

export default router;
