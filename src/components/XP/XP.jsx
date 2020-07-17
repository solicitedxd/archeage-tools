import { Typography } from '@material-ui/core';
import React from 'react';
import { string } from 'react-proptypes';

const XP = ({ type, count }) => {
  return <Typography className="xp">{count} {type}</Typography>;
};

XP.propTypes = {
  type: string.isRequired,
  count: string.isRequired,
};

export default XP;
