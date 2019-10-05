import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  arrayOf,
  number,
  object,
  string,
} from 'react-proptypes';
import {
  Card,
  CardHeader,
  Checkbox,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import { setQuestStatus } from 'actions/dailies';
import { REWARD } from 'constants/dailies';
import ITEM from 'constants/items';
import Item from 'components/Item';
import Currency from 'components/Currency';
import XP from 'components/XP';
import { getQuestId } from 'utils/string';

class Quest extends Component {
  static propTypes = {
    name: string.isRequired,
    zones: arrayOf(string),
    difficulty: string,
    rewards: arrayOf(object),
    type: string,
    idx: number,
  };

  static defaultProps = {
    zones: [],
    difficulty: '',
    type: '',
    idx: null,
  };

  getQuestId = () => {
    const { name, idx } = this.props;
    return getQuestId({ name, idx });
  };

  handleChange = (e, status) => {
    this.props.setQuestStatus(this.getQuestId(), status);
  };

  render() {
    const { name, zones, difficulty, rewards, quests } = this.props;

    const checked = quests[this.getQuestId()] || false;

    const rewardItems = rewards.filter((reward) => reward.type === REWARD.ITEM || reward.type === REWARD.GILDA);
    const rewardXps = rewards.filter((reward) => reward.type === REWARD.GUILD_XP || reward.type === REWARD.FAMILY_XP);
    const rewardCurrencies = rewards.filter((reward) => reward.type === REWARD.COIN || reward.type === REWARD.HONOR || reward.type === REWARD.VOCATION || reward.type === REWARD.PRESTIGE || reward.type === REWARD.LEADERSHIP);

    return (
      <Card onClick={() => this.handleChange(null, !checked)}>
        <CardHeader
          className={cn('quest-card', { 'checked': checked })}
          avatar={<Checkbox
            checked={checked}
            onChange={this.handleChange}
            color="primary"
          />}
          title={<Typography variant="subtitle1" className="quest-name"><span>{name}{difficulty &&
          <span className={cn('difficulty', difficulty)} />}</span></Typography>}
          subheader={<Typography variant="overline">{zones.join(', ')}</Typography>}
          disableTypography
          action={<div className="reward-list">
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
            {rewardItems.length > 0 &&
            <div className="reward-items">
              {rewardItems.map(reward => {
                if (reward.type === REWARD.GILDA) {
                  reward.item = ITEM.GILDA_STAR;
                }
                return <Item key={reward.item.name} count={reward.count} {...reward.item} />;
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

const mapStateToProps = ({ dailies: { quests } }) => ({
  quests,
});

const mapDispatchToProps = {
  setQuestStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
