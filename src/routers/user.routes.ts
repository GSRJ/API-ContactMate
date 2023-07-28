import { Router } from "express";
import {
  createUserController,
  updateUserController,
} from "../controllers/users.controllers";
import verifyData from "../middlewares/verifydata.middleware";
import verifyToken from "../middlewares/verifytoken.middleware";
import verifyUniqueEmail from "../middlewares/verifyuniqueemail.middleware";
import { updateUserSchema, userSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyData(userSchema),
  verifyUniqueEmail,
  createUserController
);
userRoutes.patch(
  "",
  verifyToken,
  verifyData(updateUserSchema),
  updateUserController
);

export default userRoutes;
