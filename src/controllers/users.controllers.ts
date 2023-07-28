import { Request, Response } from "express";
import { TUser } from "../interfaces/users.interfaces";
import createUserService from "../services/createUser.service";
import updateUserService from "../services/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: TUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  console.log(res.locals.admin);
  if (res.locals.admin === true && res.locals.targetUser != undefined) {
    const userId = Number(res.locals.targetUser);
    const updatedUser = await updateUserService(userData, userId);
    return res.json(updatedUser);
  }

  const userId = res.locals.id;
  const updatedUser = await updateUserService(userData, userId);
  return res.json(updatedUser);
};

export { createUserController, updateUserController };
