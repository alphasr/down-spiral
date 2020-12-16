import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function spiralLogs(cb: Function) {
  socket.on("connect", function () {
    try {
      socket.emit("room", "myRoom");
      console.log("entered room");
    } catch (error) {
      return spiralLogs(cb);
    }
  });
  socket.on("setTableHeader", (data: any) => cb(data));
  socket.on("setTableData", (data: any) => cb(data));
  socket.on("setGraph", (data: any) => cb(data));
}

//   socket.on("test", (timestamp) => cb(null, timestamp));
//   socket.emit("test", timestamp);
// }
export { spiralLogs };
