import { Request, Response } from "express";
import { TContact, TContactReturn } from "../interfaces/contact.interfaces";
import createContactService from "../services/contacts/createContact.service";
import getContactsService from "../services/contacts/getContacts.service";

const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.id;
  const contactData: TContact = req.body;
  const newContact: TContactReturn = await createContactService(
    userId,
    contactData
  );

  return res.status(201).json(newContact);
};

const getContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.id;

  const contacts = await getContactsService(userId);

  return res.json(contacts);
};
export { createContactController, getContactsController };
