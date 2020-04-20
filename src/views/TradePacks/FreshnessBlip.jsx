import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FRESHNESS } from 'constants/tradepacks';
import React, { Component } from 'react';
import { oneOf } from 'react-proptypes';

class FreshnessBlip extends Component {
  static propTypes = {
    freshness: oneOf(Object.values(FRESHNESS).map(f => f.name)).isRequired,
  };

  getModifier = (modifier) => {
    if (modifier >= 1) {
      return `+${Math.round((modifier - 1) * 100)}%`;
    } else {
      return `-${Math.round((1 - modifier) * 100)}%`;
    }
  };

  getName = (key) => `${key.substr(0, 1)}${key.toLowerCase().substr(1)}`;

  render() {
    const { freshness } = this.props;

    const data = Object.values(FRESHNESS).find(f => f.name === freshness);

    return (
      <Tooltip
        title={<Table size="small" className="freshness-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={data.AGED ? 4 : 2} align="center" className={`freshness ${freshness}`}>
                {freshness} Packs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.AGED &&
            <TableRow>
              <TableCell colSpan={2} align="center">Regular</TableCell>
              <TableCell colSpan={2} align="center">Aged</TableCell>
            </TableRow>}
            {Object.keys(data.STANDARD).map((p, i) => {
              const STANDARD = data.STANDARD[p];
              const { AGED } = data;
              const agedKey = AGED && Object.keys(AGED)[i];
              return (
                <TableRow key={`profit-${p}`} className="profit-row">
                  <TableCell>
                    {this.getName(p)} Profit
                  </TableCell>
                  <TableCell>
                    {this.getModifier(STANDARD.modifier)} {STANDARD.time}
                  </TableCell>
                  {AGED &&
                  <>
                    <TableCell>
                      {this.getName(agedKey)} Profit
                    </TableCell>
                    <TableCell>
                      {this.getModifier(AGED[agedKey].modifier)} {AGED[agedKey].time}
                    </TableCell>
                  </>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
        classes={{ tooltip: 'freshness-tip-container' }}
      >
        <Typography variant="overline" className="freshness-tip">
          <span className={`blip freshness ${freshness}`} /> {freshness}
        </Typography>
      </Tooltip>
    );
  }
}

export default FreshnessBlip;
