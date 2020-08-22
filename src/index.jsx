import { ConnectedRouter as Router } from 'connected-react-router';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import history from './history';
import './images/favicon.ico';
import './images/ucc-teal.png';
import routes from './routes';
import store from './store';

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

/* eslint-disable no-undef */
if (module && module.hot) {
  module.hot.accept('./index', () => {
    render(
      dom,
      document.querySelector('#app'),
    );
  });
}
