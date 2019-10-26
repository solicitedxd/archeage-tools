import React from 'react';
import Banner from 'components/Banner';
import {
  AppBar,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import navigation from 'constants/navigation';

const Home = () => (
  <div>
    <div className="home-banners section">
      {navigation.map(navLink => <Banner {...navLink} text={navLink.name} key={navLink.path || navLink.name}  />)}
    </div>
    <Paper className="section">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" className="title-text">Thunderstruck Timer</Typography>
          <Typography variant="overline">Oct 22, 2019</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '8px 12px' }}>
        <Typography>
          The Thunderstruck tool is now available. You can start timing something of yours from scratch or time someone
          else's public tree farm by entering a remaining time. Timers will count down until each possible thunderstruck
          growth phase for the tree, based on the region's climate.
        </Typography>
        <Typography style={{ margin: '8px 0' }}>
          I also made a few fixes for the event schedule page and added the "Clean the Kiddies" daily in Ahnimar to the checklist.
        </Typography>
        <Typography style={{ margin: '8px 0' }}>
          <b>Update:</b> Event Schedule - Kadum has been added, along with Stillwater Gulf.
        </Typography>
      </div>
    </Paper>
    <Paper className="section">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" className="title-text">Feedback and Updates</Typography>
          <Typography variant="overline">Oct 20, 2019</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '8px 12px' }}>
        <Typography>
          Thank you everyone for the feedback you've provided from my reddit post!
        </Typography>
        <Typography style={{ margin: '8px 0' }}>
          - I've implemented a Dark Mode that can be toggled from the navigation menu. <br />
          - I've fixed a couple site issues. <br />
          - Auroria guild quests are now marked as Guild Missions. <br />
          - Kadum raid timer will be added at a later date, some modifications need to be added to support his odd
          availability times.
        </Typography>
        <Typography>
          As a note for the event schedule, ArcheAge Unchained's NA servers appear to use EU times for their instance
          availability times. I'll work on adding a method to select Unchained event times.
        </Typography>
        <Typography style={{ marginTop: 8 }}>
          I've also set up a <Link href="https://www.patreon.com/bePatron?u=12806740" target="_blank">Patreon</Link> for
          those would like to support the site. Thank you all!
        </Typography>
        <Typography style={{ marginTop: 8 }}>
          See an issue? Drop an email to <Link href="mailto:admin@mokulu.io">admin@mokulu.io</Link> or send a PM
          to <Link href="https://www.reddit.com/u/Mokulu">u/Mokulu</Link>. I know my event schedule is not 100%
          accurate, and I'm even missing EU times.
        </Typography>
      </div>
    </Paper>
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
