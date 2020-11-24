import React, { Fragment, useState } from 'react';
import { ButtonGroup, Button, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import TableSessionData from './TableSessionData';

const TableSessions = () => {
  const { sessionData } = useSelector((state: AppState) => state.tableLog);
  const [currentSession, setCurrentSession] = useState('');

  const handleSetCurrentSesssion = (sessionId: string) => {
    return setCurrentSession(sessionId);
  };

  return (
    <Fragment>
      <div className="ml-5">
        <div>
          <h4>Available Sessions</h4>
        </div>
        <div className="row">
          {sessionData.map((session) => (
            <Button
              key={session.sessionId}
              variant="light"
              onClick={() => handleSetCurrentSesssion(session.sessionId)}
            >
              <span>
                <Badge
                  pill
                  variant="dark"
                  className="font-thin pl-3 pr-3 pb-2 pt-2"
                >
                  {session.sessionId}
                </Badge>
              </span>
            </Button>
          ))}
        </div>
        <TableSessionData sessionId={currentSession} />
      </div>
    </Fragment>
  );
};

export default TableSessions;
