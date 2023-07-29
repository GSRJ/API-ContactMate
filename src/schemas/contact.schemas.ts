import { z } from "zod";

const contactSchema = z.object({
  name: z.string().max(45).min(2),
  surname: z.string().max(45).min(2),
  email: z.string().email().max(45).min(3),
  phone: z
    .string()
    .max(15)
    .regex(/^[0-9]+$/)
    .default("000"),
});

const returnContactSchema = contactSchema.extend({
  id: z.number(),
  createdAt: z.date(),
});

const updateContactSchema = contactSchema.partial();

const returnAllContactsSchema = z.array(returnContactSchema);

export {
  contactSchema,
  returnAllContactsSchema,
  returnContactSchema,
  updateContactSchema,
};
