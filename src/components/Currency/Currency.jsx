import { Typography } from '@material-ui/core';
import cn from 'classnames';
import { CURRENCY } from 'constants/items';
import React from 'react';

const Currency = ({ type, count, style, inline = false }) => {
  if (type === CURRENCY.COIN) {
    const negative = (count < 0);
    count = Math.abs(Math.round(count));

    const copper = Math.round(count % 100);
    const silver = Math.floor(count / 100) % 100;
    const gold = Math.floor(count / 10000);

    return (
      <Typography
        style={style}
        component={inline ? 'span' : 'p'}
        className={cn({ negative })}
      >
        {negative && '-'}
        {gold > 0 && <span className="currency gold">{gold}</span>}
        {silver > 0 && <span className="currency silver">{silver}</span>}
        {(copper > 0 || count === 0) && <span className="currency copper">{copper}</span>}
      </Typography>
    );
  } else {
    return (
      <Typography
        className={cn('currency', type)}
        component={inline ? 'span' : 'p'}
        style={style}
      >
        {count}
      </Typography>
    );
  }
};

export default Currency;
