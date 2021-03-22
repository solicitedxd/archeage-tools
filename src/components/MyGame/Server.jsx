import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchServers } from 'actions/gameData';
import { setServer } from 'actions/myGame';
import React, { Component } from 'react';
import {
  func,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';

class Server extends Component {
  static propTypes = {
    fetchServers: func.isRequired,
    setServer: func.isRequired,
    server: number,
    servers: object,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    const { server, servers, setServer } = this.props;

    const serverOptions = Object.values(servers)
    .map(server => ({
      ...server,
      group: `${server.region}${server.unchained ? ' (Unchained)' : ''}`,
    }))
    .sort(sortBy('region', true, sortBy('unchained', true, sortBy('name'))));

    return (
      <div className="residence-wrapper">
        <Autocomplete
          options={serverOptions}
          getOptionLabel={(option) => option.name}
          groupBy={option => option.group}
          onChange={setServer}
          value={serverOptions.find(s => s.id === server) || null}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Your Server"
              placeholder="Select server"
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ myGame: { server }, gameData: { servers } }) => ({
  server,
  servers,
});

const mapDispatchToProps = {
  fetchServers,
  setServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Server);
