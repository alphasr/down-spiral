import {
  ICustomPrinterPayload,
  ICustomPrinterState,
} from '../../pages/CustomPrinter';
import { ICustomPrinterActions } from '../actions/customPrinterActions';
import * as types from '../types';

const initialCustomPrinterState: ICustomPrinterState = {
  sessionData: [],
};

//customPrinterReducer to store the state of custom printer
export const customPrinterReducer = (
  state: ICustomPrinterState = initialCustomPrinterState,
  action: ICustomPrinterActions
): ICustomPrinterState => {
  const { type, payload } = action;

  const sessionPayload = payload as ICustomPrinterPayload;
  const deleteSessionPayload = payload as string;

  // const { sessionId, data, header } = tableData;
  switch (type) {
    case 'SET_CUSTOM_PRINTER_LOG': {
      console.log(
        'payload in Custom Reducer = ',
        JSON.stringify(sessionPayload)
      );

      let tempState = state.sessionData;

      if (
        state.sessionData.find(
          (session) => session.sessionId === sessionPayload.sessionId
        )
      ) {
        console.log('found session id');

        const sessionIndex = (session: ICustomPrinterPayload) =>
          session.sessionId === sessionPayload?.sessionId;
        const dataIndex = state.sessionData.findIndex(sessionIndex);

        const newSession: ICustomPrinterPayload = tempState[dataIndex];

        //adding row to row []
        sessionPayload.data?.forEach((data) => newSession.data.push(data));
        tempState[dataIndex] = newSession;
        console.log('new state = ', JSON.stringify(tempState[dataIndex]));
        return { ...state, sessionData: tempState };
      } else {
        const newSession: ICustomPrinterPayload = {
          sessionId: sessionPayload.sessionId,
          data: sessionPayload.data,
        };
        tempState.push(newSession);
        return { ...state, sessionData: tempState };
      }
    }
    case 'DELETE_CUSTOM_PRINTER_LOG': {
      const newState = state.sessionData.filter(
        (session) => session.sessionId !== deleteSessionPayload
      );

      return { ...state, sessionData: newState };
    }
    default:
      return state;
  }
};
