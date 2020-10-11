"use strict";
const socket = (io) => {
    io.on('connection', (client) => {
        console.log('New Connection');
        // socket event for client subscription
        client.on('subscribeToDateEvent', (interval) => {
            console.log('Client is subscribing with interval: ', interval);
            // emit message to the client side
            setInterval(() => {
                const payload = {
                    date: new Date().toUTCString(),
                    msg: 'Logging successfully.'
                };
                client.emit('getDate', payload);
            }, interval);
        });
    });
};
module.exports = socket;
//# sourceMappingURL=socket.js.map