import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/battlerage/';

const skills = Object.freeze([
  {
    icon: Icon.TripleSlash,
    name: 'Triple Slash',
    rank: 1,
    mana: 12,
    range: [0, 4],
    damage: { base: 0, attack: ATTACK.MELEE, ratio: 140 },
    description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Physical Damage.\r' +
      'On each 3rd attack, this skill deals #+20%# more damage and affects all enemies with in a #3m# radius of the primary target.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    combos: [
      {
        buff: BUFF.SNARED,
        causes: BUFF.SHAKEN,
        text: 'First attack: ${b} targets are ${c} for #3 sec.#',
      },
      {
        buff: BUFF.TRIPPED,
        text: 'Second attack: deals +48% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.TOUGHEN,
        text: 'Increases Aggro +300% if used while under the effects of Toughen.',
      },
    ],
  },
  {
    icon: Icon.Charge,
    name: 'Charge',
    rank: 18,
    mana: 62,
    range: [0, 12],
    damage: { base: 538, attack: ATTACK.MELEE, ratio: 100 },
    cooldown: 12,
    effects: [BUFF.SNARED],
    description: 'Charges towards an enemy and deals ${damage} Melee Damage.\r' +
      'Inflicts Snare on the target, preventing them from moving or turning for #5sec.#\r' +
      'Snare duration reduced #-50%# in PvP.',
    globalCooldown: GLOBAL_CD.REDUCED,
    movement: true,
    combos: [
      {
        buff: BUFF.SLOWED,
        text: 'Deals an additional +26% damage to ${b} targets.',
      },
      {
        buff: BUFF.STUNNED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #3sec.#',
      },
    ],
  },
  {
    icon: Icon.BattleFocus,
    name: 'Battle Focus',
    rank: 2,
    mana: 54,
    cooldown: 42,
    effects: [BUFF.BATTLE_FOCUS],
    description: 'Improves your reaction time and combat effectiveness for #20sec.# Increases Parry Rate #+30%# and Melee Critical Damage #+20%.#',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.WhirlwindSlash,
    name: 'Whirlwind Slash',
    rank: 7,
    mana: 132,
    effectRange: 5,
    damage: { base: 430, attack: ATTACK.MELEE, ratio: 120 },
    cooldown: 12,
    description: 'A spinning attack with up to #3 distinct strikes,# each dealing ${damage} Physical Damage to many nearby enemies.\r' +
      'Can be repeated up to #3 times# in a row before starting its Cooldown.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    combos: [
      {
        buff: BUFF.SLOWED,
        causes: BUFF.TRIPPED,
        text: 'First attack: Trips ${b} targets for #3sec.#',
      },
      {
        buff: BUFF.TRIPPED,
        text: 'Second attack: deals an additional +29% damage to ${b} targets.',
      },
      {
        buff: BUFF.STUNNED,
        text: 'Third attack: deals +52% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.BLEEDING,
        text: 'Deals +33% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.SunderEarth,
    name: 'Sunder Earth',
    rank: 9,
    mana: 209,
    effectRange: 9,
    damage: { base: 1149, attack: ATTACK.MELEE, ratio: 320 },
    castTime: 0.5,
    cooldown: 16,
    description: 'Smashes open a fault line in front of you, dealing ${damage} Melee Damage to all enemies in a line.\r' +
      'Creates an area of #Earth Energy# around the open fissure for #7 sec,# reducing received damage #-30%# for all allies in the area of effect.',
    combos: [
      {
        buff: BUFF.TRIPPED,
        text: 'Second attack: Deals an additional +48% damage to ${b} targets.',
      },
      {
        buff: BUFF.TOUGHEN,
        causes: BUFF.PROVOKE,
        text: 'Inflicts ${c} on effected enemies for #4sec# if used while under the effects of ${b}.',
      },
      {
        buff: BUFF.BLEEDING,
        text: 'Deals +34% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.Frenzy,
    name: 'Frenzy',
    rank: 3,
    mana: 110,
    cooldown: 90,
    effects: [BUFF.FRENZY],
    description: 'Enter a killing frenzy, gaining the following effects for #20sec#:\r' +
      '- Increases Melee Attack #+80# whenever damage is received.\r' +
      '- Reduces Physical Defense and Magic Defense #-10%# each time you damage an enemy.\r' +
      '- Reduces Battlerage Mana Costs #-70%#.\r' +
      '- Increases duration #+20 sec# whenever you kill an enemy, max 40 sec.\r' +
      '- Immune to Push effects.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.PrecisionStrike,
    name: 'Precision Strike',
    rank: 6,
    mana: 94,
    range: [0, 4],
    damage: { base: 1325, attack: ATTACK.MELEE, ratio: 360 },
    cooldown: 21,
    description: 'Delivers a powerful attack that deals ${damage} Melee Damage.\r' +
      'Backstabbing increases Critical Rate for this attack #+35.0%# and increases Melee Accuracy #+100%.#\r' +
      'Critical Damage for this attack is increased #+70.0%.#',
    combos: [
      {
        buff: BUFF.BLEEDING,
        text: 'Deals +37% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.TigerStrike,
    name: 'Tiger Strike',
    rank: 3,
    mana: 183,
    range: [0, 18],
    damage: { base: 668, attack: ATTACK.MELEE, ratio: 130 },
    cooldown: 18,
    effects: [BUFF.OVERPOWERED],
    description: 'Rushes past an enemy, dealing ${damage} Melee Damage. Repeats up to 5 times if other enemies are nearby.\r' +
      'Inflicts #${effects[0]}# on the primary target, reducing Continuous Health Regen -33% for #8sec.# This effect can stack up to 3 times.',
    unblockable: true,
    movement: true,
    combos: [
      {
        buff: BUFF.SHAKEN,
        text: 'Deals an additional +13% damage to ${b} targets.',
      },
      {
        buff: BUFF.SLOWED,
        causes: BUFF.SNARED,
        text: 'Snares ${b} targets for #5sec.# (#-50%# duration in PvP)',
      },
      {
        buff: BUFF.IMPALED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #3sec.#',
      },
      {
        buff: BUFF.OVERPOWERED,
        causes: BUFF.STAGGER,
        text: 'First Attack: Staggers targets under the effects of ${b} for #1sec#',
      },
    ],
  },
  {
    icon: Icon.Bondbreaker,
    name: 'Bondbreaker',
    mana: 88,
    cooldown: 18,
    description: 'Removes Snare effects from the caster. Can only be used while under the effects of a Snare.',
    globalCooldown: GLOBAL_CD.NONE,
  },
  {
    icon: Icon.TerrifyingRoar,
    name: 'Terrifying Roar',
    rank: 4,
    mana: 69,
    effectRange: 5,
    cooldown: 18,
    description: 'Inflicts #Weakness# on all enemies within the radius for #7sec.# Increases the duration of Stun, Trip, Fear, Shackle, Silence, Sleep, Impale, and Confinement effects #+25%# for the duration.\r' +
      '#Toughens# the caster for the same amount of time, reducing the duration of those debuffs.',
    globalCooldown: GLOBAL_CD.REDUCED,
    combos: [
      {
        buff: BUFF.FEARED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #3sec.#',
      },
    ],
  },
  {
    icon: Icon.HammerToss,
    name: 'Hammer Toss',
    mana: 188,
    range: [0, 15],
    damage: { base: 686, attack: ATTACK.MELEE, ratio: 209 },
    cooldown: 29,
    effects: [BUFF.STUNNED],
    description: 'Hurls a heavy, slow-moving hammer at an enemy\'s current location, dealing ${damage} Melee Damage.\r' +
      'Inflicts Stun on the primary target, disabling all skills for #2.5sec,# and knocks back all enemies within #3m# of them.',
    combos: [
      {
        buff: BUFF.SLOWED,
        text: 'Deals an additional +44% damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.BehindEnemyLines,
    name: 'Behind Enemy Lines',
    mana: 157,
    range: [6, 20],
    effectRange: 4,
    damage: { base: 576, attack: ATTACK.MELEE, ratio: 110 },
    cooldown: 21,
    effects: [BUFF.SHAKEN],
    description: 'Perform a high leap that lands at the target location, dealing ${damage} Melee Damage to all enemies within the area of effect. Inflicts #${effects[0]}# on all affected enemies, reducing their Move Speed #-27%,# Attack Speed #-75,# and Skill Damage #-8%# for #3sec.#',
    movement: true,
    combos: [
      {
        buff: BUFF.SNARED,
        causes: BUFF.DISTRESSED,
        text: 'Inflicts ${c} on ${b} targets for #7sec.#',
      },
      {
        buff: BUFF.SLEEPING,
        causes: BUFF.TRIPPED,
        text: '${b} targets are ${c} for #3sec.#',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.DeflectAndRetaliate,
    name: 'Deflect and Retaliate',
    description: 'Each successful parry resets the cooldown on all #Battlerage# attack skills.\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.RecklessCharge,
    name: 'Reckless Charge',
    description: 'Using #Charge, Tiger Strike or Behind Enemy Lines# grants you the #Reckless Charge# buff, decreasing received Physical Damage #-15%# for #4 seconds#.',
  },
  {
    icon: Icon.Puncture,
    name: 'Puncture',
    description: 'Your Melee Critical Strikes inflict #Puncture# on the enemy, reducing their Physical Defense #-3000# for #5 sec.#\r\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.AttackSpeedTraining,
    name: 'Attack Speed Training',
    description: 'Gain one stack of #Delirium# for each Battlerage attack that successfully hits an enemy. Max 1 stack per second.\r\r' +
      '#Delirium:#\r' +
      '- Increases Melee Critical Damage #+5%.#\r' +
      '- Increases Attack Speed #+30.#\r' +
      '- Lasts #9 sec.#\r' +
      '- Stacks up to #5 times.#',
  },
  {
    icon: Icon.WeaponsMastery,
    name: 'Weapons Mastery',
    description: 'Increases Melee Skill Damage from Battlerage Skills #+10%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.1 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: Icon.DeadlyDuelist,
    name: 'Deadly Duelist',
    description: 'Increases Melee Critical Hits #+6%#\r' +
      'Equipping Two-Handed Weapons or Dual Wield Weapons allows you to #Parry ranged attacks#.',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Triple Slash'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.TripleSlashLightning,
        mana: 9,
        damage: { base: 0, attack: ATTACK.MELEE, ratio: 110 },
        description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Physical Damage.\r' +
          'On each 3rd attack, this skill deals #+20%# more damage.\r' +
          'This skill attacks faster than basic Triple Slash, but deals less damage.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.TripleSlashQuake,
        range: [0],
        effectRange: 5,
        damage: { base: 0, attack: ATTACK.MELEE, ratio: 230 },
        description: 'A constant pattern of #3 distinct strikes#, each dealing ${damage} Melee Damage to all enemies within #${effectRange}m# if a two-handed weapon is equipped, or #4m# if other weapons are equipped.\r' +
          'On each 3rd attack, this skill deals #+20%# more damage up to #20 enemies# within #${effectRange}#.\r' +
          'This skill attacks slower than Basic Triple Slash, but can deal damage to multiple enemies with each attack.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Precision Strike'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.PrecisionStrikeGale,
        cooldown: 30,
        description: 'Delivers a powerful attack that deals ${damage} Melee Damage.\r\r' +
          'A Critical Hit increases Critical Damage for this attack #+70%.#\r' +
          'Backstabbing increases Critical Rate for this attack #+35.0%# and increases Melee Accuracy #+100%#\r' +
          'If this skill kills the target, the Cooldown is instantly reset.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.PrecisionStrikeWave,
        description: 'Delivers a powerful attack that deals ${damage} Melee Damage.\r' +
          'When attacking targets with #30%# Health or below, Critical Rate for this attack #+35.0%#.\r' +
          'Critical Damage for this attack is increased #+70.0%.#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Tiger Strike'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.TigerStrikeLife,
        cooldown: 28,
        effects: [],
        description: 'Rushes past an enemy, dealing ${damage} Melee Damage.\r' +
          'Repeats up to 5 times if other enemies are nearby.\r' +
          'Inflicts #Overpowered# on the primary target, reducing Continuous Health Regen -33% for #8sec.# This effect can stack up to 3 times.\r' +
          'Grants the caster #1 sec# of immunity to disabling effects for each target hit.',
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.TigerStrikeLightning,
        range: [0, 12],
        damage: { base: 445, attack: ATTACK.MELEE, ratio: 80 },
        effects: [],
        description: 'Rushes past the same enemy #3 times,# dealing ${damage} Melee Damage each time.\r' +
          'Inflicts #Overpowered# on the primary target, reducing Continuous Health Regen -33% for #8sec.# This effect can stack up to 3 times.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Behind Enemy Lines'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.BehindEnemyLinesGale,
        effectRange: 3,
        description: 'Perform a high leap that lands at the target location, dealing ${damage} Melee Damage to all enemies within the area of effect.\r' +
          '#Each# hit decreases the Cooldown of #Charge -2 sec#.\r\r' +
          'Inflicts #${effects[0]}# on all affected enemies, reducing their Move Speed #-27%,# Attack Speed #-75,# and Skill Damage #-8%# for #3sec.#',
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.BehindEnemyLinesStone,
        range: [6, 18],
        description: 'Perform a high leap that lands at the target location, dealing ${damage} Melee Damage to all enemies within the area of effect.\r\r' +
          'Inflicts #${effects[0]}# on all affected enemies, reducing their Move Speed #-27%,# Attack Speed #-75,# and Skill Damage #-8%# for #3sec.#',
        combos: [
          {
            buff: BUFF.SNARED,
            causes: BUFF.TRIPPED,
            text: '${b} targets are ${c} for #3sec#.',
          },
          {
            buff: BUFF.SLEEPING,
            causes: BUFF.TRIPPED,
            text: '${b} targets are ${c} for #3sec#.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Sunder Earth'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.SunderEarthMist,
        description: 'Smashes open a wide fault line in front of you, dealing ${damage} Melee Damage to all enemies in a line. Affected enemies also receive additional #+15%# Damage for #3 sec#.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.SunderEarthQuake,
        effectRange: 15,
        damage: { base: 903, attack: ATTACK.MELEE, ratio: 260 },
        description: 'Smashes open a wide fault line in front of you, dealing ${damage} Melee Damage to all enemies in a line.',
      },
    ],
  },
]);

export default skills;
