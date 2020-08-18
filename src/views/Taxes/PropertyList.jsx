import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
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

class PropertyList extends Component {
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

    if (properties.length === 0) {
      return (
        <Typography align="center" style={{ padding: '8px 0' }}>
          No properties to display.
        </Typography>
      );
    }

    return properties.map(property => {
      const { baseTax, heavyTaxFee, hostileFee, totalTax } = calculateTax(property, heavyTaxRate);

      return (
        <Card className="property-card" key={`property-${property.index}`} variant="outlined">
          <CardContent>
            <Typography variant="h6">
              <Item id={property.itemId} inline /> {property.name}
            </Typography>
            <Typography className="property-type" color="textSecondary" gutterBottom>
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
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Base Tax</TableCell>
                  <TableCell align="right">{baseTax}</TableCell>
                </TableRow>
                {heavyTaxFee > 0 &&
                <TableRow>
                  <TableCell>Heavy Tax</TableCell>
                  <TableCell align="right">
                    <Tooltip title={`${heavyTaxProperties} Heavy Tax Properties: +${heavyTaxRate * 100}%`}>
                      <span className="hint">{heavyTaxFee}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>}
                {hostileFee > 0 &&
                <TableRow>
                  <TableCell>Hostile Tax</TableCell>
                  <TableCell align="right">
                    <Tooltip title={`Hostile Faction Tax: +${HOSTILE_FACTION_TAX * 100}%`}>
                      <span className="hint">{hostileFee}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>}
                <TableRow>
                  <TableCell>Total per Week</TableCell>
                  <TableCell align="right">{totalTax}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="property-actions">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setHostileBuilding(property.index, !property.hostile)}
                    checked={property.hostile}
                    color="primary"
                    size="small"
                  />
                }
                label="In Hostile Zone"
              />
              <IconButton onClick={() => deleteBuilding(property.index)} size="small">
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      );
    });
  }
}

const mapStateToProps = ({ gameData: { items } }) => ({
  items,
});

const mapDispatchToProps = {
  deleteBuilding,
  setHostileBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
