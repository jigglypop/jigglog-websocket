import { config } from "dotenv";
import { ConnectionOptions } from "typeorm";
import { Register } from "./entity/register";
import { User } from "./entity/user";

config();
const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Register, User],
};

export default connectionOptions;
