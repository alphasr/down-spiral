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
}

function spiralGraphs(cb: Function) {
  console.log("inside graph logs");
  socket.on("connect", function () {
    try {
      socket.emit("room", "myRoom");
      console.log("entered room");
    } catch (error) {
      return spiralLogs(cb);
    }
  });
  socket.on("setGraph", (data: any) => cb(data));
}
function simplePrinter(cb: Function) {
  console.log("inside simple logs");
  socket.on("connect", function () {
    try {
      socket.emit("room", "myRoom");
      console.log("entered room");
    } catch (error) {
      return simplePrinter(cb);
    }
  });
  socket.on("setSimplePrinter", (data: any) => cb(data));
}
function htmlPrinter(cb: Function) {
  console.log("inside html logs");
  socket.on("connect", function () {
    try {
      socket.emit("room", "myRoom");
      console.log("entered room");
    } catch (error) {
      return htmlPrinter(cb);
    }
  });
  socket.on("setHtmlPrinter", (data: any) => cb(data));
}

//   socket.on("test", (timestamp) => cb(null, timestamp));
//   socket.emit("test", timestamp);
// }
export { spiralLogs, spiralGraphs, simplePrinter, htmlPrinter };

// {"sessionId":"results","label": "result 1:", "value":"1"}
