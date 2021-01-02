import React, { Dispatch, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GraphSession from '../components/graph/GraphSession';
import {
  IGraphLogActions,
  setGraphLog,
} from '../store/actions/graphLogActions';
import { spiralGraphs } from '../api';
import { IGraphData } from '../store/reducers/graphPrinterReducer';

const Graph = () => {
  const graphLogDispatch = useDispatch<Dispatch<IGraphLogActions>>();

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      console.log('setting graph data');
      const parsedPayload: any = JSON.parse(payload);
      if (
        parsedPayload.labels &&
        parsedPayload.datasets &&
        parsedPayload.sessionId
      ) {
        const data: IGraphData = {
          type: parsedPayload.type,
          labels: parsedPayload.labels,
          datasets: parsedPayload.datasets,
          sessionId: parsedPayload.sessionId,
        };

        return graphLogDispatch(setGraphLog(data));
      }

      return null;
    };
    spiralGraphs((payload: string) => handleSetPayload(payload)); //working
  }, [graphLogDispatch]);

  return (
    <Fragment>
      <GraphSession />
    </Fragment>
  );
};

export default Graph;
