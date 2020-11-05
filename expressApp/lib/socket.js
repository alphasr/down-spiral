"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = (io) => {
    io.on("connection", (connect) => {
        console.log("connected ...");
    });
};
module.exports = socket;
//# sourceMappingURL=socket.js.map