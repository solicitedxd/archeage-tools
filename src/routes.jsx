import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Home from 'components/pages/Home';
import Dailies from 'components/pages/Dailies';
import Skills from 'components/pages/Skills';
import Calendar from 'components/pages/Calendar';
import Taxes from 'components/pages/Taxes';

export default (
  <Main>
    <Switch>
      <Route path="/dailies" component={Dailies} />
      <Route path="/skills" component={Skills} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/schedule" component={Calendar} />
      <Route path="/taxes" component={Taxes} />
      <Route path="/" component={Home} />
    </Switch>
  </Main>
);
