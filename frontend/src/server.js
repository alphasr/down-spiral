const ioServer = require("socket.io")();

ioServer.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
  client.on("test", (data) => {
    console.log("client is subscribing to timer with interval ", data);
  });
});

const port = 8000;
ioServer.listen(port);
console.log("listening on port ", port);

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
