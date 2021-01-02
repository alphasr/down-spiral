import React, { Fragment, Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { combinedPrinter } from '../api';
import {
  ICombinedPrinterActions,
  setCombinedPrinter,
} from '../store/actions/combinedPrinterActions';
import { ICombinedPrinterPayload } from '../store/reducers/combinedPrinterReducer';
import CombinedPrinterSessions from '../components/combinedPrinter/CombinedPrinterSessions';
const CombinedPrinterLog = () => {
  const combinedPrinterDispatch = useDispatch<
    Dispatch<ICombinedPrinterActions>
  >();

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);
      console.log('inside handleSetPayload');

      const payloadNew: ICombinedPrinterPayload = {
        sessionId: parsedPayload.sessionId,
        grid: parsedPayload.grid,
        combinedViewsPayload: parsedPayload.views,
      };

      return combinedPrinterDispatch(setCombinedPrinter(payloadNew));

      // return null;
    };
    combinedPrinter((payload: string) => handleSetPayload(payload));
  }, [combinedPrinterDispatch]);

  return (
    <Fragment>
      <CombinedPrinterSessions />
    </Fragment>
  );
};

export default CombinedPrinterLog;
