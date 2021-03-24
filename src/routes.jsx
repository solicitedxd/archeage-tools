import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import BlueSaltBonds from 'views/BlueSaltBonds';
import Crops from 'views/Crops';
import Dailies from 'views/Dailies';
import Folio from 'views/Folio';
import Guides from 'views/Guides';
import GuideViewer from 'views/GuideViewer';
import Home from 'views/Home';
import EditNewsPost from 'views/Home/EditNewsPost';
import NewsPost from 'views/Home/NewsPost';
import Main from 'views/Main';
import Mounts from 'views/Mounts';
import NotFound from 'views/NotFound';
import Schedule from 'views/Schedule';
import Skills from 'views/Skills';
import Taxes from 'views/Taxes';
import TradePacks from 'views/TradePacks';

export default (
  <Main>
    <Switch>
      <Route path="/dailies" exact component={Dailies} />
      <Route path="/skills" exact component={Skills} />
      <Route path="/schedule" exact component={Schedule} />
      <Route path="/taxes" exact component={Taxes} />
      <Route path="/my-farm" exact component={Crops} />
      <Route path="/crops" exact component={Crops} />
      <Route path="/guides" exact component={Guides} />
      <Route path="/guides/:guide?" component={GuideViewer} />
      <Route path="/trade-packs/:originZoneName?/:packTypeName?" component={TradePacks} />
      <Route path="/mounts/:mount?" component={Mounts} />
      <Route path="/folio/:vocation?/:recipeId?" component={Folio} />
      <Route path="/bonds" component={BlueSaltBonds} />
      <Route path="/news/create" component={EditNewsPost} />
      <Route path="/news/:postId/:action?" component={NewsPost} />
      <Route path="/news" exact component={Home} />
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Main>
);
