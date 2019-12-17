import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/archery/';

const skills = Object.freeze([
  {
    icon: Icon.EndlessArrows,
    name: 'Endless Arrows',
    mana: 5,
    range: [0, 25],
    damage: { base: 0, attack: ATTACK.RANGED, ratio: 50 },
    description: 'Unleash a constant stream of arrows at a single enemy, dealing ${damage} Ranged Damage per shot.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    combos: [
      {
        buff: BUFF.SLOWED,
        text: 'Deals an additional +26% damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.ChargedBolt,
    name: 'Charged Bolt',
    rank: 18,
    mana: 62,
    range: [0, 25],
    damage: { base: 1076, attack: ATTACK.RANGED, ratio: 320 },
    cooldown: 12,
    description: 'Fires a crippling arrow at an enemy, dealing ${damage} Ranged Damage and inflicting Slow for #3sec.# Decreases Move Speed #-30%#.',
    combos: [
      {
        buff: BUFF.BLEEDING,
        text: 'Deals +47% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.CURSED_SEEDS,
        causes: BUFF.IMPALED,
        text: 'Impales targets that are affected by ${b} for #2sec#',
      },
      {
        buff: BUFF.ENERVATED,
        causes: BUFF.SLEEPING,
        text: '${b} targets fall asleep for #5sec#',
      },
      {
        buff: BUFF.SILENCED,
        causes: BUFF.SILENCED,
        text: 'Duration of Silence increased by #4sec#',
      },
    ],
  },
  {
    icon: Icon.SteadyShooting,
    name: 'Steady Shooting',
    rank: 5,
    mana: 65,
    cooldown: 40,
    effects: [BUFF.STEADY_SHOOTING],
    description: 'Slow to a walk and take careful aim, gaining the following effects:\r' +
      'Slowed for #3 sec.# after using a Ranged Attack.\r' +
      'Increases Ranged Critical Damage #+56%#.\r' +
      'Decreases Block, Parry, and Evasion #-100%#.\r' +
      'Use this skill again to end the effects. The Cooldown will not start until you end Steady Shooting.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.FendingArrow,
    name: 'Fending Arrow',
    rank: 7,
    mana: 66,
    range: [0, 10],
    damage: { base: 672, attack: ATTACK.RANGED, ratio: 150 },
    cooldown: 21,
    description: 'Fires an enchanted arrow at an enemy, dealing ${damage} Ranged Damage and pushing them #15m# away from you.This counts as a Push effect.\r' +
      'This attack also interrupts the target, cancelling all Cast Time, Channeled, and Ongoing skills.',
    unblockable: true,
    combos: [
      {
        buff: BUFF.LIGHT_BLINDED,
        causes: BUFF.WEAKNESS,
        text: 'Inflicts ${c} on ${b} targets for #7sec.#',
      },
      {
        buff: BUFF.MARKED,
        text: 'Increases knockback distance 5m on ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.BlazingArrow,
    name: 'Blazing Arrow',
    rank: 6,
    mana: 72,
    range: [0, 25],
    damage: { base: 634, attack: ATTACK.RANGED, ratio: 200 },
    cooldown: 9,
    effects: [BUFF.LIGHT_BLINDED],
    description: 'Blind the enemy with an arrow of light, dealing ${damage} Ranged Damage and inflicting #Light Blindness# for #10sec.#\r' +
      'Decreases Magic Accuracy #-6%# per stack.\r' +
      'Stacks up to #4 times#.',
    descriptionNote: '\rThis skill has a +100% increased Critical Rate.\r' +
      'The Cooldown is changed to 16 seconds if used while Steady Shooting is active.',
    combos: [
      {
        buff: BUFF.BLEEDING,
        text: 'Deals +27% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.MARKED,
        causes: BUFF.BLEEDING,
        text: 'Inflicts Bleed on ${b} targets for #14sec.#',
      },
      {
        buff: BUFF.STEADY_SHOOTING,
        text: 'Charges up to 3 times if caster is under the effects of ${b}.',
      },
      {
        buff: BUFF.BLINDED_BY_CROWS,
        causes: BUFF.STUNNED,
        text: 'Inflicts Stun on enemies affected by Crows for #2sec#.',
      },
      {
        buff: BUFF.SNIPE_IMMUNITY,
        text: 'Deals additional Damage to maximum #5# other ${b} targets within a #10m# radius of the primary target.',
      },
    ],
  },
  {
    icon: Icon.Snare,
    name: 'Snare',
    rank: 6,
    mana: 102,
    effectRange: 5,
    cooldown: 24,
    effects: [BUFF.SNARED],
    description: 'Inflicts Snare on all enemies in a #${effectRange}m# radius around the caster, preventing them from moving or turning for #7.4sec.#\r' +
      'Reduces affected enemies\' Evasion, Block, and Parry rates.\r' +
      'Duration of Snare decreases -50% in PvP.',
    combos: [
      {
        buff: BUFF.DEADEYE,
        text: 'Inflicts Ranged Damage within 30m, while the caster is under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Deadeye,
    name: 'Deadeye',
    rank: 4,
    mana: 69,
    castTime: 1,
    cooldown: 80,
    description: 'Grants the following effects for #1min:#\r\r' +
      '#Deadeye:#\r' +
      'Standing still longer than #0.8 second# increases Defense Penetration #+3,500# and the range of Archery Skills #+2m#.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.ConcussiveArrow,
    name: 'Concussive Arrow',
    rank: 4,
    mana: 327,
    range: [0, 25],
    effectRange: 6,
    damage: { base: 1125, attack: ATTACK.RANGED, ratio: 360 },
    castTime: 1.5,
    cooldown: 30,
    effects: [BUFF.SILENCED],
    description: 'Prepares an enhanced explosive arrow, dealing up to ${damage} Ranged Damage to all enemies within a #${effectRange}m# radius of the primary target.\r' +
      '#Silences# all affected enemies, preventing them from casting spells for #3.5sec#.\r\r' +
      'This skill can destroy all Boneyards within 6m.',
    descriptionNote: 'This skill cannot be evaded, blocked, or parried.',
    combos: [
      {
        buff: BUFF.BLEEDING,
        text: 'Increases Defense Penetration +30% for each rank of ${b} on the target.',
      },
      {
        buff: BUFF.LAUNCHED,
        causes: BUFF.SLOWED,
        text: 'Stuns the Launched target and Slows for #4sec# when the Stun ends.',
      },
    ],
  },
  {
    icon: Icon.HuntersGuile,
    name: 'Hunter\'s Guile',
    mana: 71,
    cooldown: 60,
    description: 'Grants the caster the #Hunter\'s Guile# buff for #10sec#:\r' +
      'Critical Ranged Attacks increase Move Speed #+20%#.\r' +
      'Resets the active Cooldowns of Snare and Fending Arrow when cast.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.DoubleRecurve,
    name: 'Double Recurve',
    rank: 2,
    mana: 110,
    description: 'After charging for #8 sec#, allows the caster to leap 5m backwards.\r' +
      'Increases Ranged Critical Rate #+5%.#\r' +
      'Lasts #5sec#.',
    descriptionNote: '\rThis skill doesn\'t trigger a Global Cooldown.\r' +
      'Can\'t be used while Snared.\r' +
      'Can be charged twice.',
  },
  {
    icon: Icon.MissileRain,
    name: 'Missile Rain',
    mana: 173,
    range: [10, 50],
    effectRange: 7,
    damage: { base: 211, attack: ATTACK.RANGED, ratio: 140 },
    castTime: 2,
    cooldown: 22,
    description: 'Showers a target area with arrows, dealing ${damage} Ranged Damage per projectile.\r' +
      'This skill can hit the same enemy multiple times.',
  },
  {
    icon: Icon.Snipe,
    name: 'Snipe',
    mana: 299,
    range: [0, 45],
    damage: { base: 1613, attack: ATTACK.RANGED, ratio: 480 },
    castTime: 2,
    cooldown: 27,
    description: 'Shoots a powerful beam of light at a chose target, dealing ${damage} Ranged Damage to it and all enemies in the beam\'s path.',
    combos: [
      {
        buff: BUFF.SNARED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${b} targets for #3.1sec.#',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.WildInstincts,
    name: 'Wild Instincts',
    description: 'Increases Move Speed +#8%.#',
  },
  {
    icon: Icon.Relentless,
    name: 'Relentless',
    description: 'Decreases the Mana Cost of Archery skill #-10%# while under the effect of #Steady Shooting or Deadeye#.',
  },
  {
    icon: Icon.Sharpshooting,
    name: 'Sharpshooting',
    description: '#Archery# attacks gain a "sweet spot" of #30m,# at which they deal #+30%# bonus damage.',
  },
  {
    icon: Icon.FeralClaws,
    name: 'Feral Claws',
    description: '#Archery# critical attacks grant you one stack of #Feral Mark.# Max 1 stack per second.\r\r' +
      '#Feral Mark:#\r' +
      '- Increases Attack Speed #+40.#\r' +
      '- Decreases the Cooldown of #Archery# attacks #-0.4 sec.#\r' +
      '- Lasts #9 sec.#\r' +
      '- Stacks up to #5 times.#',
  },
  {
    icon: Icon.Marksman,
    name: 'Marksman',
    description: 'Increases Ranged Skill Damage from Archery Skills #+10%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.1 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: Icon.EagleEyes,
    name: 'Eagle Eyes',
    description: 'Increases Ranged Critical Rate #+9%.#',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Charged Bolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.ChargedBoltFlame,
        range: [0, 17],
        description: 'Fires a crippling arrow at an enemy, dealing ${damage} Ranged Damage and inflicting Slow for #3sec.# Decreases Move Speed #-30%#.\r' +
          'This skill\'s range is reduced #-8m# compared to regular Charged Bolt, but it deals +30% damage to targets within #8m.#',
      },
      {
        element: ELEMENT.GALE,
        icon: Icon.ChargedBoltGale,
        mana: 38,
        cooldown: 6,
        damage: { base: 538, attack: ATTACK.RANGED, ratio: 160 },
        description: 'Fires a crippling arrow at an enemy, dealing ${damage} Ranged Damage and inflicting Slow for #3sec.# Decreases Move Speed #-30%#.\r' +
          'This skill has a shorter Cooldown than regular Charged Bolt, but also deals less damage.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Concussive Arrow'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.ConcussiveArrowFlame,
        damage: { base: 1148, attack: ATTACK.RANGED, ratio: 440 },
        castTime: 4,
        description: 'Prepares an enhanced explosive arrow, dealing up to ${damage} Ranged Damage to all enemies within a #${effectRange}m# radius of the primary target.\r\r' +
          'Use this skill again while channeling to release the arrow early. The longer you channel, the more damage will be dealt.\r' +
          '#Silences# all affected enemies, preventing them from casting spells for #3.5sec.#\r' +
          'Interrupts all Cast Time, Channeled, and Ongoing skills.',
        descriptionNote: null,
        unblockable: true,
        combos: [
          {
            buff: BUFF.LAUNCHED,
            causes: BUFF.SLOWED,
            text: 'Stuns the ${b} target and Slows for #4sec# when the Stun ends.',
          },
        ],
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.ConcussiveArrowMist,
        range: [0],
        castTime: 0,
        damage: { base: 1225, attack: ATTACK.RANGED, ratio: 240 },
        description: 'Fires a smoke bomb that explodes directly in front of the caster, dealing ${damage} Ranged Damage to all enemies within a #${effectRange}m# radius of the primary target. The caster is propelled #12m# backward after firing.\r' +
          'This skill can destroy all Boneyards within 6m.\r\r' +
          'Silences all affected enemies, making them unable to cast spells for #3.5sec#.',
        descriptionNote: null,
        unblockable: true,
        movement: true,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Missile Rain'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.MissileRainFlame,
        range: [10, 30],
        effectRange: 4,
        castTime: 3,
        description: 'Showers a target area with arrows, dealing ${damage} Ranged Damage per projectile.\r' +
          'This skill can hit the same enemy multiple times.\r' +
          'This skill deals more damage than regular Missile Rain, but has reduced range, cast speed, and area of affect.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.MissileRainMist,
        range: [0, 25],
        effectRange: null,
        damage: { base: 79, attack: ATTACK.RANGED, ratio: 60 },
        castTime: 0,
        description: 'Shoots #5 volleys# of #6 arrows# each over #2 sec,# dealing ${damage} Ranged damage in a cone in front of you.\r' +
          'This skill can hit the same enemy multiple times.\r' +
          'Knocks back affected enemies within #8m,# but deals #20%# less damage within that range.\r' +
          'This skill counts as a Push effect.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Endless Arrows'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.EndlessArrowsFlame,
        mana: 24,
        damage: { base: 0, attack: ATTACK.RANGED, ratio: 170 },
        globalCooldown: GLOBAL_CD.INCREASED,
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.EndlessArrowsStone,
        damage: { base: 0, attack: ATTACK.RANGED, ratio: 43 },
        description: 'Unleash a constant stream of arrows at a single enemy, dealing ${damage} Ranged Damage per shot.\r' +
          'Inflicts the #Stone Endless Arrows# effect on the target, which Inflicts #Trip# on the target for #2 sec.#, at the #50th stack#, preventing them to move or use skills. for #3sec#.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Snipe'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.SnipeFlame,
        range: [0, 35],
        damage: { base: 2016, attack: ATTACK.RANGED, ratio: 600 },
        description: 'Shoots a powerful beam of light at a chose target, dealing ${damage} Ranged Damage.\r' +
          'This skill deals additional #+60%# Ranged Damage to targets under the effects of Slow, Snare, Silence, Obscure Vision or targets with 30% of Health or lower.',
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.SnipeLightning,
        castTime: 5,
        description: 'Shoots a powerful beam of light at a chosen target, dealing ${damage} Ranged Damage to it and all enemies in the beam\'s path.\r' +
          'Use this skill again during channeling to release the arrow beam early.\r' +
          'The longer you channel, the more Defense Reduction is applied to the target (up to #-30%#).',
        descriptionNote: '\rThe minimum channeling time is 2 seconds.',
      },
    ],
  },
]);

export default skills;
