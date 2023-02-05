import { createConnection } from "typeorm";
import connectionOptions from "./connectionOptions";

export default async function db_init() {
  try {
    await createConnection(connectionOptions);
    console.log("----- DB 연결 완료 -----");
  } catch (e) {
    console.log(e);
  }
}
