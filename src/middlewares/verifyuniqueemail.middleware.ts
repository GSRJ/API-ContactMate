import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const VerifyUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.email !== undefined || req.body.email !== null) {
    const findUser = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (typeof findUser !== "undefined" && findUser !== null) {
      throw new AppError("Email already exists.", 409);
    }
  }
  next();
};

export default VerifyUniqueEmail;
