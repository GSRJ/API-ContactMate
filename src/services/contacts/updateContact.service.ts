import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors";
import {
  TContactReturn,
  TContactUpdate,
} from "../../interfaces/contact.interfaces";
import { returnContactSchema } from "../../schemas/contact.schemas";

const updateContactService = async (
  contactData: TContactUpdate,
  userId: number,
  contactId: number
): Promise<TContactReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldContactData = await contactRepository
    .createQueryBuilder("contact")
    .innerJoin("contact.user", "user")
    .where("contact.id = :contactId", { contactId })
    .andWhere("user.id = :userId", { userId })
    .getOne();

  console.log(oldContactData);
  if (!oldContactData) {
    throw new AppError("contact not found", 404);
  }

  const contact = contactRepository.merge(oldContactData, contactData);

  await contactRepository.save(contact);

  const updatedContact = returnContactSchema.parse(contact);

  return updatedContact;
};

export default updateContactService;
