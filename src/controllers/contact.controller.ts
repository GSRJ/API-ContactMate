import { Request, Response } from "express";
import { TContact, TContactReturn } from "../interfaces/contact.interfaces";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import getContactsService from "../services/contacts/getContacts.service";
import updateContactService from "../services/contacts/updateContact.service";

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

const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.id;

  const contactId: number = Number(req.params.id);

  const contactData = req.body;

  const newContact = await updateContactService(contactData, userId, contactId);

  return res.json(newContact);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.id;

  const contactId: number = Number(req.params.id);

  await deleteContactService(userId, contactId);

  return res.status(204).send();
};

export {
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
};
