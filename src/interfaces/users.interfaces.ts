import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  returnAllUsersSchema,
  returnUserSchema,
  userSchema,
} from "../schemas/users.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserReturn = z.infer<typeof returnUserSchema>;
type TUserUpdate = DeepPartial<TUser>;
type TUserAllReturn = z.infer<typeof returnAllUsersSchema>;

export { TUser, TUserAllReturn, TUserReturn, TUserUpdate };
