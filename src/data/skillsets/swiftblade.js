import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skills';
import * as Icon from '../../images/skill/swiftblade/';

const skills = Object.freeze([
  {
    icon: Icon.BladeFlurry,
    name: 'Blade Flurry',
    mana: 12,
    effectRange: 4,
    damage: { base: 0, attack: ATTACK.MELEE, ratio: 110 },
    effects: [BUFF.INSTINCT],
    description: 'Swings your weapon, dealing ${damage} Melee Damage to the target.\r' +
      'Can be used #3 times# in a row.\r' +
      'If dual-wield weapons are equipped, both the right and left-hand weapon hit the target on the second attack.\r' +
      'The Critical Damage of the left-hand weapon is increased by #+50%#.\r' +
      'The third attack, teleports the caster #5m# forward and turns them to face their enemy.\r' +
      'If the third attack hits, a stack of #Instinct# is gained.\r\r' +
      '#Instinct:#\r' +
      '- Lasts for #5sec#.\r' +
      '- Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +50%#.\r' +
      'Can be stacked #twice#, but cancels a stack after each successful hit.',
    descriptionNote: '\rThis skill has a reduced Global Cooldown.\r' +
      'Hold the skill for auto-use.\r' +
      'Can\'t use the third attack while Snared.',
    combos: [
      {
        buff: BUFF.SNARED,
        text: 'First Attack: Decreases the Attack Speed of ${b} targets #-40# for #3sec#. Stacks up to #3 times#.',
      },
      {
        buff: BUFF.STUNNED,
        text: 'Second Attack: Decreases the Attack Speed of ${b} targets #-40# for #3sec#. Stacks up to #3 times#.',
      },
    ],
  },
  {
    icon: Icon.CrescentSlice,
    name: 'Crescent Slice',
    rank: 7,
    mana: 132,
    effectRange: 5,
    damage: { base: 403, attack: ATTACK.MELEE, ratio: 110 },
    cooldown: 18,
    effects: [BUFF.SHAKEN],
    description: 'Spins a circle, dealing ${damage} Melee Damage to all targets within a #${effectRange}m# radius.\r' +
      'Inflicts #${effects[0]}# on affected enemies, decreasing their Move Speed -#27%#, Skill Damage -#8%# and Attack Speed -#75# for #3sec#.\r' +
      'If dual-wield weapons are equipped, both the right and left-hand weapon hit the target.\r' +
      'The Critical Damage of the left-hand weapon is increased by #+50%#.',
    combos: [
      {
        buff: BUFF.SHAKEN,
        causes: BUFF.DISTRESSED,
        text: 'Inflicts ${c} on ${b} targets for #7sec#.',
      },
      {
        buff: BUFF.BLEEDING,
        text: 'Deals #+30%# additional damage to ${b} targets.',
      },
      {
        buff: BUFF.INSTINCT,
        text: 'Killing targets under the effect of ${b} resets the Cooldown of #Relentless Assault, Crescent Slice, Twin Shadow Slash, and Sinister Strike#.',
      },
    ],
  },
  {
    icon: Icon.SinisterStrike,
    name: 'Sinister Strike',
    rank: 8,
    mana: 104,
    range: [0, 4],
    cooldown: 24,
    damage: { base: 1149, attack: ATTACK.MELEE, ratio: 300 },
    description: 'Deals ${damage} Melee Damage to your target.\r' +
      'If the skill is used while the caster is hiding in a #Dusk Shroud#, the Skill Damage is increased #+102%#.',
    combos: [
      {
        buff: BUFF.SLEEPING,
        text: 'Increases Critical Hit Damage #+100%# if used on a ${b} target.',
      },
      {
        buff: BUFF.BLEEDING,
        text: 'Deals #+30%# additional damage to ${b} targets.',
      },
      {
        buff: BUFF.IMPALED,
        text: 'Increases the duration of ${b} #+2 sec# on ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.Blink,
    name: 'Blink',
    mana: 23,
    range: [0, 9],
    effectRange: 3,
    cooldown: 35,
    effects: [BUFF.INSTINCT],
    description: 'Teleports you to a selected location within #${range[1]}m#, and if used again within #5sec.#.\r' +
      'Allows you to teleport back to your original location, if used again within #5 sec.#\r' +
      'Inflicts ${effects[0]} on enemies within a #${effectRange}m# radius.\r\r' +
      '#Instinct:#\r' +
      'Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +50%#.\r' +
      'Can be stacked #twice#, but cancels a stack after each successful hit.\r' +
      'Lasts for #5sec#.\r\r' +
      'The teleportation range of this skill can be increased +100% with the passive skill "Windwalker".',
    globalCooldown: GLOBAL_CD.REDUCED_USEWHILE,
    movement: true,
    noWalls: true,
    combos: [
      {
        buff: BUFF.COURAGEOUS_ACTION,
        text: 'Decreases the Cooldown #-20%# per successful hit if the caster is under the effect of ${b}.',
      },
      {
        buff: BUFF.FREERUNNER,
        text: 'Attack Speed #+50# while under the effect of Freerunner',
      },
    ],
  },
  {
    icon: Icon.RelentlessAssault,
    name: 'Relentless Assault',
    rank: 5,
    mana: 277,
    range: [0, 4],
    damage: { base: 219, attack: ATTACK.MELEE, ratio: 60 },
    cooldown: 12,
    description: 'Rapidly attacks the target #4 times# in a row, dealing ${damage} Melee Damage each hit.\r' +
      'If dual-wield weapons are equipped, both the right and left-hand weapon hit the target on the the 1st, 2nd and 4th attack.\r' +
      'The Critical Damage of the left-hand weapon is increased by #+50%#.',
    combos: [
      {
        buff: BUFF.INSTINCT,
        text: 'Attacking targets under the effect of ${b} decreases the Cooldown of #Bladeblast and Blink -30%#.',
      },
      {
        buff: BUFF.INSTINCT,
        text: 'Killing targets under the effect of ${b} resets the Cooldown of #Bladeblast and Blink#.',
      },
      {
        buff: BUFF.BLEEDING,
        text: 'Deals #+39%# additional damage to ${b} targets.',
      },
    ],
  },
  {
    icon: Icon.Reverberate,
    name: 'Reverberate',
    cooldown: 60,
    description: 'Copies the previously used Swiftblade skill, allowing the caster to reuse it, if cast within #3 seconds#.\r' +
      'Copying consumes #+200%# of the duplicated skill\'s Mana cost.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: Icon.Entangle,
    name: 'Entangle',
    rank: 4,
    mana: 51,
    range: [0, 15],
    damage: { base: 887, attack: ATTACK.MELEE, ratio: 90 },
    cooldown: 24,
    effects: [BUFF.SLOWED],
    description: 'Throws a dagger, that deals ${damage} Melee Damage, #Slows# the target, and decreases their Move Speed #-40%# for #3sec#.',
    unblockable: true,
  },
  {
    icon: Icon.DuskShroud,
    name: 'Dusk Shroud',
    mana: 241,
    range: [0, 12],
    effectRange: 5,
    cooldown: 40,
    description: 'Creates a Dusk Shroud in which you can hide for #7 sec#.\r' +
      'Enemies caught in the shroud cannot detect the caster, but using any other skills cancels the Stealth. If the caster stays in the shroud, he can however hide again.',
    combos: [
      {
        buff: BUFF.SHAKEN,
        text: 'Decreases the Accuracy of Shakened targets, if they are in a Dusk Shroud #-50%#.',
      },
      {
        buff: BUFF.FEARED,
        causes: BUFF.TRIPPED,
        text: 'Trips ${c} targets in the Shroud for #3 sec.#',
      },
    ],
  },
  {
    icon: Icon.FleetingFootsteps,
    name: 'Fleeting Footsteps',
    mana: 76,
    cooldown: 55,
    description: 'Triggers the #Fleeting Footsteps# effect for #15sec#, which Decreases the Slow duration #-50%#.',
    globalCooldown: GLOBAL_CD.REDUCED_USEWHILE,
  },
  {
    icon: Icon.Bladeblast,
    name: 'Bladeblast',
    rank: 3,
    mana: 183,
    damage: { base: 585, attack: ATTACK.MELEE, ratio: 100 },
    cooldown: 18,
    distance: 7,
    effects: [BUFF.INSTINCT],
    description: 'Allows you to swiftly charge #${distance}m# forward, dealing ${damage} Melee Damage to enemies in your path.\r' +
      'If the target is hit, a stack of #${effects[0]}# is gained for #5sec#.\r\r' +
      '#Instinct:#\r' +
      'Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +50%#.\r' +
      'Can be stacked #twice#, but cancels a stack after each successful hit.',
    unblockable: true,
    movement: true,
    combos: [
      {
        buff: BUFF.SLOWED,
        causes: BUFF.SNARED,
        text: 'Snares ${b} targets for #5sec#',
      },
    ],
  },
  {
    icon: Icon.PrimalStrike,
    name: 'Primal Strike',
    mana: 65,
    cooldown: 45,
    description: 'Recklessly attacks the target.\r' +
      'Decreases Cooldown -40% for #Sinister Strike, Crescent Slice, Relentless Assault, and TWin Shadow Slash.#',
    descriptionNote: '\rThis skill doesn\'t trigger a Global Cooldown.\r' +
      'Can be used during Global Cooldown.',
  },
  {
    icon: Icon.TwinShadow,
    name: 'Twin Shadow Slash',
    mana: 165,
    range: [0, 5],
    damage: { base: 634, attack: ATTACK.MELEE, ratio: 160 },
    cooldown: 21,
    description: 'Performs a vicious blade dance, dealing ${damage} Melee Damage.\r' +
      'If dual-wield weapons are equipped, both the right and left-hand weapon hit the target.\r' +
      'The Critical Damage of the left-hand weapon is increased #+50%#.\r' +
      'This skill can be used #twice# in a row.',
    movement: true,
    combos: [
      {
        buff: BUFF.INSTINCT,
        text: 'Disables the Bow of targets affected by ${b} for #3 seconds#.',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.TwinStrikeMastery,
    name: 'Twin Strike Mastery',
    description: 'Equipping Dual-Wield Weapons decreases the Cooldown of Swiftblade Skills #-30%#.',
  },
  {
    icon: Icon.InsightOfTheHawk,
    name: 'Insight of the Hawk',
    description: 'Critical Hits grant #Insight of the Hawk# for #5 sec#, which teleports the caster behind the target, the next time #Sinister Strike# is used.',
  },
  {
    icon: Icon.PredatoryInstinct,
    name: 'Predatory Instinct',
    description: 'Increases Swiftblade Skill Damage #+10%#.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.1 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: Icon.AdrenalineRush,
    name: 'Adrenaline Rush',
    description: 'Attacking a target under the effect of Instinct triggers an #Adrenaline Rush#.\r\r' +
      '#Adrenaline Rush#:\r' +
      '- Increases Movement Speed #+5%#.\r' +
      '- Increases Defense Penetration #+500#.\r' +
      '- Lasts for #10 seconds#.\r' +
      '- Stacks up to #6 times#.',
  },
  {
    icon: Icon.Windwalker,
    name: 'Windwalker',
    description: 'Increases the skill range of #Bladeblast, Blink, and Twin Shadow Slash +100%#.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { range: 2 },
        skills: [3, 11],
      },
      {
        type: SKILLMOD.PERCENT,
        vars: { distance: 2 },
        skills: [9],
      },
    ],
  },
  {
    icon: Icon.RendingMastery,
    name: 'Rending Mastery',
    description: 'Equipping Dual-Wield Weapons increases the Melee Critical Hit Damage #+16%#.',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Blade Flurry'),
    variants: [
      {
        element: ELEMENT.WAVE,
        icon: Icon.BladeFlurryWave,
        effects: [],
        description: 'Swings your weapon, dealing ${damage} Melee Damage to the target.\r' +
          'Can be used #3 times# in a row.\r\r' +
          'If dual-wield weapons are equipped, both the right and left-hand weapon hit the target on the second attack.\r' +
          'The Critical Damage of the left-hand weapon is increased #+50%#.',
        descriptionNote: '\rThis skill has a reduced Global Cooldown.\r' +
          'Hold the skill for auto-use.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Sinister Strike'),
    variants: [
      {
        element: ELEMENT.WAVE,
        icon: Icon.SinisterStrikeWave,
        damage: { base: 766, attack: ATTACK.MELEE, ratio: 200 },
        description: 'Deals ${damage} Melee Damage to your target, using your @left-hand weapon@.\r' +
          'If the skill is used while the caster is hiding in a #Dusk Shroud#, the Skill Damage is increased #+102%#.',
        descriptionNote: '\rThis skill doesn\'t trigger a Global Cooldown.\r' +
          'Can only be used when equipped with Dual-Wield Weapons.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Blink'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.BlinkMist,
        description: 'Teleports you to a select location within #${range[1]}#, hiding you in @Stealth@ for #1 sec#.\r' +
          'Inflicts #Instinct# on enemies within a #3m# radius.\r\r' +
          '#Instinct:#\r' +
          'Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +50%#.\r' +
          'Can be stacked #twice#, but cancels a stack after each successful hit.\r' +
          'Lasts for #5sec#.\r\r' +
          'The teleportation range of this skill can be increased +100% with the passive skill "Windwalker".',
      },
    ],
  },
]);

export default skills;
