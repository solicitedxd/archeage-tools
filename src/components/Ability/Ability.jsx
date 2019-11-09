import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const Ability = ({ name, description, counters, deadly }) => (
  <ExpansionPanel elevation={2}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMore />}
      aria-controls={`${name}-content`}
      id={`${name}-content`}
    >
      <Typography>
        {deadly === true &&
        <Tooltip title={'Caution! Deadly Ability'}>
          <span className="deadly-icon" />
        </Tooltip>
        }
        {name}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        {description}
      </Typography>
      {counters !== undefined && counters.length > 0 &&
      <React.Fragment>
        <Typography variant="subtitle2" color="primary" component="div" className="tips">Tips:</Typography>
        <ul className="dashed">
          {counters.map((tip, i) => <li key={`${name}-${i}`}><Typography component="span">{tip}</Typography></li>)}
        </ul>
      </React.Fragment>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default Ability;
