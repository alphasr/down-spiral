import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tablePrinter } from "../../api";
import {
  ITableLogActions,
  setTableHeaderLog,
  setTableLog,
} from "../../store/actions/tableLogActions";
import { AppState } from "../../store/reducers";
import { ITableData } from "../../store/reducers/tablePrinterReducer";

interface IProps {
  sessionId: string;
}

const TableSessions: React.FC<IProps> = ({ sessionId }) => {
  const { sessionData } = useSelector((state: AppState) => state.tablePrinter);
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  const [currentSession, setCurrentSession] = useState<ITableData>();
  const sessionIndex = (session: ITableData) =>
    session.sessionId === sessionId ? true : false;

  useEffect(() => {
    const sessionIndexNew = sessionData.findIndex(sessionIndex);
    setCurrentSession(sessionData[sessionIndexNew]);

    if (currentSession) getData(currentSession.data);

    const handleSetPayload = (payload: string) => {
      // const parsedPayload: ITableData = JSON.parse(payload);
      const parsedPayload: any = JSON.parse(payload);

      // const newPayload: ITableData = parsedPayload;
      if (typeof parsedPayload[0] === "string") {
        return tableLogDispatch(setTableHeaderLog(parsedPayload));
      }

      // return tableLogDispatch(setTableLog(newPayload));
      return tableLogDispatch(setTableLog(parsedPayload));
    };
    tablePrinter((payload: string) => handleSetPayload(payload));
  }, [sessionId]);

  const getData = (payload: any) => {
    let data: any[] = [];
    for (const key in payload) {
      if (payload[key]) data.push(<td key={key}>{payload[key]}</td>);
    }

    const jsx = data.map((datum) => datum);
    return jsx ? <tr>{jsx}</tr> : null;
  };

  return (
    <Fragment>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {currentSession?.header?.map(
              (title: string) =>
                title && (
                  <React.Fragment key={title}>
                    <th>{title}</th>
                  </React.Fragment>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {currentSession?.data?.map(
            (datum: any) =>
              datum.i && (
                <React.Fragment key={datum.id}>{getData(datum)}</React.Fragment>
              )
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default TableSessions;
