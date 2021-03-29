import {
  Link,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  fetchQuest,
  fetchQuestCategories,
} from 'actions/gameData';
import cn from 'classnames';
import {
  FLAG_DAILY,
  FLAG_REPEATABLE,
  FLAG_WEEKLY,
} from 'constants/dailies';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  array,
  bool,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import QuestTooltip from './QuestTooltip';

class QuestLink extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string,
    style: object,
    noLink: bool,
    region: string,
    flags: array,
    categoryId: number,
    category: object,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    fetchQuest(this.props.id);
    fetchQuestCategories();
  }

  render() {
    const { id, name, flags: flagsD, style, noLink, region, categoryId, category } = this.props;

    if (!name) {
      return <Skeleton variant="text" style={{ display: 'inline-block', marginLeft: 4, width: 80 }} />;
    }

    const flags = flagsD.filter(f => f.region === region);

    let icon = 'quest';

    if (flags.find(f => f.code === FLAG_DAILY) || flags.find(f => f.code === FLAG_WEEKLY)) {
      icon = 'daily';
    } else if (flags.find(f => f.code === FLAG_REPEATABLE)) {
      icon = 'repeat';
    } else if (categoryId === 70) {
      icon = 'vocation';
    } else if (category.storyCategory) {
      icon = 'story';
    }

    if (noLink) {
      return (
        <Typography component="span" style={style}>
          <span className={cn('quest-icon', icon)} /> {name}
        </Typography>
      );
    }

    return (
      <QuestTooltip questId={id} disabled={!name}>
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className={cn('quest-icon', icon)} />
          <Link className="inline-link" style={style}>
            {name}
          </Link>
        </span>
      </QuestTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { quests, questCategories }, dailies: { region } }, { id }) => {
  const quest = pathOr({}, [id])(quests);
  return {
    ...quest,
    region: region || 'NA',
    category: (quest && questCategories[quest.categoryId]) || {},
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestLink);
