import {
  Card,
  CardHeader,
  Checkbox,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  setQuestHide,
  setQuestStatus,
} from 'actions/dailies';
import cn from 'classnames';
import Currency from 'components/Currency';
import Item from 'components/Item';
import XP from 'components/XP';
import { CURRENCY } from 'constants/items';
import ITEM from 'data/items';
import React, { Component } from 'react';
import {
  array,
  arrayOf,
  object,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  getZones,
  sortItems,
  splitRewards,
} from 'utils/dailies';

class Quest extends Component {
  static propTypes = {
    name: string.isRequired,
    zones: oneOfType([object, array]),
    difficulty: string,
    rewards: arrayOf(object),
    type: string,
  };

  static defaultProps = {
    zones: [],
    difficulty: '',
    type: '',
  };

  handleChange = (e, status) => {
    const { setQuestStatus, setQuestHide, hideMode, name } = this.props;
    if (hideMode) {
      setQuestHide(name, !status);
    } else {
      setQuestStatus(name, status);
    }
  };

  render() {
    const { name, zones: zoneObj, difficulty, rewards, quests, faction, hideMode, hiddenQuests, note } = this.props;
    const { rewardItems, rewardItemChoices, rewardXps, rewardCurrencies } = splitRewards(rewards);
    const zones = getZones(zoneObj, faction);

    const completed = quests[name] || false;
    const hidden = !(hiddenQuests && hiddenQuests[name] || false);

    const checked = hideMode ? hidden : completed;

    const quest = (
      <Card onClick={() => this.handleChange(null, !checked)}>
        <CardHeader
          className={cn('quest-card', { 'checked': checked && !hideMode }, { 'hidden': !hidden && hideMode })}
          avatar={<Checkbox
            checked={checked}
            onChange={this.handleChange}
            color="primary"
          />}
          title={<Typography variant="subtitle1" className="quest-name"><span>{name}{difficulty &&
          <span className={cn('difficulty', difficulty)} />}</span></Typography>}
          subheader={<Typography variant="overline">{zones.sort().join(', ')}</Typography>}
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
              {rewardItems.sort(sortItems).map(reward => {
                if (reward.type === CURRENCY.GILDA) {
                  reward.item = ITEM.GILDA_STAR;
                }
                if (reward.type === CURRENCY.BLUE_SALT_BOND) {
                  reward.item = ITEM.BLUE_SALT_BOND;
                }
                return <Item key={reward.item.name} count={reward.count} {...reward.item} />;
              })}
            </div>}
            {rewardItemChoices.sort(sortItems).length > 0 &&
            <div className="reward-item-choices">
              <Typography variant="overline" className="choose-one">Choose One:</Typography>
              <div className="reward-items">
                {rewardItemChoices.sort(sortItems).map(reward =>
                  <Item key={reward.item.name} {...reward.item} count={reward.count} />,
                )}
              </div>
            </div>}
          </div>}
          classes={{
            action: 'class-rewards',
          }}
        />
      </Card>
    );

    if (note) {
      return (
        <Tooltip title={note}>
          {quest}
        </Tooltip>
      );
    } else {
      return quest;
    }
  }
}

const mapStateToProps = ({ dailies: { quests, faction, hideMode, hiddenQuests } }) => ({
  quests,
  faction,
  hideMode,
  hiddenQuests,
});

const mapDispatchToProps = {
  setQuestStatus,
  setQuestHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
