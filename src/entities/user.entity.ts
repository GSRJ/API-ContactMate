import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
  @Column({ type: "varchar", length: 120 })
  password: string;
  @Column({ type: "boolean", default: false })
  admin: boolean;
  @CreateDateColumn()
  createdAt: string;
}

export { User };
