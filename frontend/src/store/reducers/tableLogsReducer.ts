import { v4 as uuidv4 } from "uuid";
import * as types from "../types";
export interface ITableLogsState {
  header?: string[];
  data: ITableData[];
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
  header: ["ID", "Timestamp", "Hostname", "App-Name", "Priority"],
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
    type: types.SET_TABLE_LOG;
    payload?: ITableData;
  }
): ITableLogsState => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_TABLE_LOG: {
      console.log("payload in reducer = ", JSON.stringify(payload));
      if (payload) {
        return { ...state, data: [...state.data, payload] };
      }
      return state;
    }
    default:
      return state;
  }
};
