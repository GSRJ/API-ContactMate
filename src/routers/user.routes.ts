import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import verifyData from "../middlewares/verifydata.middleware";
import { userSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post("", verifyData(userSchema), createUserController);

export default userRoutes;
