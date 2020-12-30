import React, { Dispatch, Fragment, useEffect, useState } from "react";
import {
  Bar,
  Bubble,
  Doughnut,
  Line,
  Polar,
  Radar,
  Scatter,
} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { IGraphLogActions } from "../../store/actions/graphLogActions";
import { AppState } from "../../store/reducers";
import { IGraphData } from "../../store/reducers/graphReducer";
var randomColor = require("randomcolor");

interface IProps {
  sessionId: string;
}

const GraphSession: React.FC<IProps> = ({ sessionId }) => {
  const [currentSession, setCurrentSession] = useState<IGraphData>();

  useEffect(() => {
    if (sessionId === undefined || sessionId === null)
      setCurrentSession(undefined);
  }, [sessionId]);

  let barState = {
    type: currentSession?.type ? currentSession.type : "bar",
    data: {
      labels: currentSession?.labels,
      datasets: [
        {
          label: currentSession?.datasets.label,
          data: currentSession?.datasets.data,
          backgroundColor: randomColor({
            count: currentSession?.datasets.data
              ? currentSession?.datasets.data.length
              : 1,
          }),
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
              offsetGridLines: true, //
            },
          },
          {
            position: "top",
            ticks: {
              maxRotation: 90,
              minRotation: 80,
            },
            gridLines: {
              offsetGridLines: true, //
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
    const sessionIndexNew = sessionData.findIndex(sessionIndex);
    console.log("log is = ", JSON.stringify(sessionData[sessionIndexNew])); //working

    const payload: IGraphData = sessionData[sessionIndexNew]; // not-working
    setCurrentSession(payload);

    console.log("current session = ");
  }, [graphLogDispatch, sessionId]);

  return (
    <Fragment>
      {/* <div className="row">
        {barState.type === "bar" && (
          <div className="col-md-6">
            <Bar data={barState.data} options={barState.options} />
          </div>
        )}
        {barState.type === "bar" && (
          <div className="col-md-6">
            <Bar data={barState.data} options={barState.options} />
          </div>
        )}
      </div> */}
      {barState.type === "bar" && (
        <Bar data={barState.data} options={barState.options} />
      )}
      {barState.type === "line" && (
        <Line data={barState.data} options={barState.options} />
      )}
      {barState.type === "radar" && (
        <Radar data={barState.data} options={barState.options} />
      )}
      {barState.type === "doughnut" && (
        <Doughnut data={barState.data} options={barState.options} />
      )}
      {barState.type === "polarArea" && (
        <Polar data={barState.data} options={barState.options} />
      )}
      {barState.type === "bubble" && (
        <Bubble data={barState.data} options={barState.options} />
      )}
      {barState.type === "scatter" && (
        <Scatter data={barState.data} options={barState.options} />
      )}
    </Fragment>
  );
};

export default GraphSession;
