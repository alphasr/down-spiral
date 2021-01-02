import * as types from '../types';

export interface ICombinedPrinterState {
  data: ICombinedPrinterPayload[];
}

export interface ICombinedPrinterPayload {
  sessionId: string;
  grid: number;
  combinedViewsPayload: { type: string; sessionId: string }[];
}

const initialCombinedPrinterState: ICombinedPrinterState = {
  data: [
    {
      sessionId: '0',
      grid: 2,
      combinedViewsPayload: [
        {
          type: '',
          sessionId: '',
        },
      ],
    },
  ],
};

export const combinedPrinterReducer = (
  state: ICombinedPrinterState = initialCombinedPrinterState,
  action: {
    type:
      | types.SET_COMBINED_PRINTER_LOG
      | types.DELETE_COMBINED_PRINTER_SESSION;
    payload: ICombinedPrinterPayload | string;
  }
): ICombinedPrinterState => {
  const { type, payload } = action;

  const addSessionPayload = payload as ICombinedPrinterPayload;
  const deleteSessionId = payload as string;

  switch (type) {
    case types.SET_COMBINED_PRINTER_LOG: {
      console.log('inside set simple printer reducer', JSON.stringify(payload));
      if (
        state.data.find(
          (session) => session.sessionId === addSessionPayload.sessionId
        )
      ) {
        const sessionIndex = (session: ICombinedPrinterPayload) =>
          session.sessionId === addSessionPayload?.sessionId;

        const tempData = state.data;
        const dataIndex = state.data.findIndex(sessionIndex);
        addSessionPayload?.combinedViewsPayload.forEach((datum) =>
          tempData[dataIndex].combinedViewsPayload.push(datum)
        );
        if (
          state.data[dataIndex].combinedViewsPayload ===
          tempData[dataIndex].combinedViewsPayload
        )
          return state;
        return { ...state, data: tempData };
      }
      return { ...state, data: [...state.data, addSessionPayload] };
    }
    case types.DELETE_COMBINED_PRINTER_SESSION: {
      const newState = state.data.filter(
        (session) => session.sessionId !== deleteSessionId
      );

      return { ...state, data: newState };
    }
    default:
      return state;
  }
};

// let configure_view = {
//   id: 'results_and_elapsed_time',
//   GRID: 2,
//   customViews: [
//     { type: 'TABLE', id: 'results' },
//     { type: 'GRAPH', id: 'elapsed_time' },
//   ],
// };
