import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "varchar", length: 45 })
  name: string;
  @Column({ type: "varchar", length: 45 })
  surname: string;
  @Column({ type: "varchar", length: 45, unique: true })
  email: string;
  @Column({ type: "varchar", nullable: true })
  phone: string;
  @Column({ type: "varchar", length: 120 })
  password: string;
  @Column({ type: "boolean", default: false })
  admin: boolean;
  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true })
  contacts: Contact[];
}

export { User };
