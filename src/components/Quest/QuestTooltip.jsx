import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  fetchQuest,
  fetchQuestCategories,
  fetchQuestRefData,
} from 'actions/gameData';
import Currency from 'components/Currency';
import DoodadLink from 'components/Doodad/DoodadLink';
import ItemLink from 'components/Item/ItemLink';
import NpcLink from 'components/Npc/NpcLink';
import QuestLink from 'components/Quest/QuestLink';
import {
  BOND_BOARDS,
  CRITERIA_TYPE_CHAT,
  CRITERIA_TYPE_COLLECT,
  CRITERIA_TYPE_OTHER,
  FLAG_DAILY,
  FLAG_ELITE,
  FLAG_EPIC,
  FLAG_FRIDAY,
  FLAG_LEGENDARY,
  FLAG_MONDAY,
  FLAG_MYTHIC,
  FLAG_REPEATABLE,
  FLAG_SATURDAY,
  FLAG_SUNDAY,
  FLAG_THURSDAY,
  FLAG_TUESDAY,
  FLAG_WEDNESDAY,
  FLAG_WEEKLY,
  REWARD_ITEM,
  REWARD_PROFICIENCY,
  REWARD_TITLE,
} from 'constants/dailies';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  node,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { sortBy } from 'utils/array';
import { objectHasProperties } from 'utils/object';
import { encodeColors } from 'utils/string';

// eslint-disable-next-line complexity
const TooltipContent = (props) => {
  const { quest, region, rewardTypes, criteriaTypes, titles, vocations, shifted, fetchQuestRefData, fetchQuestCategories } = props;
  const { id, name, categoryId, category, reqLevel, startNpcId, startItemId, startDoodadId, startLocation, startLevel, endNpcId, endDoodadId, autoComplete, items } = quest;
  const { flags: flagsD, preQuests: preQuestsD, rewards: rewardsD, stages: stagesD } = quest;

  const filterRegion = (f => f.region === region);

  if (!objectHasProperties(rewardTypes)) {
    fetchQuestRefData();
    return (<div />);
  }

  if (!objectHasProperties(quest.category)) {
    fetchQuestCategories();
  }

  const preQuests = preQuestsD.filter(filterRegion);
  const rewards = rewardsD.filter(filterRegion).sort(sortBy('typeId'));
  const stages = stagesD.filter(filterRegion).sort(sortBy('position'));
  const flags = flagsD.filter(filterRegion);
  let questIcon = 'quest';
  if (flags.find(f => f.code === FLAG_DAILY || f.code === FLAG_WEEKLY)) {
    questIcon = 'daily_quest';
  } else if (categoryId === 70) {
    questIcon = 'vocation_quest';
  } else if (category.storyCategory) {
    questIcon = 'story_quest';
  }

  const bondBoards = BOND_BOARDS.find(b => b.questIds.includes(id));

  return (
    <div>
      {shifted &&
      <section className="id">
        ID: {id}
      </section>}
      <section className="header">
        <div className="icon">
          <img src={`/images/quest/${questIcon}.png`} alt="" />
        </div>
        <div className="name">
          <Typography variant="h5">{category.name || '???'}</Typography>
          <Typography variant="h4">{name}</Typography>
        </div>
        {flags.find(f => f.code === FLAG_ELITE) &&
        <div className="quest-flag flag-elite" />}
        {flags.find(f => f.code === FLAG_EPIC) &&
        <div className="quest-flag flag-epic" />}
        {flags.find(f => f.code === FLAG_LEGENDARY) &&
        <div className="quest-flag flag-legendary" />}
        {flags.find(f => f.code === FLAG_MYTHIC) &&
        <div className="quest-flag flag-mythic" />}
        {flags.find(f => f.code === FLAG_DAILY) &&
        <div className="quest-flag flag-daily" />}
        {flags.find(f => f.code === FLAG_WEEKLY) &&
        <div className="quest-flag flag-weekly" />}
        {flags.find(f => f.code === FLAG_REPEATABLE) &&
        <div className="quest-flag flag-repeat" />}
        {flags.find(f => f.code === FLAG_MONDAY) &&
        <div className="quest-flag flag-m" />}
        {flags.find(f => f.code === FLAG_TUESDAY) &&
        <div className="quest-flag flag-t" />}
        {flags.find(f => f.code === FLAG_WEDNESDAY) &&
        <div className="quest-flag flag-w" />}
        {flags.find(f => f.code === FLAG_THURSDAY) &&
        <div className="quest-flag flag-th" />}
        {flags.find(f => f.code === FLAG_FRIDAY) &&
        <div className="quest-flag flag-f" />}
        {flags.find(f => f.code === FLAG_SATURDAY) &&
        <div className="quest-flag flag-s" />}
        {flags.find(f => f.code === FLAG_SUNDAY) &&
        <div className="quest-flag flag-su" />}
      </section>
      {(reqLevel > 0 || preQuests[0] || startNpcId || startItemId || startDoodadId || startLocation || startLevel) &&
      <section>
        {reqLevel > 0 && <p>Required Level: {reqLevel}</p>}
        {preQuests[0] && <p>Requires completion of <QuestLink id={preQuests[0].questId} />.</p>}
        {startNpcId && <p>Start from <NpcLink id={startNpcId} />.</p>}
        {startItemId && <p>Start by using <ItemLink id={startItemId} />.</p>}
        {startDoodadId &&
        <p>Start from {bondBoards
          ? bondBoards.boardIds.map(bid => <DoodadLink id={bid} key={`${id}-${bid}`} />).reduce((a, b) => [a, ', ', b])
          : <DoodadLink id={startDoodadId} />}.
        </p>}
        {startLocation && <p>Starts automatically at a certain location.</p>}
        {startLevel > 0 && <p>Starts automatically at level {startLevel}.</p>}
      </section>}
      {items.length > 0 &&
      <section>
        <Typography className="reward-header">Items Provided</Typography>
        <ul className="reward-list">
          {items.map((item, i) => (
            <li key={`${id}-item-${i}`}><ItemLink id={item.itemId} count={item.quantity} /></li>
          ))}
        </ul>
      </section>}
      {stages.length > 0 &&
      <section>
        {stages.map(stage => (
          <div key={`${id}-stg-${stage.position}`}>
            {stage.description && <p dangerouslySetInnerHTML={{ __html: encodeColors(stage.description) }} />}
            {stage.criteriaOptional && <p>Complete one:</p>}
            {stage.criteria.length > 0 &&
            <ul className="stage-criteria">
              {stage.criteria.sort(sortBy('position')).map(criterion => {
                const type = criteriaTypes[criterion.typeId];
                const [ref] = criterion.refs;
                return (
                  <li key={`${id}-stg-${stage.position}-crit-${criterion.position}`}>
                    {type.code === CRITERIA_TYPE_CHAT && ref && <>Chat with <NpcLink id={ref.refId} />.</>}
                    {type.code === CRITERIA_TYPE_COLLECT && ref && <>Collect <ItemLink
                      id={ref.refId} /> ({ref.quantity}).</>}
                    {type.code !== CRITERIA_TYPE_OTHER && !ref && `Ref is broken ${type.code}`}
                    {type.code === CRITERIA_TYPE_OTHER &&
                    <>{criterion.description}{
                      criterion.refs.length > 0 &&
                      <>: {criterion.refs.map((r, i) => (
                        <NpcLink
                          key={`${id}-stg-${stage.position}-crit-${criterion.position}-ref-${i}`}
                          id={r.refId}
                        />)).reduce((a, b) => [a, ', ', b])}
                      </>}
                    </>}
                  </li>
                );
              })}
            </ul>}
          </div>
        ))}
      </section>}
      {rewards.length > 0 &&
      <section>
        <Typography className="reward-header">Rewards</Typography>
        <ul className="reward-list">
          {rewards.filter(r => !r.optional).map((reward, i) => {
            const typeName = rewardTypes[reward.typeId].name;
            switch (typeName) {
              case REWARD_ITEM:
                return <li key={`${id}-rew-${i}`}><ItemLink id={reward.refId} count={reward.quantity} /></li>;
              case REWARD_PROFICIENCY:
                return <li key={`${id}-rew-${i}`}>{pathOr('Proficiency', [(reward.refId - 1), 'name'])(vocations)} <span
                  className="currency no-icon">{reward.quantity}</span></li>;
              case REWARD_TITLE:
                // TODO: set up title linking
                return <li key={`${id}-rew-${i}`}>Title: {reward.refId}</li>;
              default:
                return <li key={`${id}-rew-${i}`}>{typeName} <Currency type={typeName} count={reward.quantity} inline />
                </li>;
            }
          })}
        </ul>
        {rewards.filter(r => r.optional).length > 0 &&
        <>
          <Typography className="reward-option">Select Reward</Typography>
          <ul className="reward-list">
            {rewards.filter(r => r.optional).map((reward, i) => (
              <li key={`${id}-oprew-${i}`}>
                <ItemLink id={reward.refId} count={reward.quantity} />
              </li>
            ))}
          </ul>
        </>}
      </section>}
      {(endNpcId || endDoodadId || autoComplete) &&
      <section>
        {endNpcId && <p>Turn in to <NpcLink id={endNpcId} />.</p>}
        {endDoodadId && <p>Turn in to <DoodadLink id={endDoodadId} />.</p>}
        {autoComplete && <p>Completes automatically.</p>}
      </section>}
    </div>
  );
};

TooltipContent.propTypes = {
  quest: object,
  rewardTypes: object,
  criteriaTypes: object,
  titles: object,
  vocations: array,
  shifted: bool,
  fetchQuestCategories: func.isRequired,
  fetchQuestRefData: func.isRequired,
  region: string,
  id: number,
};

const mapStateToProps2 = ({ gameData: { rewardTypes, questCriteriaTypes, titles, vocations, questCategories, quests }, dailies: { region } }, { id }) => {
  const quest = pathOr({}, [id])(quests);
  if (quest.categoryId) {
    quest.category = (quest && questCategories[quest.categoryId]) || {};
  }
  return {
    rewardTypes,
    criteriaTypes: questCriteriaTypes,
    titles,
    vocations,
    quest,
    region: region || 'NA',
  };
};

const mapDispatchToProps = {
  fetchQuestCategories,
  fetchQuestRefData,
};

const ConnectedTooltipContent = connect(mapStateToProps2, mapDispatchToProps)(TooltipContent);

class QuestTooltip extends Component {
  static propTypes = {
    questId: number.isRequired,
    disabled: bool,
    children: node.isRequired,
    quest: object,
    rewardTypes: object,
    titles: object,
    questCategories: object,
  };

  static defaultProps = {};

  state = {
    shifted: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.setShifted);
    window.addEventListener('keyup', this.setShifted);

    const { quest, questId } = this.props;

    if (!quest.id) {
      fetchQuest(questId);
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
    const { questId, disabled, children, quest } = this.props;
    const { shifted } = this.state;

    if (disabled || !quest.id) {
      return children;
    }

    return (
      <Tooltip
        title={<ConnectedTooltipContent id={questId} shifted={shifted} />}
        classes={{ tooltip: 'archeage-tooltip quest-tooltip' }}
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
        id={`quest-${questId}`}
      >
        {children}
      </Tooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { quests } }, { questId }) => ({
  quest: pathOr({}, [questId])(quests),
});

export default connect(mapStateToProps, null)(QuestTooltip);
