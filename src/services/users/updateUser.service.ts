import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUserReturn, TUserUpdate } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: TUserUpdate,
  userId: number
): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: userId,
  });

  const user = userRepository.merge(oldUserData!, userData);

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
