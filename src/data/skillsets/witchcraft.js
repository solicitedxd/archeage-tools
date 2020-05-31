import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skills';
import * as Icon from '../../images/skill/witchcraft/';

const skills = Object.freeze([
  {
    icon: Icon.EarthenGrip,
    name: 'Earthen Grip',
    rank: 14,
    mana: 167,
    range: [0, 20],
    damage: { base: 835, attack: ATTACK.MAGIC, ratio: 220 },
    castTime: 1,
    cooldown: 18,
    effects: [BUFF.SNARED],
    duration: 17.2,
    description: 'Calls forth a hand from the ground to hold an enemy. Inflicts Snare on the target, preventing them from moving or turning for #${duration}sec.#\r' +
      'Deals ${damage} Magic Damage on expiration.\r' +
      'Being damaged by a direct attack will free the target early, but debuffs that deal damage over time will not end this effect.\r' +
      'Snare duration reduced #-50%# in PvP.',
    combos: [
      {
        buff: BUFF.ENERVATED,
        text: 'Decreases Mana on the ${b} target.',
      },
      {
        buff: BUFF.FEARED,
        causes: BUFF.EARTHEN_GRIP_DISARM,
        text: 'Disarms the ${b} target\'s instrument for #6sec#.',
      },
    ],
  },
  {
    icon: Icon.Enervate,
    name: 'Enervate',
    rank: 14,
    mana: 55,
    range: [0, 20],
    damage: { base: 432, attack: ATTACK.MAGIC, ratio: 90 },
    cooldown: 24,
    effects: [BUFF.ENERVATED],
    description: 'Deals ${damage} Magic Damage to the enemy, and burns #288# mana over #10sec.# Decreases healing effectiveness #-60%# and increases duration of Stun and Trip #+30%.#',
    combos: [
      {
        buff: BUFF.FEARED,
        text: 'When used on the ${b} targets, burns Mana equal to 40% of the damage.',
      },
    ],
  },
  {
    icon: Icon.BubbleTrap,
    name: 'Bubble Trap',
    rank: 5,
    mana: 108,
    range: [0, 20],
    castTime: 1.5,
    cooldown: 39,
    duration: 18.8,
    effects: [BUFF.CONFINED, BUFF.LAUNCHED],
    description: 'Confines an enemy inside a bubble for #${duration}sec# and slowly lifts it into the air, preventing all actions except Evade, Block, and Parry.\r' +
      'Enemies in bubbles can\'t attack, but take -50% less Magic Damage.\r' +
      'Being damaged by a direct attack will free the target early, but debuffs that deal damage over time will not end this effect.\r' +
      'Bubble duration reduced #-50%# in PvP.',
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals &(#782-798# + 155% Magic Attack)& Magic Damage to ${b} targets.',
      },
      {
        buff: BUFF.BURNING,
        text: 'Burning targets are thrown higher.',
      },
    ],
  },
  {
    icon: Icon.InsidiousWhisper,
    name: 'Insidious Whisper',
    rank: 5,
    mana: 71,
    castTime: 2,
    cooldown: 45,
    effects: [BUFF.FEARED],
    duration: 5.1,
    description: 'Inflicts ${effects[0]} on an enemy for #${duration}sec,# causing it to run in random directions and preventing all other actions except Evade, Block, and Parry.\r' +
      'Being damaged by a direct attack has a chance to free the target early, but debuffs that deal damage over time will not end this effect.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Increases Fear duration #+1.5 sec# on ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.MirrorWarp,
    name: 'Mirror Warp',
    mana: 29,
    cooldown: 30,
    description: 'Gives the caster the option to teleport #15m# to the right or left.\r' +
      'Can\'t pass through walls or other solid objects.\r' +
      'Temporarily escapes enemy targeting during PvP.',
    movement: true,
    combos: [
      {
        buff: BUFF.RESURGENCE,
        causes: BUFF.RESURGENCE,
        text: 'Grants ${c} to allies you pass through if used while under the effects ${b}.',
      },
    ],
  },
  {
    icon: Icon.Purge,
    name: 'Purge',
    mana: 59,
    range: [0, 20],
    cooldown: 30,
    description: 'When used on enemies, this skill removes 1 positive buff at random.\r' +
      'When used on yourself or allies, this skill removes 1 debuff at random\r' +
      'Grants Immunity to debuffs from Perform skills for #10sec#.\r' +
      'Immune to debuff performing skills.',
    globalCooldown: GLOBAL_CD.REDUCED,
    noMiss: true,
    combos: [
      {
        buff: BUFF.SHACKLE,
        causes: BUFF.SILENCED,
        text: 'Silences Shackled targets for #4sec.#',
      },
    ],
  },
  {
    icon: Icon.Lassitude,
    name: 'Lassitude',
    mana: 55,
    range: [0, 10],
    cooldown: 45,
    effects: [BUFF.SLEEPING],
    duration: 12,
    description: 'Inflicts #Lassitutde# on an enemy, increasingly Slowing Attack Speed and Move Speed over #4sec.#\r' +
      'When #Lassitude# expires, it inflicts #Sleep,# preventing all actions for #${duration}sec.#\r' +
      'Affected enemies will wake up early upon taking damage.',
    combos: [
      {
        buff: BUFF.FREEZING,
        text: 'Increases the duration of Sleep #+10 sec# when used on targets under ${b} effects.',
      },
    ],
  },
  {
    icon: Icon.Stillness,
    name: 'Stillness',
    ran: 52,
    range: [0, 20],
    effectRange: 10,
    castTime: 1,
    cooldown: 36,
    effects: [BUFF.SILENCED],
    description: 'Inflicts #Silence# on enemies in the target area, preventing them from casting spells for #3sec.# Silenced enemies are also interrupted, canceling all Cast Time, Channeled, and Ongoing skills.\r' +
      'Removes all enemy Songcraft effects in the area.',
  },
  {
    icon: Icon.DahutasBreath,
    name: 'Dahuta\'s Breath',
    rank: 2,
    mana: 454,
    effectRange: 10,
    damage: { base: 1658, attack: ATTACK.MAGIC, ratio: 150 },
    cooldown: 21,
    description: 'Sends forth a wave that deals ${damage} Magic Damage and pushes up to #8 enemies 10m# away from you.\r' +
      'Pushed enemies are Staggered, briefly disabling movement and skill use and canceling all Cast Time and Channeled skills.\r' +
      'This skill counts as a push effect.',
    combos: [
      {
        buff: BUFF.RENEWAL,
        text: 'Grants Renewal to allies in the area of effect if cast while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.FocalConcussion,
    name: 'Focal Concussion',
    rank: 4,
    mana: 178,
    range: [0, 8],
    damage: { base: 1303, attack: ATTACK.MAGIC, ratio: 110 },
    cooldown: 27,
    effects: [BUFF.SLEEPING],
    description: 'Deals ${damage} Magic Damage and Sleeps an enemy for #3sec.#\r' +
      'If the target has any positive buffs, Focal Concussion removes one buff at random and deals additional damage when the Sleep effect ends.\r' +
      'Sleep duration reduced -50% in PvP.',
  },
  {
    icon: Icon.BansheeWail,
    name: 'Banshee Wail',
    mana: 159,
    effectRange: 5,
    cooldown: 45,
    effects: [BUFF.FEARED],
    duration: 3.8,
    description: 'Inflicts Fear on #up to 8# nearby enemies for #${duration}sec,# causing them to run in random directions and preventing all other actions, except Evade, Block, and Parry.\r' +
      'Being damaged by a direct attack has a chance to free the target early, but debuffs that deal damage over time will not end this effect.\r' +
      'Grants affected enemies temporary #Fear Immunity# when the Fear effect expires.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Increases Fear duration #+2 sec# on ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.FiendsKnell,
    name: 'Fiend\'s Knell',
    mana: 1420,
    range: [0, 30],
    effectRange: 5,
    castTime: 4,
    cooldown: 60,
    description: 'Summons a fiend to follow you, relentlessly attacking your enemies with special skills.\r' +
      'Trips up to #8 enemies# in a #5m# area for #1.5sec# where the Fiend is summoned.\r' +
      'The fiend\'s Health decreases #-5%# every #sec#.\r' +
      'Snares up to #8 enemies# within a #6m# radius for #10 sec#.\r' +
      'Snare duration #-50%# during PvP.',
    descriptionNote: '\r' +
      'The Fiend can\'t be healed, and can\'t be summoned at the same time as Mist Banshee Wail or Mist Summon Wraith.',
    combos: [
      {
        buff: BUFF.ENERVATED,
        causes: BUFF.SLEEPING,
        text: 'The fiend\'s attack inflicts Sleep on ${b} targets.',
      },
      {
        buff: BUFF.LASSITUDE,
        causes: BUFF.SLEEPING,
        text: 'The fiend\'s attack inflicts Sleep on targets under the effects of ${b}.',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.FoldingTime,
    name: 'Folding Time',
    description: 'Decreases Cast Time for all Skills #-4%#\r' +
      'Increases Attack Speed #+20#.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { castTime: 0.96 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: Icon.HomingHexes,
    name: 'Homing Hexes',
    description: '#Insidious Whisper, Banshee Wail, Bubble Trap,# and #Lassitude# never miss.',
  },
  {
    icon: Icon.IllusionsFavor,
    name: 'Illusion\'s Favor',
    description: 'Decreases the Cast Time for #Earthen Grip, Insidious Whisper, Stillness, Bubble Trap,# and #Fiend\'s Knell -0.5 sec.#',
    skillMod: [
      {
        type: SKILLMOD.FLAT,
        vars: { castTime: -0.5 },
        skills: [0, 2, 3, 7, 11],
      },
    ],
  },
  {
    icon: Icon.Exploitation,
    name: 'Exploitation',
    description: 'Gain a stack of #Exploitation# for each enemy you inflict with fear using Banshee\'s Wail or Insidious Whisper.\r\r' +
      '#Exploitation:#\r' +
      '- Decreases the Cooldown of Focal Concussion and Enervate #-10%# per stack.\r' +
      '- Lasts #40 sec.#\r' +
      '- Stacks up to #5 times.#\r' +
      '- Casting either spell consumes one stack.\r' +
      '- While under the effects of Exploitation, both spells will deal #90%# of their damage as mana burn instead of normal damage, restoring an equal amount of mana to you.',
  },
  {
    icon: Icon.AugmentWitchcraft,
    name: 'Augment Witchcraft',
    description: 'Increases the duration of #Earthen Grip, Bubble Trap, Insidious Whisper, Lassitude,# and #Banshee Wail# effects #+20%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { duration: 1.2 },
        skills: [0, 2, 3, 6, 10],
      },
    ],
  },
  {
    icon: Icon.Enshroud,
    name: 'Enshroud',
    description: 'Decreases Witchcraft Skill Cooldowns #-30%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { cooldown: 0.7 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Earthen Grip'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.EarthenGripLightning,
        range: [0, 12],
        castTime: 0.5,
        description: 'Calls forth a hand from the ground to hold an enemy. Inflicts Snare on the target, preventing them from moving or turning for #${duration}sec.#\r' +
          'Deals ${damage} Magic Damage upon expiration.\r' +
          'Being damaged by a direct attack will free the target early, but debuffs that deal direct damage over time will not end this effect.\r' +
          'Snare duration reduced -50% in PvP.' +
          'This skill has a reduced Cast Time compared to regular Earthen Grip, but also has a shorter range.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.EarthenGripQuake,
        range: [0],
        effectRange: 8,
        damage: { base: 1125, attack: ATTACK.MAGIC, ratio: 100 },
        description: 'Calls forth hands from the ground that grab all enemies within #${effectRange}m#. Inflicts Snare on affected enemies, preventing them from moving or turning for #${duration}sec.#\r' +
          'Deals ${damage} Magic Damage upon expiration.\r' +
          'Being damaged by a direct attack will free the target early, but debuffs that deal direct damage over time will not end this effect.\r' +
          'Snare duration reduced -50% in PvP.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Bubble Trap'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: Icon.BubbleTrapGale,
        range: [0, 8],
        castTime: 2,
        cooldown: 21,
        duration: 9.4,
        effects: [],
        description: 'Confines an enemy inside a bubble for #${duration}sec# and slowly lifts it into the air, preventing all actions except Evade, Block, and Parry.\r' +
          'Being damaged by a direct attack will free the target early, but debuffs that deal direct damage over time will not end this effect.\r' +
          'Enemies in bubbles take -50% less Magic Damage.\r' +
          'Bubble duration reduced -50% in PvP.\r' +
          'This skill has a reduced Cooldown compared to regular Bubble Trap, but also has a shorter range.',
        combos: [
          {
            buff: BUFF.ELECTROCUTED,
            text: 'Deals &(#782-798# + 206% Magic Attack)& Magic Damage to ${b} targets.',
          },
          {
            buff: BUFF.BURNING,
            text: 'Burning targets are thrown higher into the air.',
          },
        ],
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.BubbleTrapMist,
        mana: 216,
        effectRange: 4,
        effects: [],
        duration: 8.4,
        description: 'Summons a mist at the target location that lasts for #15 sec,# affecting all enemies within a #${effectRange}m# radius.\r' +
          'Each time an enemy enters the mist it becomes Confined in a bubble, rising into the air for #${duration}sec# and preventing all actions except Evade, Block, and Parry.\r' +
          'Being damaged by a direct attack will free the target early, but debuffs that deal damage over time will not end this effect.\r' +
          'Enemies in bubbles take -50% less Magic Damage.\r' +
          'Bubble duration reduced -50% in PvP.',
        combos: [],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Banshee Wail'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.BansheeWailMist,
        range: [0, 20],
        description: 'Summons a Phantasm at the target location for #7 sec.# The Phantasm inflicts Fear on #up to 8# enemies within a #5m# radius every second, causing them to run in random directions for up to #3.8sec# and preventing all other actions except Evade, Block, and Parry.\r' +
          'Being damaged by a direct attack has a chance to free the target early, but debuffs that deal damage over time will not end this effect.\r' +
          'Grants affected enemies temporary #Fear Immunity# when the fear effect expires.',
        descriptionNote: '\rThe duration of the skill\'s Fear effect is not affected by the caster\'s Passive skills.\r' +
          'Cannot be used in conjunction with Mist Summon Wraith (Occultism).',
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.BansheeWailStone,
        effects: [BUFF.FEARED, BUFF.SLOWED],
        duration: 2.8,
        description: 'Inflicts Fear and Slow on #up to 8# nearby enemies for #${duration}sec#. Slows their Move Speed #-40%#, causes them to run in random directions, and prevents all other actions, except Evade, Block, and Parry.\r' +
          'Being damaged by a direct attack has a chance to free the target early, but debuffs that deal damage over time will not end this effect.\r' +
          'Grants affected enemies temporary #Fear Immunity# when the Fear effect expires.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Mirror Warp'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.MirrorWarpFlame,
        cooldown: 40,
        description: 'Gives the caster the option to teleport 8m to the right or left multiple times for #2sec#.\r' +
          'Teleports the caster #8m# to the left or right.\r' +
          'Temporarily escapes enemy targeting during PvP.',
        descriptionNote: '\rCan\'t pass through walls or other solid objects.',
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.MirrorWarpStone,
        description: 'Gives the caster the option to teleport 15m to the right or left.\r' +
          'Temporarily escapes enemy targeting during PvP.',
        descriptionNote: '\rCan\'t pass through walls or other solid objects.',
        combos: [
          {
            buff: BUFF.RESURGENCE,
            causes: BUFF.SLEEPING,
            text: 'Casts Sleep on enemies you pass through for #12 sec#, if used while under the effects of ${b}.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Dahuta\'s Breath'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.DahutasBreathMist,
        range: [8, 20],
        effectRange: 8,
        description: 'Sends forth a wave that deals ${damage} Magic Damage and pulls up to #8 enemies 10m# towards the castern.',
        descriptionNote: '\rThe additional push effect is not available in the water.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.DahutasBreathQuake,
        description: 'Sends forth a wave that deals ${damage} Magic Damage and pushes up to #8 enemies 10m# away from you, and additionally pushes enemies nearby the affected enemies.',
        descriptionNote: '\rThe additional push effect is not available in the water.',
      },
    ],
  },
]);

export default skills;
