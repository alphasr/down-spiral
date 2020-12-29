import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { htmlPrinter } from "../api";
import HtmlPrinterSessions from "../components/html/HtmlPrinterSession";
import {
  IHtmlPrinterLogActions,
  setHtmlPrinterLog,
} from "../store/actions/htmlPrinterActions";
import { IHtmlPrinterPayload } from "../store/reducers/htmlReducer";

const HtmlPrinter = () => {
  //   const { header, data } = useSelector((state: AppState) => state.tableLog);
  const htmlPrinterDispatch = useDispatch<Dispatch<IHtmlPrinterLogActions>>();

  // const getData = (payload: any) => {
  //   let data: any[] = [];
  //   for (const key in payload) {
  //     data.push(<td>{payload[key]}</td>);
  //   }

  //   return data.map((datum) => datum);
  // };

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      console.log("payload = ", payload);
      const parsedPayload: any = JSON.parse(payload);
      console.log("data after parsing", JSON.stringify(parsedPayload.data));
      if (parsedPayload.sessionId) {
        const payload: IHtmlPrinterPayload = {
          sessionId: parsedPayload.sessionId,
          htmlPayload: parsedPayload.html,
        };

        console.log("data = ", JSON.stringify(payload));
        htmlPrinterDispatch(setHtmlPrinterLog(payload));
      }
      return null;
    };
    htmlPrinter((payload: string) => handleSetPayload(payload));
  }, [htmlPrinterDispatch]);
  return (
    <Fragment>
      <HtmlPrinterSessions />
    </Fragment>
  );
};

export default HtmlPrinter;
