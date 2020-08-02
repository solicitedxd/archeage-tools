import {
  Link,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { fetchDoodad } from 'actions/gameData';
import DoodadTooltip from './DoodadTooltip';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';

class DoodadLink extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string,
    style: object,
    noLink: bool,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    fetchDoodad(this.props.id);
  }

  render() {
    const { id, name, style, noLink } = this.props;

    if (!name) {
      return <Skeleton variant="text" style={{ display: 'inline-block', marginLeft: 4, width: 80 }} />;
    }

    if (noLink) {
      return (
        <Typography component="span" style={style}>
          {name}
        </Typography>
      );
    }

    return (
      <DoodadTooltip doodadId={id} disabled={!name}>
        <Link className="inline-link" style={style}>
          {name}
        </Link>
      </DoodadTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { doodads } }, { id }) => ({
  ...pathOr({}, [id])(doodads),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoodadLink);
