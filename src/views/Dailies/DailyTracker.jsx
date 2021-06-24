import {
  AppBar,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FilterListIcon from '@material-ui/icons/FilterList';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  setCollapseCategory,
  setHideCompleted,
  setQuestFaction,
  setQuestRegion,
  setQuestStatus,
  setRewardFilter,
  setShowHidden,
  updateLastVisit,
} from 'actions/dailies';
import {
  fetchDailyQuests,
  fetchEvents,
  fetchFestivals,
  fetchInstances,
  fetchQuestRefData,
  fetchVocations,
} from 'actions/gameData';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import ScrollToTop from 'components/ScrollToTop';
import {
  CUSTOM_REWARDS,
  FACTIONS,
  FLAG_DAILY,
  FLAG_WEEKLY,
  HIDDEN_REWARDS,
  QUEST_INSTANCE_OFFSET,
  QUEST_REGIONS,
} from 'constants/dailies';
import debounce from 'lodash.debounce';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  object,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  sortBy,
  toggleValue,
} from 'utils/array';
import {
  deepCopy,
  objectHasProperties,
} from 'utils/object';
import { getDayKey } from 'utils/schedule';
import { setTitle } from 'utils/string';
import { hhmmssFromDate } from 'utils/time';
import DailyCategory from 'views/Dailies/DailyCategory';

class DailyTracker extends Component {
  static propTypes = {
    region: string,
    mobile: bool,
    dailyQuests: array,
    festivals: object,
    instances: object,
    fetchEvents: func.isRequired,
    fetchDailyQuests: func.isRequired,
    fetchFestivals: func.isRequired,
    fetchInstances: func.isRequired,
    setQuestRegion: func.isRequired,
    faction: number,
    setQuestFaction: func.isRequired,
    setShowHidden: func.isRequired,
    setHideCompleted: func.isRequired,
    showHidden: bool,
    hideComplete: bool,
    setCollapseCategory: func.isRequired,
    fetchQuestRefData: func.isRequired,
    quests: object,
    completedQuests: object,
    events: object,
    setQuestStatus: func.isRequired,
    lastVisit: oneOfType([string, object]),
    updateLastVisit: func.isRequired,
    fetchVocations: func.isRequired,
    rewards: array,
    setRewardFilter: func.isRequired,
    rewardTypes: object,
  };

  static defaultProps = {
    rewards: [],
  };

  state = {
    width: 0,
    categories: [],
    weeklyIds: [],
    dailyReset: null,
    weeklyReset: null,
    resetTimer: 0,
    rewardMenu: null,
  };

  ref = React.createRef();

  resetTick;

  componentDidMount() {
    const { events, lastVisit, festivals, instances, dailyQuests } = this.props;

    this.props.fetchQuestRefData();
    this.props.fetchVocations();
    this.props.fetchFestivals();
    this.props.fetchInstances();
    this.props.fetchEvents();
    this.props.fetchDailyQuests();
    window.addEventListener('resize', this._handleResize);
    this.resetTick = setInterval(this.handleTick, 1000);

    if (objectHasProperties(events)) {
      if (lastVisit) {
        this.initCheckReset(events);
      }
      this.props.updateLastVisit();
    }

    if (objectHasProperties(festivals) && objectHasProperties(instances) && dailyQuests.length) {
      this.initQuestData(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { festivals, instances, dailyQuests, faction, region, events, lastVisit } = nextProps;
    if (faction !== this.props.faction || region !== this.props.region ||
      (objectHasProperties(festivals) && objectHasProperties(instances) && dailyQuests.length &&
        (!objectHasProperties(this.props.festivals) || !objectHasProperties(this.props.instances) || !this.props.dailyQuests.length))) {
      this.initQuestData(nextProps);
    }

    // calculate reset for quests when loading the page on a new day
    if (objectHasProperties(events) && !objectHasProperties(this.props.events)) {
      if (lastVisit) {
        this.initCheckReset(events);
      }

      this.props.updateLastVisit();
    }
  }

  initQuestData = (props) => {
    const { festivals, instances, dailyQuests, quests, faction, region } = props;

    let categories = [];
    const weeklyIds = [];

    categories = categories.concat(deepCopy(Object.values(festivals)).filter(festival => festival.active && festival.regions.includes(region)).map(festival => ({
      ...festival,
      id: `festival-${festival.id}`,
      festival: true,
    })));

    categories = categories.concat(deepCopy(Object.values(instances)).map(instance => ({
      ...instance,
      id: `instance-${instance.id}`,
      quests: instance.instances.filter(i => i.regions.includes(region)).map(i => ({
        ...i,
        id: i.id + QUEST_INSTANCE_OFFSET,
      })),
      instance: true,
    })));

    categories = categories.concat(deepCopy(dailyQuests).filter(dailyCat => {
      dailyCat.quests = dailyCat.quests.filter(qid => {
        const quest = quests[qid];
        const show = Math.floor(quest.factions / (2 ** (faction - 1))) % 2 && quest.flags.find(flag => flag.region === region && (flag.code === FLAG_WEEKLY || flag.code === FLAG_DAILY));
        if (show && quest.flags.find(flag => flag.region === region && flag.code === FLAG_WEEKLY)) {
          weeklyIds.push(qid);
        }
        return show;
      });
      return dailyCat.quests.length > 0;
    }).sort((a, b) => {
      const w = sortBy('sortWeight', false)(a, b);
      if (w === 0) {
        return sortBy('name')(a, b);
      }
      return w;
    }));

    const adCount = 8;
    const categoryCount = categories.length;
    for (let i = 0; i < adCount; i++) {
      const pos = (Math.floor(categoryCount / adCount) * (i + 1)) + i;
      categories.splice(pos, 0, 'ad');
    }

    this.setState({ categories, weeklyIds }, () => {
      this.handleResize();
      this.calculateDailyReset();

      setTimeout(this.handleResize, 5000);
    });
  };

  initCheckReset = (events) => {
    const { setQuestStatus, completedQuests, lastVisit: lastVisitRaw, region } = this.props;
    const { weeklyIds } = this.state;
    const now = moment.utc();

    const lastVisit = moment(lastVisitRaw);
    let dailyReset = false;
    let weeklyReset = false;

    // check for daily reset
    const dailyEvent = events[1];
    const dailyResetTime = dailyEvent && dailyEvent.times.find(time => time.region === region);
    if (dailyResetTime) {
      const [hh, mm, ss] = dailyResetTime.time.split(':');
      const dailyResetMoment = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
      while (dailyResetMoment.isAfter(now)) {
        dailyResetMoment.subtract(1, 'day');
      }
      dailyReset = lastVisit.isBefore(dailyResetMoment);
    }

    // check for weekly reset
    const weeklyEvent = events[2];
    const weeklyResetTime = weeklyEvent && weeklyEvent.times.find(time => time.region === region);
    if (weeklyResetTime) {
      const { time, days } = weeklyResetTime;
      const [hh, mm, ss] = time.split(':');
      let weeklyResetMoment = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
      while (days.length > 0 && !days.includes(getDayKey(weeklyResetMoment.day())) && weeklyResetMoment.isAfter(now)) {
        weeklyResetMoment.subtract(1, 'day');
      }

      weeklyReset = lastVisit.isBefore(weeklyResetMoment);
    }

    if (weeklyReset) {
      setQuestStatus(Object.keys(completedQuests), false);
    } else if (dailyReset) {
      setQuestStatus(Object.keys(completedQuests).filter((questId) => !weeklyIds.includes(Number.parseInt(questId))), false);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.showHidden !== this.props.showHidden || prevProps.hideComplete !== this.props.hideComplete) {
      this._handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    clearInterval(this.resetTick);
  }

  resizeGridItem = (item) => {
    const grid = document.getElementsByClassName('daily-grid')[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const contentElement = item.querySelector('.content');
    if (contentElement) {
      const rowSpan = Math.ceil((contentElement.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)) + item.style.marginBottom;
      item.style.gridRowEnd = 'span ' + rowSpan;
    }
  };

  handleResize = () => {
    const allItems = document.getElementsByClassName('daily-category');
    for (let i = 0; i < allItems.length; i++) {
      this.resizeGridItem(allItems[i]);
    }
  };

  _handleResize = debounce(this.handleResize, 100);

  handleTick = () => {
    const { completedQuests, setQuestStatus } = this.props;
    const { dailyReset, weeklyReset, weeklyIds } = this.state;
    const now = moment.utc().milliseconds(0);

    if (dailyReset === null || dailyReset.diff(now) === 0) {
      if (weeklyReset !== null && weeklyReset.diff(now) === 0) {
        setQuestStatus(Object.keys(completedQuests), false);
      } else {
        setQuestStatus(Object.keys(completedQuests).filter((questId) => !weeklyIds.includes(Number.parseInt(questId))), false);
      }
      this.calculateDailyReset();
    } else {
      this.setState({ resetTimer: moment() });
    }
  };

  calculateDailyReset = () => {
    const { events, region } = this.props;
    const now = moment.utc();
    let dailyReset = null;
    let weeklyReset = null;

    // daily reset
    const dailyEvent = events[1];
    const dailyResetTime = dailyEvent && dailyEvent.times.find(time => time.region === region);
    if (dailyResetTime) {
      const [hh, mm, ss] = dailyResetTime.time.split(':');
      dailyReset = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
      if (dailyReset.isBefore(now)) {
        dailyReset.add(1, 'day');
      }
    }

    // weekly reset
    const weeklyEvent = events[2];
    const weeklyResetTime = weeklyEvent && weeklyEvent.times.find(time => time.region === region);
    if (weeklyResetTime) {
      const { time, days } = weeklyResetTime;
      const [hh, mm, ss] = time.split(':');
      weeklyReset = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);
      if (weeklyReset.isBefore(now)) {
        weeklyReset.add(1, 'day');
      }
      while (days.length > 0 && !days.includes(getDayKey(weeklyReset.day()))) {
        weeklyReset.add(1, 'day');
      }
    }

    this.setState({ dailyReset, weeklyReset }, this._handleResize);
  };

  handleRewardOpen = (e) => {
    this.setState({ rewardMenu: e.currentTarget });
  };

  handleRewardClose = () => {
    this.setState({ rewardMenu: null });
  };

  toggleRewardFilter = (value) => {
    const { rewards: rewardsOld, setRewardFilter } = this.props;
    let rewards = [...rewardsOld];
    toggleValue(rewards, value);
    setRewardFilter(rewards);
  };

  render() {
    const { region, faction, rewards, rewardTypes, showHidden, hideComplete, mobile } = this.props;
    const { setQuestRegion, setQuestFaction, setShowHidden, setHideCompleted, setCollapseCategory } = this.props;
    const { categories, dailyReset, weeklyReset, rewardMenu } = this.state;

    setTitle('Daily Tracker');

    const catIds = categories.map(c => c.id);

    const ResetTimers = (
      <Typography variant="body2" className="reset-timer">
        {dailyReset &&
        <span>Dailies reset in {hhmmssFromDate(dailyReset.diff(moment()))}.</span>}
        {weeklyReset &&
        <span>Weeklies reset in {hhmmssFromDate(weeklyReset.diff(moment()))}.</span>}
      </Typography>
    );

    const ToggleButtons = (
      <>
        <Tooltip title="Collapse All">
          <IconButton onClick={() => setCollapseCategory(catIds, true)} size="small" color="inherit">
            <DoubleArrowIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Expand All">
          <IconButton onClick={() => setCollapseCategory(catIds, false)} size="small" color="inherit">
            <DoubleArrowIcon style={{ transform: 'rotate(90deg)' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={showHidden ? 'Hide Hidden' : 'Show Hidden'}>
          <IconButton onClick={() => setShowHidden(!showHidden)} size="small" color="inherit">
            {showHidden
              ? <VisibilityOffIcon />
              : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={hideComplete ? 'Show Completed' : 'Hide Completed'}>
          <span>
            <IconButton
              onClick={() => setHideCompleted(!hideComplete)} disabled={showHidden} size="small" color="inherit">
              {!showHidden && hideComplete
                ? <RadioButtonUncheckedIcon />
                : <CheckCircleIcon />}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Filter by Rewards">
          <IconButton onClick={this.handleRewardOpen} size="small" color="inherit">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="reward-filter-menu"
          anchorEl={rewardMenu}
          keepMounted
          open={Boolean(rewardMenu)}
          onClose={this.handleRewardClose}
          variant="menu"
        >
          {Object.values(rewardTypes)
          .filter(type => !HIDDEN_REWARDS.includes(type.name))
          .map(type => (
            <MenuItem
              key={`reward-type-${type.id}`}
              selected={rewards.includes(type.id)}
              onClick={() => this.toggleRewardFilter(type.id)}
            >
              <ListItemIcon style={{ minWidth: 32 }}>
                <span className={cn('dropdown-icon', type.icon)} />
              </ListItemIcon>
              {type.name}
            </MenuItem>
          ))}
          <Divider />
          {CUSTOM_REWARDS
          .map(type => (
            <MenuItem
              key={`reward-type-${type.id}`}
              selected={rewards.includes(type.id)}
              onClick={() => this.toggleRewardFilter(type.id)}
            >
              <ListItemIcon style={{ minWidth: 32 }}>
                <span className={cn('dropdown-icon', type.icon)} />
              </ListItemIcon>
              {type.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );

    return (
      <div className="daily-container">
        <Paper className="section section-header">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5">
                Daily Tracker
              </Typography>
              {!mobile && ResetTimers}
              <div className="title-text" />
              {!mobile && ToggleButtons}
              <FormControl className="color-white">
                <InputLabel id="faction-label">Faction</InputLabel>
                <Select
                  labelId="faction-label"
                  id="faction-select"
                  value={Number(faction) || 1}
                  onChange={(e) => setQuestFaction(e.target.value)}
                >
                  {Object.values(FACTIONS).map(faction =>
                    <MenuItem key={`faction-${faction.id}`} value={faction.id}>{faction.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className="color-white">
                <InputLabel id="region-label">Publisher</InputLabel>
                <Select
                  labelId="region-label"
                  id="region-select"
                  value={region}
                  onChange={(e) => setQuestRegion(e.target.value)}
                  className="region-opt"
                >
                  {Object.entries(QUEST_REGIONS).map(([region, publisher]) => (
                    <MenuItem key={`region-${region}`} value={region}>{publisher}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Toolbar>
          </AppBar>
        </Paper>
        {mobile &&
        <AppBar position="static" className="section">
          <Toolbar>
            {ResetTimers}
            <div className="title-text" />
            {ToggleButtons}
          </Toolbar>
        </AppBar>}
        {mobile &&
        <AppBar position="static" className="section">
          <Toolbar variant="dense" disableGutters style={{ overflowX: 'auto' }}>
            <div className="filter-field padded">
              <ButtonGroup size="small">
                {[...Object.values(rewardTypes), ...CUSTOM_REWARDS]
                .filter(type => !HIDDEN_REWARDS.includes(type.name))
                .map(type => (
                  <Tooltip title={type.name} key={`reward-type-${type.id}`}>
                    <Button
                      variant={rewards.includes(type.id) ? 'contained' : 'outlined'}
                      className={cn({ selected: rewards.includes(type.id) })}
                      onClick={() => this.toggleRewardFilter(type.id)}
                    >
                      <span className={cn('dropdown-icon', type.icon)} />
                    </Button>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </div>
          </Toolbar>
        </AppBar>}
        {categories.length === 0 &&
        <div className="section" style={{ width: 128 }}>
          <CircularProgress size={128} color="primary" />
        </div>}
        {categories.length > 0 &&
        <div className="section daily-grid" ref={this.ref}>
          {categories
          .map((questCat, i) => {
            if (questCat === 'ad') {
              return (
                <div className="daily-category" key={`quest-ad-${i}`}>
                  <AdContainer section={false} content={true} type="feed" />
                </div>
              );
            }
            return (
              <DailyCategory
                key={`quest-cat-${questCat.id}`}
                onUpdate={this._handleResize}
                {...questCat}
              />
            );
          })}
        </div>}
        <ScrollToTop />
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({
                           display: { mobile },
                           gameData: { dailyQuests, festivals, instances, quests, events, rewardTypes },
                           dailies: {
                             faction,
                             showHidden,
                             hideComplete,
                             region,
                             quests: completedQuests = {},
                             lastVisit,
                             rewards,
                           },
                         }) => {
  if (typeof faction === 'string') {
    faction = 1;
  }

  return {
    mobile,
    region: region || 'NA',
    dailyQuests,
    festivals,
    instances,
    quests,
    faction,
    showHidden,
    hideComplete,
    events,
    completedQuests,
    lastVisit,
    rewards,
    rewardTypes,
  };
};

const mapDispatchToProps = {
  fetchDailyQuests,
  fetchInstances,
  fetchFestivals,
  fetchEvents,
  setQuestRegion,
  setQuestFaction,
  setShowHidden,
  setHideCompleted,
  setCollapseCategory,
  fetchQuestRefData,
  setQuestStatus,
  updateLastVisit,
  fetchVocations,
  setRewardFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyTracker);
