import React from 'react';
import Banner from 'components/Banner';
import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import navigation from 'constants/navigation';

const Home = () => (
  <div>
    <div className="home-banners section">
      {navigation.map(navLink => <Banner {...navLink} text={navLink.name} key={navLink.path} />)}
    </div>
    <Paper className="section">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5">Mokulu's ArcheAge Tools</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '8px 12px' }}>
        <Typography>
          Welcome to my ArcheAge tools site. It's currently in development and not all features are available.
        </Typography>
        <Typography>
          Check back every so often to see what's new.
        </Typography>
      </div>
    </Paper>
  </div>
);

export default Home;
