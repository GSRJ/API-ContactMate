import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import verifyId from "../middlewares/verifyId.middleware";
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
  verifyId,
  updateUserController
);

userRoutes.delete(
  "",
  verifyToken,
  verifyData(updateUserSchema),
  verifyId,
  deleteUserController
);

export default userRoutes;
