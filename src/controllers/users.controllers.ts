import { Request, Response } from "express";
import { TUser } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import getUsersService from "../services/users/getUsers.service";
import retrieveUserService from "../services/users/retrieveUser.service";
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

const retrieveUserController = async (req: Request, res: Response) => {
  if (res.locals.admin === true && res.locals.targetUser != undefined) {
    const userId = res.locals.targetUser;
    const user = await retrieveUserService(userId);
    return res.json(user);
  }
  const userId = res.locals.id;
  const user = await retrieveUserService(userId);
  return res.json(user);
};

const getUsersControllers = async (req: Request, res: Response) => {
  const isAdmin = res.locals.admin;

  const users = await getUsersService(isAdmin);

  return res.json(users);
};
export {
  createUserController,
  deleteUserController,
  getUsersControllers,
  retrieveUserController,
  updateUserController,
};
