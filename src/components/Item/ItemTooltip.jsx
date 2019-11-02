import React from 'react';
import ReactHintFactory from 'react-hint';
import { Typography } from '@material-ui/core';
import cn from 'classnames';
import ITEMS from 'data/items';
import Currency from 'components/Currency';
import {
  QUALITY,
  REWARD,
} from 'constants/dailies';

const ReactHint = ReactHintFactory(React);

const renderItemTooltip = (target) => {
  const { itemName } = target.dataset;

  const item = Object.values(ITEMS).find((item) => item.name === itemName);
  // validate item exists
  if (!item) {
    return;
  }

  const { name, icon, type, description, quality, bindsOnPickup, price, unidentified, remainingTime } = item;

  return (
    <div>
      <section className="header" data-quality={quality}>
        <div className={cn('item-icon', 'icon', { 'unidentified': unidentified })}>
          <img src={icon} alt="" />
        </div>
        <div className="name">
          <Typography variant="h5" component="h5">{type}</Typography>
          {quality !== QUALITY.BASIC &&
          <Typography variant="h5" component="h5" className="quality-color">{quality}</Typography>}
          <Typography variant="h4" component="h4" className="quality-color">{name}</Typography>
        </div>
      </section>
      {(bindsOnPickup || remainingTime) &&
      <section>
        {bindsOnPickup && <p>Binds on Pickup</p>}
        {remainingTime && <p className="tt-orange">Rem. Time: {remainingTime}</p>}
      </section>}
      <section>
        <p>{description}</p>
      </section>
      <section>
        {price > 0 ?
          <div className="shop-price"><p>Shop Price:</p> <Currency type={REWARD.COIN} count={price} /></div> :
          <p className="no-sell">Cannot Sell</p>}
      </section>
    </div>
  );
};

const ItemTooltip = () => (
  <ReactHint
    attribute="data-item"
    className="archeage-tooltip"
    events
    onRenderContent={renderItemTooltip}
    autoPosition
  />
);

export default ItemTooltip;
