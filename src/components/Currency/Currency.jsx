import React from 'react';
import cn from 'classnames';
import { Typography } from '@material-ui/core';
import { REWARD } from 'constants/dailies';

export default ({ type, count, style }) => {
  if (type === REWARD.COIN) {
    const copper = count % 100;
    const silver = Math.floor(count / 100) % 100;
    const gold = Math.floor(count / 10000);

    return <Typography style={style}>{gold > 0 && <span className={cn('currency', 'gold')}>{gold}</span>}{silver > 0 &&
    <span className={cn('currency', 'silver')}>{silver}</span>}{copper > 0 &&
    <span className={cn('currency', 'copper')}>{copper}</span>}</Typography>;
  } else {
    return <Typography className={cn('currency', type)} style={style}>{count}</Typography>;
  }
}
