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

  render() {
    const { freshness } = this.props;

    const data = Object.values(FRESHNESS).find(f => f.name === freshness);
    const profits = Object.keys(data).filter(k => k !== 'name');

    return (
      <Tooltip
        title={<Table size="small" className="freshness-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center" className={`freshness ${freshness}`}>
                {freshness} Packs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profits.map(p => {
              const { modifier, time } = data[p];
              return (
                <TableRow key={`profit-${p}`}>
                  <TableCell>
                    {p.substr(0, 1)}{p.toLowerCase().substr(1)} Profit
                  </TableCell>
                  <TableCell>
                    {modifier >= 1 && `+${Math.round((modifier - 1) * 100)}% ${time}`}
                    {modifier < 1 && `-${Math.round((1 - modifier) * 100)}% ${time}`}
                  </TableCell>
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
