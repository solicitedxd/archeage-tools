import {
  Checkbox,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { fetchQuest } from 'actions/gameData';
import Currency from 'components/Currency';
import Item from 'components/Item/Item';
import QuestTooltip from 'components/Quest/QuestTooltip';
import {
  REWARD_COINS,
  REWARD_ITEM,
  REWARD_PROFICIENCY,
  REWARD_XP,
} from 'constants/dailies';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  string,
} from 'react-proptypes';

class DailyQuest extends Component {
  static propTypes = {
    setQuestStatus: func.isRequired,
    setQuestHide: func.isRequired,
    id: number.isRequired,
    name: string,
    completed: bool,
    hidden: bool,
    rewards: array,
    region: string.isRequired,
    rewardTypes: array.isRequired,
    instance: bool,
  };

  componentDidMount() {
    const { id, instance } = this.props;
    if (!instance) {
      fetchQuest(id);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !equals(this.props, nextProps);
  }

  render() {
    const { id, name, completed, hidden, rewards, region, rewardTypes, instance } = this.props;
    const { setQuestStatus, setQuestHide } = this.props;

    const typeItem = pathOr(null, ['id'])(rewardTypes.find(t => t.name === REWARD_ITEM));
    const typeXp = pathOr(null, ['id'])(rewardTypes.find(t => t.name === REWARD_XP));
    const typeCoin = pathOr(null, ['id'])(rewardTypes.find(t => t.name === REWARD_COINS));
    const typeProf = pathOr(null, ['id'])(rewardTypes.find(t => t.name === REWARD_PROFICIENCY));

    const itemRewards = rewards
      ? rewards.filter(r => r.typeId === typeItem && (r.region === region || !r.region) && !r.optional) : [];
    const currencyRewards = rewards
      ? rewards.filter(r => ![typeItem, typeXp, typeCoin, typeProf].includes(r.typeId) &&
        (r.region === region || !r.region))
      : [];

    const maxRewards = instance ? 3 : 2;

    return (
      <Paper className="quest">
        <Checkbox
          color="primary"
          checked={completed}
          onChange={(_, checked) => setQuestStatus(id, checked)}
        />
        <QuestTooltip questId={id} disabled={instance}>
          <Typography variant="body2">
            {name}
          </Typography>
        </QuestTooltip>
        <div className="rewards">
          {itemRewards.slice(0, maxRewards).map(item => (
            <Item
              id={item.refId}
              count={item.quantity}
              showCount
              inline
              key={`qr-${id}-${item.refId}`}
            />))}
          {currencyRewards.slice(0, 2).map(currency => (
            <Currency
              key={`qr-${id}-${currency.typeId}`}
              type={rewardTypes.find(r => r.id === currency.typeId).name}
              count={currency.quantity}
              inline
              tooltip
            />))}
          <Tooltip title={`${hidden ? 'Show' : 'Hide'} ${instance ? 'Instance' : 'Quest'}`}>
            <IconButton onClick={() => setQuestHide(id, !hidden)} size="small" color="inherit">
              {hidden
                ? <VisibilityIcon />
                : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    );
  }
}

export default DailyQuest;
