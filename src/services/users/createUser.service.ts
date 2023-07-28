import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUser, TUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const createUSerService = async (userData: TUser): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
export default createUSerService;
