import {
  Link,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { fetchNpc } from 'actions/gameData';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import NpcTooltip from './NpcTooltip';

class NpcLink extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string,
    style: object,
    noLink: bool,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    fetchNpc(this.props.id);
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
      <NpcTooltip npcId={id} disabled={!name}>
        <Link className="inline-link" style={style}>
          {name}
        </Link>
      </NpcTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { npcs } }, { id }) => ({
  ...pathOr({}, [id])(npcs),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NpcLink);
