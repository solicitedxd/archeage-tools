import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Main from 'components/pages/Main';
import Home from 'components/pages/Home';
import Dailies from 'components/pages/Dailies';
import Skills from 'components/pages/Skills';
import Calendar from 'components/pages/Calendar';
import Taxes from 'components/pages/Taxes';
import Thunderstruck from 'components/pages/Thunderstruck';
import Guides from 'components/pages/Guides';
import GuideViewer from 'components/pages/GuideViewer';
import NotFound from 'components/pages/NotFound';

export default (
  <Main>
    <Switch>
      <Route path="/dailies" exact component={Dailies} />
      <Route path="/skills" exact component={Skills} />
      <Route path="/calendar" exact component={Calendar} />
      <Route path="/schedule" exact component={Calendar} />
      <Route path="/taxes" exact component={Taxes} />
      <Route path="/thunderstruck" exact component={Thunderstruck} />
      <Route path="/guides" exact component={Guides} />
      <Route path="/guides/:guide?" component={GuideViewer} />
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Main>
);
