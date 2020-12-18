import * as types from "../types";
import { ActionCreator, Action } from "redux";
import { IGraphData } from "../reducers/graphReducer";

//ITable Actions
export interface IGraphLogActions extends Action {
  type: types.SET_GRAPH_LOGS | types.DELETE_GRAPH_SESSION;

  payload: IGraphData[] | string;
}

//ITable Action : Setting logs, caught in saga
const setGraphLog: ActionCreator<IGraphLogActions> = (
  payload: IGraphData[]
) => ({
  type: types.SET_GRAPH_LOGS,
  payload: payload,
});

//ITable Action : Setting logs, caught in saga
const deleteGraphSession: ActionCreator<IGraphLogActions> = (
  payload: string
) => ({
  type: types.DELETE_GRAPH_SESSION,
  payload: payload,
});
export { setGraphLog, deleteGraphSession };
