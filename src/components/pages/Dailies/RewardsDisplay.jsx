import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Currency from 'components/Currency';
import Item from 'components/Item';
import XP from 'components/XP';
import React, { Component } from 'react';
import {
  array,
  bool,
  string,
} from 'react-proptypes';
import { splitRewards } from 'utils/dailies';

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
    const { rewardItems, rewardItemChoices, rewardXps, rewardCurrencies } = splitRewards(rewards);

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
            {rewardItems.concat(rewardItemChoices).sort().map(item =>
              <Item key={`ir-${item.item}`} id={item.item} count={item.count} />,
            )}
          </div>
          {rewards.length === 0 && <Typography variant="subtitle1">No rewards</Typography>}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RewardsDisplay;
