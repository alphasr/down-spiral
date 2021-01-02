import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, Fragment, useEffect, useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../store/reducers';
import { IGraphData } from '../../store/reducers/graphPrinterReducer';
import {
  IGraphLogActions,
  deleteGraphSession,
  setGraphLog,
} from '../../store/actions/graphLogActions';
import { spiralGraphs } from '../../api';
import GraphSessionData from './GraphSessionData';

const GraphSession = () => {
  const { sessionData } = useSelector((state: AppState) => state.graphPrinter);
  const [graphOneSession, setGraphOneSession] = useState<string>(); // 1 graph, 2 graph, 3 graphs
  const graphLogDispatch = useDispatch<Dispatch<IGraphLogActions>>();
  const [graphLayout, setGraphLayout] = useState<string>('1_graph'); // 1 graph, 2 graph, 3 graphs
  const [twoGraphSession, setTwoGraphSession] = useState({
    graphOneSessionId: '',
    graphTwoSessionId: '',
  }); // 1 graph, 2 graph, 3 graphs
  const [threeGraphSession, setThreeGraphSession] = useState({
    graphOneSessionId: '',
    graphTwoSessionId: '',
    graphThreeSessionId: '',
  }); // 1 graph, 2 graph, 3 graphs

  const handleSetGraphLayout = (payload: string) => {
    return setGraphLayout(payload);
  };

  const handleSetGraphOneSession = (sessionId: string) => {
    return setGraphOneSession(sessionId);
  };
  const handleSetGraphTwoSessionId = (sessionId: string, graph: number) => {
    console.log('inside 2nd graph', sessionId, graph);
    if (graph === 1) {
      console.log('inside graph 1');
      return setTwoGraphSession({
        ...twoGraphSession,
        graphOneSessionId: sessionId,
      });
    }
    if (graph === 2)
      return setTwoGraphSession({
        ...twoGraphSession,
        graphTwoSessionId: sessionId,
      });
  };
  const handleSetGraphThreeSessionId = (sessionId: string, graph: number) => {
    if (graph === 1)
      return setThreeGraphSession({
        ...threeGraphSession,
        graphOneSessionId: sessionId,
      });
    if (graph === 2)
      return setThreeGraphSession({
        ...threeGraphSession,
        graphTwoSessionId: sessionId,
      });
    if (graph === 3)
      return setThreeGraphSession({
        ...threeGraphSession,
        graphThreeSessionId: sessionId,
      });
  };

  const handleDeleteSession = (sessionId: string) => {
    return (
      graphLogDispatch(deleteGraphSession(sessionId)),
      setGraphOneSession(undefined)
    );
  };

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
      <div className="ml-5">
        <div>
          <h4>Available Graph Sessions</h4>
        </div>
        <p>Select Layout</p>
        <div
          className="btn-group center m-2 new"
          role="group"
          aria-label="Basic outlined example"
        >
          <Button
            type="button"
            onClick={() => handleSetGraphLayout('1_graph')}
            className={`btn btn-outline-primary ${
              graphLayout === '1_graph' ? 'active' : ''
            }`}
          >
            1 Graph
          </Button>
          <Button
            type="button"
            onClick={() => handleSetGraphLayout('2_graph')}
            className={`btn btn-outline-primary ${
              graphLayout === '2_graph' ? 'active' : ''
            }`}
          >
            2 Graphs
          </Button>
          <Button
            type="button"
            onClick={() => handleSetGraphLayout('3_graph')}
            className={`btn btn-outline-primary ${
              graphLayout === '3_graph' ? 'active' : ''
            }`}
          >
            3 Graphs
          </Button>
        </div>

        {graphLayout === '1_graph' && (
          <div>
            <div className="row ml-2 scroll-y-allow">
              {sessionData.map((session) => (
                <React.Fragment>
                  <div
                    style={{
                      border: '1px solid #2e2e2e',
                      borderRadius: 5,
                      padding: 2,
                      margin: 2,
                    }}
                  >
                    <Button
                      key={session.sessionId}
                      variant="light"
                      onClick={() =>
                        handleSetGraphOneSession(session.sessionId)
                      }
                    >
                      <span>
                        <Badge
                          pill
                          variant="dark"
                          className="font-thin pl-3 pr-3 pb-2 pt-2"
                        >
                          {session.sessionId}
                          <span style={{ marginRight: '20px' }}></span>
                        </Badge>
                      </span>
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleDeleteSession(session.sessionId)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            {graphOneSession ? (
              <GraphSessionData sessionId={graphOneSession} />
            ) : (
              ''
            )}
          </div>
        )}
        {graphLayout === '2_graph' && (
          <React.Fragment>
            <div className="row">
              <div className="col-lg-6">
                <div className="row ml-2 scroll-y-allow">
                  {sessionData.map((session) => (
                    <React.Fragment>
                      <div
                        style={{
                          border: '1px solid #2e2e2e',
                          borderRadius: 5,
                          padding: 2,
                          margin: 2,
                        }}
                      >
                        <Button
                          key={session.sessionId}
                          variant="light"
                          onClick={() =>
                            handleSetGraphTwoSessionId(session.sessionId, 1)
                          }
                        >
                          <span>
                            <Badge
                              pill
                              variant="dark"
                              className="font-thin pl-3 pr-3 pb-2 pt-2"
                            >
                              {session.sessionId}
                              <span style={{ marginRight: '20px' }}></span>
                            </Badge>
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteSession(session.sessionId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {twoGraphSession.graphOneSessionId && (
                  <React.Fragment>
                    <GraphSessionData
                      sessionId={twoGraphSession.graphOneSessionId}
                    />
                  </React.Fragment>
                )}
              </div>

              <div className="col-lg-6">
                <div className="row ml-2 scroll-y-allow">
                  {sessionData.map((session) => (
                    <React.Fragment>
                      <div
                        style={{
                          border: '1px solid #2e2e2e',
                          borderRadius: 5,
                          padding: 2,
                          margin: 2,
                        }}
                      >
                        <Button
                          key={session.sessionId}
                          variant="light"
                          onClick={() =>
                            handleSetGraphTwoSessionId(session.sessionId, 2)
                          }
                        >
                          <span>
                            <Badge
                              pill
                              variant="dark"
                              className="font-thin pl-3 pr-3 pb-2 pt-2"
                            >
                              {session.sessionId}
                              <span style={{ marginRight: '20px' }}></span>
                            </Badge>
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteSession(session.sessionId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {twoGraphSession.graphTwoSessionId && (
                  <React.Fragment>
                    <GraphSessionData
                      sessionId={twoGraphSession.graphTwoSessionId}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
        {graphLayout === '3_graph' && (
          <React.Fragment>
            <div className="row">
              <div className="col-lg-4">
                <div className="row ml-2 scroll-y-allow">
                  {sessionData.map((session) => (
                    <React.Fragment>
                      <div
                        style={{
                          border: '1px solid #2e2e2e',
                          borderRadius: 5,
                          padding: 2,
                          margin: 2,
                        }}
                      >
                        <Button
                          key={session.sessionId}
                          variant="light"
                          onClick={() =>
                            handleSetGraphThreeSessionId(session.sessionId, 1)
                          }
                        >
                          <span>
                            <Badge
                              pill
                              variant="dark"
                              className="font-thin pl-3 pr-3 pb-2 pt-2"
                            >
                              {session.sessionId}
                              <span style={{ marginRight: '20px' }}></span>
                            </Badge>
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteSession(session.sessionId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {threeGraphSession.graphOneSessionId && (
                  <React.Fragment>
                    <GraphSessionData
                      sessionId={threeGraphSession.graphOneSessionId}
                    />
                  </React.Fragment>
                )}
              </div>

              <div className="col-lg-4">
                <div className="row ml-2 scroll-y-allow">
                  {sessionData.map((session) => (
                    <React.Fragment>
                      <div
                        style={{
                          border: '1px solid #2e2e2e',
                          borderRadius: 5,
                          padding: 2,
                          margin: 2,
                        }}
                      >
                        <Button
                          key={session.sessionId}
                          variant="light"
                          onClick={() =>
                            handleSetGraphThreeSessionId(session.sessionId, 2)
                          }
                        >
                          <span>
                            <Badge
                              pill
                              variant="dark"
                              className="font-thin pl-3 pr-3 pb-2 pt-2"
                            >
                              {session.sessionId}
                              <span style={{ marginRight: '20px' }}></span>
                            </Badge>
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteSession(session.sessionId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {threeGraphSession.graphTwoSessionId && (
                  <React.Fragment>
                    <GraphSessionData
                      sessionId={threeGraphSession.graphTwoSessionId}
                    />
                  </React.Fragment>
                )}
              </div>
              <div className="col-lg-4">
                <div className="row ml-2 scroll-y-allow">
                  {sessionData.map((session) => (
                    <React.Fragment>
                      <div
                        style={{
                          border: '1px solid #2e2e2e',
                          borderRadius: 5,
                          padding: 2,
                          margin: 2,
                        }}
                      >
                        <Button
                          key={session.sessionId}
                          variant="light"
                          onClick={() =>
                            handleSetGraphThreeSessionId(session.sessionId, 3)
                          }
                        >
                          <span>
                            <Badge
                              pill
                              variant="dark"
                              className="font-thin pl-3 pr-3 pb-2 pt-2"
                            >
                              {session.sessionId}
                              <span style={{ marginRight: '20px' }}></span>
                            </Badge>
                          </span>
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => handleDeleteSession(session.sessionId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {threeGraphSession.graphThreeSessionId && (
                  <React.Fragment>
                    <GraphSessionData
                      sessionId={threeGraphSession.graphThreeSessionId}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        {sessionData.length === 0 && 'No available sessions'}
      </div>
    </Fragment>
  );
};

export default GraphSession;
