import {
  AppBar,
  Icon,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  setCollapseCategory,
  setHideCategory,
  setQuestHide,
  setQuestStatus,
} from 'actions/dailies';
import { openDialog } from 'actions/display';
import {
  CASTLE_QUESTS,
  QUEST_CATEGORY,
  RESIDENCE_QUESTS,
  REWARD_BSB,
  REWARD_GILDA,
} from 'constants/dailies';
import {
  DIALOG_MY_GAME,
  RESIDENCE,
} from 'constants/display';
import { ITEM } from 'constants/items';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  array,
  arrayOf,
  bool,
  func,
  number,
  object,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  questZoneCheck,
  sortBy,
} from 'utils/array';
import DailyQuest from 'views/Dailies/DailyQuest';

class DailyCategory extends Component {
  static propTypes = {
    id: oneOfType([number, string]).isRequired,
    name: string.isRequired,
    quests: array,
    icon: string,
    collapsed: bool,
    setCollapseCategory: func.isRequired,
    hidden: bool,
    isHidden: bool,
    setHideCategory: func.isRequired,
    hideComplete: bool,
    completedQuests: object,
    onUpdate: func.isRequired,
    showHidden: bool,
    instance: bool,
    festival: bool,
    hiddenQuests: object,
    region: string,
    rewardTypes: array,
    questData: object,
    setQuestStatus: func.isRequired,
    setQuestHide: func.isRequired,
    castles: array,
    residence: array,
    openDialog: func.isRequired,
    rewards: arrayOf(number),
  };

  static defaultProps = {
    rewards: [],
    castles: [],
    residence: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed ||
      (!equals(prevProps.completedQuests, this.props.completedQuests) && this.props.hideComplete && !this.props.showHidden) ||
      (!equals(prevProps.hiddenQuests, this.props.hiddenQuests) && !this.showHidden) ||
      (!equals(prevProps.rewards, this.props.rewards)) ||
      ((!equals(prevProps.castles, this.props.castles) || !equals(prevProps.residence, this.props.residence)) && !this.showHidden)) {
      this.props.onUpdate();
    }
  }

  render() {
    const { id, name, icon, quests, collapsed, hidden, isHidden, hideComplete, completedQuests, showHidden, instance, hiddenQuests, region, rewardTypes, questData, castles, residence, rewards } = this.props;
    const { setCollapseCategory, setHideCategory, setQuestStatus, setQuestHide, openDialog } = this.props;

    const questIds = (instance ? quests.map(q => q.id) : quests).filter(qid => {
      if (instance && !quests.find(q => q.id === qid).regions.includes(region)) {
        return false;
      }
      // filter rewards
      if (rewards.length > 0) {
        let { rewards: qRewards } = instance ? quests.find(q => q.id === qid) : (questData[qid] || { rewards: [] });
        qRewards = qRewards.filter(r => !r.region || r.region.includes(region));
        if (!qRewards.some(r => rewards.includes(r.typeId)) &&
          (!rewards.includes(REWARD_GILDA) || !qRewards.some(r => r.refId === ITEM.GILDA_STAR)) &&
          (!rewards.includes(REWARD_BSB) || !qRewards.some(r => r.refId === ITEM.BLUE_SALT_BOND))) {
          return false;
        }
      }
      if (showHidden) {
        return true;
      }
      if (id === QUEST_CATEGORY.AURORIA_TERRITORIES) {
        return questZoneCheck(qid, CASTLE_QUESTS, castles) && !hiddenQuests[qid];
      }
      if (id === QUEST_CATEGORY.ALL_IN_THE_FAMILY) {
        return questZoneCheck(qid, RESIDENCE_QUESTS, residence) && !hiddenQuests[qid];
      }
      return !hiddenQuests[qid];
    });

    const completedCount = questIds.reduce((a, b) => a + (completedQuests[b] ? 1 : 0), 0);
    const dailyQuestIds = questIds.filter(qid => showHidden || !(hideComplete && completedQuests[qid]));

    const display = (((dailyQuestIds.length > 0 || !hideComplete) && !hidden) || showHidden) && questIds.length > 0;

    return (
      <div className="daily-category" style={{ display: display ? 'block' : 'none' }}>
        <Paper className="content">
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton onClick={() => setCollapseCategory(id, !collapsed)} size="small" color="inherit">
                {collapsed
                  ? <KeyboardArrowRightIcon />
                  : <KeyboardArrowDownIcon />}
              </IconButton>
              {icon && <Icon><img src={icon} alt={name} className="category-icon" /></Icon>}
              <Typography className="title-text">{name}</Typography>
              <Typography variant="body2">
                {completedCount}/{questIds.length}
              </Typography>
              <Tooltip title={isHidden ? 'Show Category' : 'Hide Category'}>
                <IconButton onClick={() => setHideCategory(id, !isHidden)} size="small" color="inherit">
                  {isHidden
                    ? <VisibilityIcon />
                    : <VisibilityOffIcon />}
                </IconButton>
              </Tooltip>
              {Object.values(QUEST_CATEGORY).includes(id) &&
              <Tooltip title="Modify Residence/Castle claims">
                <IconButton onClick={() => openDialog(DIALOG_MY_GAME, RESIDENCE)} size="small" color="inherit">
                  <HomeIcon />
                </IconButton>
              </Tooltip>}
            </Toolbar>
          </AppBar>
          {!collapsed &&
          <div>
            {dailyQuestIds
            .sort((aid, bid) => {
              const a = instance ? quests.find(q => q.id === aid) : questData[aid];
              const b = instance ? quests.find(q => q.id === bid) : questData[bid];
              return sortBy('name')(a, b);
            })
            .map(qid => {
              const otherProps = {
                completed: pathOr(false, [qid])(completedQuests),
                hidden: pathOr(false, [qid])(hiddenQuests),
                region,
                rewardTypes,
                setQuestStatus,
                setQuestHide,
              };
              if (instance) {
                return (
                  <DailyQuest
                    key={`instance-${qid}`}
                    {...quests.find(q => q.id === qid)}
                    {...otherProps}
                    instance
                  />
                );
              } else {
                return (
                  <DailyQuest
                    key={`quest-${qid}`}
                    {...otherProps}
                    {...pathOr({}, [qid])(questData)}
                    id={qid}
                  />
                );
              }
            })}
          </div>}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ dailies: { collapsedCategories, hiddenCategories, hideComplete, quests: completedQuests, showHidden, hiddenQuests, region, rewards }, gameData: { quests: questData, rewardTypes }, myGame: { castles, residence } }, { id, quests, instance }) => {
  if (instance) {
    quests = quests.map(q => q.id);
  }

  return ({
    collapsed: pathOr(false, [id])(collapsedCategories || {}) === true,
    hidden: pathOr(false, [id])(hiddenCategories || {}) === true && !showHidden,
    isHidden: pathOr(false, [id])(hiddenCategories || {}) === true,
    hideComplete,
    showHidden,
    completedQuests: Object.keys(completedQuests || {}).filter(key => quests.includes(Number.parseInt(key))).reduce((obj, key) => {
      obj[key] = completedQuests[key];
      return obj;
    }, {}),
    hiddenQuests: Object.keys(hiddenQuests || {}).filter(key => quests.includes(Number.parseInt(key))).reduce((obj, key) => {
      obj[key] = hiddenQuests[key];
      return obj;
    }, {}),
    // completedQuests,
    // hiddenQuests,
    region: region || 'NA',
    rewardTypes: Object.values(rewardTypes),
    questData,
    castles,
    residence,
    rewards,
  });
};

const mapDispatchToProps = {
  setCollapseCategory,
  setHideCategory,
  setQuestStatus,
  setQuestHide,
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyCategory);
