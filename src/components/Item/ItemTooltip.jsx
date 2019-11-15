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

  const {
    name,
    icon,
    type,
    description,
    quality,
    bindsOnPickup,
    price,
    unidentified,
    questStarter,
    remainingTime,
    reqLevel,
    synthesisGrade,
    synthesisXP,
    durability,
    slot,
    attackSpeed,
    weaponType,
    tempering,
    maxGrade,
    salvageable,
    dps,
    magicAttack,
    healingPower,
  } = item;

  return (
    <div>
      <section className="header" data-quality={quality}>
        <div className={cn('item-icon', 'icon', { 'unidentified': unidentified, 'quest': questStarter })}>
          <img src={icon} alt="" />
        </div>
        <div className="name">
          <Typography variant="h5" component="h5">{type}</Typography>
          {(quality !== QUALITY.BASIC || weaponType) &&
          <Typography variant="h5" component="h5" className="quality-color">{quality}</Typography>}
          <Typography variant="h4" component="h4" className="quality-color">{name}</Typography>
        </div>
      </section>
      {(bindsOnPickup || remainingTime || reqLevel) &&
      <section>
        {reqLevel && <p>Req. Level:{reqLevel} ~ <span className="ances-level">55</span></p>}
        {bindsOnPickup && <p>Binds on Pickup</p>}
        {remainingTime && <p className="tt-orange">Rem. Time: {remainingTime}</p>}
      </section>}
      {synthesisXP &&
      <section>
        <p className="tt-orange">XP 0/{synthesisXP} (0%)</p>
      </section>}
      {slot &&
      <section>
        <p>{slot}</p>
        {attackSpeed && <p><span className="tt-gray">Attack Speed</span> {attackSpeed.toFixed(1)}</p>}
        {durability && <p><span className="tt-gray">Dura</span> {durability}/{durability}</p>}
        {weaponType && <p><span className="tt-gray">{weaponType}</span> Weapon Type</p>}
      </section>}
      {(dps || magicAttack || healingPower) &&
      <section>
        {dps && <p><span className="tt-gray">DPS</span> {dps}</p>}
        {magicAttack && <p><span className="tt-gray">Magic Attack</span> +{magicAttack}</p>}
        {healingPower && <p><span className="tt-gray">Healing Power</span> +{healingPower}</p>}
      </section>}
      {(maxGrade || synthesisGrade || tempering || salvageable) &&
      <section>
        {maxGrade &&
        <React.Fragment>
          <p className="tt-orange">Maximum Grade</p>
          <p className="tt-orange">(~{maxGrade})</p>
        </React.Fragment>}
        {synthesisGrade &&
        <React.Fragment>
          <p className="tt-orange">Synthesis Available</p>
          <p className="tt-orange">(~{synthesisGrade})</p>
        </React.Fragment>}
        {tempering && <p>Tempering Available</p>}
        {salvageable && <p>Mag Salvageable</p>}
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
