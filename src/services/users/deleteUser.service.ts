import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact, User } from "../../entities";

const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const findUser = await userRepository.findOne({
    where: {
      id: idUser,
    },
    relations: {
      contacts: true,
    },
  });

  if (findUser) {
    for (const contact of findUser.contacts) {
      await contactRepository.remove(contact);
    }
  }

  await userRepository.remove(findUser!);
};

export default deleteUserService;
