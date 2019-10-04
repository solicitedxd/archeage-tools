import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ type, count }) => {
  return <Typography className="xp">{count} {type}</Typography>;
}
