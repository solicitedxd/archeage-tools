import { Typography } from '@material-ui/core';
import React from 'react';

export default ({ type, count }) => {
  return <Typography className="xp">{count} {type}</Typography>;
}
