import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact, User } from "../../entities";

const getContactsService = async (userId: number) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const user: User[] = await userRepository.find({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const userData = user[0];

  const contacts = userData.contacts;

  return contacts;
};

export default getContactsService;
