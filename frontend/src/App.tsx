import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { spiralLogs } from "./api";
import Table from "react-bootstrap/esm/Table";
import TableLog from "./pages/tableLog";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  ITableLogsState,
  initialTableLogsState,
  ITableData,
} from "./store/reducers/tableLogsReducer";

function App() {
  const [payload, setPayload] = useState<ITableLogsState>(
    initialTableLogsState
  );

  // const handleSetPayload = (payloadNew: IPayload) => {
  //   if (payload?.list) {
  //     return setPayload({ ...payload, list: [...payload.list, payloadNew] });
  //   }
  //   return payload;
  // };

  useEffect(() => {
    const handleSetPayload = (payloadNew: string) => {
      //console.log("LOL", payloadNew);
      const uid = uuidv4();
      const parsedPayload: ITableData = JSON.parse(payloadNew);
      if (payload?.data) {
        //  console.log("Inside set payload :", payloadNew.msg);
        return setPayload({
          ...payload,
          data: [
            ...payload.data,
            {
              id: uuidv4(),
              timestamp: new Date(),
              hostName: "logger",
              appName: "down-spiral",
              priority: "started",
            },
          ],
        });
      }
      //console.log("Inside callback :", payloadNew);
      return payload;
    };
    spiralLogs((payload: string) => handleSetPayload(payload));
  }, [payload]);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={TableLog} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
{
  /* <Route exact path="/">
          <Redirect to="/Home" />
        </Route> */
}
// const [socket, setSocket] = useState<SocketIOClient.Socket>();

// // establish socket connection
// const [socketConnected, setSocketConnected] = useState(false);
// const [dt, setDt] = useState("");
// const [msg, setMsg] = useState("");
// // establish socket connection
// useEffect(() => {
//   setSocket(io("/"));
// }, []);

// // subscribe to the socket event
// useEffect(() => {
//   if (!socket) return;

//   socket.on("connect", () => {
//     setSocketConnected(socket.connected);
//     subscribeToDateEvent();
//   });
//   socket.on("disconnect", () => {
//     setSocketConnected(socket.connected);
//   });

//   socket.on("getData", (data: any) => {
//     setDt(data.date);
//     setMsg(data.msg);
//   });
// }, [socket]);

// // manage socket connection
// const handleSocketConnection = () => {
//   if (socketConnected) socket!.disconnect();
//   else {
//     socket!.connect();
//   }
// };

// // subscribe to socket date event
// const subscribeToDateEvent = (interval = 1000) => {
//   socket!.emit("subscribeToDateEvent", interval);
// };

//  <div>
//    <h2>Welcome to Down-Spiral a data visualizer/debugger </h2>

//    <div>
//      <b>Connection status:</b>{" "}
//      {socketConnected ? "Connected" : "Disconnected"}
//    </div>
//    <input
//      type="button"
//      style={{ marginTop: 10 }}
//      value={socketConnected ? "Disconnect" : "Connect"}
//      onClick={handleSocketConnection}
//    />

//    <div style={{ marginTop: 20 }}>
//      <b>Date: </b> {dt}
//    </div>
//    <div style={{ marginTop: 20 }}>
//      <b>Message: </b>
//      {msg}
//    </div>
//  </div>;
