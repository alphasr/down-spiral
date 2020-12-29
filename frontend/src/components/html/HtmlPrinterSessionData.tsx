import React, { Dispatch, Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { htmlPrinter } from '../../api';
import {
  IHtmlPrinterLogActions,
  setHtmlPrinterLog,
} from '../../store/actions/htmlPrinterActions';
import { AppState } from '../../store/reducers';
import { IHtmlPrinterPayload } from '../../store/reducers/htmlReducer';

interface IProps {
  sessionId: string;
}
const HtmlPrinterData: React.FC<IProps> = ({ sessionId }) => {
  const { data } = useSelector((state: AppState) => state.htmlPrinter);
  const htmlPrinterLogDispatch = useDispatch<
    Dispatch<IHtmlPrinterLogActions>
  >();

  const [currentSession, setCurrentSession] = useState<IHtmlPrinterPayload>();

  useEffect(() => {
    const sessionIndex = (session: IHtmlPrinterPayload) =>
      session.sessionId === sessionId ? true : false;

    const sessionIndexNew = data.findIndex(sessionIndex);

    setCurrentSession(data[sessionIndexNew]);

    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);
      return htmlPrinterLogDispatch(setHtmlPrinterLog(parsedPayload));
    };

    htmlPrinter((payload: string) => handleSetPayload(payload));
  }, [sessionId, data, htmlPrinterLogDispatch]);

  return (
    <Fragment>
      <div
        dangerouslySetInnerHTML={{
          __html: currentSession
            ? currentSession.htmlPayload
            : `<div> no html data found </div>`,
        }}
      ></div>
    </Fragment>
  );
};

export default HtmlPrinterData;
