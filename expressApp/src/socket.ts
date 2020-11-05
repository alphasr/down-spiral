import { Socket } from "socket.io";

const socket = (io: Socket) => {
  io.on("connection", (connect: any) => {
    console.log("connected ...");
  });
};

module.exports = socket;
