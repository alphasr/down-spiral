import React, { Fragment, Dispatch, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  ITableLogActions,
  setTableHeaderLog,
  setTableLog,
} from '../store/actions/tableLogActions';
import { AppState } from '../store/reducers';
import { ITableData } from '../store/reducers/tableLogsReducer';

import { spiralLogs } from '../api';
import Menu from '../components/table/TableMenu';
import TableSessions from '../components/table/TableSessions';

const TableLog = () => {
  //   const { header, data } = useSelector((state: AppState) => state.tableLog);
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);

      if (typeof parsedPayload[0] === 'string') {
        return tableLogDispatch(setTableHeaderLog(parsedPayload));
      }

      return tableLogDispatch(setTableLog(parsedPayload));
    };
    spiralLogs((payload: string) => handleSetPayload(payload));
  }, [tableLogDispatch]);

  return (
    <Fragment>
      <Menu></Menu>
      <TableSessions />
    </Fragment>
  );
};

export default TableLog;
