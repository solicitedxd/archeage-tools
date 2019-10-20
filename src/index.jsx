import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store';
import routes from './routes';
import './images/favicon.ico';
import './images/ucc-teal.png';

const history = createBrowserHistory();
const store = configureStore(history);

const dom = (
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </AppContainer>
);

render(dom, document.querySelector('#app'));

if (module && module.hot) {
  module.hot.accept('./index', () => {
    render(
      dom,
      document.querySelector('#app'),
    );
  });
}
