import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import verifyData from "../middlewares/verifydata.middleware";
import VerifyUniqueEmail from "../middlewares/verifyuniqueemail.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  verifyData(createLoginSchema),
  VerifyUniqueEmail,
  createLoginController
);

export default loginRoutes;
