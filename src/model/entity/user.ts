import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Register } from "./register";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  hashedPassword!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column()
  imageUrl!: string;

  @Column()
  permission: number = 4;

  @OneToOne(() => Register, (register) => register.user)
  @JoinColumn()
  register?: Register;
}
