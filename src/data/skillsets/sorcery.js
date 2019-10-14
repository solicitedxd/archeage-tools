import FlameboltIcon from 'images/skill/sorcery/Flamebolt.png';
import FreezingArrowIcon from 'images/skill/sorcery/Freezing_Arrow.png';
import InsulatingLensIcon from 'images/skill/sorcery/Insulating_Lens.png';
import ArcLightningIcon from 'images/skill/sorcery/Arc_Lightning.png';
import MagicCircleIcon from 'images/skill/sorcery/Magic_Circle.png';
import FreezingEarthIcon from 'images/skill/sorcery/Freezing_Earth.png';
import FlameBarrierIcon from 'images/skill/sorcery/Flame_Barrier.png';
import ChainLightningIcon from 'images/skill/sorcery/Chain_Lightning.png';
import SearingRainIcon from 'images/skill/sorcery/Searing_Rain.png';
import FrigidTracksIcon from 'images/skill/sorcery/Frigid_Tracks.png';
import MeteorStrikeIcon from 'images/skill/sorcery/Meteor_Strike.png';
import GodsWhipIcon from 'images/skill/sorcery/Gods_Whip.png';
import ManaPoolIncreaseIcon from 'images/skill/sorcery/Mana_Pool_Increase.png';
import AranzebsInfusionIcon from 'images/skill/sorcery/Aranzebs_Infusion.png';
import MindOverMatterIcon from 'images/skill/sorcery/Mind_Over_Matter.png';
import ManaFountainIcon from 'images/skill/sorcery/Mana_Fountain.png';
import HeirtoAyanadIcon from 'images/skill/sorcery/Heir_to_Ayanad.png';
import SorceryAdeptIcon from 'images/skill/sorcery/Sorcery_Adept.png';
import FlameboltFlame from 'images/skill/sorcery/Flamebolt_Flame.png';
import FlameboltLightning from 'images/skill/sorcery/Flamebolt_Lightning.png';
import ChainLightningFlame from 'images/skill/sorcery/Chain_Lightning_Flame.png';
import ChainLightningWave from 'images/skill/sorcery/Chain_Lightning_Wave.png';
import MeteorStrikeLightning from 'images/skill/sorcery/Meteor_Strike_Lightning.png';
import MeteorStrikeWave from 'images/skill/sorcery/Meteor_Strike_Wave.png';
import GodsWhipLightning from 'images/skill/sorcery/Gods_Whip_Lightning.png';
import GodsWhipWave from 'images/skill/sorcery/Gods_Whip_Wave.png';
import FlameBarrierMist from 'images/skill/sorcery/Flame_Barrier_Mist.png';
import FlameBarrierWave from 'images/skill/sorcery/Flame_Barrier_Wave.png';
import { getSkillIdByName } from 'utils/skillsets';
import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';

const skills = Object.freeze([
  {
    icon: FlameboltIcon,
    name: 'Flamebolt',
    rank: 1,
    mana: 18,
    range: [0, 23],
    damage: { base: 0, attack: ATTACK.MAGIC, ratio: 209 },
    castTime: 1,
    duration: 3.2,
    effects: [BUFF.BURNING],
    description: 'Hurl a ball of fire, dealing ${damage} Magic Damage to a single enemy.\r' +
      'Can be repeated up to #3 times# in a row before starting its Cooldown.\r' +
      'The first attack inflicts ${effects[0]} on the target, making them more susceptible to certain spell effects for #${duration}sec.#',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals +12% additional damage to ${b} targets.',
      },
      {
        buff: BUFF.BURNING,
        causes: BUFF.CONFLAGRATION,
        text: 'Third attack: inflicts ${c} for #7sec# on ${b} targets.',
      },
    ],
  },
  {
    icon: FreezingArrowIcon,
    name: 'Freezing Arrow',
    rank: 18,
    mana: 201,
    range: [0, 23],
    damage: { base: 1161, attack: ATTACK.MAGIC, ratio: 240 },
    castTime: 1.5,
    cooldown: 6,
    effects: [BUFF.FREEZING, BUFF.SLOWED],
    description: 'Launches a bolt of ice at an enemy, dealing ${damage} Magic Damage, inflicts #Frostbite# on hit, Slowing the target\'s Move Speed #-60%# for #4sec.#\r' +
      'This counts as a Freezing effect.',
    combos: [
      {
        buff: BUFF.FREEZING,
        causes: BUFF.DEEPFREEZE,
        text: 'Inflicts ${c} on targets already under ${b} effects, Confining them for #14sec.# (#-50%# duration in PvP.)',
      },
      {
        buff: BUFF.FRIGID_TRACKS,
        text: 'Removes the cast time and decreases Range -3m under the effect of ${b}',
      },
    ],
  },
  {
    icon: InsulatingLensIcon,
    name: 'Insulating Lens',
    rank: 5,
    mana: 108,
    range: [0],
    damage: { base: 792, attack: ATTACK.MAGIC, ratio: 225 },
    castTime: 1.5,
    effects: [BUFF.INSULATING_LENS],
    description: 'Grants the caster a magic shield for #40 sec#, which absorbs up to ${damage} Damage and grants immunity to Trip, before breaking.\r' +
      'The ${effects[0]} explodes into ice shards when broken, Snaring all enemies within a #6m# radius.\r' +
      'This counts as a Freezing effect.\r\r' +
      'Applies a #30 sec# Cooldown when the effect ends.',
  },
  {
    icon: ArcLightningIcon,
    name: 'Arc Lightning',
    rank: 7,
    mana: 188,
    range: [0, 23],
    damage: { base: 3638, attack: ATTACK.MAGIC, ratio: 902 },
    shockDuration: 8,
    castTime: 3.8,
    cooldown: 8,
    effects: [BUFF.ELECTROCUTED],
    description: 'Unleashes a powerful bolt of lightning at a single enemy, dealing ${damage} Magic Damage.\r' +
      'Inflicts a strong #Electric Shock# on hit, dealing an additional Magic Damage over #${shockDuration}sec# and spreading to nearby enemies with a #2m# radius.\r\r' +
      'Increases Critical Damage +70% if used on a target with Burning, Frozen, and Electric Shocked effects.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Deals +30% additional damage to Burning targets.',
      },
    ],
  },
  {
    icon: MagicCircleIcon,
    name: 'Magic Circle',
    rank: 3,
    mana: 134,
    range: [0],
    castTime: 0,
    cooldown: 21,
    description: 'Summons a Magic Circle beneath the caster\'s feet for #20 sec.#\r' +
      'Increases Magic Attack #+141.0# and Magic Crit Rate #+9%# while within the magic circle..\r\r' +
      'Use the skill again to teleport back to the Magic Circle\'s location.',
  },
  {
    icon: FreezingEarthIcon,
    name: 'Freezing Earth',
    rank: 6,
    mana: 260,
    range: [0],
    effectRange: 8,
    damage: { base: 748, attack: ATTACK.MAGIC, ratio: 140 },
    castTime: 0,
    cooldown: 28,
    freezingDuration: 6.2,
    effects: [BUFF.FREEZING, BUFF.SNARED],
    description: 'Unleashes a blast of ice, dealing ${damage} Magic Damage to all enemies within the radius. Inflicts Ice Shard on all affected enemies, Snaring them in place for #${freezingDuration}sec# and preventing them from moving or turning.\r' +
      'Snare duration reduced #-50%# in PvP.',
    combos: [
      {
        buff: BUFF.FREEZING,
        causes: BUFF.DEEPFREEZE,
        text: 'Inflicts ${c} on targets already under ${b} effects, Confining them for #8sec.# (#-50%# duration in PvP.)',
      },
    ],
  },
  {
    icon: FlameBarrierIcon,
    name: 'Flame Barrier',
    rank: 7,
    mana: 473,
    range: [0],
    burningDamage: { base: 1331, attack: ATTACK.MAGIC, ratio: 400 },
    duration: 5,
    castTime: 0,
    cooldown: 26,
    effects: [BUFF.BURNING, BUFF.SLOWED],
    description: 'Calls forth a #20m# wide wall of fire for #10 sec,# which Slows all enemies within its area of effect. Decreases Move Speed #-40%#. Inflicts #Flame Barrier# on enemies that touch it, dealing ${burningDamage} Magic Damage over #${duration}sec.#\r' +
      'This counts as a Burning effect.',
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals +41% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: ChainLightningIcon,
    name: 'Chain Lightning',
    rank: 4,
    mana: 198,
    range: [0, 12],
    damage: { base: 390, attack: ATTACK.MAGIC, ratio: 209 },
    shockDuration: 8,
    castTime: 0,
    cooldown: 30,
    effects: [BUFF.ELECTROCUTED],
    description: 'Sends lightning to ravage your enemies. Deals ${damage} Magic Damage to the primary target and then bounces to another enemy within #5m,# hitting up to #5# total targets.\r' +
      'Deals #-50%# less damage with each subsequent hit.\r' +
      'Inflicts strong #Electrical Shock# on all affected enemies, dealing an additional &(555 + 300% Magic Attack)& Magic Damage over #${shockDuration}sec# and spreading to enemies within a #2m# radius.',
    combos: [
      {
        buff: BUFF.INSULATING_LENS,
        causes: BUFF.STUNNED,
        text: 'Stuns the primary target for #1.5sec# if used while under the effects of ${b}.',
      },
      {
        buff: BUFF.INSULATING_LENS,
        causes: BUFF.SILENCED,
        text: 'Silences the primary target for #1.5sec# if used while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: SearingRainIcon,
    name: 'Searing Rain',
    rank: 2,
    mana: 487,
    range: [0],
    effectRange: 10,
    damage: { base: 966, attack: ATTACK.MAGIC, ratio: 300 },
    duration: 4.2,
    castTime: 2.5,
    cooldown: 13,
    effects: [BUFF.BURNING],
    description: 'Rains down fire on all enemies in a #10m# radius for #7 sec,# dealing ${damage} Magic Damage per second.\r' +
      'The skill grants #Immunity# to all debuffs for the same period of time.\r' +
      'Inflicts #${effects[0]}# on all affected enemies, making them more susceptible to certain spell effects for #${duration}sec#.',
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals +44% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: FrigidTracksIcon,
    name: 'Frigid Tracks',
    rank: 1,
    mana: 118,
    range: [0],
    castTime: 2,
    cooldown: 40,
    effects: [BUFF.FREEZING, BUFF.CONFINED],
    freezingDuration: 8,
    description: 'Leaves a trail of icy footprints behind you for #9sec#.\r' +
      'The footprints last 3 sec after appearing, and inflict #Frozen Solid# on any enemy hat step on them (max 8 enemies), Confining them for #${freezingDuration}sec# and preventing all actions.\r' +
      'Confinement duration reduced #-50%# in PvP.\r' +
      'Grants affected enemies temporary #Freeze Immunity# when the Confinement effect expires.',
  },
  {
    icon: MeteorStrikeIcon,
    name: 'Meteor Strike',
    rank: 2,
    mana: 605,
    range: [0, 28],
    effectRange: 5,
    damage: { base: 2662, attack: ATTACK.MAGIC, ratio: 750 },
    castTime: 5,
    cooldown: 28,
    effects: [BUFF.BURNING, BUFF.TRIPPED],
    description: 'Calls down a meteor at the target location, dealing ${damage} Magic Damage to up to #8 enemies# within the area.\r' +
      'Inflicts Knockback and ${effects[0]} on all affected enemies, and Trips them for #2.5 sec.#',
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals +30% additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: GodsWhipIcon,
    name: 'Gods\' Whip',
    rank: 1,
    mana: 86,
    range: [0, 25],
    effectRange: 6,
    damage: { base: 432, attack: ATTACK.MAGIC, ratio: 120 },
    shockDuration: 8,
    castTime: 1,
    cooldown: 21,
    effects: [BUFF.ELECTROCUTED],
    globalCooldown: GLOBAL_CD.REDUCED,
    description: 'Calls down consecutive lightning strikes in the target area, dealing ${damage} Magic Damage to all enemies in a #6m# radius.\r' +
      'Can be repeated up to #5 times# in a row before starting its Cooldown.\r' +
      'Each hit inflicts a strong #Electric Shock,# dealing an additional &(575 + 300% Magic Attack)& Magic Damage over #${shockDuration} sec# and spreading to enemies within a #2m# radius.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Deals +20% additional damage to ${b} targets.',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: ManaPoolIncreaseIcon,
    name: 'Mana Pool Increase',
    description: 'Increases Max Mana #+35%.#',
  },
  {
    icon: AranzebsInfusionIcon,
    name: 'Aranzeb\'s Infusion',
    description: 'Decreases Cast Time of Sorcery Skills #-8%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { castTime: 0.92 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: MindOverMatterIcon,
    name: 'Mind Over Matter',
    description: 'Increases duration of Burning, Freeze and Electric Shock #+30%#.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { shockDuration: 1.3, freezingDuration: 1.3 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        type: SKILLMOD.PERCENT,
        vars: { burningDamage: 1.3, duration: 1.3 },
        skills: [6],
      },
      {
        type: SKILLMOD.PERCENT,
        vars: { duration: 1.3 },
        skills: [0, 8],
      },
    ],
  },
  {
    icon: ManaFountainIcon,
    name: 'Mana Fountain',
    description: 'Grants the #Mana Fountain# buff whenever you cast #Insulating Lens, Frigid Tracks, or Magic Circle.#\r\r' +
      '#Mana Fountain:#\r' +
      '- Increases Attack Speed #+100.#\r' +
      '- Decreases Cast Time #-15%.#\r' +
      '- Lasts #20 - 60 sec.#',
  },
  {
    icon: HeirtoAyanadIcon,
    name: 'Heir to Ayanad',
    description: 'Increases Magic Skill Damage from Sorcery Skills #+10%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.1 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: SorceryAdeptIcon,
    name: 'Sorcery Adept',
    description: 'Increase Magic Critical Rate #+6%#\r' +
      'Increases Sorcery Skill Damage +5%',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.05 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Flamebolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: FlameboltFlame,
        mana: 24,
        damage: { base: 0, attack: ATTACK.MAGIC, ratio: 360 },
        castTime: 1.5,
        description: 'Hurl a single powerful flamebolt at the target, dealing ${damage} Magic Damage.\r' +
          'Inflicts ${effects[0]} on the target, making them more susceptible to certain spell effects for #${duration}sec.#',
        globalCooldown: GLOBAL_CD.NORMAL,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: FlameboltLightning,
        mana: 21,
        range: [0, 20],
        damage: { base: 0, attack: ATTACK.MAGIC, ratio: 80 },
        shockDuration: 8,
        castTime: 0,
        cooldown: 2,
        effects: [BUFF.ELECTROCUTED],
        description: 'Hurls 3 bolts of electricity at a single target, dealing ${damage} Magic Damage.\r' +
          'Each hit inflicts a minor #Electric Shock,# dealing an additional &(40 + 350% Magic Attack)& Magic Damage over #${shockDuration}sec# and spreading to enemies with a #2m# radius.',
        globalCooldown: GLOBAL_CD.NORMAL,
        combos: [
          {
            buff: BUFF.BURNING,
            text: 'Deals +12% additional damage to ${b} targets.',
          },
          {
            buff: BUFF.DROP_BACK,
            text: 'No Cooldown if used while under the effects of Drop Back.',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Chain Lightning'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ChainLightningFlame,
        damage: { base: 556, attack: ATTACK.MAGIC, ratio: 110 },
        effects: [BUFF.BURNING],
        description: 'Inflicts #Consuming Flames# on a single target, which deals ${damage} Magic Damage after #2 sec# and then travels to another enemy within a #5m# radius.\r' +
          'This effect repeats up to #4 times,# inflicting #25%# greater damage each time.',
      },
      {
        element: ELEMENT.WAVE,
        icon: ChainLightningWave,
        effects: [BUFF.FREEZING, BUFF.SNARED],
        description: 'Shoots a ball of ice that deals ${damage} Magic Damage to a single enemy and the shatters, unleashing ice shards in a #5m# ring around the primary target.\r' +
          'Ice Shards deal additional Magic Damage and inflict Snare, preventing affected enemies from moving or turning.\r' +
          'This Snare counts as a Freezing effect.',
        combos: [],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Meteor Strike'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: MeteorStrikeLightning,
        range: [0, 25],
        effectRange: 4,
        damage: { base: 1161, attack: ATTACK.MAGIC, ratio: 320 },
        shockDuration: 8,
        castTime: 0,
        effects: [BUFF.ELECTROCUTED, BUFF.SLOWED],
        description: 'Summons a massive thunderbolt at the target location, dealing ${damage} Magic Damage to enemies within its range.\r' +
          'Inflicts #Greater Shock# on all enemies in the initial area of effect, dealing an additional &(338 + 100% Magic Attack)& Magic Damage over #${shockDuration} sec.# This effect also Slows their Attack Speed #-666# and Move Speed #-90%,# which gradually recover over the duration.\r' +
          'Enemies under the effects of Greater Shock inflict strong #Electric Shock# on other enemies within #2m,# damaging them over time.',
        combos: [
          {
            buff: BUFF.BURNING,
            text: 'Deals +20% additional damage to ${b} targets.',
          },
        ],
      },
      {
        element: ELEMENT.WAVE,
        icon: MeteorStrikeWave,
        mana: 1629,
        effectRange: 10,
        damage: { base: 1784, attack: ATTACK.MAGIC, ratio: 300 },
        effects: [BUFF.FREEZING],
        description: 'Summons a barrage of giant hailstones to obliterate the target area, inflicting up to ${damage} Magic Damage per hailstone.\r' +
          'Inflicts #Deep Freeze# on all enemies hit #5# or more times, Confining them for #14 sec.#\r' +
          'Being damaged by a direct attack will free the targets early, but debuffs that deal damage over time will not end this effect.\r' +
          'Deep Freeze duration reduced #-50%# in PvP.\r' +
          'Does no damage to targets under the effects of Deep Freeze.',
        combos: [],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Gods\' Whip'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: GodsWhipLightning,
        range: [0, 22],
        damage: { base: 288, attack: ATTACK.MAGIC, ratio: 80 },
        castTime: 0,
        globalCooldown: GLOBAL_CD.NO_TRIGGER_REDUCED,
      },
      {
        element: ELEMENT.WAVE,
        icon: GodsWhipWave,
        mana: 315,
        range: [0, 34],
        castTime: 0,
        damage: { base: 633, attack: ATTACK.MAGIC, ratio: 170 },
        description: 'Creates dark clouds in an area that call down consecutive lightning strikes, dealing ${damage} Magic Damage to up to #20 enemies# for #8 sec#.\r' +
          'The lightning strikes can hit the same target up to #8 times#. Enemies receive #+10%# additional Damage #every second# per hit, when the Wave variant of Gods\' Whip is used. Can be stacked up to 5 times.',
        globalCooldown: GLOBAL_CD.NORMAL,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Flame Barrier'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: FlameBarrierMist,
        range: [0, 20],
        burningDamage: { base: 1982, attack: ATTACK.MAGIC, ratio: 600 },
        duration: 4,
        description: 'Inflicts Flame Mark on the target, dealing ${burningDamage} Magic Damage over #${duration} sec#, then creates a wide wall of fire after #5 sec#.\r' +
          'The #Flame Barrier# lasts for #10 sec#, dealing Flame Barrier damage when Stalker\'s Mark ends.\r' +
          'Engulfs the target in flames and inflicts ${burningDamage} Magic Damage over time.\r' +
          'Move Speed #-60%#',
      },
      {
        element: ELEMENT.WAVE,
        icon: FlameBarrierWave,
        damage: { base: 481, attack: ATTACK.MAGIC, ratio: 150 },
        effects: [BUFF.FROZEN],
        description: 'Calls forth a #15m# wide wall of blue fire for #10 sec#, which Freezes all enemies within its area of effect. Decreases Move Speed #-30%#.\r' +
          'Inflicts #Flame Wave# on enemies that touch it, dealing ${damage} Magic Damage.',
        combo: [],
      },
    ],
  },
]);

export default skills;
