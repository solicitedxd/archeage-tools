import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import {
  array,
  bool,
  string,
} from 'react-proptypes';

const Ability = ({ name, description, counters, deadly }) => (
  <ExpansionPanel elevation={2}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${name}-content`}
      id={`${name}-content`}
    >
      <Typography>
        {deadly === true &&
        <Tooltip title="Caution! Deadly Ability">
          <span className="deadly-icon" />
        </Tooltip>
        }
        {name}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {description &&
      <Typography>
        {description}
      </Typography>}
      {counters !== undefined && counters.length > 0 &&
      <>
        <Typography variant="subtitle2" color="primary" component="div" className="tips">Tips:</Typography>
        <ul className="dashed">
          {counters.map((tip, i) => <li key={`${name}-${i}`}><Typography component="span">{tip}</Typography></li>)}
        </ul>
      </>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

Ability.propTypes = {
  name: string.isRequired,
  description: string,
  counters: array,
  deadly: bool,
};

Ability.defaultProps = {
  description: null,
  counters: [],
  deadly: false,
};

export default Ability;
