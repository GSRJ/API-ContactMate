import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  contactSchema,
  returnAllContactsSchema,
  returnContactSchema,
} from "../schemas/contact.schemas";

type TContact = z.infer<typeof contactSchema>;
type TContactReturn = z.infer<typeof returnContactSchema>;
type TContactUpdate = DeepPartial<TContact>;
type TContactAllReturn = z.infer<typeof returnAllContactsSchema>;

export { TContact, TContactAllReturn, TContactReturn, TContactUpdate };
