import { IRegister, IRegisterForm } from "./../type/register";
import { EntityRepository, Repository } from "typeorm";
import { Register } from "../model/entity/register";
import { User } from "../model/entity/user";

@EntityRepository(Register)
export default class RegisterRepository extends Repository<Register> {
  async createRegister(user: User, registerForm: IRegisterForm) {
    const { id, name, email } = user;
    const { birth, country, phone, memberId, course } = registerForm;
    const payed = false;
    const confirm = false;
    const register = await this.createQueryBuilder()
      .insert()
      .values({
        id,
        name,
        email,
        birth,
        country,
        phone,
        memberId,
        course,
        payed,
        confirm,
      })
      .execute();
    return register.identifiers[0].id;
  }

  async getRegister(id: number) {
    const register = await this.createQueryBuilder("register")
      .select()
      .where("register.id =:id", { id })
      .getOne();
    return register;
  }

  async getRegisterJoined(id: number) {
    const register = await this.createQueryBuilder("register")
      .select()
      .where("register.id =:id", { id })
      .leftJoinAndSelect("register.user", "user")
      .getMany();
    return register;
  }

  async updateRegister(id: number, registerForm: IRegisterForm) {
    const { birth, country, phone, memberId, course } = registerForm;
    const register = await this.createQueryBuilder("register")
      .update()
      .set({ birth, country, phone, memberId, course })
      .where("register.id =:id", { id })
      .execute();
    return register;
  }

  async payRegister(id: number) {
    const register = await this.createQueryBuilder("register")
      .update()
      .set({ payed: true })
      .where("register.id =:id", { id })
      .execute();
    return register;
  }

  async confirmRegister(id: number) {
    const register = await this.createQueryBuilder("register")
      .update()
      .set({ confirm: true })
      .where("register.id =:id", { id })
      .execute();
    return register;
  }

  async getAllRegister() {
    const registers = await this.createQueryBuilder("register")
      .leftJoinAndSelect("register.user", "user")
      .select()
      .getMany();
    return registers;
  }

  async deleteRegister(id: number) {
    await this.createQueryBuilder("register")
      .delete()
      .where("register.id =:id", { id })
      .execute();
  }

  //   async getAllRegisterPage(page: number) {
  //     const posts = await this.createQueryBuilder("register")
  //       .leftJoinAndSelect("register.user", "user")
  //       .leftJoinAndSelect("register.comments", "comments")
  //       .select([
  //         "register.id",
  //         "register.title",
  //         "register.summary",
  //         "register.createdAt",
  //         "register.viewcount",
  //         "comments",
  //       ])
  //       .limit(PAGE_LENGTH)
  //       .offset((page - 1) * PAGE_LENGTH)
  //       .getMany();
  //     return posts;
  //   }
  //
  //   async getAllCommentByRegisterId(id: number) {
  //     const comments = await this.createQueryBuilder("register")
  //       .leftJoinAndSelect("register.comments", "comments")
  //       .leftJoinAndSelect("comments.user", "apu")
  //       .leftJoinAndSelect("comments.recomments", "recomments")
  //       .leftJoinAndSelect("recomments.user", "user")
  //       .where("register.id =:id", { id })
  //       .getOne();
  //     return comments;
  //   }
  //
  //   async getRegisterAndUserComment(id: number) {
  //     const register = await this.createQueryBuilder("register")
  //       .leftJoinAndSelect("register.user", "user")
  //       .leftJoinAndSelect("register.comments", "comments")
  //       .where("register.id =:id", { id })
  //       .getOne();
  //     return register;
  //   }

  //   async updateRegister(
  //     id: number,
  //     title: string,
  //     summary: string,
  //     content: string
  //   ) {
  //     const register = await this.createQueryBuilder("register")
  //       .update()
  //       .set({ title, summary, content })
  //       .where("register.id =:id", { id })
  //       .execute();
  //     return register;
  //   }
  //
  //   async plusViewCount(id: number, viewcount: number) {
  //     await this.createQueryBuilder("register")
  //       .update()
  //       .set({ viewcount })
  //       .where("register.id =:id", { id })
  //       .execute();
  //   }
}
