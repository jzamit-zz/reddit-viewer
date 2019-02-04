import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ duration: true, timestamp: true });
const composeEnhancers = composeWithDevTools({});
const middlewares = [sagaMiddleware, loggerMiddleware];

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(...middlewares)
)(createStore)(reducers);
sagaMiddleware.run(rootSaga);

export default class Root extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware}>
        <App />
      </Provider>
    );
  }
}
