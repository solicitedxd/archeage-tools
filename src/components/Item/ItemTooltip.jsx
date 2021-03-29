import {
  Tooltip,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import {
  CURRENCY,
  GRADE_NAME,
  STAT_MULTIPLIERS,
} from 'constants/items';
import React from 'react';
import {
  bool,
  node,
  number,
  oneOfType,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { maxDecimalsFloor } from 'utils/number';
import { substituteVars } from 'utils/skills';
import {
  encodeColors,
  transformLines,
} from 'utils/string';

// eslint-disable-next-line complexity
const TooltipContent = (item) => {
  // validate item has content
  if (!item) {
    return <div />;
  }

  const { name, icon, type, bindsOnPickup, overlay, remainingTime, reqLevel, salvageable, equip, itemSet } = item;
  const { slot, attackSpeed, weaponType, additionalEffect, petLevel, maxGrade, synthesisGrade, synthesisXp, tempering, bindsOnEquip, stats } = equip || {};
  let { minDamage, maxDamage, magicAttack, healingPower, durability } = equip || {};
  const { description, useEffect } = item;
  const { comboEffect, equipEffect } = equip || {};

  // based on grade, let's modify stats
  const grade = item.grade || item.defaultGrade;
  // modify dps
  if (minDamage) {
    minDamage *= STAT_MULTIPLIERS.DPS[grade];
  }
  if (maxDamage) {
    maxDamage *= STAT_MULTIPLIERS.DPS[grade];
  }
  if (magicAttack) {
    magicAttack *= STAT_MULTIPLIERS.DPS[grade];
  }
  if (healingPower) {
    healingPower *= STAT_MULTIPLIERS.DPS[grade];
  }

  if (stats) {
    stats.forEach(stat => {
      if (stat.name === 'Physical Defense' || stat.name === 'Magic Defense') {
        stat.value *= STAT_MULTIPLIERS.ARMOR[grade];
      } else {
        stat.value *= STAT_MULTIPLIERS.OTHER[grade];
      }
    });
  }

  // durability
  if (durability) {
    durability *= STAT_MULTIPLIERS.DURABILITY[grade];
  }

  // modify price
  let price = item.price;
  if (item.defaultGrade !== 1) {
    if (item.defaultGrade === 0) {
      price *= 2;
    } else {
      price = price / ((item.defaultGrade * 0.5) + 0.5);
    }
  }
  price = Math.round(price * ((grade * 0.5) + 0.5));
  // placeholder vars
  const vars = [];

  return (
    <>
      <section className="header">
        <div className={cn('item-icon', 'icon', { [overlay]: Boolean(overlay) })} data-grade={grade}>
          <img src={`/images/icon/${icon}.png`} alt="" />
        </div>
        <div className="name" data-grade={grade}>
          <Typography variant="h5" component="h5">{type}</Typography>
          {(grade !== 1 || weaponType) &&
          <Typography
            variant="h5"
            component="h5"
            className="quality-color"
          >
            {Object.values(GRADE_NAME)[grade]}
          </Typography>}
          <Typography variant="h4" component="h4" className="quality-color">{name}</Typography>
        </div>
      </section>
      {(bindsOnPickup || bindsOnEquip || remainingTime || reqLevel > 0 || petLevel > 0) &&
      <section>
        {reqLevel > 0 && <p>Req. Level: {reqLevel} ~ <span className="ances-level">70</span></p>}
        {petLevel > 0 && <p>Pet Level: {petLevel} ~ 55</p>}
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
        {durability > 0 &&
        <p><span className="text-gray">Dura</span> {Math.floor(durability)}/{Math.floor(durability)}</p>}
        {weaponType && <p><span className="text-gray">{weaponType}</span> Weapon Type</p>}
      </section>}
      {((minDamage > 0 && maxDamage > 0 && attackSpeed > 0) || magicAttack > 0 || healingPower > 0 || (stats && stats.length > 0)) &&
      <section>
        {minDamage > 0 && maxDamage > 0 && attackSpeed > 0 &&
        <p>
          <span className="text-gray">DPS</span>&nbsp;
          {Math.floor((minDamage + maxDamage) / 2 / attackSpeed * 10) / 10} ({Math.floor(minDamage)} - {Math.floor(maxDamage)})
        </p>}
        {magicAttack > 0 && <p><span className="text-gray">Magic Attack</span> +{Math.floor(magicAttack)}</p>}
        {healingPower > 0 && <p><span className="text-gray">Healing Power</span> +{Math.floor(healingPower)}</p>}
        {stats && stats.map(({ name, value }) => {
          const precision = (['Move Speed', 'Cast Time'].includes(name)) ? 1 : 0;
          return (
            <p key={name}><span className="text-gray">{name}</span> {maxDecimalsFloor(value, precision)}</p>
          );
        })}
      </section>}
      {(maxGrade || synthesisGrade || tempering || salvageable) &&
      <section>
        {maxGrade &&
        <>
          <p className="text-orange">Maximum Grade</p>
          <p className="text-orange">(~{Object.values(GRADE_NAME)[maxGrade]})</p>
        </>}
        {synthesisGrade &&
        <>
          <p className="text-orange">Synthesis Available</p>
          <p className="text-orange">(~{Object.values(GRADE_NAME)[synthesisGrade]})</p>
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
        {description && <p dangerouslySetInnerHTML={{ __html: substituteVars(description, vars) }} />}
        {useEffect &&
        <>
          <p className="text-use">
            {description &&
            <br />}
            Use:
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: substituteVars(useEffect, vars) }} />
        </>}
        {comboEffect &&
        <>
          <p className="text-use">
            {(description || useEffect) &&
            <br />}
            Combo Effect
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: substituteVars(comboEffect, vars) }} />
        </>}
        {equipEffect &&
        <>
          <p className="text-use">
            {(description || useEffect || comboEffect) &&
            <br />}
            Equip
          </p>
          <p className="text-green" dangerouslySetInnerHTML={{ __html: substituteVars(equipEffect, vars) }} />
        </>}
      </section>}
      {itemSet &&
      <section>
        <p className="text-yellow">{itemSet.name} ({itemSet.items.length})</p>
        <p className="set-items">
          {itemSet.items.map(itemId => <ItemLink id={itemId} noLink name="" key={`${item.id}-set-${itemId}`} />)}
        </p>
        <p className="text-dark_green">Set Effect</p>
        <ul className="set-effects">
          {itemSet.effects.map(effect => (
            <li
              key={`${item.id}-eqp-${effect.equipCount}`}
              dangerouslySetInnerHTML={{ __html: `(${effect.equipCount}Set) ${encodeColors(effect.effectText)}` }}
            />
          ))}
        </ul>
      </section>}
      <section>
        {price > 0
          ? <div className="shop-price"><p>Shop Price:</p> <Currency type={CURRENCY.COIN} count={price} /></div>
          : <p className="no-sell">Cannot Sell</p>}
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
  children: node,
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
