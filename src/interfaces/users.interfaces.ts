import { DeepPartial } from "typeorm";
import { z } from "zod";
import { returnUserSchema, userSchema } from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserReturn = z.infer<typeof returnUserSchema>;
type TUserUpdate = DeepPartial<TUser>;

export { TUser, TUserReturn, TUserUpdate };
