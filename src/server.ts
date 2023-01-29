import { config } from "dotenv";
import express from "express";
import cors from "cors";
import mailRouter from "./router";

config()
const server_init = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
      express.urlencoded({
          extended: true,
      })
  );
  app.use(mailRouter);
  app.listen(process.env.PORT, (err?: Error) => {
      if (err) throw err;
      console.log(`http://localhost:${process.env.PORT}`);
  });
};

const start = async () => {
  await server_init();
  // await initialize();
};
start();