import React, { Component } from 'react';
import {
  AppBar,
  Link as MuiLink,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import navigation from 'constants/navigation';
import { setTitle } from 'utils/string';
import { Link } from 'react-router-dom';

class Guides extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    setTitle('Guides');
    return (
      <div className="calendar-container">
        <Paper className="section">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="subtitle1" className="title-text">Guides</Typography>
            </Toolbar>
          </AppBar>
          <div className="body-container guide-list">
            {navigation.find(n => n.path === '/guides').children.filter(c => !c.disabled).map(section => {
              return (
                <div className="guide-category" key={`gc-${section.name}`}>
                  <Typography variant="h6">{section.name}</Typography>
                  <ul>
                    {section.children.filter(g => !g.disabled).map((guide, id) => (
                      <li key={`gc-${section.name}-${id}`}>
                        <Typography>
                          <MuiLink component={Link} to={guide.path} color="primary" key={`gc-${section.name}-${id}`}>
                            {guide.name}
                          </MuiLink>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Paper>
      </div>
    );
  }
}

export default Guides;
