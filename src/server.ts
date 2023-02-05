import { config } from "dotenv";
import express from "express";
import cors from "cors";
import rootRouter from "./router";
import corsMiddleware from "./middleware/corsMiddleware";
import db_init from "./model";

config();
const server_init = async () => {
  const app = express();
  app.use(cors());
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(rootRouter);
  app.listen(process.env.PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`http://localhost:${process.env.PORT}`);
  });
};

const start = async () => {
  await db_init();
  await server_init();
};
start();
