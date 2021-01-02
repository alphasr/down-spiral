import * as types from '../types';
import { ActionCreator, Action } from 'redux';
import { ICombinedPrinterPayload } from '../reducers/combinedPrinterReducer';

//ICombinedPrinter Actions
export interface ICombinedPrinterActions extends Action {
  type: types.SET_COMBINED_PRINTER_LOG | types.DELETE_COMBINED_PRINTER_SESSION;
  payload: ICombinedPrinterPayload | string;
}

//ICombinedPrinter Action
const setCombinedPrinter: ActionCreator<ICombinedPrinterActions> = (
  payload: ICombinedPrinterPayload
) => ({
  type: types.SET_COMBINED_PRINTER_LOG,
  payload: payload,
});

//ICombinedPrinter Action
const deleteCombinedPrinterSession: ActionCreator<ICombinedPrinterActions> = (
  payload: string
) => ({
  type: types.DELETE_COMBINED_PRINTER_SESSION,
  payload: payload,
});
export { setCombinedPrinter, deleteCombinedPrinterSession };
