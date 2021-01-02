import * as types from "../types";

// export interface ITableLogsState {
//   header?: string[];
//   data?: ITableData[];
// }
//Jun 4 22:14:15 server1 sshd[41458] : Failed password for root from 10.0.2.2 port 22 ssh2
// export interface ITableData {
//   id?: string;
//   timestamp?: Date;
//   hostName?: string;
//   appName?: string;
//   priority?: string;
// }

export interface ITableLogsState {
  // if session id exist, push data to data, else push object to state
  sessionData: ITableData[];
}

export interface ITableData {
  sessionId: string;
  header?: string[]; // must have unique header names
  data: any[]; //must have id
}

// export interface ITableDataSingleton {
//   id?: string;
//   timestamp?: Date;
//   hostName?: string;
//   appName?: string;
//   priority?: string;
// }

export const initialTableLogsState: ITableLogsState = {
  sessionData: [
    {
      sessionId: "12312311sadf",
      header: ["id", "timestamp", "hostname", "appName", "priority"],
      data: [
        {
          id: "123123hjasdf", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
        {
          id: "123123hjasdasdf", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
      ],
    },
    {
      sessionId: "12312311sadfasdf",
      header: ["id", "timestamp", "hostname", "appName", "priority"],
      data: [
        {
          id: "123123hjasdf", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
        {
          id: "123123hjasdasdf", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
        {
          id: "123123hjassadf", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
        {
          id: "123123hjasdasdasdff", //uuidv4(),
          timestamp: new Date(),
          hostName: "sdf",
          appName: "aa",
          priority: "asdf",
        },
      ],
    },
  ],
};

export const tablePrinterReducer = (
  state: ITableLogsState = initialTableLogsState,
  action: {
    type:
      | types.SET_TABLE_DATA_LOG
      | types.SET_TABLE_HEADER_LOG
      | types.DELETE_TABLE_SESSION;
    payload: ITableData | string;
  }
): ITableLogsState => {
  const { type, payload } = action;

  const tablePayload = payload as ITableData;
  const deleteSessionPayload = payload as string;

  let tableData: ITableData = payload as ITableData;
  // const { sessionId, data, header } = tableData;
  switch (type) {
    case types.SET_TABLE_DATA_LOG: {
      console.log("payload in reducer = ", JSON.stringify(tablePayload));

      let tempState = state.sessionData;

      if (
        state.sessionData.find(
          (session) => session.sessionId === tablePayload.sessionId
        )
      ) {
        console.log("found session id");

        const sessionIndex = (session: ITableData) =>
          session.sessionId === tablePayload?.sessionId;
        const dataIndex = state.sessionData.findIndex(sessionIndex);

        const newSession: ITableData = tempState[dataIndex];

        //adding row to row []
        tablePayload.data?.forEach((data) => newSession.data.push(data));

        //adding header which is missing
        newSession.data?.forEach((dataSingleton) => {
          console.log("inside for each");
          let name: string;
          for (name in dataSingleton) {
            if (name)
              if (!newSession.header!.find((value) => value === name)) {
                console.log("found difference");
                newSession.header!.push(name);
              }
          }
        });
        tempState[dataIndex] = newSession;
        console.log("new state = ", JSON.stringify(tempState[dataIndex]));
        return { ...state, sessionData: tempState };
      } else {
        const newSession: ITableData = {
          sessionId: tablePayload.sessionId,
          data: tablePayload.data,
          header: [""],
        };
        if (!newSession.header) newSession.header = [""];

        newSession.data.forEach((dataSingleton) => {
          let name: string;

          for (name in dataSingleton) {
            if (name)
              if (!newSession.header!.find((value) => value === name)) {
                console.log("found difference");
                newSession.header!.push(name);
              }
          }
        });
        tempState.push(newSession);
        return { ...state, sessionData: tempState };
      }

      // if (
      //   state.sessionData.find(
      //     (session) => session.sessionId === tablePayload.sessionId
      //   )
      // ) {
      //   const sessionIndex = (session: ITableData) =>
      //     session.sessionId === tablePayload?.sessionId;
      //   const tempData = state.sessionData;
      //   const dataIndex = state.sessionData.findIndex(sessionIndex);
      //   // var obj = JSON.parse(tablePayload.data[0]);

      //   let name;
      //   for (name in tablePayload.data[0]) {
      //     console.log('Inside reducer table', name);
      //   }

      //   // ////////////////////

      //   // //////////////////
      //   // tablePayload?.data.forEach((datum) =>
      //   //   tempData[dataIndex].data.push(datum)
      //   // );
      //   // tempData[dataIndex].header = tablePayload.header;
      //   // if (state.sessionData[dataIndex].data === tempData[dataIndex].data)
      //   //   return state;
      //   // return { ...state, sessionData: tempData };
      //   return state;
      // }
      // return { ...state, sessionData: [...state.sessionData, tableData] };
    }
    case types.DELETE_TABLE_SESSION: {
      const newState = state.sessionData.filter(
        (session) => session.sessionId !== deleteSessionPayload
      );

      return { ...state, sessionData: newState };
    }
    default:
      return state;
  }
};

// client is subscribing with ::: {"sessionId":"results2","rowData":[{"result":"polo","i":"0"}]}
// client is subscribing with ::: {"sessionId":"results2","rowData":[{"result":"rolo","i":"1","elaspsed":"rolo"}]}
// client is subscribing with ::: {"sessionId":"results2","rowData":[{"result":"kolo","i":"2"}]}
// client is subscribing with ::: {"sessionId":"results2","rowData":[{"result":"jj","i":"3","elaspsed":"jj"}]}
// client is subscribing with ::: {"sessionId":"results2","rowData":[{"result":"kfing","i":"4"}]}letlet