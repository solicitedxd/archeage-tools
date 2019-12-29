import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import './images/favicon.ico';
import './images/ucc-teal.png';
import routes from './routes';
import configureStore from './store';

const history = createBrowserHistory();
const store = configureStore(history);

const dom = (
  <AppContainer>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
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
