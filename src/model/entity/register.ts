import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column()
  email!: string;

  @Column()
  birth!: string;

  @Column()
  country!: string;

  @Column()
  phone!: string;

  @Column()
  memberId!: string;

  @Column()
  course!: string;

  @Column()
  confirm!: boolean;

  @Column()
  payed!: boolean;

  @Column()
  category!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.register)
  user?: User;
}
