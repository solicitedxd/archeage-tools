import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import {
  array,
  string,
} from 'react-proptypes';
import { percentModifier } from 'utils/number';

class FreshnessBlip extends Component {
  static propTypes = {
    name: string,
    profitLevels: array,
  };

  render() {
    const { name, profitLevels } = this.props;

    const standard = profitLevels.filter(pL => !pL.aged);
    const aged = profitLevels.filter(pL => pL.aged);
    const hasAged = aged.length > 0;

    return (
      <Tooltip
        title={<Table size="small" className="freshness-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={hasAged ? 4 : 2} align="center" className={`freshness ${name}`}>
                {name} Packs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hasAged &&
            <TableRow>
              <TableCell colSpan={2} align="center">Regular</TableCell>
              <TableCell colSpan={2} align="center">Aged</TableCell>
            </TableRow>}
            {standard.map((standardPL, i) => {
              const agedPL = aged[i];
              return (
                <TableRow key={`profit-${name}-${standardPL.name}`} className="profit-row">
                  <TableCell>
                    {standardPL.name} Profit
                  </TableCell>
                  <TableCell>
                    {percentModifier(standardPL.modifier)} {standardPL.time}
                  </TableCell>
                  {hasAged && agedPL &&
                  <>
                    <TableCell>
                      {agedPL.name} Profit
                    </TableCell>
                    <TableCell>
                      {percentModifier(agedPL.modifier)} {agedPL.time}
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
          <span className={`blip freshness ${name}`} /> {name}
        </Typography>
      </Tooltip>
    );
  }
}

export default FreshnessBlip;
