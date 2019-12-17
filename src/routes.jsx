import Dailies from 'components/pages/Dailies';
import Guides from 'components/pages/Guides';
import GuideViewer from 'components/pages/GuideViewer';
import Home from 'components/pages/Home';
import Main from 'components/pages/Main';
import Mounts from 'components/pages/Mounts';
import NotFound from 'components/pages/NotFound';
import Calendar from 'components/pages/Schedule';
import Skills from 'components/pages/Skills';
import Taxes from 'components/pages/Taxes';
import Thunderstruck from 'components/pages/Thunderstruck';
import TradePacks from 'components/pages/TradePacks';
import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

export default (
  <Main>
    <Switch>
      <Route path="/dailies" exact component={Dailies} />
      <Route path="/skills" exact component={Skills} />
      <Route path="/schedule" exact component={Calendar} />
      <Route path="/taxes" exact component={Taxes} />
      <Route path="/thunderstruck" exact component={Thunderstruck} />
      <Route path="/guides" exact component={Guides} />
      <Route path="/guides/:guide?" component={GuideViewer} />
      <Route path="/trade-packs" component={TradePacks} />
      <Route path="/mounts/:mount?" component={Mounts} />
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Main>
);
