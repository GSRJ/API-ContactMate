import { hashSync } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45).min(2),
  surname: z.string().max(45).min(2),
  email: z.string().email().max(45).min(3),
  phone: z.number().default(0o0),
  password: z
    .string()
    .max(30)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  admin: z.boolean().optional().default(false),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    phone: z.string().nullable(),
    createdAt: z.date(),
  })
  .omit({
    password: true,
  });

const updateUserSchema = userSchema.partial();

const returnAllUsersSchema = z.array(returnUserSchema);

export { returnAllUsersSchema, returnUserSchema, updateUserSchema, userSchema };
