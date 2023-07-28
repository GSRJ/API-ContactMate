import { Request, Response } from "express";
import { TUser } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: TUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  if (res.locals.admin === true && res.locals.targetUser != undefined) {
    const userId = Number(res.locals.targetUser);
    const updatedUser = await updateUserService(userData, userId);
    return res.json(updatedUser);
  }

  const userId = res.locals.id;
  const updatedUser = await updateUserService(userData, userId);
  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  if (res.locals.admin === true && res.locals.targetUser != undefined) {
    const userId = res.locals.targetUser;
    await deleteUserService(userId);
    return res.status(204).send();
  }
  const userId = res.locals.id;
  await deleteUserService(Number(userId));
  return res.status(204).send();
};
export { createUserController, deleteUserController, updateUserController };
