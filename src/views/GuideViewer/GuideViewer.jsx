import {
  AppBar,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AdContainer from 'components/AdContainer';
import KeyComponent from 'components/KeyComponent';
import Link from 'components/Link';
import ScrollToTop from 'components/ScrollToTop';
import TabContent from 'components/TabContent';
import React, { Component } from 'react';
import {
  bool,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Sticky from 'react-sticky-el';
import {
  scrollTo,
  setTitle,
  slug,
  unslug,
} from 'utils/string';
import * as Guides from '../../data/guides';
import NotFound from '../NotFound';

class GuideViewer extends Component {
  static propTypes = {
    location: object,
    mobile: bool,
    match: object,
  };

  state = {
    toc: false,
  };

  componentDidMount() {
    this.detectSectionHash();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.detectSectionHash();
    }
  }

  detectSectionHash = () => {
    const { hash } = this.props.location;
    if (hash && hash.length > 1) {
      const elementId = hash.substr(1); // cut off the #
      this.goSection(elementId);
    }
  };

  handleToCClick = () => {
    this.setState({ toc: true });
  };

  closeToC = () => {
    this.setState({ toc: false });
  };

  goSection = (section, behavior = 'smooth') => {
    this.closeToC();
    if (document.getElementById(section)) {
      scrollTo(section, behavior);
    }
  };

  render() {
    const { mobile, match: { params: { guide: guideSlug } } } = this.props;
    const { toc } = this.state;
    const guideData = Guides[unslug(guideSlug)];
    if (!guideData) {
      return <NotFound />;
    }

    setTitle(`${guideData.name} Guide`);

    return (
      <div className="guide-container">
        <div className="section">
          <div className="guide-viewer">
            {guideData.sections.map((section, sId) => (
              <React.Fragment key={`${slug(guideData.name)}-s${sId}`}>
                <Paper id={`${slug(section.title)}`}>
                  {section.tabContent &&
                  <TabContent title={section.title} tabs={section.tabContent} />}
                  {!section.tabContent && section.paragraphs &&
                  <>
                    <AppBar position="static">
                      <Toolbar variant="dense">
                        <Typography variant="h5" className="title-text">{section.title}</Typography>
                      </Toolbar>
                    </AppBar>
                    <div className="body-container">
                      {section.paragraphs.map((line, pId) => {
                        const key = `${slug(guideData.name)}-s${sId}-p${pId}`;
                        if (typeof line === 'string') {
                          return <Typography key={key}>{line}</Typography>;
                        } else {
                          return <KeyComponent key={key}>{line}</KeyComponent>;
                        }
                      })}
                    </div>
                  </>}
                </Paper>
                {(sId + 1) % 3 === 0 &&
                <AdContainer type="horizontal" />}
              </React.Fragment>
              ),
            )}
          </div>
          {!mobile &&
          <Sticky holderProps={{ className: 'guide-toc' }}>
            <Paper>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="subtitle1" className="title-text">{guideData.name}</Typography>
                </Toolbar>
              </AppBar>
              <div className="body-container">
                <Typography variant="subtitle2">Author: {guideData.meta.author}</Typography>
                <Typography variant="subtitle2">Last Updated: {guideData.meta.lastUpdated}</Typography>
                <Typography variant="subtitle1">Table of Contents</Typography>
                {guideData.sections.map((section, sId) => (
                  <Link
                    to={`#${slug(section.title)}`}
                    onClick={() => this.goSection(slug(section.title))}
                    color="primary"
                    key={`toc-${sId}`}
                  >
                    <Typography>{sId + 1}. {section.title}</Typography>
                  </Link>
                ))}
              </div>
            </Paper>
            <AdContainer type="square" />
          </Sticky>}
        </div>
        <ScrollToTop />
        {mobile &&
        <Fab
          color="primary"
          className="fab-left"
          onClick={this.handleToCClick}
        >
          <MenuIcon />
        </Fab>}
        <Drawer anchor="left" open={mobile && toc} onClose={this.closeToC}>
          <List style={{ width: 250 }}>
            <ListItem><Typography variant="h6">{guideData.name}</Typography></ListItem>
            <ListItem>
              <Typography variant="subtitle2">
                Author: {guideData.meta.author}<br />
                Last Updated: {guideData.meta.lastUpdated}
              </Typography>
            </ListItem>
            <hr />
            {guideData.sections.map((section, sId) => (
              <RouterLink
                to={`#${slug(section.title)}`}
                onClick={() => this.goSection(slug(section.title), 'auto')}
                color="primary"
                className="no-link"
                key={`toc-drawer-${sId}`}
              >
                <ListItem button>
                  <ListItemText primary={`${sId + 1}. ${section.title}`} />
                </ListItem>
              </RouterLink>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GuideViewer);
