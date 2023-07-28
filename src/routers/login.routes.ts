import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import verifyData from "../middlewares/verifydata.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", verifyData(createLoginSchema), createLoginController);

export default loginRoutes;
