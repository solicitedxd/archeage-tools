import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  deleteBuilding,
  setHostileBuilding,
} from 'actions/taxes';
import Item from 'components/Item';
import { HOSTILE_FACTION_TAX } from 'constants/taxes';
import React, { Component } from 'react';
import {
  array,
  func,
  number,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { filterByCharacter } from 'utils/array';

class PropertyTable extends Component {
  static propTypes = {
    deleteBuilding: func.isRequired,
    setHostileBuilding: func.isRequired,
    calculateTax: func.isRequired,
    heavyTaxProperties: number,
    heavyTaxRate: number,
    properties: array,
    character: number,
  };

  static defaultProps = {
    buildings: [],
  };

  render() {
    const { properties: buildings, deleteBuilding, setHostileBuilding, calculateTax, heavyTaxProperties, heavyTaxRate, character } = this.props;

    const properties = buildings.filter(filterByCharacter(character));

    return (
      <Table className="property-table" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              Property
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              Hostile Zone
            </TableCell>
            <TableCell align="right">
              Base Tax
            </TableCell>
            <TableCell align="right">
              Rate Increase
            </TableCell>
            <TableCell align="right">
              Tax per Week
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map(property => {
            const { baseTax, heavyTaxFee, hostileFee, totalTax } = calculateTax(property, heavyTaxRate);

            return (
              <TableRow key={`property-${property.index}`}>
                <TableCell>
                  <Item id={property.itemId} inline /> {property.name}
                </TableCell>
                <TableCell>
                  {property.group}
                  {property.exempt &&
                  <Tooltip
                    title={
                      <>
                        <Typography style={{ textDecoration: 'underline' }}>Heavy Tax Rate Exemption</Typography>
                        <Typography variant="body2">
                          This building exempt from the heavy building tax rate fees. You will only pay the base tax
                          rate and hostile zone rate, if in a hostile zone, and it does not count towards the number of
                          heavy tax buildings.
                        </Typography>
                      </>
                    }
                  >
                    <span>&nbsp;<span className="hint">(Rate Exempt)</span></span>
                  </Tooltip>}
                </TableCell>
                <TableCell>
                  <Checkbox
                    onChange={() => setHostileBuilding(property.index, !property.hostile)}
                    checked={property.hostile}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {baseTax}
                </TableCell>
                <TableCell align="right">
                  {heavyTaxFee > 0 &&
                  <Tooltip title={`${heavyTaxProperties} Heavy Tax Properties: +${heavyTaxRate * 100}%`}>
                    <span className="hint">{heavyTaxFee}</span>
                  </Tooltip>}
                  {heavyTaxFee > 0 && hostileFee > 0 && <>&nbsp;+&nbsp;</>}
                  {hostileFee > 0 &&
                  <Tooltip title={`Hostile Faction Tax: +${HOSTILE_FACTION_TAX * 100}%`}>
                    <span className="hint">{hostileFee}</span>
                  </Tooltip>}
                  {heavyTaxFee === 0 && hostileFee === 0 && <>0</>}
                </TableCell>
                <TableCell align="right">
                  {totalTax}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteBuilding(property.index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          {properties.length === 0 &&
          <TableRow>
            <TableCell colSpan={6} align="center">
              No properties to display.
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = ({ gameData: { items } }) => ({
  items,
});

const mapDispatchToProps = {
  deleteBuilding,
  setHostileBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyTable);
