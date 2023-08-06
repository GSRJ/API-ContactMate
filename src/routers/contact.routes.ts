import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
} from "../controllers/contact.controller";
import verifyData from "../middlewares/verifydata.middleware";
import verifyToken from "../middlewares/verifytoken.middleware";
import { contactSchema, updateContactSchema } from "../schemas/contact.schemas";

const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  verifyToken,
  verifyData(contactSchema),
  createContactController
);
contactRoutes.patch(
  "/:id",
  verifyToken,
  verifyData(updateContactSchema),
  updateContactController
);
contactRoutes.delete("/:id", verifyToken, deleteContactController);

const contactRoutesAll: Router = Router();
contactRoutesAll.get("", verifyToken, getContactsController);

export { contactRoutes, contactRoutesAll };
