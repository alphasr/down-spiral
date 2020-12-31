import * as types from '../types';
import { ActionCreator, Action } from 'redux';
import { IHtmlPrinterPayload } from '../reducers/htmlPrinterReducer';

//ITable Actions
export interface IHtmlPrinterLogActions extends Action {
  type: types.SET_HTML_PRINTER_LOG | types.DELETE_HTML_PRINTER_SESSION;

  payload: IHtmlPrinterPayload | string;
}

//ITable Action : Setting logs, caught in saga
const setHtmlPrinterLog: ActionCreator<IHtmlPrinterLogActions> = (
  payload: IHtmlPrinterPayload
) => ({
  type: types.SET_HTML_PRINTER_LOG,
  payload: payload,
});

//ITable Action : Setting logs, caught in saga
const deleteHtmlPrinterSession: ActionCreator<IHtmlPrinterLogActions> = (
  payload: string
) => ({
  type: types.DELETE_HTML_PRINTER_SESSION,
  payload: payload,
});

export { setHtmlPrinterLog, deleteHtmlPrinterSession };
