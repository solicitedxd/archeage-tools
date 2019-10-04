import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Home from 'components/pages/Home';

export default (
  <Main>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Main>
);
