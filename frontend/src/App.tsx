import './App.css';

import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
function App() {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
 
  // establish socket connection
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');
  const [msg, setMsg] = useState('');
  // establish socket connection
  useEffect(() => {
    setSocket(io('/'));
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });

    socket.on("getDate", (data:any) => {
      setDt(data.date);
      setMsg(data.msg);
    });

   


  }, [socket]);

  // manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected)
      socket!.disconnect();
    else {
      socket!.connect();
    }
  }

  // subscribe to socket date event
  const subscribeToDateEvent = (interval = 1000) => {
    socket!.emit('subscribeToDateEvent', interval);
  }

  return (
    <div>
      <h2>Welcome to Down-Spiral a data visualizer/debugger </h2>

      <div><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />

      <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
  <div style={{ marginTop: 20 }}><b>Message: </b>{msg}</div>

    </div>
  );
}

export default App;
