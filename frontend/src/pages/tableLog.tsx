import React, { Fragment, Dispatch, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  ITableLogActions,
  setTableHeaderLog,
  setTableLog,
} from "../store/actions/tableLogActions";
import { AppState } from "../store/reducers";
import { ITableData } from "../store/reducers/tableLogsReducer";

import { spiralLogs } from "../api";

const TableLog = () => {
  const { header, data } = useSelector((state: AppState) => state.tableLog);
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);

      if (typeof parsedPayload[0] === "string") {
        return tableLogDispatch(setTableHeaderLog(parsedPayload));
      }

      return tableLogDispatch(setTableLog(parsedPayload));
    };
    spiralLogs((payload: string) => handleSetPayload(payload));
  }, [tableLogDispatch]);

  return (
    <Fragment>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {header?.map(
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
            {data?.map(
              (datum: ITableData) =>
                datum.id && (
                  <React.Fragment key={datum.id}>
                    <tr>
                      <td>{datum.id}</td>
                      <td>{datum.timestamp?.toString()}</td>
                      <td>{datum.hostName}</td>
                      <td>{datum.appName}</td>
                      <td>{datum.priority}</td>
                    </tr>
                  </React.Fragment>
                )
            )}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default TableLog;
