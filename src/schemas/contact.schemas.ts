import { z } from "zod";
import { returnUserSchema } from "./users.schemas";

const contactSchema = z.object({
  name: z.string().max(45).min(2),
  surname: z.string().max(45).min(2),
  email: z.string().email().max(45).min(3),
  phone: z.number(),
});

const returnContactSchema = contactSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  user: returnUserSchema,
});

const updateContactSchema = contactSchema.partial();

const returnAllContactsSchema = z.array(returnContactSchema);

export {
  contactSchema,
  returnAllContactsSchema,
  returnContactSchema,
  updateContactSchema,
};
