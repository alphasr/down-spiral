import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

interface IPayload {
  msg: string;
  dt: Date;
}

function spiralLogs(cb: Function) {
  socket.on("connect", function () {
    try {
      socket.emit("room", "myRoom");
      console.log("entered room");
    } catch (error) {
      return spiralLogs(cb);
    }
  });
  socket.on("temp", (data: IPayload) => cb(data));
}

//   socket.on("test", (timestamp) => cb(null, timestamp));
//   socket.emit("test", timestamp);
// }
export { spiralLogs };
