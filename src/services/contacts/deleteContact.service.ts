import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors";

const deleteContactService = async (
  userId: number,
  contactId: number
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = await contactRepository
    .createQueryBuilder("contact")
    .innerJoin("contact.user", "user")
    .where("contact.id = :contactId", { contactId })
    .andWhere("user.id = :userId", { userId })
    .getOne();

  if (!contact) {
    throw new AppError("contact not found", 404);
  }

  await contactRepository.remove(contact);

  return;
};

export default deleteContactService;
