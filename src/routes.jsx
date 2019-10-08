import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Home from 'components/pages/Home';
import Dailies from 'components/pages/Dailies';
import Skills from 'components/pages/Skills';

export default (
  <Main>
    <Switch>
      <Route path="/dailies" component={Dailies} />
      <Route path="/skills" component={Skills} />
      <Route path="/" component={Home} />
    </Switch>
  </Main>
);
