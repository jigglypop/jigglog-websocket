import cors from "cors";
import { config } from "dotenv";
import express from "express";
// const socketIO = require("socket.ioimport { createServer } from "http";
import { createServer } from "http";
import mongoose from "mongoose";
import { createClient } from "redis";
import { Server } from "socket.io";
import { stateType } from "./schema/state";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = 8000;
const app = express();

config();
app.use(cors());
app;

const users: any = {};
const states: any = {};
io.on("connection", (socket) => {
  console.log("a user connected");
  // join : 채팅 참여 이벤트
  socket.on("join", ({ room, username }) => {
    socket.join(room);
    users[username] = username;
    console.log(username);
    io.to(room).emit("onConnect", {
      msg: `${username} 님이 입장했습니다.`,
      users,
    });
    // send : 클라이언트가 메시지 보내는 이벤트
    socket.on("onSend", async (state: stateType) => {
      // console.log(messageItem);
      const states_cached = await redisClient.get("states");
      const states: {
        [username: string]: stateType;
      } = JSON.parse(states_cached || "{}");
      const new_state = { ...states, [username]: { ...state } };
      await redisClient.set("states", JSON.stringify(new_state));
      states[username] = { ...state };
      io.to(room).emit("onReceive", new_state);
    });

    socket.on("disconnect", () => {
      delete users[username];
      io.to(room).emit("onDisconnect", {
        msg: `${username} 님이 퇴장하셨습니다.`,
        users,
      });
    });
  });
});

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient
  .connect()
  .then(() => console.log("redis connected"))
  .catch((e) => console.log(e));

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`,
    {}
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

httpServer.listen(port, () =>
  console.log(`Listening on port \nhttp://localhost:${port}`)
);
