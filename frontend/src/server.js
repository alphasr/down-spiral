const { parseJsonText } = require('typescript');

const ioServer = require('socket.io')();

// ioServer.on("connection", (client) => {
//   client.on("room", function (room) {
//     console.log("joined room", room);
//     client.join(room);
//   });
//   client.on("test", (data) => {
//     dataJson = JSON.parse(data);
//     console.log("client is subscribing to timer with interval ", dataJson.msg);

//     client.in("myRoom").emit("temp", dataJson);
//   });
// });
ioServer.on('connection', (client) => {
  client.on('room', function (room) {
    client.join(room);
  });

  client.on('SIMPLE_PRINTER', (data) => {
    dataJson = JSON.parse(data);
    console.log('client is subscribing with :::', JSON.stringify(dataJson));

    client.in('myRoom').emit('setSimplePrinter', JSON.stringify(dataJson));
  });
  client.on('HTML_PRINTER', (data) => {
    dataJson = JSON.parse(data);
    console.log('client is subscribing with :::', JSON.stringify(dataJson));

    client.in('myRoom').emit('setHtmlPrinter', JSON.stringify(dataJson));
  });

  client.on('TABLE', (data) => {
    dataJson = JSON.parse(data);
    console.log('client is subscribing with :::', JSON.stringify(dataJson));

    // client.in("myRoom").emit("setGraph", JSON.stringify(dataJson));
  });
  client.on('HTML', (data) => {
    dataJson = JSON.parse(data);
    console.log('client is subscribing with :::', JSON.stringify(dataJson));
  });

  client.on('tableData', (data) => {
    dataJson = JSON.parse(data);
    console.log('client is subscribing with :::', JSON.stringify(dataJson));

    client.in('myRoom').emit('setTableData', JSON.stringify(dataJson));
  });
});

const port = 8000;
ioServer.listen(port);
console.log('listening on port ', port);

// let express = require("express"),
//   app = express(),
//   port = process.env.PORT || 4000;

// const cors = require("cors");
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000", // URL of the react (Frontend) app
//   })
// );

// app.get("/home", (req: any, res: any) => {
//   res.send("Welcome to Down-Spiral App!");
// });

// let server = app.listen(port, () => {
//   console.log("Server started on: " + port);
// });

// // attach socket to the node server
// let ioNew = require("socket.io").listen(server);
// require("./socket")(ioNew);
