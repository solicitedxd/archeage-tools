import {
  AppBar,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import KeyComponent from 'components/KeyComponent';
import React, { Component } from 'react';
import {
  array,
  bool,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';

class TabContent extends Component {
  static propTypes = {
    tabs: array.isRequired,
    mobile: bool.isRequired,
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
    const { tabs, title, mobile } = this.props;
    const { value } = this.state;

    const TabsList = () => (
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={this.handleChange}
        centered={!mobile}
        variant={mobile ? 'scrollable' : 'standard'}
      >
        {tabs.map((tab, index) => (
          <Tab label={tab.label} key={index} />
        ))}
      </Tabs>
    );

    let content;
    if (tabs[value]) {
      content = !Array.isArray(tabs[value].content)
        ? tabs[value].content
        : tabs[value].content.map((node, i) => {
          if (typeof node === 'object') {
            return <KeyComponent key={`${title}-${tabs[value].label}-${i}`}>{node}</KeyComponent>;
          }
          return <Typography key={`${title}-${tabs[value].label}-${i}`}>{node}</Typography>;
        });
    }

    if (title) {
      return (
        <>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography className="title-text">{title}</Typography>
              <TabsList />
            </Toolbar>
          </AppBar>
          <div className="body-container">
            {content}
          </div>
        </>
      );
    }

    return (
      <>
        <Paper style={{ marginBottom: 8 }}>
          <TabsList />
        </Paper>
        {content}
      </>
    );
  }
}

const mapStateToProps = ({ display: { mobile } }) => ({
  mobile,
});

export default connect(mapStateToProps, null)(TabContent);
