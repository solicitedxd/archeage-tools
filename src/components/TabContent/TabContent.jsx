import React, { Component } from 'react';
import {
  array,
  string,
} from 'react-proptypes';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';

class TabContent extends Component {
  static propTypes = {
    tabs: array.isRequired,
    title: string,
  };

  static defaultProps = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { tabs, title } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar variant="dense">
            {title && <Typography className="title-text">{title}</Typography>}
            <Tabs
              value={value}
              variant="scrollable"
              indicatorColor="secondary"
              onChange={this.handleChange}
            >
              {tabs.map((tab, index) => (
                <Tab label={tab.label} key={index} />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
        <div className="body-container">
          {tabs[value] && tabs[value].content}
        </div>
      </React.Fragment>
    );
  }
}

export default TabContent;
