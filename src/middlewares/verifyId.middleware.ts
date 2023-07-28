import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  if (res.locals.admin === true && res.locals.targetUser != undefined) {
    const findUser = await userRepository.findOne({
      where: {
        id: Number(res.locals.targetUser),
      },
    });

    if (!findUser) {
      throw new AppError("User not found", 404);
    }
    return next();
  }
  const findUser = await userRepository.findOne({
    where: {
      id: Number(res.locals.id),
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyId;
