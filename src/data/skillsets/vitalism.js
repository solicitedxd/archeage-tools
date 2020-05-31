import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skills';
import * as Icon from '../../images/skill/vitalism/';

const skills = Object.freeze([
  {
    icon: Icon.HolyBolt,
    name: 'Holy Bolt',
    rank: 14,
    mana: 202,
    range: [0, 20],
    damage: { base: 738, attack: ATTACK.HEALING, ratio: 142 },
    castTime: 2,
    description: 'Fires a bolt of holy light that deals ${damage} Magic Damage to a single target.',
    allyHealing: { base: 511, attack: ATTACK.HEALING, ratio: 142 },
    continuousHold: true,
    castTimeLevel: true,
    combos: [
      {
        buff: BUFF.CURSED,
        text: 'Deals +20% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.BLESSED,
        text: 'Heals allies ${b} by you as long as they are within 15m of the target, for ${allyHealing} (Can also be used to heal the caster, but does so with 30% effectiveness.)',
      },
      {
        buff: BUFF.PRAYER,
        text: 'Deals +30% Damage per stack of ${b}.\r' +
          'Does not apply to dungeon monsters.',
      },
      {
        buff: BUFF.DIVINE_RESPONSE,
        text: 'Deals +150% Damage, when the caster is under the effects of ${b}.\r' +
          'Does not apply to dungeon monsters.',
      },
    ],
  },
  {
    icon: Icon.MirrorLight,
    name: 'Mirror Light',
    mana: 15,
    range: [0, 25],
    cooldown: 21,
    effects: [BUFF.SNARED],
    description: 'When used on yourself or allies: cures one debuff and grants #Blessing,# increasing Received Healing #+15%# for #1min30sec.#\r' +
      'When used on enemies: inflicts #Curse,# increasing Received Damage #+12%# for #20sec.# Also inflicts Snare on affected enemies, preventing movement or turning for #3sec.# Snare duration reduced #-50%# in PvP.',
  },
  {
    icon: Icon.Antithesis,
    name: 'Antithesis',
    rank: 8,
    mana: 149,
    range: [0, 25],
    allyHealing: { base: 547, attack: ATTACK.HEALING, ratio: 300 },
    selfHealing: { base: 383, attack: ATTACK.HEALING, ratio: 210 },
    enemyDamage: { base: 1039, attack: ATTACK.HEALING, ratio: 300 },
    castTime: 2,
    cooldown: 3,
    description: 'A burst of holy energy that heals you for ${selfHealing} or an ally for ${allyHealing} Health, or deals ${enemyDamage} as Magic Damage to an enemy.',
    combos: [
      {
        buff: BUFF.RENEWAL,
        text: 'Healing increased +30% when used on an ally under the effects of ${b}.',
      },
      {
        buff: BUFF.FREERUNNER,
        text: 'Cooldown removed while caster is under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Resurgence,
    name: 'Resurgence',
    rank: 14,
    mana: 147,
    range: [0, 30],
    allyHealing: { base: 538, attack: ATTACK.HEALING, ratio: 280 },
    selfHealing: { base: 376, attack: ATTACK.HEALING, ratio: 196 },
    effects: [BUFF.RESURGENCE],
    description: 'Restores ${selfHealing} Health to the caster and ${allyHealing} Health to an ally over #10sec#.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: Icon.Skewer,
    name: 'Skewer',
    rank: 8,
    mana: 639,
    range: [0, 25],
    effectRange: 5,
    damage: { base: 1613, attack: ATTACK.HEALING, ratio: 600 },
    castTime: 3,
    cooldown: 18,
    effects: [BUFF.IMPALED],
    description: 'Summons four skewers within a 20m circle at the target area, dealing ${damage} Magic Damage to all enemies within the radius and inflicting Impale, preventing all actions for #2.6sec#.\r' +
      'Skewers deal more damage where they overlap.',
    descriptionNote: '\rDamage increases as this skill levels up.',
    combos: [
      {
        buff: BUFF.IMPALED,
        text: 'Deals +45% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.PRAYER,
        text: 'Deals +30% Damage per stack of ${b}.\r' +
          'Does not apply to dungeon monsters.',
      },
      {
        buff: BUFF.DIVINE_RESPONSE,
        text: 'Deals +150% Damage, when the caster is under the effects of ${b}.\r' +
          'Does not apply to dungeon monsters.',
      },
    ],
  },
  {
    icon: Icon.Mend,
    name: 'Mend',
    rank: 6,
    mana: 197,
    effectRange: 18,
    allyHealing: { base: 605, attack: ATTACK.HEALING, ratio: 300 },
    selfHealing: { base: 423, attack: ATTACK.HEALING, ratio: 210 },
    castTime: 3,
    cooldown: 9,
    description: 'Restores ${selfHealing} Health to the caster and ${allyHealing} Health to up to #10 raid members# within a #20m# radius.\r' +
      'This skill does not count a member with the full Health from the target.',
    combos: [
      {
        buff: BUFF.RESURGENCE,
        text: 'Healing effectiveness increased +30% when cast on a friendly character under ${b}.',
      },
      {
        buff: BUFF.DIVINE_RESPONSE,
        causes: BUFF.RENEWAL,
        text: 'Consumes ${b} buff to grant ${c} to affected allies.',
      },
      {
        buff: BUFF.PAIN_HARVEST,
        causes: BUFF.OVER_HEALING,
        text: 'Reduces Cooldown -100% and grants the ${c} effect if used while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.Revive,
    name: 'Revive',
    rank: 4,
    mana: 86,
    range: [0, 25],
    castTime: 7,
    description: 'Revives an ally and restores lost XP in the same amount as a Nui\'s resurrection.\r' +
      'Recovers &nbsp;#90%# of maximum Health and Mana.',
    noCombat: true,
    combos: [
      {
        buff: BUFF.DEATHS_VENGEANCE,
        text: 'Heals all party members in range when cast under the effects of ${b}. Doing so consumes all mana, removes the ${b} buff, and triggers a #1 min# Cooldown.',
      },
    ],
  },
  {
    icon: Icon.FerventHealing,
    name: 'Fervent Healing',
    rank: 7,
    mana: 30,
    range: [0, 30],
    allyHealing: { base: 195, attack: ATTACK.HEALING, ratio: 60 },
    selfHealing: { base: 136, attack: ATTACK.HEALING, ratio: 42 },
    cooldown: 15,
    description: 'Instantly restores ${selfHealing} Health for you or ${allyHealing} Health for an ally.\r' +
      'Can be used up to #5 times# in a row before starting the Cooldown, but increases by 50% of the base Mana cost per cast.',
    combos: [
      {
        buff: BUFF.RENEWAL,
        text: 'Healing increased +55% when used on an ally under the effects of ${b}.',
      },
      {
        buff: BUFF.PURGE,
        text: 'Targets an additional nearby ally if cast while under the effects of your own ${b}.',
      },
    ],
  },
  {
    icon: Icon.Renewal,
    name: 'Renewal',
    rank: 2,
    mana: 347,
    range: [0, 30],
    allyHealing: { base: 1267, attack: ATTACK.HEALING, ratio: 240 },
    selfHealing: { base: 886, attack: ATTACK.HEALING, ratio: 168 },
    castTime: 1,
    effects: [BUFF.RENEWAL],
    description: 'Calls forth energy from the land to bless the caster or an ally for #30 sec#.\r\r' +
      'Grants a #25%# chance to trigger Gradual Recovery whenever the target is damaged by an attack, healing them for ${allyHealing} Health, healing the caster for ${selfHealing} Health over the next #5.5sec#.\r' +
      'Ends when Gradual Recovery is triggered.',
    descriptionNote: '\rMultiple casters can grant Renewal to the same target.',
  },
  {
    icon: Icon.AranzebsBoon,
    name: 'Aranzeb\'s Boon',
    rank: 3,
    mana: 137,
    effectRange: 25,
    castTime: 2,
    cooldown: 8,
    description: 'Increases all Stats +#30#. Applies to caster and all party members within the radius.\r' +
      'Lasts #30min#.',
  },
  {
    icon: Icon.ManaBarrier,
    name: 'Mana Barrier',
    mana: 1316,
    range: [0, 30],
    effectRange: 3,
    shieldHealing: { base: 4488, attack: ATTACK.HEALING, ratio: 800 },
    cooldown: 35,
    description: 'Quickly teleports the caster to an ally and creates a Mana Barrier that absorbs ${shieldHealing} Damage for #8sec# for the caster and allies in the path.',
    globalCooldown: GLOBAL_CD.REDUCED,
    noWalls: true,
    combos: [
      {
        buff: BUFF.RESURGENCE,
        text: 'Mana Barrier strengthened by +50% when cast on ally under the effects of ${b}.',
      },
      {
        buff: BUFF.HEALING_CIRCLE,
        text: 'Heals affected allies for 20% of the shield amount if they are under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.HealingCircle,
    name: 'Healing Circle',
    mana: 867,
    allyHealing: { base: 1584, attack: ATTACK.HEALING, ratio: 800 },
    selfHealing: { base: 1108, attack: ATTACK.HEALING, ratio: 560 },
    castTime: 2,
    cooldown: 50,
    description: 'Creates a circle of glowing runes in a #10m# radius at the caster\'s location, which heals affected allies and the caster.\r' +
      'The caster heals for up to ${selfHealing} Health and allies up to ${allyHealing} Health over #12sec#, as long as they are in the area of effect.\r' +
      'Can heal up to #20# allies at a time.',
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.ProphetsVoice,
    name: 'Prophet\'s Voice',
    description: 'Converts #3%# of Received Damage to Mana for #9 sec.#\r' +
      'This ability has a #20 sec.# Cooldown once triggered.',
  },
  {
    icon: Icon.QuickRecovery,
    name: 'Quick Recovery',
    description: 'Resets active Cooldowns on all Vitalism healing skills after receiving critical damage.\r\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.VibrantCasting,
    name: 'Vibrant Casting',
    description: 'Increases Skill Damage and Healing for Vitalism skills #+10%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.1, healing: 1.1, selfHealing: 1.1, allyHealing: 1.1, enemyDamage: 1.1 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: Icon.MartyrsWay,
    name: 'Martyr\'s Way',
    description: 'Grants the #Prayer# buff whenever you cast #Antithesis, Mend, or Fervent Healing.#\r\r' +
      '#Prayer:#\r' +
      '- Decreases Cast Time#-6%# per stack.\r' +
      '- Lasts #8 sec.#\r' +
      '- Triggers #Divine Response# at #5 stacks.#\r\r' +
      '#Divine Response:#\r' +
      '- Decreases Cast Time #-30%.#\r' +
      '- Lasts #24 sec.#\r' +
      '- #Mend# grants #Renewal# to allies.\r' +
      '- Gaining a stack of #Prayer# resets the duration of #Divine Response.#',
  },
  {
    icon: Icon.InvigoratedHealing,
    name: 'Invigorated Healing',
    description: 'Increases Critical Heal Bonus #+20%.#',
  },
  {
    icon: Icon.JoyousSpirit,
    name: 'Joyous Spirit',
    description: 'Increases Post-Cast Mana Regen #+5.0,# with an additional #+0.0# based on #Spirit.#\r' +
      'Does not affect Mana Regen when caster is not casting.',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Antithesis'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.AntithesisLife,
        range: [0, 30],
        description: 'Instantly restores ${selfHealing} for you and ${allyHealing} Health for an ally.\r' +
          'This skill has a longer range than regular Antithesis, but cannot be used to damage enemies.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: Icon.AntithesisQuake,
        effectRange: 6,
        allyHealing: { base: 355, attack: ATTACK.HEALING, ratio: 200 },
        selfHealing: { base: 247, attack: ATTACK.HEALING, ratio: 141 },
        enemyDamage: { base: 684, attack: ATTACK.HEALING, ratio: 200 },
        description: 'A burst of holy energy that heals ${selfHealing} Health for you or heals ${allyHealing} Health for allies within a #${effectRange}m# radius of the primary target, and deals ${enemyDamage} Magic Damage to all enemies in the same area.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Skewer'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.SkewerFlame,
        damage: { base: 1094, attack: ATTACK.HEALING, ratio: 300 },
        castTime: 1.5,
        description: 'Summons skewers in a #5m# radius at the target location.\r' +
          'Can be used up to #3 times# in a row before starting its Cooldown, but the damage is reduced on consecutive casts.\r' +
          'Skewers deal ${damage} Magic Damage to all enemies within the radius and inflict Impale, preventing all actions for #2.6sec#.',
      },
      {
        element: ELEMENT.LIFE,
        icon: Icon.SkewerLife,
        allyHealing: { base: 517, attack: ATTACK.HEALING, ratio: 100 },
        selfHealing: { base: 361, attack: ATTACK.HEALING, ratio: 71 },
        castTime: 0,
        description: 'Summons three skewers within a #20m# circle at the target location, Impaling enemies for #1sec# and restoring ${selfHealing} to the caster and ${allyHealing} Health to allies.\r' +
          'Skewers heal twice as much where they overlap.',
        descriptionNote: null,
        combos: [],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Fervent Healing'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.FerventHealingFlame,
        mana: 976,
        allyHealing: { base: 83, attack: ATTACK.HEALING, ratio: 40 },
        selfHealing: { base: 57, attack: ATTACK.HEALING, ratio: 29 },
        castTime: 4,
        cooldown: 30,
        description: 'Restores ${selfHealing} Health for the caster or ${allyHealing} Health for an ally every second for up to #25 sec#.\r' +
          'Use this skill again while channeling to cast the spell early. The longer you channel, the more powerful the healing effect will be.',
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.FerventHealingLightning,
        mana: 266,
        allyHealing: { base: 222, attack: ATTACK.HEALING, ratio: 70 },
        selfHealing: { base: 155, attack: ATTACK.HEALING, ratio: 49 },
        cooldown: 0,
        description: 'Instantly restores ${selfHealing} Health for the caster and ${allyHealing} Health for an ally.\r' +
          'This skill has no Cooldown, but the Mana cost increases by 50% of the base Mana cost per cast.\r' +
          'Mana cost resets 10 seconds after the most recent cast.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Holy Bolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.HolyBoltFlame,
        mana: 99,
        range: [0, 30],
        damage: { base: 250, attack: ATTACK.HEALING, ratio: 50 },
        castTime: 1,
        description: 'Fires a bolt of holy light that deals ${damage} Magic Damage to a single target.\r' +
          'This skill deals #+100%# Magic Damage to non-dungeon monsters.\r' +
          'Has a longer range and a reduced Cast Time.',
        globalCooldown: GLOBAL_CD.REDUCED,
        castTimeLevel: false,
        combos: [
          {
            buff: BUFF.CURSED,
            text: 'Deals +20% additional damage to ${b} targets.',
          },
          {
            buff: BUFF.BLESSED,
            text: 'Heals allies ${b} by you as long as they are within 15m of the target. Can also be used to heal the caster, but does so with 30% effectiveness.',
          },
          {
            buff: BUFF.PRAYER,
            text: 'Deals +30% Damage per stack of ${b}.\r' +
              'Does not apply to dungeon monsters.',
          },
          {
            buff: BUFF.DIVINE_RESPONSE,
            text: 'Deals +150% Damage, when the caster is under the effects of ${b}.\r' +
              'Does not apply to dungeon monsters.',
          },
        ],
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.HolyBoltMist,
        description: 'Fires a bolt of holy light that deals ${damage} Magic Damage to a single target.\r' +
          'If used on an ally, the bolt is fired at an enemy #Cursed# by the caster, dealing ${damage} Magic Damage.',
        combos: [
          {
            buff: BUFF.CURSED,
            text: 'Deals +20% additional damage to ${b} targets.',
          },
          {
            buff: BUFF.BLESSED,
            text: 'Heals allies ${b} by you as long as they are within 15m of the target. Can also be used to heal the caster, but does so with 30% effectiveness.',
          },
          {
            buff: BUFF.PRAYER,
            text: 'Deals +30% Damage per stack of ${b}.\r' +
              'Does not apply to dungeon monsters.',
          },
          {
            buff: BUFF.DIVINE_RESPONSE,
            text: 'Deals +150% Damage, when the caster is under the effects of ${b}.\r' +
              'Does not apply to dungeon monsters.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Healing Circle'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.HealingCircleLife,
        allyHealing: { base: 691, attack: ATTACK.HEALING, ratio: 350 },
        selfHealing: { base: 486, attack: ATTACK.HEALING, ratio: 244 },
        castTime: 0,
        description: 'Instantly creates a circle of glowing runes in a #10m# radius at the caster\'s location, which heals up to #10# allies including the caster.\r' +
          'The circle regenerates ${selfHealing} Health for the caster and ${allyHealing} Health for affected Allies.\r' +
          'The amount of healing can be increased up to #+150%# depending on the number of affected allies.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.HealingCircleWave,
        range: [0, 20],
        effectRange: 10,
        allyHealing: { base: 3168, attack: ATTACK.HEALING, ratio: 1600 },
        selfHealing: { base: 2217, attack: ATTACK.HEALING, ratio: 1120 },
        cooldown: 90,
        description: 'Creates a Healing Flower that heals ${selfHealing} Health to the caster and ${allyHealing} Health to up to #20# raid members within a #${effectRange}m# radius every 3 seconds over 1 minute.',
        descriptionNote: '\rThe Healing Flower can be destroyed if attacked.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Mend'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: Icon.MendLife,
        description: 'Restores ${selfHealing} Health for the caster and ${allyHealing} Health to up to #10 raid members# over #10 sec#.\r' +
          'This skill does not target players, that have the Life variant of the @Mend@ buff active.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.MendMist,
        effectRange: 23,
        description: 'Restores ${selfHealing} Health to the caster and ${allyHealing}Health to #5 party members#.\r' +
          'This skill has a @wider effect range@.',
      },
      {
        element: ELEMENT.WAVE,
        icon: Icon.MendWave,
        allyHealing: { base: 302, attack: ATTACK.HEALING, ratio: 150 },
        description: 'Creates a @Shield@ that absorbs ${allyHealing} Damage for the caster and up to #10 allies# within 18m.',
      },
    ],
  },
]);

export default skills;
