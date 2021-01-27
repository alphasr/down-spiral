import * as types from '../types';
import { ActionCreator, Action } from 'redux';
import { ICustomPrinterPayload } from '../../pages/CustomPrinter';

//ITable Actions
export interface ICustomPrinterActions extends Action {
  type: types.SET_CUSTOM_PRINTER_LOG | types.DELETE_CUSTOM_PRINTER_LOG;

  payload: ICustomPrinterPayload | string;
}

//ITable Action : Setting logs, caught in saga
const setCustomPrinterLog: ActionCreator<ICustomPrinterActions> = (
  payload: ICustomPrinterPayload
) => ({
  type: types.SET_CUSTOM_PRINTER_LOG,
  payload: payload,
});
const deleteCustomPrinterSession: ActionCreator<ICustomPrinterActions> = (
  payload: string
) => ({
  type: types.DELETE_CUSTOM_PRINTER_LOG,
  payload: payload,
});

export { setCustomPrinterLog, deleteCustomPrinterSession };
