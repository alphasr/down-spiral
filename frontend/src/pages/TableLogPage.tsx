import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ITableLogActions,
  setTableHeaderLog,
  setTableLog,
} from "../store/actions/tableLogActions";
import { ITableData } from "../store/reducers/tableLogsReducer";

import { spiralLogs } from "../api";
import TableSessions from "../components/table/TableSessions";

const TableLog = () => {
  //   const { header, data } = useSelector((state: AppState) => state.tableLog);
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  // const getData = (payload: any) => {
  //   let data: any[] = [];
  //   for (const key in payload) {
  //     data.push(<td>{payload[key]}</td>);
  //   }

  //   return data.map((datum) => datum);
  // };

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);
      if (
        parsedPayload.header &&
        parsedPayload.data &&
        parsedPayload.sessionId
      ) {
        if (typeof parsedPayload[0] === "string") {
          const data: string[] = parsedPayload.header;
          return tableLogDispatch(setTableHeaderLog(data));
        }
        const data: ITableData = {
          sessionId: parsedPayload.sessionId,
          data: parsedPayload.data,
          header: parsedPayload.header,
        };

        return tableLogDispatch(setTableLog(data));
      }
      return null;
    };
    spiralLogs((payload: string) => handleSetPayload(payload));
  }, [tableLogDispatch]);

  return (
    <Fragment>
      <TableSessions />
    </Fragment>
  );
};

export default TableLog;
