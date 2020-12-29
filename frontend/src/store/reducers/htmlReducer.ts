//{"sessionId":"results","html":"<h1>My First Heading</h1><p>My first paragraph.</p><p>My second paragraph.</p>"}
import * as types from '../types';

export interface IHtmlPrinterState {
  data: IHtmlPrinterPayload[];
}

export interface IHtmlPrinterPayload {
  sessionId: string;
  htmlPayload: string;
}

export const initialGraphLogsState: IHtmlPrinterState = {
  data: [
    {
      sessionId: '12123',
      htmlPayload: `<div class="none"> <h1 style="color: red;" > something is crazy </h1> </div>`,
    },
  ],
};

export const htmlLogReducer = (
  state: IHtmlPrinterState = initialGraphLogsState,
  action: {
    type: types.SET_HTML_PRINTER_LOG | types.DELETE_HTML_PRINTER_SESSION;
    payload: IHtmlPrinterPayload | string;
  }
): IHtmlPrinterState => {
  const { type, payload } = action;

  const htmlDataPayload = payload as IHtmlPrinterPayload;
  const deleteSessionId = payload as string;

  switch (type) {
    case types.SET_HTML_PRINTER_LOG: {
      console.log('payload in reducer = ', JSON.stringify(payload));
      if (
        state.data.find(
          (session) => session.sessionId === htmlDataPayload?.sessionId
        )
      ) {
        console.log('found session id ');
        const sessionIndex = (session: IHtmlPrinterPayload) =>
          session.sessionId === htmlDataPayload?.sessionId;
        const tempData = state.data;
        const dataIndex = state.data.findIndex(sessionIndex);

        if (tempData[dataIndex].htmlPayload !== htmlDataPayload?.htmlPayload) {
          console.log('labels and data is changed');

          tempData[dataIndex].htmlPayload =
            tempData[dataIndex].htmlPayload + htmlDataPayload?.htmlPayload;
        }

        if (
          state.data[dataIndex].htmlPayload === tempData[dataIndex].htmlPayload
        )
          return state;

        return { ...state, data: tempData };
      }
      return {
        ...state,
        data: [...state.data, htmlDataPayload],
      };
    }
    case types.DELETE_HTML_PRINTER_SESSION: {
      const newState = state.data.filter(
        (session) => session.sessionId !== deleteSessionId
      );

      return { ...state, data: newState };
    }
    default:
      return state;
  }
};
