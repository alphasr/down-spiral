import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  ITableLogActions,
  setTableLog,
} from "../store/actions/tableLogActions";
import { AppState } from "../store/reducers";
import {
  initialTableLogsState,
  ITableData,
  ITableLogsState,
} from "../store/reducers/tableLogsReducer";

import { v4 as uuidv4 } from "uuid";
import { spiralLogs } from "../api";

const TableLog = () => {
  const { header, data } = useSelector((state: AppState) => state.tableLog);
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  //   const handleModalClose = () => {
  //     tableLogDispatch(setTableLog());
  //   };

  const handleSetPayload = () => {
    //console.log("LOL");
    const uid = uuidv4();
    const newPayload: ITableData = {
      id: uid,
      timestamp: new Date(),
      hostName: "logger",
      appName: "down-spiral",
      priority: "started",
    };
    // const parsedPayload: ITableData = JSON.parse(payloadNew);
    //  console.log("Inside set payload :", payloadNew.msg);
    return tableLogDispatch(setTableLog(newPayload));
  };
  useEffect(() => {
    handleSetPayload();
  }, []);

  return (
    <Fragment>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {header?.map((title: string) => (
                <React.Fragment key={title}>
                  <th>{title}</th>
                </React.Fragment>
              ))}
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
