import Dailies from 'components/pages/Dailies';
import Folio from 'components/pages/Folio';
import Guides from 'components/pages/Guides';
import GuideViewer from 'components/pages/GuideViewer';
import Home from 'components/pages/Home';
import EditNewsPost from 'components/pages/Home/EditNewsPost';
import NewsPost from 'components/pages/Home/NewsPost';
import Main from 'components/pages/Main';
import Mounts from 'components/pages/Mounts';
import NotFound from 'components/pages/NotFound';
import Schedule from 'components/pages/Schedule';
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
      <Route path="/schedule/:eventId?" exact component={Schedule} />
      <Route path="/taxes" exact component={Taxes} />
      <Route path="/thunderstruck" exact component={Thunderstruck} />
      <Route path="/crops" exact component={Thunderstruck} />
      <Route path="/guides" exact component={Guides} />
      <Route path="/guides/:guide?" component={GuideViewer} />
      <Route path="/trade-packs" component={TradePacks} />
      <Route path="/mounts/:mount?" component={Mounts} />
      <Route path="/folio/:vocation?/:recipeId?" component={Folio} />
      <Route path="/news/create" component={EditNewsPost} />
      <Route path="/news/:postId/:action?" component={NewsPost} />
      <Route path="/news" exact component={Home} />
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Main>
);
