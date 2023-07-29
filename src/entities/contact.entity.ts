import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "varchar", length: 45 })
  name: string;
  @Column({ type: "varchar", length: 45 })
  surname: string;
  @Column({ type: "varchar", length: 45 })
  email: string;
  @Column({ type: "integer" })
  phone: number;
  @CreateDateColumn()
  createdAt: string;
  @ManyToOne(() => User)
  user: User;
}

export { Contact };
