import * as types from "../types";

export interface IGraphLogsState {
  // if session id exist, push data to data, else push object to state
  sessionData: IGraphData[];
}

export interface IGraphData {
  labels: string[];
  sessionId: string;
  datasets: IGraphDataSingleton;
}

export interface IGraphDataSingleton {
  label?: string;
  data?: any[];
}

export const initialGraphLogsState: IGraphLogsState = {
  sessionData: [
    {
      labels: [
        "2015-01",
        "2015-02",
        "2015-03",
        "2015-04",
        "2015-05",
        "2015-06",
        "2015-07",
        "2015-08",
        "2015-09",
        "2015-10",
        "2015-11",
        "2015-12",
      ],
      sessionId: "0",
      datasets: {
        label: "# of Tomatoes",
        data: ["12", "19", "3", "5", "2", "3", "20", "3", "5", "6", "2", "25"],
      },
    },
  ],
};

export const graphLogReducer = (
  state: IGraphLogsState = initialGraphLogsState,
  action: {
    type: types.SET_GRAPH_LOGS;
    payload: IGraphData;
  }
): IGraphLogsState => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_GRAPH_LOGS: {
      console.log("payload in reducer = ", JSON.stringify(payload));
      if (
        state.sessionData.find(
          (session) => session.sessionId === payload?.sessionId
        )
      ) {
        const sessionIndex = (session: IGraphData) =>
          session.sessionId === payload?.sessionId;
        const tempData = state.sessionData;
        const dataIndex = state.sessionData.findIndex(sessionIndex);
        tempData[dataIndex].datasets = payload?.datasets;
        tempData[dataIndex].labels = payload?.labels;
        if (
          state.sessionData[dataIndex].datasets === tempData[dataIndex].datasets
        )
          return state;
        return { ...state, sessionData: tempData };
      }
      return { ...state, sessionData: [...state.sessionData, payload] };
    }
    default:
      return state;
  }
};
