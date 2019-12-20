import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/shadowplay/';

const skills = Object.freeze([
  {
    icon: Icon.RapidStrike,
    name: 'Rapid Strike',
    rank: 1,
    mana: 8,
    range: [0, 4],
    damage: { base: 0, attack: ATTACK.MELEE, ratio: 66 },
    description: 'A swift, repeatable attack, dealing ${damage} Melee Damage to a single target.\r' +
      'Backstabbing increases Melee Critical Rate #+50%#.\r' +
      'Backstabbing grants a stack of #Ferocity# with each hit, increasing Rapid Strike\'s Attack Speed each stack up to a max of 10 stacks.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
  },
  {
    icon: Icon.PoisonedWeapons,
    name: 'Poisoned Weapons',
    rank: 18,
    mana: 93,
    poisonDamage: { base: 1274, attack: ATTACK.MAGIC, ratio: 240 },
    cooldown: 9,
    effects: [BUFF.POISONED],
    poisonDuration: 6,
    description: 'Coats your weapons in poison for #9 sec.#\r' +
      'Your next Melee or Ranged attack during that time will deal an additional ${poisonDamage} Magic Damage over #${poisonDuration} sec#.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.DropBack,
    name: 'Drop Back',
    rank: 1,
    mana: 25,
    range: [0],
    cooldown: 12,
    description: 'Leap backwards #10m# to escape a dangerous area or back away from an enemy. Grants the Drop Back buff, eliminating Cast Time for Flamebolt, Antithesis, and Sunder Earth for #2.5sec#.',
    globalCooldown: GLOBAL_CD.REDUCED,
    movement: true,
  },
  {
    icon: Icon.PinDown,
    name: 'Pin Down',
    rank: 11,
    mana: 189,
    range: [0, 4],
    damage: { base: 1382, attack: ATTACK.MELEE, ratio: 150 },
    bleedDamage: { base: 1135, attack: ATTACK.MELEE, ratio: 157 },
    poisonDamage: { base: 1135, attack: ATTACK.MELEE, ratio: 160 },
    bleedDuration: 14,
    cooldown: 21,
    effects: [BUFF.BLEEDING],
    description: 'Causes a deep wound that deals ${damage} Melee Damage and inflicts #${effects[0]}# for #${bleedDuration}sec,# dealing an additional ${bleedDamage}#-#${poisonDamage} Melee Damage over the duration.',
    combos: [
      {
        buff: BUFF.POISONED,
        causes: BUFF.SILENCED,
        text: 'Inflicts Silence on ${b} targets for #3sec#.',
      },
      {
        buff: BUFF.BLOODTHIRST,
        causes: BUFF.STAGGER,
        text: 'Inflicts ${c} for #1 sec# when used while under the effects of ${b}.',
      },
      {
        buff: BUFF.BLEEDING,
        causes: BUFF.BLEEDING,
        text: 'Inflicts a higher rank of ${c} on targets already under ${b} effects.',
      },
    ],
  },
  {
    icon: Icon.Overwhelm,
    name: 'Overwhelm',
    rank: 9,
    mana: 157,
    range: [0, 15],
    damage: { base: 1176, attack: ATTACK.MELEE, ratio: 100 },
    cooldown: 18,
    description: 'Leap toward an enemy and deal ${damage} Melee Damage.',
    movement: true,
    combos: [
      {
        buff: BUFF.BLOODTHIRST,
        causes: BUFF.STAGGER,
        text: 'Inflicts ${c} for #1sec# when used while under the effects of ${b}.',
      },
      {
        buff: BUFF.MARKED,
        text: 'Cannot be evaded, blocked or parried when used on a ${b} target.',
      },
    ],
  },
  {
    icon: Icon.StalkersMark,
    name: 'Stalker\'s Mark',
    rank: 4,
    mana: 63,
    range: [0, 25],
    cooldown: 27,
    effects: [BUFF.MARKED],
    description: 'Marks an enemy for #15sec#.\r' +
      'Increases Received Range and Magic Damage #+16.0%.#',
  },
  {
    icon: Icon.Wallop,
    name: 'Wallop',
    rank: 7,
    mana: 287,
    range: [0, 4],
    damage: { base: 2039, attack: ATTACK.MELEE, ratio: 300 },
    cooldown: 12,
    description: 'Launches four attacks in quick succession, dealing ${damage} Melee Damage.',
    combos: [
      {
        buff: BUFF.BLOODTHIRST,
        causes: BUFF.STAGGER,
        text: 'Inflicts ${c} for #0.3sec# when used while under the effects of ${b}.',
      },
      {
        buff: BUFF.POISONED,
        causes: BUFF.VULNERABLE,
        text: 'Inflicts Vulnerability on ${b} targets, increasing Damage Received +1.4% for #10sec#. Stacks up to 4 times.',
      },
    ],
  },
  {
    icon: Icon.Stealth,
    name: 'Stealth',
    rank: 4,
    mana: 83,
    effects: [BUFF.STEALTHED],
    description: 'Renders you invisible to your enemies for up to #45sec#.\r' +
      'Decreases Move Speed #-5%#.\r' +
      'Grants 1 stack of #Bloodthirst# every #second#.\r' +
      'Ends early when performing any action other than moving.\r' +
      'Cooldown doesn\'t start until after #Stealth# ends.',
  },
  {
    icon: Icon.Freerunner,
    name: 'Freerunner',
    rank: 2,
    mana: 79,
    cooldown: 90,
    description: 'Increases Move Speed #+40.0%# and Attack Speed #+64# for #30 sec#.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: Icon.Shadowsmite,
    name: 'Shadowsmite',
    rank: 3,
    mana: 106,
    damage: { base: 780, attack: ATTACK.MELEE, ratio: 0 },
    cooldown: 24,
    description: 'Launches a surprise attack, dealing ${damage} Melee Damage to the target.\r\r' +
      'Backstabbing adds damage equal to #400%# of Melee Attack.',
    combos: [
      {
        buff: BUFF.STUNNED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #2.5sec.#',
      },
      {
        buff: BUFF.STEALTHED,
        text: 'Deals an additional +98% damage when the caster is ${b}.',
      },
      {
        buff: BUFF.STEALTHED,
        causes: BUFF.BLOODTHIRST_EXPLOSION,
        text: 'If used while ${b}, consumes all stacks of Bloodthirst and grants #0.5 sec# of ${r} for each stack consumed in this way.',
      },
      {
        buff: BUFF.POISONED,
        causes: BUFF.SHACKLE,
        text: 'Inflicts ${c} on ${b} targets for #5.7sec#.',
      },
    ],
  },
  {
    icon: Icon.Leech,
    name: 'Leech',
    mana: 79,
    range: [0, 12],
    cooldown: 45,
    description: 'Steals #2 to 3# random buffs from an enemy and applies them to yourself.',
    combos: [
      {
        buff: BUFF.CONVERSION_SHIELD,
        text: 'Guaranteed to steal ${b}.',
      },
      {
        buff: BUFF.COURAGEOUS_ACTION,
        text: 'Steal ${b} from enemies.',
      },
    ],
  },
  {
    icon: Icon.ThrowDagger,
    name: 'Throw Dagger',
    mana: 402,
    range: [0, 10],
    damage: { base: 1469, attack: ATTACK.MELEE, ratio: 120 },
    cooldown: 35,
    description: 'Throws a dagger that deals ${damage} Melee Damage to a single enemy, then ricochets to 5 additional enemies with a #7m# radius of the primary target, dealing less damage for each affected enemies.\r' +
      'Decreases Attack Speed -#400#.\r' +
      'Increases Cast Time #+40%#.\r' +
      'Cancels Warding Light, Warding Mist, Conversion Shield, Protective Wings, Insulating Lens, and Mana Barrier, and grants immunity to the effects for #3 sec#.\r\r' +
      'Effect lasts up to #3sec#.',
    combos: [
      {
        buff: BUFF.DROP_BACK,
        text: 'Increases range by 10m if used while under the effects of ${b}.',
      },
      {
        buff: BUFF.POISONED,
        causes: BUFF.SLOWED,
        text: 'Inflicts Slow on ${b} targets for #3 sec#. [Reduces Move Speed]',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.ShadowTraining,
    name: 'Shadow Training',
    description: 'Increases Attack Speed +#40.#',
  },
  {
    icon: Icon.BecomeVoid,
    name: 'Become Void',
    description: 'Increases Evasion Rate #+5%.#',
  },
  {
    icon: Icon.RuthlessAssault,
    name: 'Ruthless Assault',
    description: 'Increases Attack Speed #+120# for #8 sec# whenever you inflict a Critical Strike or a Critical Heal.\r\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.BloodthirstIntensified,
    name: 'Bloodthirst Intensified',
    description: 'When gaining Bloodthirst, accumulate #2 stacks# at a time.\r\r' +
      '#Bloodthirst:#\r' +
      '- Increases all Skill Damage and Healing #+3%# per stack.\r' +
      '- Stacks up to #10 times.#\r' +
      '- Lose #2 stacks# of Bloodthirst each time you damage an enemy.\r' +
      '- Lasts #25 sec.#',
  },
  {
    icon: Icon.LethalToxins,
    name: 'Lethal Toxins',
    description: 'Increases the Duration of #Poison and Bleeding# effects you inflict #+70%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: {
          poisonDuration: 1.7,
          bleedDuration: 1.7,
          bleedDamage: 1.7,
          poisonDamage: 1.7,
        },
        skills: [1, 3],
      },
    ],
  },
  {
    icon: Icon.ShadowMastery,
    name: 'Shadow Mastery',
    description: 'Decreases #Shadowplay# Skill Cooldowns #-20%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { cooldown: 0.8 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Overwhelm'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.OverwhelmFlame,
        damage: { base: 547, attack: ATTACK.MELEE, ratio: 200 },
        cooldown: 26,
        description: 'Leap toward an enemy and deal ${damage} Melee Damage.\r' +
          'If used while backstabbing, Grants #+100%# to all Critical Rates for the next skill used.',
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.OverwhelmLightning,
        range: [0, 6],
        damage: { base: 547, attack: ATTACK.MELEE, ratio: 200 },
        description: 'Leap directly over an enemy\'s head, dealing ${damage} Melee Damage as you pass and then continuing on to land #18m# past them.\r' +
          'Inflicts #Bloodthirst Shock# that temporarily rooted by the Bloodthirst shock attack for #1sec#.',
        combos: [
          {
            buff: BUFF.MARKED,
            text: 'Cannot be evaded, blocked or parried when used on a ${b} target.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Drop Back'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.DropBackMist,
        description: 'Leap forward #10m# to escape a dangerous area or close the distance between you and an enemy.\r' +
          'Grants the Drop Back buff, eliminating the Cast Time for Flamebolt, Antithesis, and Sunder Earth for #2.5sec#.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.DropBackWave,
        description: 'Leap backwards #10m# to escape a dangerous area or back away from an enemy.\r' +
          'Grants the Wave Drop Back buff, eliminating the Cast Time for Concussive Arrow, Mend, and Insulating Lens for #2.5sec#.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Shadowsmite'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.ShadowsmiteLightning,
        range: [0, 6],
        description: 'Teleports behind an enemy within #${range[1]}m# and attempts to backstab them, dealing ${damage} Melee Damage to the target.\r' +
          'Backstabbing adds damage equal to #400%# of Melee Attack.\r' +
          'This skill has increased range and allows you to teleport to the target, but does not have a combo with Poison.',
        combos: [
          {
            buff: BUFF.STUNNED,
            causes: BUFF.TRIPPED,
            text: 'Trips ${b} targets for #2.5sec.#',
          },
          {
            buff: BUFF.STEALTHED,
            text: 'Deals an additional +98% damage when the caster is ${b}.',
          },
          {
            buff: BUFF.STEALTHED,
            causes: BUFF.BLOODTHIRST_EXPLOSION,
            text: 'If used while ${b}, consumes all stacks of Bloodthirst and grants #0.5 sec# of ${r} for each stack consumed in this way.',
          },
        ],
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.ShadowsmiteMist,
        description: 'Launches a surprise attack, dealing ${damage} Melee Damage to the target.\r' +
          'Backstabbing adds damage equal to #400%# of Melee Attack.\r' +
          'This skill Trips targets that are under the effects of Provoke, but does not have a combo with Stun.',
        combos: [
          {
            buff: BUFF.PROVOKE,
            causes: BUFF.TRIPPED,
            text: 'Trips ${b} targets for #2.5sec.#',
          },
          {
            buff: BUFF.STEALTHED,
            text: 'Deals an additional +98% damage when the caster is ${b}.',
          },
          {
            buff: BUFF.STEALTHED,
            causes: BUFF.BLOODTHIRST_EXPLOSION,
            text: 'If used while ${b}, consumes all stacks of Bloodthirst and grants #0.5 sec# of ${r} for each stack consumed in this way.',
          },
          {
            buff: BUFF.POISONED,
            causes: BUFF.SHACKLE,
            text: 'Inflicts ${c} on ${b} targets for #5.7sec#.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Freerunner'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.FreerunnerFlame,
        description: 'Increases the caster\'s Movement Speed and Attack Speed for #20sec#, but causes them to be Slowed after the effect ends. Killing an enemy resets the buff duration.\r' +
          'Increases Move Speed &nbsp;#+30.0%#.\r' +
          'Increases Attack Speed +#42#.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.FreerunnerQuake,
        effectRange: 5,
        description: 'Increases the caster\'s and nearby allies\' Move Speed and Attack Speed for #30sec#.\r' +
          'Increases Move Speed #+30.0%#\r' +
          'Increases Attack Speed +#42#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Poisoned Weapons'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.PoisonedWeaponsFlame,
        description: 'Coats your weapons in poison for #3sec.#\r' +
          'Your next Melee or Ranged attack during that time will deal an additional ${poisonDamage} Magic Damage over #6 sec#. The poison can be transferred continuously.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.PoisonedWeaponsWave,
        poisonDamage: null,
        description: 'Coats your weapons in poison for #6sec.#\r' +
          'Your next Melee or Ranged attack during that time will decrease the Evasion of the target #-10%# over #6 sec#.',
      },
    ],
  },
]);

export default skills;
