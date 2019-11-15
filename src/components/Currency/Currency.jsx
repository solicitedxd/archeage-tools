import React from 'react';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import { REWARD } from 'constants/dailies';

export default ({ type, count, style, component = 'p' }) => {
  if (type === REWARD.COIN) {
    const copper = count % 100;
    const silver = Math.floor(count / 100) % 100;
    const gold = Math.floor(count / 10000);

    return (
      <Typography
        style={style}
        component={component}
      >
        {gold > 0 && <span className="currency gold">{gold}</span>}
        {silver > 0 && <span className="currency silver">{silver}</span>}
        {copper > 0 && <span className="currency copper">{copper}</span>}
      </Typography>
    );
  } else {
    return (
      <Typography
        className={cn('currency', type)}
        component={component}
        style={style}
      >
        {count}
      </Typography>
    );
  }
}
