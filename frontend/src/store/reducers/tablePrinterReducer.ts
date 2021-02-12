import * as types from '../types';

export interface ITableLogsState {
  // if session id exist, push data to data, else push object to state
  sessionData: ITableData[];
}

export interface ITableData {
  sessionId: string;
  header?: string[]; // must have unique header names
  data: any[]; //must have id
}

export const initialTableLogsState: ITableLogsState = {
  sessionData: [
    {
      sessionId: '0',
      header: ['id', 'timestamp', 'hostname', 'appName', 'priority'],
      data: [
        {
          i: '123123hjasdf', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
        },
        {
          i: '123123hjasdasdf', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
        },
      ],
    },
    {
      sessionId: '1',
      header: ['i', 'timestamp', 'hostname', 'appName', 'priority'],
      data: [
        {
          i: '123123hjasdf', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
        },
        {
          i: '123123hjasdasdf', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
        },
        {
          i: '123123hjassadf', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
        },
        {
          i: '123123hjasdasdasdff', //uuidv4(),
          timestamp: new Date(),
          hostName: 'sdf',
          appName: 'aa',
          priority: 'asdf',
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

  // const { sessionId, data, header } = tableData;
  switch (type) {
    case types.SET_TABLE_DATA_LOG: {
      console.log('payload in reducer = ', JSON.stringify(tablePayload));

      let tempState = state.sessionData;

      if (
        state.sessionData.find(
          (session) => session.sessionId === tablePayload.sessionId
        )
      ) {
        console.log('found session id');

        const sessionIndex = (session: ITableData) =>
          session.sessionId === tablePayload?.sessionId;
        const dataIndex = state.sessionData.findIndex(sessionIndex);

        const newSession: ITableData = tempState[dataIndex];

        //adding row to row []
        tablePayload.data?.forEach((data) => newSession.data.push(data));

        //adding header which is missing
        newSession.data?.forEach((dataSingleton) => {
          console.log('inside for each');
          let name: string;
          for (name in dataSingleton) {
            if (name)
              if (!newSession.header!.find((value) => value === name)) {
                console.log('found difference');
                newSession.header!.push(name);
              }
          }
        });
        tempState[dataIndex] = newSession;
        console.log('new state = ', JSON.stringify(tempState[dataIndex]));
        console.log(Date.now());
        return { ...state, sessionData: tempState };
      } else {
        const newSession: ITableData = {
          sessionId: tablePayload.sessionId,
          data: tablePayload.data,
          header: [''],
        };
        if (!newSession.header) newSession.header = [''];

        newSession.data.forEach((dataSingleton) => {
          let name: string;

          for (name in dataSingleton) {
            if (name)
              if (!newSession.header!.find((value) => value === name)) {
                console.log('found difference');
                newSession.header!.push(name);
              }
          }
        });
        console.log(Date.now());
        tempState.push(newSession);
        return { ...state, sessionData: tempState };
      }
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
