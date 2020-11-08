import * as types from "../types";
import { ActionCreator, Action } from "redux";
import { ITableData } from "../reducers/tableLogsReducer";

//ITable Actions
export interface ITableLogActions extends Action {
  type: types.SET_TABLE_LOG;

  payload: ITableData;
}

//ITable Action : Setting logs, caught in saga
const setTableLog: ActionCreator<ITableLogActions> = (payload: ITableData) => ({
  type: types.SET_TABLE_LOG,
  payload: payload,
});

export { setTableLog };
