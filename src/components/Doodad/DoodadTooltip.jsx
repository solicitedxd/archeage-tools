import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  fetchDoodad,
  fetchQuestCategories,
  fetchQuestRefData,
} from 'actions/gameData';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  node,
  number,
  object,
} from 'react-proptypes';
import { connect } from 'react-redux';

const TooltipContent = (props) => {
  const { doodad, shifted } = props;
  const { id, name } = doodad;

  return (
    <div>
      {shifted &&
      <section className="id">
        ID: {id}
      </section>}
      <section className="header">
        <div className="name">
          <Typography variant="h4">{name}</Typography>
        </div>
      </section>
    </div>
  );
};

TooltipContent.propTypes = {
  doodad: object,
  shifted: bool,
  id: number,
};

const mapStateToProps2 = ({ gameData: { doodads } }, { id }) => ({
  doodad: pathOr({}, [id])(doodads),
});

const mapDispatchToProps = {
  fetchQuestCategories,
  fetchQuestRefData,
};

const ConnectedTooltipContent = connect(mapStateToProps2, mapDispatchToProps)(TooltipContent);

class DoodadTooltip extends Component {
  static propTypes = {
    doodadId: number.isRequired,
    doodad: object,
    disabled: bool,
    children: node.isRequired,
  };

  static defaultProps = {};

  state = {
    shifted: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.setShifted);
    window.addEventListener('keyup', this.setShifted);

    const { doodad, doodadId } = this.props;

    if (!doodad.id) {
      fetchDoodad(doodadId);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.setShifted);
    window.removeEventListener('keyup', this.setShifted);
  }

  setShifted = (e) => {
    // eslint-disable-next-line no-undef
    this.setState({ shifted: __DEVELOPMENT__ && Boolean(e.shiftKey) });
  };

  render() {
    const { doodadId, disabled, children, doodad } = this.props;
    const { shifted } = this.state;

    if (disabled || !doodad.id) {
      return children;
    }

    return (
      <Tooltip
        title={<ConnectedTooltipContent id={doodadId} shifted={shifted} />}
        classes={{ tooltip: 'archeage-tooltip npc-tooltip' }}
        PopperProps={{
          placement: 'right-start',
          modifiers: {
            flip: {
              boundariesElement: 'viewport',
            },
            preventOverflow: {
              boundariesElement: 'viewport',
            },
          },
        }}
        id={`doodad-${doodadId}`}
      >
        {children}
      </Tooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { doodads } }, { doodadId }) => ({
  doodad: pathOr({}, [doodadId])(doodads),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoodadTooltip);
