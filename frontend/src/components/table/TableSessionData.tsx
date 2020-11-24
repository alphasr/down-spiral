import React, { Fragment, useEffect, useState } from 'react';
import { ButtonGroup, Button, Badge, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import {
  ITableData,
  ITableDataSingleton,
} from '../../store/reducers/tableLogsReducer';

interface IProps {
  sessionId: string;
}

const TableSessions: React.FC<IProps> = ({ sessionId }) => {
  const { sessionData } = useSelector((state: AppState) => state.tableLog);

  const [currentSession, setCurrentSession] = useState<ITableData>();
  const [currentSessionData, setCurrentSessionData] = useState<any[]>();
  const sessionIndex = (session: ITableData) =>
    session.sessionId === sessionId ? true : false;
  useEffect(() => {
    const sessionIndexNew = sessionData.findIndex(sessionIndex);
    setCurrentSession(sessionData[sessionIndexNew]);
    if (currentSession) getData(currentSession.data);
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
            (datum: ITableDataSingleton) =>
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

export default TableSessions;
