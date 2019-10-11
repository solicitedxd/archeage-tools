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
import FrozenIcon from 'images/buff/Frozen.png';
import ImpaledIcon from 'images/buff/Impaled.png';
import LaunchedIcon from 'images/buff/Launched.png';
import MaliceChargeIcon from 'images/buff/Malice_Charge.png';
import OverHealingIcon from 'images/buff/Over_Healing.png';
import OverpoweredIcon from 'images/buff/Overpowered.png';
import PetrifiedIcon from 'images/buff/Petrified.png';
import PoisonedIcon from 'images/buff/Poisoned.png';
import PrayerIcon from 'images/buff/Prayer.png';
import ProvokeIcon from 'images/buff/Provoke.png';
import PurgeIcon from 'images/buff/Purge_Buff.png';
import ResurgenceIcon from 'images/buff/Resurgence_Buff.png';
import ShackleIcon from 'images/buff/Shackle.png';
import ShakenIcon from 'images/buff/Shaken.png';
import ShrugItOffIcon from 'images/buff/Shrug_It_Off_Buff.png';
import SilencedIcon from 'images/buff/Silenced.png';
import SleepingIcon from 'images/buff/Sleeping.png';
import SlowedIcon from 'images/buff/Slowed.png';
import SnaredIcon from 'images/buff/Snared.png';
import StaggerIcon from 'images/buff/Stagger.png';
import StunnedIcon from 'images/buff/Stunned.png';
import TrippedIcon from 'images/buff/Tripped.png';
import VulnerableIcon from 'images/buff/Vulnerable.png';
import WeaknessIcon from 'images/buff/Weakness.png';
import ToughenIcon from 'images/skill/defense/Toughen.png';
import DropBackIcon from 'images/skill/shadowplay/Drop_Back.png';
import FrigidTracksIcon from 'images/skill/sorcery/Frigid_Tracks.png';
import InsulatingLensIcon from 'images/skill/sorcery/Insulating_Lens.png';
import BloodthirstIcon from 'images/skill/shadowplay/Bloodthirst_Intensified.png';
import MarkedIcon from 'images/skill/shadowplay/Stalkers_Mark.png';
import StealthIcon from 'images/skill/shadowplay/Stealth.png'
import ConversionShieldIcon from 'images/skill/auramancy/Conversion_Shield.png';
import CourageousActionIcon from 'images/skill/auramancy/Courageous_Action.png';
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
  FROZEN: { name: 'Frozen', icon: FrozenIcon, negative: true },
  IMPALED: { name: 'Impaled', icon: ImpaledIcon, negative: true },
  LAUNCHED: { name: 'Launched', icon: LaunchedIcon, negative: true },
  MALICE_CHARGE: { name: 'Malice Charge', icon: MaliceChargeIcon },
  OVER_HEALING: { name: 'Over Healing', icon: OverHealingIcon, negative: true },
  OVERPOWERED: { name: 'Overpowered', icon: OverpoweredIcon, negative: true },
  PETRIFIED: { name: 'Petrified', icon: PetrifiedIcon, negative: true },
  POISONED: { name: 'Poisoned', icon: PoisonedIcon, negative: true },
  PRAYER: { name: 'Prayer', icon: PrayerIcon },
  PROVOKE: { name: 'Provoke', icon: ProvokeIcon, negative: true },
  PURGE: { name: 'Purge', icon: PurgeIcon },
  RESURGENCE: { name: 'Resurgence', icon: ResurgenceIcon },
  SHACKLE: { name: 'Shackle', icon: ShackleIcon, negative: true },
  SHAKEN: { name: 'Shaken', icon: ShakenIcon, negative: true },
  SHRUG_IT_OFF: { name: 'Shrug It Off', icon: ShrugItOffIcon },
  SILENCED: { name: 'Silenced', icon: SilencedIcon, negative: true },
  SLEEPING: { name: 'Sleeping', icon: SleepingIcon, negative: true },
  SLOWED: { name: 'Slowed', icon: SlowedIcon, negative: true },
  SNARED: { name: 'Snared', icon: SnaredIcon, negative: true },
  STAGGER: { name: 'Stagger', icon: StaggerIcon, negative: true },
  STUNNED: { name: 'Stunned', icon: StunnedIcon, negative: true },
  TRIPPED: { name: 'Tripped', icon: TrippedIcon, negative: true },
  VULNERABLE: { name: 'Vulnerable', icon: VulnerableIcon, negative: true },
  WEAKNESS: { name: 'Weakness', icon: WeaknessIcon, negative: true },

  // buffs from skills
  TOUGHEN: { name: 'Toughen', icon: ToughenIcon },
  DROP_BACK: { name: 'Drop Back', icon: DropBackIcon },
  FRIGID_TRACKS: { name: 'Frigid Tracks', icon: FrigidTracksIcon },
  INSULATING_LENS: { name: 'Insulating Lens', icon: InsulatingLensIcon },
  BLOODTHIRST: { name: 'Bloodthirst', icon: BloodthirstIcon },
  MARKED: { name: 'Marked', icon: MarkedIcon, negative: true },
  STEALTHED: { name: 'Stealthed', icon: StealthIcon },
  CONVERSION_SHIELD: { name: 'Conversion Shield', icon: ConversionShieldIcon },
  COURAGEOUS_ACTION: { name: 'Courageous Action', icon: CourageousActionIcon },
});

export const GLOBAL_CD = Object.freeze({
  NONE: 0,
  NO_TRIGGER: 1,
  REDUCED: 2,
  NO_TRIGGER_REDUCED: 3,
  NORMAL: 4,
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
