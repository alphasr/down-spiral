import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { spiralLogs } from "../../api";
import { useTable } from "react-table";

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

  const data = currentSession?.data
    ? React.useMemo(() => [currentSession?.data], [])
    : [];

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Label",
        accessor: "resultLabel", // accessor is the "key" in the data
      },
      {
        Header: "Value",
        accessor: "resultValue",
      },
    ],
    []
  );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data });

  return (
    <Fragment>
      {/* <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </Fragment>
  );
};

export default SimplePrinterSessionData;
