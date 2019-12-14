import * as Icon from '../images/buff/';
import * as ArcheryIcon from '../images/skill/archery/';
import * as AuramancyIcon from '../images/skill/auramancy/';
import * as BattlerageIcon from '../images/skill/battlerage/';
import * as DefenseIcon from '../images/skill/defense/';
import * as MaledictionIcon from '../images/skill/malediction/';
import * as OccultismIcon from '../images/skill/occultism/';
import * as ShadowplayIcon from '../images/skill/shadowplay/';
import * as SongcraftIcon from '../images/skill/songcraft/';
import * as SorceryIcon from '../images/skill/sorcery/';
import * as VitalismIcon from '../images/skill/vitalism/';
import * as WitchcraftIcon from '../images/skill/witchcraft/';

export const MAX_POINTS = 18;

export const ATTACK = Object.freeze({
  MELEE: 'Melee Attack',
  MAGIC: 'Magic Attack',
  RANGED: 'Ranged Attack',
  HEALING: 'Healing Power',
});

export const BUFF = Object.freeze({
  LIGHT_BLINDED: { name: 'Light Blinded', icon: ArcheryIcon.BlazingArrow, negative: true },
  BLEEDING: { name: 'Bleeding', icon: Icon.Bleeding, negative: true },
  BLESSED: { name: 'Blessed', icon: Icon.Blessed },
  BLINDED_BY_CROWS: { name: 'Blinded by Crows', icon: Icon.BlindedByCrows, negative: true },
  BLOODTHIRST_EXPLOSION: { name: 'Bloodthirst Explosion', icon: Icon.BloodthirstExplosion },
  BURNING: { name: 'Burning', icon: Icon.Burning, negative: true },
  CHARMED: { name: 'Charmed', icon: Icon.Charmed, negative: true },
  CONFINED: { name: 'Confined', icon: Icon.Confined, negative: true },
  CONFLAGRATION: { name: 'Conflagration', icon: Icon.Conflagration, negative: true },
  CURSED: { name: 'Cursed', icon: Icon.Cursed, negative: true },
  CURSED_SEEDS: { name: 'Cursed Seeds', icon: OccultismIcon.CursedThorns, negative: true },
  DEATHMARK_AURA: { name: 'Deathmark Aura', icon: Icon.DeathmarkAura, negative: true },
  DEEPFREEZE: { name: 'Deep Freeze', icon: Icon.Deepfreeze, negative: true },
  DISCORD: { name: 'Discord', icon: Icon.Discord, negative: true },
  DISSONANCE: { name: 'Dissonance', icon: SongcraftIcon.Dissonance, negative: true },
  DISTRESSED: { name: 'Distressed', icon: Icon.Distressed, negative: true },
  DIVINE_RESPONSE: { name: 'Divine Response', icon: Icon.DivineResponse },
  ELECTROCUTED: { name: 'Electrocuted', icon: Icon.Electrocuted, negative: true },
  ENERVATED: { name: 'Enervated', icon: WitchcraftIcon.Enervate, negative: true },
  EARTHEN_GRIP_DISARM: { name: 'Earthen Grip: Disarm', icon: WitchcraftIcon.EarthenGrip, negative: true },
  FEARED: { name: 'Feared', icon: Icon.Feared, negative: true },
  FREEZING: { name: 'Freezing', icon: Icon.Freezing, negative: true },
  FROZEN: { name: 'Frozen', icon: Icon.Frozen, negative: true },
  IMPALED: { name: 'Impaled', icon: Icon.Impaled, negative: true },
  INSTINCT: { name: 'Instinct', icon: Icon.Instinct, negative: true },
  LASSITUDE: { name: 'Lassitude', icon: WitchcraftIcon.Lassitude, negative: true },
  LAUNCHED: { name: 'Launched', icon: Icon.Launched, negative: true },
  MALICE_CHARGE: { name: 'Malice Charge', icon: Icon.MaliceCharge },
  MALICIOUS_BINDING: { name: 'Malicious Binding', icon: MaledictionIcon.MaliciousBinding, negative: true },
  OVER_HEALING: { name: 'Over Healing', icon: Icon.OverHealing, negative: true },
  OVERPOWERED: { name: 'Overpowered', icon: Icon.Overpowered, negative: true },
  PETRIFIED: { name: 'Petrified', icon: Icon.Petrified, negative: true },
  POISONED: { name: 'Poisoned', icon: Icon.Poisoned, negative: true },
  PRAYER: { name: 'Prayer', icon: Icon.Prayer },
  PROVOKE: { name: 'Provoked', icon: Icon.Provoke, negative: true },
  PURGE: { name: 'Purge', icon: WitchcraftIcon.Purge },
  RESURGENCE: { name: 'Resurgence', icon: VitalismIcon.Resurgence },
  SHACKLE: { name: 'Shackle', icon: Icon.Shackle, negative: true },
  SHAKEN: { name: 'Shaken', icon: Icon.Shaken, negative: true },
  MAGIC_SHIELD: { name: 'Magic Shield', icon: Icon.MagicShield },
  SILENCED: { name: 'Silenced', icon: Icon.Silenced, negative: true },
  SLEEPING: { name: 'Sleeping', icon: Icon.Sleeping, negative: true },
  SLOWED: { name: 'Slowed', icon: Icon.Slowed, negative: true },
  SNARED: { name: 'Snared', icon: Icon.Snared, negative: true },
  SNIPE_IMMUNITY: { name: 'Sniped', icon: Icon.SnipeImmunity, negative: true },
  STAGGER: { name: 'Stagger', icon: Icon.Stagger, negative: true },
  STUNNED: { name: 'Stunned', icon: Icon.Stunned, negative: true },
  SUMMON_CROWS: { name: 'Summon Crows', icon: OccultismIcon.SummonCrows, negative: true },
  TRIPPED: { name: 'Tripped', icon: Icon.Tripped, negative: true },
  VULNERABLE: { name: 'Vulnerable', icon: Icon.Vulnerable, negative: true },
  WEAKNESS: { name: 'Weakness', icon: Icon.Weakness, negative: true },

  FLIGHT_DISABLED: { name: 'Flight Disabled', icon: Icon.FlightDisabled, negative: true },
  POTIONS_DISABLED: { name: 'Potions Disabled', icon: Icon.PotionDisabled, negative: true },

  // buffs from skills
  TOUGHEN: { name: 'Toughen', icon: DefenseIcon.Toughen },
  DROP_BACK: { name: 'Drop Back', icon: ShadowplayIcon.DropBack },
  FRIGID_TRACKS: { name: 'Frigid Tracks', icon: SorceryIcon.FrigidTracks },
  INSULATING_LENS: { name: 'Insulating Lens', icon: SorceryIcon.InsulatingLens },
  BLOODTHIRST: { name: 'Bloodthirst', icon: ShadowplayIcon.BloodthirstIntensified },
  MARKED: { name: 'Marked', icon: ShadowplayIcon.StalkersMark, negative: true },
  STEALTHED: { name: 'Stealthed', icon: ShadowplayIcon.Stealth },
  STEALTHED_DEBUFF: { name: 'Stealthed', icon: ShadowplayIcon.Stealth, negative: true },
  CONVERSION_SHIELD: { name: 'Conversion Shield', icon: AuramancyIcon.ConversionShield },
  CONVERSION_SHIELD_FLAME: { name: 'Conversion Shield', icon: AuramancyIcon.ConversionShieldFlame },
  COURAGEOUS_ACTION: { name: 'Courageous Action', icon: AuramancyIcon.CourageousAction },
  FREERUNNER: { name: 'FreeRunner', icon: ShadowplayIcon.Freerunner },
  RENEWAL: { name: 'Renewal', icon: VitalismIcon.Renewal },
  PAIN_HARVEST: { name: 'Pain Harvest', icon: OccultismIcon.PainHarvest },
  DEATHS_VENGEANCE: { name: 'Death\'s Vengeance', icon: OccultismIcon.DeathsVengeance },
  HEALING_CIRCLE: { name: 'Healing Circle', icon: VitalismIcon.HealingCircle },
  WARDING_LIGHT: { name: 'Warding Light', icon: Icon.WardingLight },
  SHRUG_IT_OFF: { name: 'Shrug It Off', icon: AuramancyIcon.ShrugItOff },
  BATTLE_FOCUS: { name: 'Battle Focus', icon: BattlerageIcon.BattleFocus },
  FRENZY: { name: 'Frenzy', icon: BattlerageIcon.Frenzy },
  BULL_RUSH_AGGRO: { name: 'Bull Rush: Aggro Boost', icon: DefenseIcon.MockingHowl },
  RETRIBUTION: { name: 'Retribution', icon: DefenseIcon.Retribution },
  REDOUBT: { name: 'Redoubt', icon: DefenseIcon.Redoubt },
  REDOUBT_LIFE: { name: 'Redoubt', icon: DefenseIcon.RedoubtLife },
  STARTLING_STRAIN_LIFE: { name: 'Startling Strain: Life', icon: SongcraftIcon.StartlingStrainLife },
  FURY: { name: 'Fury', icon: MaledictionIcon.Fury },
  VOID_SURGE: { name: 'Void Surge', icon: MaledictionIcon.VoidSurge },
  SNOWLIONS: { name: 'Snowlions', icon: MaledictionIcon.GhastlyPack },
  STEADY_SHOOTING: { name: 'Steady Shooting', icon: ArcheryIcon.SteadyShooting },
  DEADEYE: { name: 'Deadeye', icon: ArcheryIcon.Deadeye },
});

Object.values(BUFF).forEach(b => !b.icon && console.warn('Buff Missing Icon:', b.name));

export const GLOBAL_CD = Object.freeze({
  NONE: 0,
  NO_TRIGGER: 1,
  REDUCED: 2,
  NO_TRIGGER_REDUCED: 3,
  REDUCED_USEWHILE: 4,
  INCREASED: 5,
  NORMAL: 6,
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

export const SKILLMOD = Object.freeze({
  SET: 0,
  FLAT: 1,
  PERCENT: 2,
});
