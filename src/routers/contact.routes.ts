import { Router } from "express";
import {
  createContactController,
  getContactsController,
} from "../controllers/contact.controller";
import verifyData from "../middlewares/verifydata.middleware";
import verifyToken from "../middlewares/verifytoken.middleware";
import { contactSchema } from "../schemas/contact.schemas";

const contactRoutes: Router = Router();
const contactRoutesAll: Router = Router();

contactRoutes.post(
  "",
  verifyToken,
  verifyData(contactSchema),
  createContactController
);

contactRoutesAll.get("", verifyToken, getContactsController);

export { contactRoutes, contactRoutesAll };
