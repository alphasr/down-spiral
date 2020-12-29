import * as types from "../types";
import { ActionCreator, Action } from "redux";
import { ISimplePrinterPayload } from "../reducers/simplePrinterReducer";

//ITable Actions
export interface ISimplePrinterLogActions extends Action {
  type: types.SET_SIMPLE_PRINTER_LOG | types.DELETE_SIMPLE_PRINTER_SESSION;

  payload: ISimplePrinterPayload[] | string;
}

//ITable Action : Setting logs, caught in saga
const setSimplePrinterLog: ActionCreator<ISimplePrinterLogActions> = (
  payload: ISimplePrinterPayload[]
) => ({
  type: types.SET_SIMPLE_PRINTER_LOG,
  payload: payload,
});

//ITable Action : Setting logs, caught in saga
const deleteSimplePrinterSession: ActionCreator<ISimplePrinterLogActions> = (
  payload: string
) => ({
  type: types.DELETE_SIMPLE_PRINTER_SESSION,
  payload: payload,
});

export { setSimplePrinterLog, deleteSimplePrinterSession };
