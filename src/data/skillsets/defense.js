import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/defense/';

const skills = Object.freeze([
  {
    icon: Icon.ShieldSlam,
    name: 'Shield Slam',
    rank: 14,
    mana: 114,
    effectRange: 3,
    damage: { base: 752, attack: ATTACK.MELEE, ratio: 80 },
    cooldown: 18,
    description: 'Performs a swift jarring attack with your shield, dealing ${damage} Melee Damage and dealing additional damage equal to #1%-2%# of your Max Health to up to #20 enemies#, and #Pushing affected enemies#.\r' +
      'Deals additional Damage equal to #20%-30%# of your Max Health to non-dungeon monsters.\r\r' +
      'Grants the caster 1 stack of #Shield Block per target hit.#\r' +
      '#Shield Block#:\r' +
      '- Stacks up to 5 times.\r' +
      '- Lasts for #15sec#\r' +
      '- - Increases your Shield Block Rate #100%# for the next 2 attacks\r' +
      '- Stacks up to 5 times\r\r' +
      'This skill can destroy all Boneyards within 3m.',
    descriptionNote: 'Drastically increases Aggro generation.',
    combos: [
      {
        buff: BUFF.SNARED,
        causes: BUFF.STAGGER,
        text: 'Staggers ${b} targets for #0.3sec#.',
      },
      {
        buff: BUFF.PROVOKE,
        text: 'Deals Damage +100% to Taunted non-dungeon monsters.',
      },
    ],
  },
  {
    icon: Icon.Toughen,
    name: 'Toughen',
    rank: 4,
    mana: 73,
    cooldown: 60,
    effects: [BUFF.TOUGHEN],
    description: 'Increases Continuous Health Regen #+5.0,# with an additional #+0.0# based on #Stamina.#\r' +
      'Lasts #10sec.#\r' +
      'Grants 50% of received damage as stacks of Mettle.',
    descriptionNote: '\rThis skill does not produce a Global Cooldown.',
  },
  {
    icon: Icon.BullRush,
    name: 'Bull Rush',
    rank: 12,
    mana: 100,
    range: [0, 4],
    damage: { base: 765, attack: ATTACK.MELEE, ratio: 130 },
    cooldown: 30,
    effects: [BUFF.SHACKLE, BUFF.BULL_RUSH_AGGRO],
    description: 'Ram an enemy with a disruptive shield attack, dealing ${damage} Melee Damage and dealing additional Damage equal to #1%-2%# of your Max Health.\r' +
      'Inflicts #${effects[0]}# on the target, preventing the use of all Melee and Ranged skills for #5.7sec.#\r' +
      '#Doubles# the caster\'s Aggro for #5 sec.#',
    combos: [
      {
        buff: BUFF.STUNNED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #3.9sec.#',
      },
    ],
  },
  {
    icon: Icon.BoastfulRoar,
    name: 'Boastful Roar',
    mana: 28,
    range: [0, 10],
    cooldown: 24,
    effects: [BUFF.PROVOKE, BUFF.DISTRESSED],
    description: 'Inflicts #${effects[1]}# for #7sec,# reducing the enemy\'s Move Speed #-45%,# Skill Damage #-20%,# Attack Speed #-250,# and healing effectiveness #-60%#.\r' +
      'Deals additional damage equal to #60%# of your stacked Mettle and #1%-2%# of your Max Health, consuming all stacks of Mettle when cast.\r' +
      'This ability also inflicts #${effects[0]}# for #4sec,# forcing affected players to target you and affected monsters to attack you.',
    combos: [
      {
        buff: BUFF.TOUGHEN,
        text: 'Inflicts +60% damage if used while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Lasso,
    name: 'Lasso',
    mana: 29,
    range: [0, 20],
    castTime: 0.2,
    cooldown: 30,
    effects: [BUFF.PROVOKE],
    description: 'Pulls a distant enemy to your position. This ability also Taunts the target, forcing affected monsters to attack you for #4 sec.#\r' +
      'Pulled enemies are Staggered, disabling movement skill use for #0.5 sec# and interrupting all Cast Time and Channeled skills.',
  },
  {
    icon: Icon.Redoubt,
    name: 'Redoubt',
    rank: 3,
    mana: 71,
    cooldown: 30,
    description: 'Raises a shield around the caster that\r' +
      'Increases Shield Block Rate #+20%#.\r' +
      'Decreases Move Speed #-10%#.\r' +
      'Grants Immunity to Stun, Impale, Trip, Snare, Slow, Shackle, Push, and Dive Trap.\r' +
      'Stacks a Mettle per damage received.\r' +
      'Must equip a shield.\r' +
      'This effect cannot be stolen or removed by enemies. for #5sec#.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.MockingHowl,
    name: 'Mocking Howl',
    mana: 55,
    effectRange: 10,
    cooldown: 24,
    effects: [BUFF.PROVOKE, BUFF.SHAKEN],
    description: 'Inflicts #Taunt# on all enemies within the radius, forcing affected monsters to attack you regardless of Aggro for #4sec.# Increases your Threat level by #100%# of your stacked #Mettle,# consuming all stacks of Mettle when cast.\r' +
      'Also inflicts #${effects[1]}# on all affected enemies for #3sec,# reducing their Move Speed #-27%,# Attack Speed #-75,# and Skill Damage #-8%.#',
    combos: [
      {
        buff: BUFF.TOUGHEN,
        text: 'Increases threat generation +200% and Mocking Howl\'s range +20m if used while under the effects of ${b}.',
      },
      {
        buff: BUFF.RETRIBUTION,
        causes: BUFF.PROVOKE,
        text: 'Inflicts Provoked on affected enemies for &nbsp;#4 sec# if used while under the effects of ${b}.',
      },
      {
        buff: BUFF.BULL_RUSH_AGGRO,
        causes: BUFF.DISTRESSED,
        text: 'Inflicts ${c} on affected enemies for #7 sec# if used while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Refreshment,
    name: 'Emitting Health',
    mana: 73,
    cooldown: 120,
    description: 'Cancels Stun, Impale, Trip, Snare, Slow, Shackle, and Dive Attack on the caster.\r\r' +
      'Can only be used while a shield is equipped.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.Retribution,
    name: 'Retribution',
    rank: 3,
    mana: 97,
    damage: { base: 438, attack: ATTACK.MELEE, ratio: 80 },
    cooldown: 30,
    description: 'For #8sec,# whenever you receive damage from a direct attack, you deal ${damage} Melee Damage and dealing additional Damage equal to #1%-2%# of your Max Health to up to #20 enemies# within an #8m# radius.\r' +
      '(This skill is not triggered by debuffs that deal damage over time.)\r\r' +
      'Triples the caster\'s Aggro.',
    descriptionNote: 'This skill doesn\'t trigger a Global Cooldown.',
  },
  {
    icon: Icon.RevitalizingCheer,
    name: 'Revitalizing Cheer',
    rank: 3,
    mana: 76,
    selfHealing: { base: 555, attack: ATTACK.HEALING, ratio: 100 },
    cooldown: 45,
    description: 'Heals the caster for ${selfHealing} Health plus an amount equal to #50%#of stacked #Mettle#, consuming all Mettle in the process.\r' +
      'Grants #Revitalizing Cheer# that Max Health #+35.0%# for #10sec#.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
    combos: [
      {
        buff: BUFF.TOUGHEN,
        text: 'Increases Healing effectiveness +25% if used while under the effects of Toughened.',
      },
    ],
  },
  {
    icon: Icon.Imprison,
    name: 'Imprison',
    mana: 159,
    effectRange: 7,
    cooldown: 60,
    description: 'Creates a wall of magic around the caster, imprisoning all characters within the radius for #12 sec.#\r' +
      'Enemies can break out if they use enough force.',
  },
  {
    icon: Icon.Invincibility,
    name: 'Invincibility',
    mana: 71,
    channeled: true,
    cooldown: 60,
    description: 'Grants the #Invicibility# buff for up to #6sec,# rendering you immune to all damage and debuffs for the duration.\r' +
      'Effect ends early if you move.',
    descriptionNote: 'Players cannot become invincible again for 15 sec after benefiting from this skill.',
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.SupplementalBlock,
    name: 'Supplemental Block',
    description: 'Increases Block Rate #+15%# for #5 seconds# after a successful Block.',
  },
  {
    icon: Icon.SpryFortress,
    name: 'Spry Fortress',
    description: 'Decreases Stun and Impale Effect Durations #- 20%.#',
  },
  {
    icon: Icon.ShieldOfSteel,
    name: 'Shield of Steel',
    description: 'Increases Physical Defense #+6%.#\r' +
      'Whenever you receive Physical Damage you gain a stack of Shield of Steel, increasing your Physical Defense #+300# for 5 sec.\r' +
      'Stacks up to #5 times.#',
  },
  {
    icon: Icon.BearsVigor,
    name: 'Bear\'s Vigor',
    description: 'Grants 10% of received damage as stacks of #Mettle.#',
  },
  {
    icon: Icon.UrsineRoar,
    name: 'Ursine Roar',
    description: 'Decreases the cooldown of Defense skills #-20%# while under the effects of #Mettle.#',
  },
  {
    icon: Icon.ShieldMastery,
    name: 'Shield Mastery',
    description: 'Whenever you block an attack, decrease received Physical Damage #-30%# for #3 sec.#\r' +
      'Increases Accuracy #+5%#.\r' +
      'This ability has a #20 sec# Cooldown once triggered.',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Shield Slam'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.ShieldSlamGale,
        mana: 91,
        damage: { base: 557, attack: ATTACK.MELEE, ratio: 60 },
        cooldown: 4,
        description: 'Performs a swift jarring attack with your shield, dealing ${damage} Melee Damage and dealing additional Damage equal to #1%-2%# of your Max Health to up to #20 enemies#, and #interrupting all Cast Times#.\r\r' +
          'Deals additional damage equal to #15%-20%# of your Max Health to non-dungeon monsters.\r\r' +
          'Grants the caster a stack of #Shield Block#.\r\r' +
          '#Shield Block#:\r' +
          '- Lasts for #15sec# - Increases your next Shield Block Rate #+100%# for the next #2 attacks#\r' +
          '- Stacks up to 5 times\r\r' +
          'This skill can destroy all Boneyards within 3m.',
        descriptionNote: 'Slightly increases Aggro generation.',
        ancestralNote: 'This skill has a reduced Cooldown.',
        combos: [
          {
            buff: BUFF.PROVOKE,
            text: 'Deals Damage +100% to Taunted non-dungeon monsters.',
          },
        ],
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.ShieldSlamQuake,
        mana: 228,
        effectRange: 6,
        effects: [BUFF.STAGGER],
        description: 'Performs a swift jarring attack with your shield, dealing ${damage} Melee Damage and dealing additional Damage equal to #1%-2%# of your Max Health to up to #20 enemies#.\r' +
          'Inflicts #Root# to affected enemies for #1sec#, disabling skill uses and movement.\r' +
          'Deals additional damage equal to #15%-20%# of your Max Health to non-dungeon monsters.\r\r' +
          'Grants the caster a stack of #Shield Block# per target hit.\r\r' +
          'Shield Block:\r' +
          '- Lasts for #15sec#\r' +
          '- - Increases your next Shield Block Rate #+100%# for the next #2 attacks#\r' +
          '- Stacks up to 5 times\r\r' +
          'This skill can destroy all Boneyards within 3m.',
        combos: [
          {
            buff: BUFF.PROVOKE,
            text: 'Deals Damage +100% to Taunted non-dungeon monsters.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Redoubt'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.RedoubtGale,
        cooldown: 15,
        effects: [BUFF.REDOUBT],
        description: 'Raises a shield around the caster for #2sec#.\r' +
          'Increases Shield Block Rate #+20%#.\r' +
          'Decreases Move Speed #-10%#.\r' +
          'Grants Immunity to Stun, Impale, Trip, Snare, Slow, Shackle, Push, and Dive Trap.\r' +
          'Stacks a Mettle per damage received.\r' +
          'Must equip a shield.\r' +
          'This effect cannot be stolen or removed by enemies. Grants 50% of received damage as stacks of #Mettle,# and prevents the caster from being Tripped. Can only be used while a shield is equipped.',
        descriptionNote: '\rThis skill doesn\'t trigger a Global Cooldown.\rThis skill has a reduced Cooldown.',
      },
      {
        element: ELEMENT.LIFE,
        icon: Icon.RedoubtLife,
        range: [0, 10],
        effects: [BUFF.REDOUBT_LIFE],
        description: 'Raises a shield around the caster and a chosen ally for #5sec#. Decreases Move Speed #-10%#.\r' +
          'Grants Immunity to Stun, Impale, Trip, Snare, Slow, Shackle, and Dive Trap.\r' +
          'Stacks a Mettle per damage received.\r' +
          'Must equip a shield.\r' +
          'This effect cannot be stolen or removed by enemies. Grants 50% of received damage as stacks of #Mettle#.\r\r' +
          'Grants #Close Protection# to the chosen ally for #5sec#. Decreases Move Speed #-10%#.\r' +
          'Grants Immunity to Stun, Impale, Trip, Snare, Slow, Shackle, and Dive Trap.',
        globalCooldown: GLOBAL_CD.REDUCED,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Imprison'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.ImprisonMist,
        effectRange: null,
        description: 'Summons a #20m# wide wall of mist directly in front of you. The wall remains in place for #12 sec.#\r' +
          'Enemies can break through if they use enough force.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.ImprisonWave,
        description: 'Summons a magical circle for #8 sec# that allows anyone to enter but prevents them from escaping.\r' +
          'Enemies can break out if they use enough force.\r' +
          'Only applies in PvP.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Lasso'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.LassoGale,
        range: [0, 12],
        cooldown: 0,
        description: 'Pulls a distant enemy to your position. This ability also #Taunts# the target, forcing affected monsters to attack you #4sec#.\r' +
          'Taunted; attacks caster regardless of aggro.\r' +
          'Pulled enemies are Staggered, disabling movement and skill use for #0.5 sec# and interrupting all Cast Time and Channeled skills.\r' +
          'This ability can be used #twice# in a row, if the skill is charged for another #20 sec#.\r\r' +
          'This skill is not affected by Ursine Roar.',
      },
      {
        element: ELEMENT.LIFE,
        icon: Icon.LassoLife,
        effects: [],
        description: 'Pulls a Party of Raid member within 20m to your position, decreasing their Aggro and canceling all targets on them.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Retribution'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.RetributionFlame,
        cooldown: 45,
        description: 'For #8sec,# whenever you receive damage from a direct attack, you deal ${damage} Melee Damage and dealing additional Damage equal to #1%-2%# of your Max Health to up to#20 enemies# within an #8m# radius.\r' +
          'At the 10th damage received, deals #200%# Melee Damage within #8m#.' +
          '(This skill is not triggered by debuffs that deal damage over time.)\r\r' +
          'Triples the caster\'s Aggro.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.RetributionMist,
        damage: null,
        description: 'Surrounds the caster with magical armor that #triples# their Aggro for #1min#.',
        descriptionNote: null,
        globalCooldown: GLOBAL_CD.NO_TRIGGER,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Revitalizing Cheer'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.RevitalizingCheerLife,
        cooldown: 30,
        selfHealing: { base: 110, attack: ATTACK.HEALING, ratio: 100 },
        description: 'Heals the caster for ${selfHealing} Health plus an amount equal to #10%# of stacked #Mettle#, consuming all Mettle in the process.\r\r' +
          'Grants #Revitalizing Cheer (Life)# that Max Health #+20.0%# for #40sec#',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.RevitalizingCheerWave,
        description: 'Heals the caster for ${selfHealing} Health plus an amount equal to #50%# of stacked #Mettle#, consuming all Mettle in the process.\r\r' +
          'Grants #Revitalizing Cheer (Wave)# that Received Healing #+80.0%# for #10sec#',
      },
    ],
  },
]);

export default skills;
