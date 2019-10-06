import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import config from 'config';
import rootReducer from 'reducers';
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

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      store.replaceReducer(rootReducer(history));
    });
  }

  return store;
};

export default configureStore;
