import {
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import React, { Component } from 'react';
import {
  array,
  bool,
  func,
  number,
  string,
} from 'react-proptypes';

class PropertyBox extends Component {
  static propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    size: string,
    base: number.isRequired,
    onChange: func.isRequired,
    properties: array,
    values: array,
    showHostile: bool,
  };

  static defaultProps = {
    size: '0x0',
    properties: [],
    values: [],
    showHostile: false,
  };

  state = {};

  render() {
    const { id, name, size, base, onChange, properties, values, showHostile } = this.props;

    return (
      <div className="property-box">
        <Typography variant="subtitle1" className="property-name">
          {name}
          <Tooltip title={<div dangerouslySetInnerHTML={{ __html: properties.join('<br />') }} />}>
            <Help fontSize="small" color="primary" className="help-icon" />
          </Tooltip>
        </Typography>
        <Typography className="property-size" color="textPrimary">{size}, {base} per week</Typography>
        <div className="property-input">
          <TextField
            id={`${id}-friendly`}
            label={showHostile ? 'Friendly Property Count' : 'Property Count'}
            value={values[0]}
            onChange={onChange(id, 0)}
            margin="normal"
            variant="filled"
          />
          {showHostile &&
          <Tooltip title="Friendly Territory is of the continent of your home faction.">
            <Help fontSize="small" color="primary" className="help-icon" />
          </Tooltip>}
        </div>
        {showHostile &&
        <div className="property-input">
          <TextField
            id={`${id}-enemy`}
            label="Hostile Property Count"
            value={values[1]}
            onChange={onChange(id, 1)}
            margin="normal"
            variant="filled"
          />
          <Tooltip title="Hostile Territory is any of the continents not of your home faction.">
            <Help fontSize="small" color="primary" className="help-icon" />
          </Tooltip>
        </div>}
      </div>
    );
  }
}

export default PropertyBox;
