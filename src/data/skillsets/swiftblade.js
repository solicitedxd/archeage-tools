import BladeFlurryIcon from 'images/skill/swiftblade/Blade_Flurry.png';
import CrescentSliceIcon from 'images/skill/swiftblade/Crescent_Slice.png';
import SinisterStrikeIcon from 'images/skill/swiftblade/Sinister_Strike.png';
import BlinkIcon from 'images/skill/swiftblade/Blink.png';
import RelentlessAssaultIcon from 'images/skill/swiftblade/Relentless_Assault.png';
import ReverberateIcon from 'images/skill/swiftblade/Reverberate.png';
import EntangleIcon from 'images/skill/swiftblade/Entangle.png';
import DuskShroudIcon from 'images/skill/swiftblade/Dusk_Shroud.png';
import FleetingFootstepsIcon from 'images/skill/swiftblade/Fleeting_Footsteps.png';
import BladeblastIcon from 'images/skill/swiftblade/Bladeblast.png';
import PrimalStrikeIcon from 'images/skill/swiftblade/Primal_Strike.png';
import TwinShadowIcon from 'images/skill/swiftblade/Twin_Shadow.png';
import TwinStrikeMasteryIcon from 'images/skill/swiftblade/Twin_Strike_Mastery.png';
import InsightoftheHawkIcon from 'images/skill/swiftblade/Insight_of_the_Hawk.png';
import PredatoryInstinctIcon from 'images/skill/swiftblade/Predatory_Instinct.png';
import AdrenalineRushIcon from 'images/skill/swiftblade/Adrenaline_Rush.png';
import WindwalkerIcon from 'images/skill/swiftblade/Windwalker.png';
import RendingMasteryIcon from 'images/skill/swiftblade/Rending_Mastery.png';
import {
  ATTACK,
  BUFF,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';

const skills = Object.freeze([
  {
    icon: BladeFlurryIcon,
    name: 'Blade Flurry',
    mana: 12,
    effectRange: 4,
    damage: { base: 0, attack: ATTACK.MELEE, ratio: 110 },
    effects: [BUFF.INSTINCT],
    description: 'Swings your weapon, dealing ${damage} Melee Damage to the target.\r' +
      'Can be used #3 times# in a row.\r' +
      'If dual-wield weapons are equipped, the second attack deals #+50%# Melee Critical Damage based on the left-hand weapon\'s damage.\r' +
      'The third attack, teleports the caster #5m# forward and turns them to face their enemy.\r' +
      'If the third attack hits, a stack of #Instinct# is gained.\r\r' +
      '#Instinct:#\r' +
      '- Lasts for #5sec#.\r' +
      '- Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +40%#.\r' +
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
    icon: CrescentSliceIcon,
    name: 'Crescent Slice',
    rank: 7,
    mana: 132,
    effectRange: 5,
    damage: { base: 403, attack: ATTACK.MELEE, ratio: 110 },
    cooldown: 18,
    effects: [BUFF.SHAKEN],
    description: 'Spins a circle, dealing ${damage} Melee Damage to all targets within a #${effectRange}m# radius.\r' +
      'Inflicts #${effects[0]}# on affected enemies, decreasing their Move Speed -#27%#, Skill Damage -#8%# and Attack Speed -#75# for #3sec#.\r' +
      'If dual-wield weapons are equipped, the Critical Hit Damage is increased by #+50%#, based on the left-hand weapon\'s damage.',
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
    icon: SinisterStrikeIcon,
    name: 'Sinister Strike',
    rank: 8,
    mana: 104,
    range: [0, 4],
    cooldown: 24,
    damage: { base: 958, attack: ATTACK.MELEE, ratio: 250 },
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
    icon: BlinkIcon,
    name: 'Blink',
    mana: 23,
    range: [0, 9],
    effectRange: 3,
    cooldown: 35,
    effects: [BUFF.INSTINCT],
    description: 'Teleports you to a selected location within #${range[1]}m#, and if used again within #5sec.#, allows you to teleport back to your original location.\r' +
      'Inflicts ${effects[0]} on enemies within a #${effectRange}m# radius.\r\r' +
      '#Instinct:#\r' +
      'Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +40%#.\r' +
      'Can be stacked #twice#, but cancels a stack after each successful hit.\r' +
      'Lasts for #5sec#.',
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
    icon: RelentlessAssaultIcon,
    name: 'Relentless Assault',
    rank: 5,
    mana: 277,
    range: [0, 4],
    damage: { base: 219, attack: ATTACK.MELEE, ratio: 60 },
    cooldown: 12,
    description: 'Rapidly attacks the target #4 times# in a row, dealing ${damage} Melee Damage each hit.\r' +
      'If dual-wield weapons are equipped, the 1st, 2nd and 4th attack deal additional #+50%# Critical Damage, based on the left-hand weapons damage.',
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
    icon: ReverberateIcon,
    name: 'Reverberate',
    cooldown: 60,
    description: 'Copies the previously used Swiftblade skill, allowing the caster to reuse it, if cast within #3 seconds#.\r' +
      'Copying consumes #+200%# of the duplicated skill\'s Mana cost.',
    globalCooldown: GLOBAL_CD.NO_TRIGGER,
  },
  {
    icon: EntangleIcon,
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
    icon: DuskShroudIcon,
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
        text: 'Increases the duration of of Fear, if the target is the Dusk Shroud #+3 sec#.',
      },
    ],
  },
  {
    icon: FleetingFootstepsIcon,
    name: 'Fleeting Footsteps',
    mana: 76,
    cooldown: 55,
    description: 'Triggers the #Fleeting Footsteps# effect for #15sec#, which decreases the duration of Slow #-70%#.\r' +
      'Gaining another stack of #Fleeting Footsteps# increases the duration up to #30 sec#.',
    globalCooldown: GLOBAL_CD.REDUCED_USEWHILE,
  },
  {
    icon: BladeblastIcon,
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
      'Increases the Damage dealt by #Crescent Slice, Sinister Strike, Relentless Assault, and Twin Shadow Slash +40%#.\r' +
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
    icon: PrimalStrikeIcon,
    name: 'Primal Strike',
    mana: 65,
    cooldown: 45,
    description: 'Recklessly attacks the target, inflicting #Primal Strike# for #10sec#.\r' +
      'Primal Strike increases the Attack Speed +#350# and the Received Damage #+50%#. Gaining additional stack of #Primal Strike# increases the duration up to #20 sec#.',
    globalCooldown: GLOBAL_CD.NONE,
  },
  {
    icon: TwinShadowIcon,
    name: 'Twin Shadow Strike',
    mana: 165,
    range: [0, 5],
    damage: { base: 576, attack: ATTACK.MELEE, ratio: 150 },
    cooldown: 21,
    description: 'Performs a vicious blade dance, dealing ${damage} Melee Damage.\r' +
      'If dual-wield weapons are equipped, the Critical Damage is increased +50%, based on the left-hand weapon\'s damage.\r' +
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
    icon: TwinStrikeMasteryIcon,
    name: 'Twin Strike Mastery',
    description: 'Equipping Dual-Wield Weapons decreases the Cooldown of Swiftblade Skills #-30%#.',
  },
  {
    icon: InsightoftheHawkIcon,
    name: 'Insight of the Hawk',
    description: 'Critical Hits grant #Insight of the Hawk# for #5 sec#, which teleports the caster behind the target, the next time #Sinister Strike# is used.',
  },
  {
    icon: PredatoryInstinctIcon,
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
    icon: AdrenalineRushIcon,
    name: 'Adrenaline Rush',
    description: 'Attacking a target under the effect of Instinct triggers an #Adrenaline Rush#.\r\r' +
      '#Adrenaline Rush#:\r' +
      '- Increases Movement Speed #+5%#.\r' +
      '- Increases Defense Penetration #+500#.\r' +
      '- Lasts for #10 seconds#.\r' +
      '- Stacks up to #6 times#.',
  },
  {
    icon: WindwalkerIcon,
    name: 'Windwalker',
    description: 'Increases the skill range of #Bladeblast and Blink +100%#.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { range: 2 },
        skills: [3],
      },
      {
        type: SKILLMOD.PERCENT,
        vars: { distance: 2 },
        skills: [9],
      },
    ],
  },
  {
    icon: RendingMasteryIcon,
    name: 'Rending Mastery',
    description: 'Equipping Dual-Wield Weapons increases the Melee Critical Hit Damage #+16%#.',
  },
]);

export const ancestrals = Object.freeze([]);

export default skills;
