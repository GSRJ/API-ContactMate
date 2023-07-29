import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const retrieveUserService = async (idUser: number): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  return returnUserSchema.parse(findUser);
};

export default retrieveUserService;
