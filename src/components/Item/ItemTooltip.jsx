import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import Currency from 'components/Currency';
import {
  CURRENCY,
  QUALITY,
} from 'constants/items';
import React from 'react';
import {
  bool,
  number,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  encodeColors,
  transformLines,
} from 'utils/string';

const TooltipContent = (item) => {
  // validate item has content
  if (!item) {
    return <div />;
  }

  const { name, icon, type, bindsOnPickup, overlay, remainingTime, reqLevel, salvageable, equip } = item;
  const { slot, attackSpeed, weaponType, minDamage, maxDamage, magicAttack, healingPower, additionalEffect, petLevel, maxGrade, synthesisGrade, synthesisXp, durability, tempering, bindsOnEquip, stats } = equip || {};
  const { description, useEffect } = item;
  const { comboEffect, equipEffect } = equip || {};
  const grade = item.grade || item.defaultGrade;
  let price = item.price;
  if (item.defaultGrade !== 1) {
    if (item.defaultGrade === 0) {
      price *= 2;
    } else {
      price = price / ((item.defaultGrade * 0.5) + 0.5);
    }
  }
  price = Math.round(price * ((item.grade * 0.5) + 0.5));

  return (
    <>
      <section className="header">
        <div className={cn('item-icon', 'icon', { [overlay]: Boolean(overlay) })} data-grade={grade}>
          <img src={`/images/item/${icon}.png`} alt="" />
        </div>
        <div className="name" data-grade={grade}>
          <Typography variant="h5" component="h5">{type}</Typography>
          {(grade !== 1 || weaponType) &&
          <Typography
            variant="h5"
            component="h5"
            className="quality-color"
          >
            {Object.values(QUALITY)[grade]}
          </Typography>}
          <Typography variant="h4" component="h4" className="quality-color">{name}</Typography>
        </div>
      </section>
      {(bindsOnPickup || bindsOnEquip || remainingTime || reqLevel > 0 || petLevel > 0) &&
      <section>
        {reqLevel > 0 && <p>Req. Level:{reqLevel} ~ <span className="ances-level">55</span></p>}
        {petLevel > 0 && <p>Pet Level:{petLevel} ~ 55</p>}
        {bindsOnPickup && <p>Binds on Pickup</p>}
        {bindsOnEquip && <p>Binds on Equip</p>}
        {remainingTime && <p className="text-orange">Rem. Time: {remainingTime}</p>}
      </section>}
      {synthesisXp > 0 &&
      <section>
        <p className="text-orange">XP 0/{synthesisXp} (0%)</p>
      </section>}
      {slot &&
      <section>
        <p>{slot}</p>
        {attackSpeed > 0 && <p><span className="text-gray">Attack Speed</span> {attackSpeed.toFixed(1)}</p>}
        {durability > 0 && <p><span className="text-gray">Dura</span> {durability}/{durability}</p>}
        {weaponType && <p><span className="text-gray">{weaponType}</span> Weapon Type</p>}
      </section>}
      {((minDamage > 0 && maxDamage > 0 && attackSpeed > 0) || magicAttack > 0 || healingPower > 0 || (stats && stats.length > 0)) &&
      <section>
        {minDamage > 0 && maxDamage > 0 && attackSpeed > 0 &&
        <p>
          <span
            className="text-gray">DPS</span> {Math.round((minDamage + maxDamage) / 2 / attackSpeed * 10) / 10} ({minDamage} - {maxDamage})
        </p>}
        {magicAttack > 0 && <p><span className="text-gray">Magic Attack</span> +{magicAttack}</p>}
        {healingPower > 0 && <p><span className="text-gray">Healing Power</span> +{healingPower}</p>}
        {stats && stats.map(({ name, value }) => (
          <p key={name}><span className="text-gray">{name}</span> {value}</p>
        ))}
      </section>}
      {(maxGrade || synthesisGrade || tempering || salvageable) &&
      <section>
        {maxGrade &&
        <>
          <p className="text-orange">Maximum Grade</p>
          <p className="text-orange">(~{Object.values(QUALITY)[maxGrade]})</p>
        </>}
        {synthesisGrade &&
        <>
          <p className="text-orange">Synthesis Available</p>
          <p className="text-orange">(~{Object.values(QUALITY)[synthesisGrade]})</p>
        </>}
        {tempering && <p>Tempering Available</p>}
        {salvageable && <p>Mag Salvageable</p>}
      </section>}
      {additionalEffect &&
      <section>
        <p>Additional Effect</p>
        <p className="text-dark_green" dangerouslySetInnerHTML={{ __html: transformLines(additionalEffect) }} />
      </section>}
      {(description || useEffect || comboEffect || equipEffect) &&
      <section>
        {description && <p dangerouslySetInnerHTML={{ __html: encodeColors(description) }} />}
        {useEffect &&
        <>
          <p className="text-use">
            {description &&
            <br />}
            Use:
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: encodeColors(useEffect) }} />
        </>}
        {comboEffect &&
        <>
          <p className="text-use">
            {(description || useEffect) &&
            <br />}
            Combo Effect
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: encodeColors(comboEffect) }} />
        </>}
        {equipEffect &&
        <>
          <p className="text-use">
            {(description || useEffect || comboEffect) &&
            <br />}
            Equip
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: encodeColors(equipEffect) }} />
        </>}
      </section>}
      <section>
        {price > 0 ?
          <div className="shop-price"><p>Shop Price:</p> <Currency type={CURRENCY.COIN} count={price} /></div> :
          <p className="no-sell">Cannot Sell</p>}
      </section>
    </>
  );
};

const ItemTooltip = ({ children, disabled, itemId, ...item }) => {
  if (disabled) {
    return children;
  }

  return (
    <Tooltip
      title={<TooltipContent {...item} />}
      classes={{ tooltip: 'archeage-tooltip' }}
      PopperProps={{
        placement: 'right-start',
        modifiers: {
          flip: {
            boundariesElement: 'viewport',
          },
          preventOverflow: {
            boundariesElement: 'viewport',
          },
        },
      }}
      id={`item-${itemId}`}
    >
      {children}
    </Tooltip>
  );
};

ItemTooltip.propTypes = {
  itemId: oneOfType([number, string]),
  disabled: bool,
};

ItemTooltip.defaultProps = {
  disabled: false,
};

const mapStateToProps = ({ gameData: { items } }, { itemId }) => {
  const item = items[itemId] || {};
  const { grade, ...itemFull } = item;
  return {
    ...itemFull,
    defaultGrade: grade,
  };
};

export default connect(mapStateToProps)(ItemTooltip);
