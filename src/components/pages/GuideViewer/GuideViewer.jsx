import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Sticky from 'react-sticky-el';
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
import { Menu } from '@material-ui/icons';
import KeyComponent from 'components/KeyComponent';
import Link from 'components/Link';
import NotFound from 'components/pages/NotFound';
import ScrollToTop from 'components/ScrollToTop';
import TabContent from 'components/TabContent';
import { setTitle } from 'utils/string';
import * as Guides from '../../../data/guides';

const slug = (text) => {
  return text.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .split(' ')
  .join('-');
};

const unslug = (slug) => {
  return slug.toLowerCase()
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join('');
};

class GuideViewer extends Component {
  state = {
    toc: false,
  };

  componentDidMount() {
    const { hash } = this.props.location;
    if (hash && hash.length > 1) {
      const elementId = hash.substr(1); // cut off the #
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }

  handleToCClick = () => {
    this.setState({ toc: true });
  };

  closeToC = () => {
    this.setState({ toc: false });
  };

  goSection = (section, behavior = 'smooth') => {
    this.closeToC();
    document.getElementById(section).scrollIntoView({
      behavior: behavior,
      block: 'start',
    });
  };

  render() {
    const { mobile, match: { params: { guide: guideSlug } } } = this.props;
    const { toc } = this.state;
    const guide = Guides[unslug(guideSlug)];
    if (!guide) {
      return <NotFound />;
    }

    setTitle(`${guide.name} Guide`);

    return (
      <div className="guide-container">
        <div className="section">
          <div className="guide-viewer">
            {guide.sections.map((section, sId) =>
              (
                <Paper key={`${slug(guide.name)}-s${sId}`} id={`${slug(section.title)}`}>
                  {section.tabContent &&
                  <TabContent title={section.title} tabs={section.tabContent} />}
                  {!section.tabContent && section.paragraphs &&
                  <React.Fragment>
                    <AppBar position="static">
                      <Toolbar variant="dense">
                        <Typography variant="subtitle1" className="title-text">{section.title}</Typography>
                      </Toolbar>
                    </AppBar>
                    <div className="body-container">
                      {section.paragraphs.map((line, pId) => {
                        const key = `${slug(guide.name)}-s${sId}-p${pId}`;
                        if (typeof line === 'string') {
                          return <Typography key={key}>{line}</Typography>;
                        } else {
                          return <KeyComponent key={key}>{line}</KeyComponent>;
                        }
                      })}
                    </div>
                  </React.Fragment>}
                </Paper>
              ),
            )}
          </div>
          {!mobile &&
          <Sticky holderProps={{ className: 'guide-toc' }}>
            <Paper>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="subtitle1" className="title-text">{guide.name}</Typography>
                </Toolbar>
              </AppBar>
              <div className="body-container">
                <Typography variant="subtitle2">Author: {guide.meta.author}</Typography>
                <Typography variant="subtitle2">Last Updated: {guide.meta.lastUpdated}</Typography>
                <Typography variant="subtitle1">Table of Contents</Typography>
                {guide.sections.map((section, sId) => (
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
          </Sticky>}
        </div>
        <ScrollToTop />
        {mobile &&
        <Fab
          color="primary"
          className="fab-left"
          onClick={this.handleToCClick}
        >
          <Menu />
        </Fab>}
        <Drawer anchor="left" open={mobile && toc} onClose={this.closeToC}>
          <List style={{ width: 250 }}>
            <ListItem><Typography variant="h6">{guide.name}</Typography></ListItem>
            <ListItem>
              <Typography variant="subtitle2">
                Author: {guide.meta.author}<br />
                Last Updated: {guide.meta.lastUpdated}
              </Typography>
            </ListItem>
            <hr />
            {guide.sections.map((section, sId) => (
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
