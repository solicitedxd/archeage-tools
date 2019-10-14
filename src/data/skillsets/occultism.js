import CripplingMireIcon from 'images/skill/occultism/Crippling_Mire.png';
import AbsorbLifeIcon from 'images/skill/occultism/Absorb_Life.png';
import PlayDeadIcon from 'images/skill/occultism/Play_Dead.png';
import CursedThornsIcon from 'images/skill/occultism/Cursed_Thorns.png';
import ShadowstepIcon from 'images/skill/occultism/Shadowstep.png';
import BoneyardIcon from 'images/skill/occultism/Boneyard.png';
import SummonCrowsIcon from 'images/skill/occultism/Summon_Crows.png';
import HellSpearIcon from 'images/skill/occultism/Hell_Spear.png';
import PainHarvestIcon from 'images/skill/occultism/Pain_Harvest.png';
import ShadowVortexIcon from 'images/skill/occultism/Shadow_Vortex.png';
import SummonWraithIcon from 'images/skill/occultism/Summon_Wraith.png';
import DeathsVengeanceIcon from 'images/skill/occultism/Deaths_Vengeance.png';
import UnnaturalSpeedIcon from 'images/skill/occultism/Unnatural_Speed.png';
import TraumatizeIcon from 'images/skill/occultism/Traumatize.png';
import InevitabilityIcon from 'images/skill/occultism/Inevitability.png';
import BurningBrandIcon from 'images/skill/occultism/Burning_Brand.png';
import DeathsBeckoningIcon from 'images/skill/occultism/Deaths_Beckoning.png';
import CriticalFailureIcon from 'images/skill/occultism/Critical_Failure.png';
import CripplingMireQuake from 'images/skill/occultism/Crippling_Mire_Quake.png';
import CripplingMireStone from 'images/skill/occultism/Crippling_Mire_Stone.png';
import HellSpearFlame from 'images/skill/occultism/Hell_Spear_Flame.png';
import HellSpearMist from 'images/skill/occultism/Hell_Spear_Mist.png';
import SummonWraithMist from 'images/skill/occultism/Summon_Wraith_Mist.png';
import SummonWraithWave from 'images/skill/occultism/Summon_Wraith_Wave.png';
import ShadowStepLightning from 'images/skill/occultism/Shadowstep_Lightning.png';
import ShadowStepMist from 'images/skill/occultism/Shadowstep_Mist.png';
import AbsorbLifeforceFlame from 'images/skill/occultism/Absorb_Life_Flame.png';
import AbsorbLifeforceStone from 'images/skill/occultism/Absorb_Life_Stone.png';
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
    icon: CripplingMireIcon,
    name: 'Crippling Mire',
    rank: 4,
    mana: 93,
    range: [0, 10],
    damage: { base: 1371, attack: ATTACK.MAGIC, ratio: 300 },
    cooldown: 18,
    effects: [BUFF.SLOWED],
    stunDuration: 2,
    description: 'Forms a painful link with the target, dealing ${damage} Magic Damage over #4 sec# and slowing them for the duration.\r' +
      'Counts as an ongoing spell, but is canceled if the target moves far enough away from the caster.',
    combos: [
      {
        buff: BUFF.DEATHMARK_AURA,
        causes: BUFF.STUNNED,
        text: 'Targets under the effects of ${b} are ${c} for #${stunDuration}sec# when this skill ends.',
      },
      {
        buff: BUFF.POISONED,
        causes: BUFF.STUNNED,
        text: 'Stuns the first target hit, if the caster is ${b}',
      },
    ],
  },
  {
    icon: AbsorbLifeIcon,
    name: 'Absorb Lifeforce',
    rank: 14,
    mana: 220,
    range: [0, 10],
    damage: { base: 1641, attack: ATTACK.MAGIC, ratio: 150 },
    cooldown: 18,
    effects: [BUFF.STUNNED],
    stunDuration: 2,
    description: 'Drains life from an enemy, dealing ${damage} Magic Damage and reducing the target\'s received Healing #-60%# for #6.3 sec#. During the same period, heals you for #13%# of Max Health.\r\r' +
      'Counts as an ongoing spell. If the target moves more than #20m# away from you the spell ends early, #stunning# them for #${stunDuration}sec#.',
    combos: [
      {
        buff: BUFF.BLESSED,
        text: 'When caster is under the effects of their own Blessing, heals allies within #10m# instead of caster.',
      },
    ],
  },
  {
    icon: PlayDeadIcon,
    name: 'Play Dead',
    mana: 25,
    channeled: true,
    cooldown: 40,
    description: 'Fall prone for #8sec,# tricking monsters into stopping combat and temporarily escaping enemy targeting in PvP.',
    descriptionNote: '\rSpell ends early if channeling is canceled or the caster moves.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
    combos: [
      {
        buff: BUFF.DEATHS_VENGEANCE,
        text: 'Triggers ${b} when used, but reduces the damage and Stun duration -50%.',
      },
    ],
  },
  {
    icon: CursedThornsIcon,
    name: 'Cursed Thorns',
    rank: 2,
    mana: 105,
    range: [0, 20],
    damage: { base: 264, attack: ATTACK.MAGIC, ratio: 60 },
    cooldown: 36,
    impaleDuration: 2,
    description: 'Infects a single enemy with cursed seeds for #10.5sec.#\r' +
      'Caused deadly thorns to sprout in their footsteps after a #4 sec# delay, dealing ${damage} Magic Damage to surrounding enemies as they burst from the ground.\r' +
      'Seeds inflict Impale on affected enemies preventing all actions for #${impaleDuration}sec.#\r' +
      'Seeds burst instantly if stepped on.',
  },
  {
    icon: ShadowstepIcon,
    name: 'Shadow Step',
    mana: 29,
    range: [0, 18],
    cooldown: 30,
    description: 'Teleports the caster directly behind an ally or enemy.\r' +
      'Does not allow the caster to pass through obstacles.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: BoneyardIcon,
    name: 'Boneyard',
    rank: 7,
    mana: 142,
    range: [0, 20],
    damage: { base: 518, attack: ATTACK.MAGIC, ratio: 100 },
    cooldown: 45,
    effects: [BUFF.STAGGER],
    description: 'Deals ${damage} Magic damage to the primary target and all surrounding enemies in a #5m# radius, trapping them in a Bone Prison for up to #10 sec.#\r' +
      'Staggers all affected enemies, briefly disabling movement and skill use and canceling all Cast Time and Channeled skills.\r' +
      'The Bone Prison disappears in #10 sec# if not destroyed.',
  },
  {
    icon: SummonCrowsIcon,
    name: 'Summon Crows',
    rank: 4,
    mana: 356,
    effectRange: 5,
    damage: { base: 1303, attack: ATTACK.MAGIC, ratio: 250 },
    cooldown: 30,
    effects: [BUFF.BLINDED_BY_CROWS],
    description: 'Summons crows to attack all enemies within the radius, dealing ${damage} Magic Damage over #5sec.#\r' +
      'Inflicts #${effects[0]}# on affected enemies, reducing their Melee and Ranged accuracy #-30%# for the duration.',
    combos: [
      {
        buff: BUFF.STEALTHED_DEBUFF,
        causes: BUFF.SUMMON_CROWS,
        text: 'Affects ${b} targets up to 30m away.',
      },
      {
        buff: BUFF.IMPALED,
        text: 'Decreases all Accuracy -200% when used on ${b} targets.',
      },
    ],
  },
  {
    icon: HellSpearIcon,
    name: 'Hell Spear',
    rank: 4,
    mana: 472,
    effectRange: 6,
    damage: { base: 1726, attack: ATTACK.MAGIC, ratio: 150 },
    cooldown: 27,
    effects: [BUFF.IMPALED],
    impaleDuration: 2.6,
    description: 'Summons a circle of spears that deal ${damage} Magic Damage to all enemies within the radius.\r' +
      'Inflicts impale, preventing all actions for #${impaleDuration}sec.#',
  },
  {
    icon: PainHarvestIcon,
    name: 'Pain Harvest',
    rank: 2,
    mana: 71,
    castTime: 3,
    effects: [BUFF.PAIN_HARVEST],
    description: 'Each Critical Strike you receive decreases active Occultism Cooldown #-1 sec.#\r' +
      'Lasts #1min.#',
    combos: [
      {
        buff: BUFF.POISONED,
        text: 'Instantly casts while ${b}.',
      },
    ],
  },
  {
    icon: ShadowVortexIcon,
    name: 'Shadow Vortex',
    mana: 302,
    range: [0, 20],
    effectRange: 7,
    castTime: 1,
    cooldown: 60,
    description: 'Summons #swirling shadows# at the target location for #10 sec,# continually drawing up to #20 affected enemies# towards the center.\r\r' +
      'Placing a new shadow vortex on an existing one will end the original spell early.',
  },
  {
    icon: SummonWraithIcon,
    name: 'Summon Wraith',
    rank: 2,
    mana: 686,
    effectRange: 7,
    damage: { base: 835, attack: ATTACK.MAGIC, ratio: 70 },
    channeled: true,
    cooldown: 60,
    description: 'Summons malevolent spirits to attack up to #20 enemies# within the radius, dealing ${damage} Magic Damage per second for up to 9 seconds.\r' +
      'Inflicts Wraith\'s Curse on all affected enemies, significantly Slowing their Move Speed, Attack Speed, and Cast Time.',
    descriptionNote: '\rSpell ends early if channeling is canceled or the caster moves.',
  },
  {
    icon: DeathsVengeanceIcon,
    name: 'Death\'s Vengeance',
    mana: 394,
    damage: { base: 1440, attack: ATTACK.MAGIC, ratio: 120 },
    castTime: 3,
    effects: [BUFF.STUNNED],
    stunDuration: 4,
    description: 'Unleash a powerful explosion when you are killed, dealing ${damage} Magic Damage.\r' +
      'Deals Magic Damage to all enemies within a #8m# radius when you die.\r' +
      'Affected enemies are ${effects[0]} for #${stunDuration} sec.#\r' +
      'Grants affected enemies temporary #Death\'s Vengeance Immunity# when the stun effect ends.',
  },
]);

export const passives = Object.freeze([
  {
    icon: UnnaturalSpeedIcon,
    name: 'Unnatural Speed',
    description: 'Decreases Cast Time #-2%.#\r' +
      'Increases Attack Speed #+40.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { castTime: 0.98 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: TraumatizeIcon,
    name: 'Traumatize',
    description: 'Increases Duration of Impale and Stun Effects #+20%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { stunDuration: 1.2, impaleDuration: 1.2 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: InevitabilityIcon,
    name: 'Inevitability',
    description: 'Impale and Stun effects by #Occultism# skills never miss.',
  },
  {
    icon: BurningBrandIcon,
    name: 'Burning Brand',
    description: 'Grants a stack of #Burning Brand# for each enemy hit by #Hell Spear, Summon Crows, Bone Prison,# or #Quake Crippling Mire.#\r\r' +
      '#Burning Brand:#\r' +
      '- Decreases Occultism Skill Cooldowns #-1%# per stack.\r' +
      '- Lasts #6 sec.#\r' +
      '- Stacks up to #15 times.#\r' +
      '- Triggers #Deathmark Aura# at 15 stacks.\r\r' +
      '#Deathmark Aura:#\r' +
      '- Decreases all Occultism Cooldowns #-15%.#\r' +
      '- Reduces enemies\' Skill Damage and Healing #-15%# in an #8m# radius.\r' +
      '- Lasts #6 sec.#\r' +
      '- Prevents gaining stacks of Burning Brand for the duration.',
  },
  {
    icon: DeathsBeckoningIcon,
    name: 'Death\'s Beckoning',
    description: 'Every time an enemy is damaged by #Crippling Mire# or #Absorb Lifeforce,# active Occultism Cooldowns are reduced #-1%.#',
  },
  {
    icon: CriticalFailureIcon,
    name: 'Critical Failure',
    description: '#Impales# enemies when they miss you with an attack.\r\r' +
      'This effect can\'t hit the same target more than once every #12 sec.#',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Crippling Mire'),
    variants: [
      {
        element: ELEMENT.QUAKE,
        icon: CripplingMireQuake,
        mana: 375,
        range: [0, 8],
        cooldown: 36,
        effectRange: 5,
        description: 'Forms a painful link with the target, dealing ${damage} Magic Damage over #4 sec# and slowing the target\'s Move Speed #-50%# for the duration.\r' +
          'This skill also fans out beams to up to 4 additional enemies within a #${effectRange}m# radius from the target.\r' +
          'Counts as an ongoing spell, but is canceled if the target moves far enough away from the caster.',
        combos: [
          {
            buff: BUFF.POISONED,
            causes: BUFF.STUNNED,
            text: 'Stuns the first target hit, if the caster is ${b}',
          },
        ],
      },
      {
        element: ELEMENT.STONE,
        icon: CripplingMireStone,
        range: [0, 20],
        description: 'Forms a painful link with the target, dealing ${damage} Magic Damage over #6 sec# and slowing the target\'s Move Speed #-80%# and Attack Speed #-600# for the duration.\r' +
          'Counts as an ongoing spell, but is canceled if the target moves far enough away from the caster.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Hell Spear'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: HellSpearFlame,
        impaleDuration: 4,
        description: 'Summons a circle of burning spears after a #2 sec# delay, dealing ${damage} Magic Damage to all enemies within the radius.\r' +
          'Inflicts impale, preventing all actions for #${impaleDuration}sec.#\r' +
          'Grants affected enemies temporary #Impale Immunity# when the Impale effect expires.',
        descriptionNote: '\rThis skill has a longer effect duration.',
      },
      {
        element: ELEMENT.MIST,
        icon: HellSpearMist,
        mana: 236,
        range: [0, 12],
        effectRange: null,
        description: 'Summons a single spear at the target\'s location, dealing ${damage} Magic Damage. Inflicts impale, preventing all actions for #${impaleDuration}sec.#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Summon Wraith'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: SummonWraithMist,
        range: [0, 15],
        damage: null,
        channeled: false,
        cooldown: 90,
        description: 'Summons a wraith at the target location to curse up to 20 enemies within the radius for up to 9 seconds.\r' +
          'Inflicts Wraith\'s Curse on all affected enemies, significantly Slowing their Move Speed, Attack Speed, and Cast Time.',
        descriptionNote: '\rCannot be used in conjunction with Fiend\'s Knell or Mist Banshee Wail (Witchcraft)',
      },
      {
        element: ELEMENT.WAVE,
        icon: SummonWraithWave,
        effectRange: null,
        damage: { base: 230, attack: ATTACK.MAGIC, ratio: 120 },
        channeled: false,
        description: 'Summons malevolent spirits to attack up to #20 enemies# within the radius, dealing ${damage} Magic Damage per second for up to #9 sec.#\r' +
          'Inflicts Wraith\'s Curse on all affected enemies, significantly Slowing their Move Speed, Attack Speed, an Cast Time.\r' +
          'This skill allows the caster to move while the spell is in effect, but has a weaker Wraith\'s Curse effect that regular Summon Wraith.',
        descriptionNote: '\rCannot be used in conjunction with Fiend\'s Knell or Mist Banshee Wail (Witchcraft)',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Shadow Step'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: ShadowStepLightning,
        range: [0, 15],
        description: 'Teleports the caster directly behind an ally or enemy up to #3 times.#\r' +
          'With each teleportation, the range decreases from #15m to 12m, and then 6m.#\r\r' +
          'Does not allow the caster to pass through obstacles.',
        descriptionNote: 'This skill has a reduced Global Cooldown.',
        globalCooldown: GLOBAL_CD.NORMAL,
      },
      {
        element: ELEMENT.MIST,
        icon: ShadowStepMist,
        cooldown: 20,
        description: 'Teleports the caster directly behind an ally or enemy, and allows to track stealthed enemies.\r' +
          'This skill can\'t be used without a target.\r\r' +
          'Does not allow the caster to pass through obstacles.',
        descriptionNote: 'This skill has a reduced Global Cooldown.',
        globalCooldown: GLOBAL_CD.NORMAL,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Absorb Lifeforce'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: AbsorbLifeforceFlame,
        range: [0, 7],
        damage: { base: 2154, attack: ATTACK.MELEE, ratio: 204 },
        description: 'Drains life from an enemy, dealing ${damage} Melee Damage and reducing the target\'s received Healing #-60%# for #8.5 sec#.\r' +
          'At the same time, heals you for #13%# of your Max Health.\r\r' +
          'Counts as an ongoing spell. If the target moves more than #20m# away from you the spell ends early, #stunning# them for #${stunDuration}sec#.',
      },
      {
        element: ELEMENT.STONE,
        icon: AbsorbLifeforceStone,
        damage: { base: 1140, attack: ATTACK.MAGIC, ratio: 108 },
        impaleDuration: 1,
        description: 'Drains life from an enemy, dealing ${damage} Magic Damage and reducing the target\'s received Healing #-60%# for #4.5 sec#.\r' +
          'At the same time, heals you for #13%# of your Max Health.\r\r' +
          'Counts as an ongoing spell. If the target moves more than #20m# away from you the spell ends early, #stunning# them for #${stunDuration}sec#. #Stuns# also enemies between the caster and the primary target for #${impaleDuration}sec#.',
      },
    ],
  },
]);

export default skills;
