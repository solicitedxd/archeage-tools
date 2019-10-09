import BleedingIcon from 'images/buff/Bleeding.png';
import BlessedIcon from 'images/buff/Blessed.png';
import BlindedByCrowsIcon from 'images/buff/Blinded_by_Crows.png';
import BloodthirstExplosionIcon from 'images/buff/Bloodthirst_Explosion.png';
import BurningIcon from 'images/buff/Burning.png';
import CharmedIcon from 'images/buff/Charmed.png';
import ConfinedIcon from 'images/buff/Confined.png';
import ConflagrationIcon from 'images/buff/Conflagration.png';
import CursedIcon from 'images/buff/Cursed.png';
import DeathmarkAuraIcon from 'images/buff/Deathmark_aura.png';
import DeepfreezeIcon from 'images/buff/Deepfreeze.png';
import DiscordIcon from 'images/buff/Discord.png';
import DistressedIcon from 'images/buff/Distressed.png';
import DivineResponseIcon from 'images/buff/Divine_Response.png';
import ElectrocutedIcon from 'images/buff/Electrocuted.png';
import FearedIcon from 'images/buff/Feared.png';
import FreezingIcon from 'images/buff/Freezing.png';
import ImpaledIcon from 'images/buff/Impaled.png';
import LaunchedIcon from 'images/buff/Launched.png';
import ShakenIcon from 'images/buff/Shaken.png';
import SnaredIcon from 'images/buff/Snared.png';
import TrippedIcon from 'images/buff/Tripped.png';
import ToughenIcon from 'images/skill/defense/Toughen.png';
// import Icon from 'images/buff/';

export const MAX_POINTS = 18;

export const ATTACK = Object.freeze({
  MELEE: 'Melee Attack',
  MAGIC: 'Magic Attack',
  RANGED: 'Ranged Attack',
  HEALING: 'Healing Power',
});

export const BUFF = Object.freeze({
  BLEEDING: { name: 'Bleeding', icon: BleedingIcon, negative: true },
  BLESSED: { name: 'Blessed', icon: BlessedIcon },
  BLINDED_BY_CROWS: { name: 'Blinded by Crows', icon: BlindedByCrowsIcon, negative: true },
  BLOODTHIRST_EXPLOSION: { name: 'Bloodthirst Explosion', icon: BloodthirstExplosionIcon },
  BURNING: { name: 'Burning', icon: BurningIcon, negative: true },
  CHARMED: { name: 'Charmed', icon: CharmedIcon, negative: true },
  CONFINED: { name: 'Confined', icon: ConfinedIcon, negative: true },
  CONFLAGRATION: { name: 'Conflagration', icon: ConflagrationIcon, negative: true },
  CURSED: { name: 'Cursed', icon: CursedIcon, negative: true },
  DEATHMARK_AURA: { name: 'Deathmark Aura', icon: DeathmarkAuraIcon, negative: true },
  DEEPFREEZE: { name: 'Deep Freeze', icon: DeepfreezeIcon, negative: true },
  DISCORD: { name: 'Discord', icon: DiscordIcon, negative: true },
  DISTRESSED: { name: 'Distressed', icon: DistressedIcon, negative: true },
  DIVINE_RESPONSE: { name: 'Divine Response', icon: DivineResponseIcon },
  ELECTROCUTED: { name: 'Electrocuted', icon: ElectrocutedIcon, negative: true },
  FEARED: { name: 'Feared', icon: FearedIcon, negative: true },
  FREEZING: { name: 'Freezing', icon: FreezingIcon, negative: true },
  IMPALED: { name: 'Impaled', icon: ImpaledIcon, negative: true },
  LAUNCHED: { name: 'Launched', icon: LaunchedIcon, negative: true },
  MALICE_CHARGE: {},
  OVER_HEALING: {},
  OVERPOWERED: {},
  PETRIFIED: {},
  POISONED: {},
  PRAYER: {},
  PROVOKE: {},
  PURGE: {},
  RESURGENCE: {},
  SHACKLE: {},
  SHAKEN: { name: 'Shaken', icon: ShakenIcon, negative: true },
  SHRUG_IT_OFF: {},
  SILENCED: {},
  SLEEPING: {},
  SLOWED: {},
  SNARED: { name: 'Snared', icon: SnaredIcon, negative: true },
  STAGGER: {},
  STUNNED: {},
  TRIPPED: { name: 'Tripped', icon: TrippedIcon, negative: true },
  VULNERABLE: {},
  WEAKNESS: {},

  // buffs from skills
  TOUGHEN: { name: 'Toughen', icon: ToughenIcon },
});

export const GLOBAL_CD = Object.freeze({
  NONE: 0,
  NO_TRIGGER: 1,
  REDUCED: 2,
  NORMAL: 3,
});

export const COMBO_TYPE = Object.freeze({
  CAUSES: 0,
  EMPOWERS: 1,
});

export const ELEMENT = Object.freeze({
  BASIC: 'Basic',
  FLAME: 'Flame',
  LIGHTNING: 'Lightning',
  GALE: 'Gale',
  MIST: 'Mist',
  WAVE: 'Wave',
  STONE: 'Stone',
  QUAKE: 'Quake',
  LIFE: 'Life',
});
