import React, { Component } from 'react';
import {
  array,
  bool,
  string,
} from 'react-proptypes';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { REWARD } from 'constants/dailies';
import Currency from 'components/Currency';
import XP from 'components/XP';
import ITEM from 'constants/items';
import Item from 'components/Item';

class RewardsDisplay extends Component {
  static propTypes = {
    title: string.isRequired,
    rewards: array,
    expanded: bool,
  };

  static defaultProps = {
    rewards: [],
    expanded: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
  }

  handleChange = (e, expanded) => {
    this.setState({ expanded });
  };

  render() {
    const { title, rewards } = this.props;
    const { expanded } = this.state;

    const rewardItems = rewards.filter((reward) => reward.type === REWARD.ITEM || reward.type === REWARD.GILDA);
    const rewardXps = rewards.filter((reward) => reward.type === REWARD.GUILD_XP || reward.type === REWARD.FAMILY_XP);
    const rewardCurrencies = rewards.filter((reward) => reward.type === REWARD.COIN || reward.type === REWARD.HONOR || reward.type === REWARD.VOCATION || reward.type === REWARD.PRESTIGE || reward.type === REWARD.LEADERSHIP);

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="reward-panel-texts">
            {rewardCurrencies &&
            <div>
              {rewardCurrencies.map(currency => <Currency key={currency.type} {...currency} />)}
            </div>
            }
            {rewardXps &&
            <div>
              {rewardXps.map(xp => <XP key={xp.type} {...xp} />)}
            </div>
            }
          </div>
          <div className="reward-panel-items">
            {rewardItems.map(item => {
              if (item.type === REWARD.GILDA) {
                item.item = ITEM.GILDA_STAR;
              }
              return <Item key={item.item.name} {...item.item} count={item.count} />;
            })}
          </div>
          {rewards.length === 0 && <Typography variant="subtitle1">No rewards</Typography>}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RewardsDisplay;
