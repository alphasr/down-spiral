const socket = (io:any) => {
    io.on('connection', (client:any) => {
      console.log('New Connection');
  
      // socket event for client subscription
      client.on('subscribeToDateEvent', (interval:any) => {
        console.log('Client is subscribing with interval: ', interval);
        
        // emit message to the client side
        setInterval(() => {
          const payload = {
            date: new Date().toUTCString(),
            msg:'Logging successfully.'
          }
          client.emit('getDate', payload);
          
        }, interval);
      });
    });
  }
  
  module.exports = socket;