import { Skeleton } from '@material-ui/lab';
import { fetchSkill } from 'actions/gameData';
import cn from 'classnames';
import SkillTooltip from 'components/Skill/SkillTooltip';
import { pathOr } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { getPointReq } from 'utils/skills';

class Skill extends Component {
  static propTypes = {
    id: number.isRequired,
    learned: bool,
    spentPoints: number,
    remainingPoints: number,
    onClick: func,
    noRequirement: bool,
    disableTooltip: bool,
    ancestral: bool,
    className: string,
    icon: string,
    requiredLevel: number,
    passive: bool,
  };

  static defaultProps = {
    learned: false,
    spentPoints: 0,
    remainingPoints: 0,
    onClick: () => {
    },
    noRequirement: false,
    disableTooltip: false,
    ancestral: false,
  };

  componentDidMount() {
    fetchSkill(this.props.id);
  }

  render() {
    const { spentPoints, onClick, learned, remainingPoints, noRequirement, className, disableTooltip, ancestral } = this.props;
    const { id, icon, requiredLevel, passive } = this.props;
    const pointsRequired = passive ? requiredLevel : getPointReq(requiredLevel);
    const disabled = passive ? !learned
      : !learned && !ancestral && (spentPoints < pointsRequired || remainingPoints === 0);

    if (!icon) {
      return (
        <span className={cn('skill', className)}>
          <Skeleton
            variant="rect"
            width="100%"
            height="100%"
          />
        </span>
      );
    }

    return (
      <SkillTooltip
        skillId={id}
        disabled={disabled && spentPoints < pointsRequired}
        spentPoints={spentPoints}
        disableTooltip={disableTooltip}
      >
        <span
          className={cn('skill', className, { disabled, 'available': !disabled && !learned, ancestral })}
          onClick={disabled ? null : onClick}
          data-points-req={ancestral || learned || noRequirement || spentPoints >= pointsRequired ? 0 : pointsRequired}
        >
          <img src={`/images/icon/${icon}.png`} alt="" />
        </span>
      </SkillTooltip>
    );
  }
}

const mapStateToProps = ({ gameData: { skills } }, { id }) => ({
  ...pathOr({}, [id])(skills),
});

export default connect(mapStateToProps, null)(Skill);
