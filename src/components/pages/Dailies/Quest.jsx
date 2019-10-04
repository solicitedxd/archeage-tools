import React, { Component } from 'react';
import {
  arrayOf,
  object,
  string,
} from 'react-proptypes';
import {
  Card,
  CardHeader,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { REWARD } from 'constants/dailies';
import ITEM from 'constants/items';
import Item from 'components/Item';
import Currency from 'components/Currency';
import XP from 'components/XP';

class Quest extends Component {
  static propTypes = {
    name: string.isRequired,
    zones: arrayOf(string),
    difficulty: string,
    rewards: arrayOf(object),
    type: string,
  };

  static defaultProps = {
    zones: [],
    difficulty: '',
    type: '',
  };

  state = {};

  render() {
    const { name, zones, difficulty, rewards, type } = this.props;

    const rewardItems = rewards.filter((reward) => reward.type === REWARD.ITEM || reward.type === REWARD.GILDA);
    const rewardXps = rewards.filter((reward) => reward.type === REWARD.GUILD_XP || reward.type === REWARD.FAMILY_XP);
    const rewardCurrencies = rewards.filter((reward) => reward.type === REWARD.COIN || reward.type === REWARD.HONOR || reward.type === REWARD.VOCATION || reward.type === REWARD.PRESTIGE || reward.type === REWARD.LEADERSHIP);

    return (
      <Card>
        <CardHeader
          avatar={<Checkbox />}
          title={<Typography variant="subtitle1">{name}</Typography>}
          subheader={<Typography variant="overline">{zones.join(', ')} {type && `[${type}]`}</Typography>}
          disableTypography
          action={<div className="reward-list">
            {rewardItems.length > 0 &&
            <div className="reward-items">
              {rewardItems.map(reward => {
                if (reward.type === REWARD.GILDA) {
                  reward.item = ITEM.GILDA_STAR;
                }
                return <Item key={reward.item.name} count={reward.count} {...reward.item} />;
              })}
            </div>}
            {rewardCurrencies.length > 0 &&
            <div className="reward-currencies">
              {rewardCurrencies.map(reward => {
                return <Currency key={reward.type} {...reward} />;
              })}
            </div>}
            {rewardXps.length > 0 &&
            <div className="reward-xps">
              {rewardXps.map(reward => {
                return <XP key={reward.type} {...reward} />;
              })}
            </div>}
          </div>}
          classes={{
            action: 'class-rewards',
          }}
        />
      </Card>
    );
  }
}

export default Quest;
