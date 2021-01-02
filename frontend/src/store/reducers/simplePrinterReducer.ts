import * as types from '../types';

export interface ISimplePrinter {
  log_data: ISimplePrinterPayload[];
}

export interface ISimplePrinterPayload {
  sessionId: string;
  data: {
    id: string;
    resultLabel: string;
    resultValue: string;
  }[];
}

const initialSimplePrinterState: ISimplePrinter = {
  log_data: [
    {
      sessionId: '0',
      data: [
        { id: '1', resultLabel: 'adfad', resultValue: '' },
        { id: '2', resultLabel: 'adfas', resultValue: 'asdfasdfdsaf' },
        { id: '3', resultLabel: 'adf', resultValue: 'asdfasdfasdfafds' },
      ],
    },
  ],
};

export const simplePrinterReducer = (
  state: ISimplePrinter = initialSimplePrinterState,
  action: {
    type: types.SET_SIMPLE_PRINTER_LOG | types.DELETE_SIMPLE_PRINTER_SESSION;
    payload: ISimplePrinterPayload | string;
  }
): ISimplePrinter => {
  const { type, payload } = action;

  const addSessionPayload = payload as ISimplePrinterPayload;
  const deleteSessionId = payload as string;

  switch (type) {
    case types.SET_SIMPLE_PRINTER_LOG: {
      console.log('inside set simple printer reducer', JSON.stringify(payload));
      if (
        state.log_data.find(
          (session) => session.sessionId === addSessionPayload.sessionId
        )
      ) {
        const sessionIndex = (session: ISimplePrinterPayload) =>
          session.sessionId === addSessionPayload?.sessionId;

        const tempData = state.log_data;
        const dataIndex = state.log_data.findIndex(sessionIndex);
        addSessionPayload?.data.forEach((datum) =>
          tempData[dataIndex].data.push(datum)
        );
        if (state.log_data[dataIndex].data === tempData[dataIndex].data)
          return state;
        return { ...state, log_data: tempData };
      }
      return { ...state, log_data: [...state.log_data, addSessionPayload] };
    }
    case types.DELETE_SIMPLE_PRINTER_SESSION: {
      const newState = state.log_data.filter(
        (session) => session.sessionId !== deleteSessionId
      );

      return { ...state, log_data: newState };
    }
    default:
      return state;
  }
};
