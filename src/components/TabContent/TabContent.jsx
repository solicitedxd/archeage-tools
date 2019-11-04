import React, { Component } from 'react';
import {
  array,
  string,
} from 'react-proptypes';
import {
  AppBar,
  Paper,
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

    const TabsList = () => (
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={this.handleChange}
        centered
      >
        {tabs.map((tab, index) => (
          <Tab label={tab.label} key={index} />
        ))}
      </Tabs>
    );

    if (title) {
      return (
        <React.Fragment>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography className="title-text">{title}</Typography>
              <TabsList />
            </Toolbar>
          </AppBar>
          <div className="body-container">
            {tabs[value] && tabs[value].content}
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Paper style={{ marginBottom: 8 }}>
          <TabsList />
        </Paper>
        {tabs[value] && tabs[value].content}
      </React.Fragment>
    );
  }
}

export default TabContent;
