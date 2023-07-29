import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { TUserAllReturn } from "../../interfaces/users.interfaces";
import { returnAllUsersSchema } from "../../schemas/users.schemas";

const getUsersService = async (isAdmin: boolean): Promise<TUserAllReturn> => {
  if (!isAdmin) {
    throw new AppError("You are not authorized to access this route.", 401);
  }
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers = await userRepository.find();

  const users = returnAllUsersSchema.parse(findUsers);

  return users;
};

export default getUsersService;
