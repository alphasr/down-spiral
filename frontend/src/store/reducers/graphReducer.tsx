import * as types from "../types";

export interface IGraphLogsState {
  // if session id exist, push data to data, else push object to state
  sessionData: IGraphData[];
}

export interface IGraphData {
  type?: string;
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
      type: "bar",
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
    type: types.SET_GRAPH_LOGS | types.DELETE_GRAPH_SESSION;
    payload: IGraphData | string;
  }
): IGraphLogsState => {
  const { type, payload } = action;

  const graphDataPayload = payload as IGraphData;
  const deleteSessionId = payload as string;

  switch (type) {
    case types.SET_GRAPH_LOGS: {
      console.log("payload in reducer = ", JSON.stringify(payload));
      if (
        state.sessionData.find(
          (session) => session.sessionId === graphDataPayload?.sessionId
        )
      ) {
        console.log("found session id ");
        const sessionIndex = (session: IGraphData) =>
          session.sessionId === graphDataPayload?.sessionId;
        const tempData = state.sessionData;
        const dataIndex = state.sessionData.findIndex(sessionIndex);

        if (
          tempData[dataIndex].labels !== graphDataPayload?.labels &&
          tempData[dataIndex].datasets.data !== graphDataPayload.datasets.data
        ) {
          console.log("labels and data is changed");

          tempData[dataIndex].labels = tempData[dataIndex].labels.concat(
            graphDataPayload?.labels
          );
          tempData[dataIndex].datasets.label = graphDataPayload?.datasets.label;
          tempData[dataIndex].datasets.data = tempData[
            dataIndex
          ].datasets.data?.concat(graphDataPayload?.datasets.data);
        } else if (tempData[dataIndex].labels !== graphDataPayload?.labels) {
          console.log("Labels is changed");

          tempData[dataIndex].labels = tempData[dataIndex].labels.concat(
            graphDataPayload?.labels
          );
        } else if (
          tempData[dataIndex].datasets.data !== graphDataPayload.datasets.data
        ) {
          console.log("Data and data is changed");

          tempData[dataIndex].datasets.label = graphDataPayload?.datasets.label;
          tempData[dataIndex].datasets.data = tempData[
            dataIndex
          ].datasets.data?.concat(graphDataPayload?.datasets.data);
        }

        if (
          state.sessionData[dataIndex].datasets === tempData[dataIndex].datasets
        )
          return state;

        return { ...state, sessionData: tempData };
      }
      return {
        ...state,
        sessionData: [...state.sessionData, graphDataPayload],
      };
    }
    case types.DELETE_GRAPH_SESSION: {
      const newState = state.sessionData.filter(
        (session) => session.sessionId !== deleteSessionId
      );

      return { ...state, sessionData: newState };
    }
    default:
      return state;
  }
};
