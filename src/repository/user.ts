import { EntityRepository, Repository } from "typeorm";
import { Register } from "../model/entity/register";
import { User } from "../model/entity/user";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async createUser(
    name: string,
    hashedPassword: string,
    email: string,
    permission: number
  ) {
    const user = await this.createQueryBuilder()
      .insert()
      .values({
        name,
        hashedPassword,
        email,
        permission,
      })
      .execute();
    return user.identifiers[0].id;
  }
  async getUser(id: number) {
    const user = await this.createQueryBuilder("user")
      .select()
      .where("user.id =:id", { id })
      .getOne();
    return user;
  }

  async getUserJoined(id: number) {
    const user = await this.createQueryBuilder("user")
      .select()
      .where("user.id =:id", { id })
      .leftJoinAndSelect("user.register", "register")
      .getMany();
    return user;
  }

  async connectUserAndRegister(id: number, register: Register) {
    const user = await this.createQueryBuilder("user")
      .update()
      .set({ register })
      .where("user.id =:id", { id })
      .execute();
    return user;
  }

  async getUserAndPost(id: number) {
    const user = await this.createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "posts")
      .where("user.id =:id", { id })
      .getMany();
    return user;
  }
  async getUserByUsername(name: string) {
    const user = await this.createQueryBuilder("user")
      .select()
      .where("user.name =:name", { name })
      .getOne();
    return user;
  }
}
