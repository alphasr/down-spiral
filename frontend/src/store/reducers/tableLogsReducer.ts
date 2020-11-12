import * as types from "../types";
export interface ITableLogsState {
  header?: string[];
  data?: ITableData[];
}
//Jun 4 22:14:15 server1 sshd[41458] : Failed password for root from 10.0.2.2 port 22 ssh2
export interface ITableData {
  id?: string;
  timestamp?: Date;
  hostName?: string;
  appName?: string;
  priority?: string;
}

export const initialTableLogsState: ITableLogsState = {
  header: [""],
  data: [
    {
      id: undefined, //uuidv4(),
      timestamp: undefined,
      hostName: "",
      appName: "",
      priority: "",
    },
  ],
};

export const tableLogReducer = (
  state: ITableLogsState = initialTableLogsState,
  action: {
    type: types.SET_TABLE_DATA_LOG | types.SET_TABLE_HEADER_LOG;
    payload?: ITableData[] | string[];
  }
): ITableLogsState => {
  const { type, payload } = action;
  let tableHeader = payload as string[];
  let tableData: ITableData[] = payload as ITableData[];
  switch (type) {
    case types.SET_TABLE_DATA_LOG: {
      console.log("payload in reducer = ", JSON.stringify(payload));
      if (tableData) {
        let tempState: ITableData[] = state.data!;
        console.log(JSON.stringify(tableData));
        tempState.push(...tableData);
        return { ...state, data: tempState };
      }
      return state;
    }
    case types.SET_TABLE_HEADER_LOG: {
      console.log("payload in reducer = ", JSON.stringify(payload));
      if (tableHeader) {
        return { ...state, header: tableHeader };
      }
      return state;
    }
    default:
      return state;
  }
};
