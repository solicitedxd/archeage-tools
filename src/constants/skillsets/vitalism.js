import HolyBoltIcon from 'images/skill/vitalism/Holy_Bolt.png';
import MirrorLightIcon from 'images/skill/vitalism/Mirror_Light.png';
import AntithesisIcon from 'images/skill/vitalism/Antithesis.png';
import ResurgenceIcon from 'images/skill/vitalism/Resurgence.png';
import SkewerIcon from 'images/skill/vitalism/Skewer.png';
import MendIcon from 'images/skill/vitalism/Mend.png';
import ReviveIcon from 'images/skill/vitalism/Revive.png';
import FerventHealingIcon from 'images/skill/vitalism/Fervent_Healing.png';
import RenewalIcon from 'images/skill/vitalism/Renewal.png';
import AranzebsBoonIcon from 'images/skill/vitalism/Aranzebs_Boon.png';
import ManaBarrierIcon from 'images/skill/vitalism/Mana_Barrier.png';
import HealingCircleIcon from 'images/skill/vitalism/Healing_Circle.png';
import ProphetsVoiceIcon from 'images/skill/vitalism/Prophets_Voice.png';
import QuickRecoveryIcon from 'images/skill/vitalism/Quick_Recovery.png';
import VibrantCastingIcon from 'images/skill/vitalism/Vibrant_Casting.png';
import MartyrsWayIcon from 'images/skill/vitalism/Martyrs_Way.png';
import InvigoratedHealingIcon from 'images/skill/vitalism/Invigorated_Healing.png';
import JoyousSpiritIcon from 'images/skill/vitalism/Joyous_Spirit.png';
import AntithesisLife from 'images/skill/vitalism/Antithesis_Life.png';
import AntithesisQuake from 'images/skill/vitalism/Antithesis_Quake.png';
import SkewerFlame from 'images/skill/vitalism/Skewer_Flame.png';
import SkewerLife from 'images/skill/vitalism/Skewer_Life.png';
import FerventHealingFlame from 'images/skill/vitalism/Fervent_Healing_Flame.png';
import FerventHealingLightning from 'images/skill/vitalism/Fervent_Healing_Lightning.png';
import HolyBoltFlame from 'images/skill/vitalism/Holy_Bolt_Flame.png';
import HolyBoltMist from 'images/skill/vitalism/Holy_Bolt_Mist.png';
import HealingCircleLife from 'images/skill/vitalism/Healing_Circle_Life.png';
import HealingCircleWave from 'images/skill/vitalism/Healing_Circle_Wave.png';
import { getSkillIdByName } from 'utils/skillsets';
import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
} from 'constants/skills';

const skills = Object.freeze([
  {
    icon: HolyBoltIcon,
    name: 'Holy Bolt',
    rank: 14,
    mana: 202,
    range: [0, 20],
    damage: { base: 738, attack: ATTACK.HEALING, ratio: 142 },
    castTime: 2,
    description: 'Fires a bolt of holy light that deals ${damage} Magic Damage to a single target.',
    continuousHold: true,
    castTimeLevel: true,
    combos: [
      {
        buff: BUFF.CURSED,
        text: 'Deals +20% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.BLESSED,
        text: 'Heals allies ${b} by you as long as they are within 15m of the target, for &(511 + 142% Healing Power).& (Can also be used to heal the caster, but does so with 30% effectiveness.)',
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
    icon: MirrorLightIcon,
    name: 'Mirror Light',
    mana: 15,
    range: [0, 25],
    cooldown: 21,
    effects: [BUFF.SNARED],
    description: 'When used on yourself or allies: cures one debuff and grants #Blessing,# increasing Received Healing #+15%# for #1min30sec.#\r' +
      'When used on enemies: inflicts #Curse,# increasing Received Damage #+12%# for #20sec.# Also inflicts Snare on affected enemies, preventing movement or turning for #3sec.# Snare duration reduced #-50%# in PvP.',
  },
  {
    icon: AntithesisIcon,
    name: 'Antithesis',
    rank: 8,
    mana: 149,
    range: [0, 25],
    damage: { base: 547, attack: ATTACK.HEALING, ratio: 300 },
    castTime: 2,
    cooldown: 3,
    description: 'A burst of holy energy that heals you for &(383 + 210% Healing Power)& or an ally for ${damage} Health, or deals &(1039 + 300% Healing Power)& as Magic Damage to an enemy.',
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
    icon: ResurgenceIcon,
    name: 'Resurgence',
    rank: 14,
    mana: 147,
    range: [0, 30],
    damage: { base: 538, attack: ATTACK.HEALING, ratio: 280 },
    effects: [BUFF.RESURGENCE],
    description: 'Restores &(376 + 196% Healing Power)& Health to the caster and ${damage} Health to an ally over #10sec#.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: SkewerIcon,
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
    descriptionNote: 'Damage increases as this skill levels up.',
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
    icon: MendIcon,
    name: 'Mend',
    rank: 6,
    mana: 197,
    effectRange: 18,
    damage: { base: 605, attack: ATTACK.HEALING, ratio: 300 },
    castTime: 3,
    cooldown: 9,
    description: 'Restores &(423 + 210% Healing Power)& Health to the caster and ${damage} Health to up to #10 raid members# within a #20m# radius.\r' +
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
    icon: ReviveIcon,
    name: 'Revive',
    rank: 4,
    mana: 86,
    range: [0, 25],
    castTime: 7,
    description: 'Revives an ally and restores lost XP in the same amount as a Nui\'s resurrection.\r' +
      'Recovers &nbsp;#90%# &nbsp;of maximum Health and Mana.',
    noCombat: true,
    combos: [
      {
        buff: BUFF.DEATHS_VENGEANCE,
        text: 'Heals all party members in range when cast under the effects of ${b}. Doing so consumes all mana, removes the ${b} buff, and triggers a #1 min# Cooldown.',
      },
    ],
  },
  {
    icon: FerventHealingIcon,
    name: 'Fervent Healing',
    rank: 7,
    mana: 30,
    range: [0, 30],
    damage: { base: 195, attack: ATTACK.HEALING, ratio: 60 },
    cooldown: 15,
    description: 'Instantly restores &(136 + 42% Healing Power)& Health for you or ${damage} Health for an ally.\r' +
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
    icon: RenewalIcon,
    name: 'Renewal',
    rank: 2,
    mana: 347,
    range: [0, 30],
    damage: { base: 1267, attack: ATTACK.HEALING, ratio: 240 },
    castTime: 1,
    effects: [BUFF.RENEWAL],
    description: 'Calls forth energy from the land to bless the caster or an ally for #30 sec#.\r\r' +
      'Grants a #25%# chance to trigger Gradual Recovery whenever the target is damaged by an attack, healing them for ${damage} Health, healing the caster for &(886 + 168% Healing Power)& Health over the next #5.5sec#.\r' +
      'Ends when Gradual Recovery is triggered.',
    descriptionNote: 'Multiple casters can grant Renewal to the same target.',
  },
  {
    icon: AranzebsBoonIcon,
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
    icon: ManaBarrierIcon,
    name: 'Mana Barrier',
    mana: 1316,
    range: [0, 30],
    effectRange: 3,
    damage: { base: 4488, attack: ATTACK.HEALING, ratio: 800 },
    cooldown: 35,
    description: 'Quickly teleports the caster to an ally and creates a Mana Barrier that absorbs ${damage} Damage for #8sec# for the caster and allies in the path.',
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
    icon: HealingCircleIcon,
    name: 'Healing Circle',
    mana: 867,
    damage: { base: 1584, attack: ATTACK.HEALING, ratio: 800 },
    castTime: 2,
    cooldown: 50,
    description: 'Creates a circle of glowing runes in a #10m# radius at the caster\'s location, which heals affected allies and the caster.\r' +
      'The caster heals for up to &(1108 + 560% Healing Power)& Health and allies up to ${damage} Health over #12sec#, as long as they are in the area of effect.\r' +
      'Can heal up to #20# allies at a time.',
  },
]);

export const passives = Object.freeze([
  {
    icon: ProphetsVoiceIcon,
    name: 'Prophet\'s Voice',
    description: 'Converts #3%# of Received Damage to Mana for #9 sec.#\r' +
      'This ability has a #20 sec.# Cooldown once triggered.',
  },
  {
    icon: QuickRecoveryIcon,
    name: 'Quick Recovery',
    description: 'Resets active Cooldowns on all Vitalism healing skills after receiving critical damage.\r\r' +
      'This ability has a #12 sec# Cooldown once triggered.',
  },
  {
    icon: VibrantCastingIcon,
    name: 'Vibrant Casting',
    description: 'Increases Skill Damage and Healing for Vitalism skills #+10%.#',
  },
  {
    icon: MartyrsWayIcon,
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
    icon: InvigoratedHealingIcon,
    name: 'Invigorated Healing',
    description: 'Increases Critical Heal Bonus #+20%.#',
  },
  {
    icon: JoyousSpiritIcon,
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
        icon: AntithesisLife,
        range: [0, 30],
        description: 'Instantly restores &(383 + 210% Healing Power)& for you and ${damage} Health for an ally.\r' +
          'This skill has a longer range than regular Anthesis, but cannot be used to damage enemies.',
      },
      {
        element: ELEMENT.QUAKE,
        icon: AntithesisQuake,
        effectRange: 6,
        damage: { base: 390, attack: ATTACK.HEALING, ratio: 220 },
        description: 'A burst of holy energy that heals &(274 + 153% Healing Power)& Health for you or heals ${damage} Health for allies within a #${effectRange}m# radius of the primary target, and deals &(752 + 220% Healing Power)& Magic Damage to all enemies in the same area.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Skewer'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: SkewerFlame,
        damage: { base: 1203, attack: ATTACK.HEALING, ratio: 330 },
        castTime: 1.5,
        description: 'Summons skewers in a #5m# radius at the target location.\r' +
          'Can be used up to #3 times# in a row before starting its Cooldown, but the damage is reduced on consecutive casts.\r' +
          'Skewers deal ${damage} Magic Damage to all enemies within the radius and inflict Impale, preventing all actions for #2.6sec#.',
      },
      {
        element: ELEMENT.LIFE,
        icon: SkewerLife,
        damage: { base: 569, attack: ATTACK.HEALING, ratio: 110 },
        castTime: 0,
        description: 'Summons three skewers within a #20m# circle at the target location, Impaling enemies for #1sec# and restoring &(398 + 77% Healing Power)& to the caster and ${damage} Health to allies.\r' +
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
        icon: FerventHealingFlame,
        mana: 976,
        damage: { base: 91, attack: ATTACK.HEALING, ratio: 44 },
        castTime: 4,
        cooldown: 30,
        description: 'Restores &(63 + 31% Healing Power)& Health for the caster or ${damage} Health for an ally every second for up to #25 sec#.\r' +
          'Use this skill again while channeling to cast the spell early. The longer you channel, the more powerful the healing effect will be.',
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: FerventHealingLightning,
        mana: 266,
        damage: { base: 244, attack: ATTACK.HEALING, ratio: 77 },
        cooldown: 0,
        description: 'Instantly restores &(170 + 54% Healing Power)& Health for the caster and ${damage} Health for an ally.\r' +
          'This kill has no Cooldown, but the Mana cost increases by 50% of the base MAna cost per cast.\r' +
          'Mana cost resets 10 seconds after the most recent cast.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Holy Bolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: HolyBoltFlame,
        mana: 99,
        range: [0, 30],
        damage: { base: 275, attack: ATTACK.HEALING, ratio: 55 },
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
        icon: HolyBoltMist,
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
        icon: HealingCircleLife,
        damage: { base: 760, attack: ATTACK.HEALING, ratio: 385 },
        castTime: 0,
        description: 'Instantly creates a circle of glowing runes in a #10m# radius at the caster\'s location, which heals up to #10# allies including the caster.\r' +
          'The circle regenerates &(531 + 270% Healing Power)& Health for the caster and ${damage} Health for affected Allies.\r' +
          'The amount of healing can be increased up to #+150%# depending on the number of affected allies.',
      },
      {
        element: ELEMENT.WAVE,
        icon: HealingCircleWave,
        range: [0, 20],
        effectRange: 10,
        damage: { base: 3484, attack: ATTACK.HEALING, ratio: 1760 },
        cooldown: 90,
        description: 'Creates a Healing Flower that heals &(2439 + 1232% Healing Power)& Health to the caster and ${damage} Health to up to #20# raid members within a #${effectRange}# radius every 3 seconds over 1 minute.',
        descriptionNote: 'The Healing Flower can be destroyed if attacked.',
      },
    ],
  },
]);

export default skills;
