import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { spiralLogs } from "../../api";
import {
  IGraphLogActions,
  setGraphLog,
} from "../../store/actions/graphLogActions";
import { AppState } from "../../store/reducers";
import { IGraphData } from "../../store/reducers/graphReducer";

interface IProps {
  sessionId: string;
}

const GraphSession: React.FC<IProps> = ({ sessionId }) => {
  const [currentSession, setCurrentSession] = useState<IGraphData>();

  let barState = {
    type: "bar",
    data: {
      labels: currentSession?.labels,
      datasets: [
        {
          label: currentSession?.datasets.label,
          data: currentSession?.datasets.data,
          backgroundColor: "rgba(255,0,0,0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              maxRotation: 90,
              minRotation: 80,
            },
            gridLines: {
              offsetGridLines: true, // à rajouter
            },
          },
          {
            position: "top",
            ticks: {
              maxRotation: 90,
              minRotation: 80,
            },
            gridLines: {
              offsetGridLines: true, // et matcher pareil ici
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  const { sessionData } = useSelector((state: AppState) => state.graphLog);
  const graphLogDispatch = useDispatch<Dispatch<IGraphLogActions>>();

  const sessionIndex = (session: IGraphData) =>
    session.sessionId === sessionId ? true : false;

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      const parsedPayload: any = JSON.parse(payload);
      if (
        parsedPayload.labels &&
        parsedPayload.datasets &&
        parsedPayload.sessionId
      ) {
        const data: IGraphData = {
          labels: parsedPayload.labels,
          datasets: parsedPayload.datasets,
          sessionId: parsedPayload.sessionId,
        };

        return graphLogDispatch(setGraphLog(data));
      }

      return null;
    };
    spiralLogs((payload: string) => handleSetPayload(payload)); //working

    const sessionIndexNew = sessionData.findIndex(sessionIndex);
    console.log("log is = ", JSON.stringify(sessionData[sessionIndexNew])); //working

    const payload: IGraphData = sessionData[sessionIndexNew]; // not-working
    setCurrentSession(payload);

    console.log("current session = ");
  }, [graphLogDispatch, sessionId]);

  return (
    <Fragment>
      <Bar data={barState.data} options={barState.options} />;
    </Fragment>
  );
};

export default GraphSession;
