import { Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getItemPrice } from 'actions/itemPrice';
import Currency from 'components/Currency';
import Item from 'components/Item/Item';
import ItemPrice from 'components/Item/ItemPrice';
import {
  BOND_QUANTITY,
  BOND_ZONE_MATERIAL,
} from 'constants/bluesaltbonds';
import { CURRENCY } from 'constants/items';
import React, { Component } from 'react';
import { func } from 'react-proptypes';
import { connect } from 'react-redux';
import { countAll } from 'utils/array';

class BondCalculator extends Component {
  static propTypes = {
    getItemPrice: func.isRequired,
  };

  static defaultProps = {};

  state = {};

  render() {
    const { getItemPrice } = this.props;
    const bondValues = {};
    Object.keys(BOND_ZONE_MATERIAL).forEach(itemId => {
      bondValues[itemId] = [];
      Object.entries(BOND_QUANTITY).forEach(([qty, reward]) => {
        const base = getItemPrice(itemId) * -10000 * qty;
        const total = (base + reward);
        bondValues[itemId].push({ base, reward, total });
      });
    });

    const total = countAll(Object.values(bondValues).map(vs => countAll(vs.map(v => v.total))));

    return (
      <div className="bond-calculator">
        <Paper>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="title-text">
                Bond Value Calculator
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="bond-table">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Item
                  </TableCell>
                  <TableCell>
                    Unit Price
                  </TableCell>
                  {Object.keys(BOND_QUANTITY).map(qty => (
                    <TableCell key={`bsb-ch-${qty}`}>
                      <span className="dropdown-icon quest" /> {qty}
                    </TableCell>
                  ))}
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(BOND_ZONE_MATERIAL).map(itemId => {
                  const bondsTotal = countAll(bondValues[itemId].map(v => v.total));
                  return (
                    <TableRow key={`bsb-c-${itemId}`}>
                      <TableCell>
                        <Item id={Number(itemId)} count={0} inline />
                      </TableCell>
                      <TableCell>
                        <ItemPrice itemId={Number(itemId)} unitSize={1} inTable />
                      </TableCell>
                      {bondValues[itemId].map((bondValue, i) => (
                        <TableCell
                          key={`bsb-c-${itemId}-${i}`}
                        >
                          <Tooltip
                            title={<Typography>
                              <Currency type={CURRENCY.COIN} count={bondValue.base} inline /> + <Currency
                              type={CURRENCY.COIN} count={bondValue.reward} inline /> (Reward)</Typography>}>
                            <div><Currency type={CURRENCY.COIN} count={bondValue.total} inline /></div>
                          </Tooltip>
                        </TableCell>
                      ))}
                      <TableCell>
                        <Tooltip
                          title={
                            <Typography>
                              <Currency type={CURRENCY.COIN} count={bondsTotal / bondValues[itemId].length} inline />
                              &nbsp;per Bond
                            </Typography>
                          }
                        >
                          <div><Currency type={CURRENCY.COIN} count={bondsTotal} /></div>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={2} />
                  {Object.keys(BOND_QUANTITY).map((_, i) => {
                    const colTotal = countAll(Object.values(bondValues).map(v => v[i].total));
                    return (
                      <TableCell key={`bsb-ct-${i}`}>
                        <Tooltip
                          title={
                            <Typography>
                              <Currency
                                type={CURRENCY.COIN}
                                count={colTotal / Object.keys(BOND_ZONE_MATERIAL).length}
                                inline
                              /> per Bond
                            </Typography>
                          }
                        >
                          <div><Currency type={CURRENCY.COIN} count={colTotal} /></div>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Tooltip
                      title={
                        <Typography>
                          <Currency
                            type={CURRENCY.COIN}
                            count={total / (Object.keys(BOND_ZONE_MATERIAL).length * Object.keys(BOND_QUANTITY).length)}
                            inline
                          /> per Bond
                        </Typography>
                      }
                    >
                      <div><Currency type={CURRENCY.COIN} count={total} /></div>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ itemPrice }) => ({
  itemPrice,
});

const mapDispatchToProps = {
  getItemPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(BondCalculator);
