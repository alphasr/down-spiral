import * as types from "../types";
import { ActionCreator, Action } from "redux";
import { IGraphData } from "../reducers/graphReducer";

//ITable Actions
export interface IGraphLogActions extends Action {
  type: types.SET_GRAPH_LOGS;

  payload: IGraphData[];
}

//ITable Action : Setting logs, caught in saga
const setGraphLog: ActionCreator<IGraphLogActions> = (
  payload: IGraphData[]
) => ({
  type: types.SET_GRAPH_LOGS,
  payload: payload,
});
export { setGraphLog };
