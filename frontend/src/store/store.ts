import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
// import { initializeApp } from 'firebase';

const initialState = {};

export function store() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middleware.push(logger);
  }
  return {
    ...createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
}

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

// const theStore = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
// useEffect(() => {
//   sagaMiddleware.run;
// });
