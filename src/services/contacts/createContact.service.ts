import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact, User } from "../../entities";
import { TContact, TContactReturn } from "../../interfaces/contact.interfaces";
import { returnContactSchema } from "../../schemas/contact.schemas";

const createContactService = async (
  userId: number,
  contactData: TContact
): Promise<TContactReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({ id: userId });

  const contact: Contact = contactRepository.create({
    ...contactData,
    user: user!,
  });

  await contactRepository.save(contact);

  return returnContactSchema.parse(contact);
};

export default createContactService;
