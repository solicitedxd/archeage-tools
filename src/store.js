import config from 'config';
import rootReducer from 'reducers';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import history from './history';
import middleware from './middleware';

const dummyDevTools = (f) => f;

const validDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : dummyDevTools;

const getReduxDevTools = (enableDevTools = false) => (enableDevTools ? validDevTools : dummyDevTools);

const enhancer = (history) => compose(applyMiddleware(...middleware(history)), getReduxDevTools(config.devTools));

const configureStore = (history) => {
  const store = createStore(
    rootReducer(history),
    enhancer(history),
  );

  /* eslint-disable no-undef */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      store.replaceReducer(rootReducer(history));
    });
  }

  return store;
};

const store = configureStore(history);

export default store;
