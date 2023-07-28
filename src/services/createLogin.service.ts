import { compare } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { TLogin } from "../interfaces/login.interfaces";

const createLoginService = async (loginData: TLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: loginData.email,
  });
  if (!user) {
    throw new AppError("Wrong email or password", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24H",
      subject: String(user.id),
    }
  );
  return token;
};

export { createLoginService };
