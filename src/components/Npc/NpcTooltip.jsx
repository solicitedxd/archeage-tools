import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  fetchNpc,
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
  const { npc, shifted } = props;
  const { id, name, title, monster, level } = npc;

  return (
    <div>
      {shifted &&
      <section className="id">
        ID: {id}
      </section>}
      <section className="header">
        <div className="name">
          {title && <Typography variant="h5">{title}</Typography>}
          <Typography variant="h4" className={monster ? 'monster-red' : ''}>{name}</Typography>
        </div>
      </section>
      <section>
        {level > 0 && <p>Level: {level}</p>}
      </section>
    </div>
  );
};

TooltipContent.propTypes = {
  npc: object,
  shifted: bool,
  id: number,
};

const mapStateToProps2 = ({ gameData: { npcs } }, { id }) => ({
  npc: pathOr({}, [id])(npcs),
});

const mapDispatchToProps = {
  fetchQuestCategories,
  fetchQuestRefData,
};

const ConnectedTooltipContent = connect(mapStateToProps2, mapDispatchToProps)(TooltipContent);

class NpcTooltip extends Component {
  static propTypes = {
    npcId: number.isRequired,
    npc: object,
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

    const { npc, npcId } = this.props;

    if (!npc.id) {
      fetchNpc(npcId);
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
    const { npcId, disabled, children, npc } = this.props;
    const { shifted } = this.state;

    if (disabled || !npc.id) {
      return children;
    }

    return (
      <Tooltip
        title={<ConnectedTooltipContent id={npcId} shifted={shifted} />}
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
        id={`npc-${npcId}`}
      >
        {children}
      </Tooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { npcs } }, { npcId }) => ({
  npc: pathOr({}, [npcId])(npcs),
});

export default connect(mapStateToProps, mapDispatchToProps)(NpcTooltip);
