import * as types from "../types";
import { ActionCreator, Action } from "redux";
import { ITableData } from "../reducers/tableLogsReducer";

//ITable Actions
export interface ITableLogActions extends Action {
  type: types.SET_TABLE_DATA_LOG | types.SET_TABLE_HEADER_LOG;

  payload: ITableData[] | string[];
}

//ITable Action : Setting logs, caught in saga
const setTableLog: ActionCreator<ITableLogActions> = (
  payload: ITableData[]
) => ({
  type: types.SET_TABLE_DATA_LOG,
  payload: payload,
});
const setTableHeaderLog: ActionCreator<ITableLogActions> = (
  payload: string[]
) => ({
  type: types.SET_TABLE_HEADER_LOG,
  payload: payload,
});
export { setTableLog, setTableHeaderLog };
