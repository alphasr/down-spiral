import React, { Fragment, Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ITableLogActions,
  setTableHeaderLog,
  setTableLog,
} from '../store/actions/tableLogActions';
import { ITableData } from '../store/reducers/tablePrinterReducer';

import { simplePrinter } from '../api';
import TableSessions from '../components/table/TableSessions';
import {
  ISimplePrinterLogActions,
  setSimplePrinterLog,
} from '../store/actions/simplePrinterActions';
import { ISimplePrinterPayload } from '../store/reducers/simplePrinterReducer';
import { parse } from '@fortawesome/fontawesome-svg-core';
import SimplePrinterSessions from '../components/simplePrinter/SimplePrinterSession';

const SimplePrinter = () => {
  //   const { header, data } = useSelector((state: AppState) => state.tableLog);
  const simplePrinterDispatch = useDispatch<
    Dispatch<ISimplePrinterLogActions>
  >();

  // const getData = (payload: any) => {
  //   let data: any[] = [];
  //   for (const key in payload) {
  //     data.push(<td>{payload[key]}</td>);
  //   }

  //   return data.map((datum) => datum);
  // };

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      console.log('payload = ', payload);
      const parsedPayload: any = JSON.parse(payload);
      console.log('data after parsing', JSON.stringify(parsedPayload.data));
      if (parsedPayload.sessionId) {
        const payload: ISimplePrinterPayload = {
          sessionId: parsedPayload.sessionId,
          data: [
            {
              id: parsedPayload.data[0].id,
              resultLabel: parsedPayload.data[0].resultLabel,
              resultValue: parsedPayload.data[0].resultValue,
            },
          ],
        };

        console.log('data = ', JSON.stringify(payload));
        simplePrinterDispatch(setSimplePrinterLog(payload));
      }
      return null;
    };
    simplePrinter((payload: string) => handleSetPayload(payload));
  }, [simplePrinterDispatch]);

  return (
    <Fragment>
      <SimplePrinterSessions />
    </Fragment>
  );
};

export default SimplePrinter;
