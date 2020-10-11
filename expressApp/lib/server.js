"use strict";
let express = require('express'), app = express(), port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // URL of the react (Frontend) app
}));
app.get('/', (req, res) => {
    res.send('Welcome to Down-Spiral App!');
});
let server = app.listen(port, () => {
    console.log('Server started on: ' + port);
});
// attach socket to the node server
let io_1 = require('socket.io').listen(server);
require('./socket')(io_1);
//# sourceMappingURL=server.js.map