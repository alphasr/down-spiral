import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { spiralLogs } from "../../api";
import {
  ISimplePrinterLogActions,
  setSimplePrinterLog,
} from "../../store/actions/simplePrinterActions";
import { AppState } from "../../store/reducers";
import { ISimplePrinterPayload } from "../../store/reducers/simplePrinterReducer";

interface IProps {
  sessionId: string;
}

const SimplePrinterSessionData: React.FC<IProps> = ({ sessionId }) => {
  const { log_data } = useSelector((state: AppState) => state.simplePrinter);
  const simplePrinterLogDispatch = useDispatch<
    Dispatch<ISimplePrinterLogActions>
  >();

  const [currentSession, setCurrentSession] = useState<ISimplePrinterPayload>();
  const sessionIndex = (session: ISimplePrinterPayload) =>
    session.sessionId === sessionId ? true : false;

  useEffect(() => {
    const sessionIndexNew = log_data.findIndex(sessionIndex);
    setCurrentSession(log_data[sessionIndexNew]);

    if (currentSession) getData(currentSession.data);

    const handleSetPayload = (payload: string) => {
      // const parsedPayload: ITableData = JSON.parse(payload);
      const parsedPayload: any = JSON.parse(payload);

      // return tableLogDispatch(setTableLog(newPayload));
      return simplePrinterLogDispatch(setSimplePrinterLog(parsedPayload));
    };
    spiralLogs((payload: string) => handleSetPayload(payload));
  }, [sessionId]);

  const getData = (payload: any) => {
    let data: any[] = [];
    for (const key in payload) {
      data.push(<td key={key}>{payload[key].toString()}</td>);
    }

    return data.map((datum) => datum);
  };

  return (
    <Fragment>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <React.Fragment>
              <th>#</th>
              <th>value</th>

              <th>label</th>
            </React.Fragment>
          </tr>
        </thead>
        <tbody>
          {currentSession?.data?.map(
            (datum: any) =>
              datum.id && (
                <React.Fragment key={datum.id}>
                  <tr>{getData(datum)}</tr>
                </React.Fragment>
              )
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default SimplePrinterSessionData;
