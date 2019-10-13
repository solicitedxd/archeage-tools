import ManaBoltsIcon from 'images/skill/malediction/Mana_Bolts.png';
import SerpentGlareIcon from 'images/skill/malediction/Serpent_Glare.png';
import SerpentBiteIcon from 'images/skill/malediction/Serpent_Bite.png';
import MaliciousBindingIcon from 'images/skill/malediction/Malicious_Binding.png';
import FuryIcon from 'images/skill/malediction/Fury.png';
import SoulboundEdgeIcon from 'images/skill/malediction/Soulbound_Edge.png';
import GhastlyPackIcon from 'images/skill/malediction/Ghastly_Pack.png';
import GraspingVoidIcon from 'images/skill/malediction/Grasping_Void.png';
import VoidSurgeIcon from 'images/skill/malediction/Void_Surge.png';
import RingThrowIcon from 'images/skill/malediction/Ring_Throw.png';
import ShadowCloakIcon from 'images/skill/malediction/Shadow_Cloak.png';
import BladefallIcon from 'images/skill/malediction/Bladefall.png';
import SpitefulCursesIcon from 'images/skill/malediction/Spiteful_Curses.png';
import EmpoweredMaliceIcon from 'images/skill/malediction/Empowered_Malice.png';
import GleefulDestructionIcon from 'images/skill/malediction/Gleeful_Destruction.png';
import WrathfulCastingIcon from 'images/skill/malediction/Wrathful_Casting.png';
import CuttingMaliceIcon from 'images/skill/malediction/Cutting_Malice.png';
import MurderousIntentIcon from 'images/skill/malediction/Murderous_Intent.png';
import ManaBoltsQuake from 'images/skill/malediction/Mana_Bolts_Quake.png';
import ManaBoltsWave from 'images/skill/malediction/Mana_Bolts_Wave.png';
import BladeFallFlame from 'images/skill/malediction/Bladefall_Flame.png';
import BladeFallLightning from 'images/skill/malediction/Bladefall_Lightning.png';
import SerpentBiteFlame from 'images/skill/malediction/Serpent_Bite_Flame.png';
import SerpentBiteStone from 'images/skill/malediction/Serpent_Bite_Stone.png';
import GraspingVoidFlame from 'images/skill/malediction/Grasping_Void_Flame.png';
import GraspingVoidMist from 'images/skill/malediction/Grasping_Void_Mist.png';
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
    icon: ManaBoltsIcon,
    name: 'Mana Bolts',
    mana: 24,
    range: [0, 24],
    damage: { base: 0, attack: ATTACK.MAGIC, ratio: 60 },
    description: 'Launches your mana as 4 razor-sharp bolts, dealing ${damage} Magic Damage to the target.',
    globalCooldown: GLOBAL_CD.REDUCED,
    continuousHold: true,
    combos: [
      {
        buff: BUFF.FURY,
        causes: BUFF.MALICE_CHARGE,
        text: 'Stacks #1 ${c}#, while ${b} is active',
      },
      {
        buff: BUFF.PETRIFIED,
        text: 'Increases Magic Defense Penetration on ${b} targets',
      },
      {
        buff: BUFF.VOID_SURGE,
        causes: BUFF.SNOWLIONS,
        text: 'Summons additional ${c} if casted within #3 seconds# after using ${b}',
      },
    ],
  },
  {
    icon: SerpentGlareIcon,
    name: 'Serpent Glare',
    rank: 6,
    mana: 274,
    castTime: 0.5,
    cooldown: 60,
    description: 'Casts Serpent Glare on the caster for #10sec#.\r' +
      'Serpent Glare temporarily transforms the caster\'s #Mana Bolts# into #Crashing Waves#, that deal powerful Magic Damage to all enemies they touch.',
  },
  {
    icon: SerpentBiteIcon,
    name: 'Serpent Bite',
    rank: 6,
    mana: 102,
    range: [0, 20],
    damage: { base: 691, attack: ATTACK.MAGIC, ratio: 190 },
    cooldown: 21,
    description: 'Summons a magic serpent that burrows underground and erupts beneath the target to inflict up to ${damage} Magic Damage.\r\r' +
      'Cancels if the casting is interrupted before the magical serpent hits the target.',
    combos: [
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#5 ${b}s:#\r' +
          '- Increases Skill Damage #+200%#\r' +
          '- Deals additional #+140%# Magic Damage in a #7m# radius around the target',
      },
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#10 ${b}s:#\r' +
          '- Increases Skill Damage #+200%#\r' +
          '- Petrifies the target for #2.5 seconds#\r' +
          '- Deals additional #+140%# Magic Damage in a #7m# radius around the target',
      },
    ],
  },
  {
    icon: MaliciousBindingIcon,
    name: 'Malicious Binding',
    mana: 28,
    range: [0, 10],
    castTime: 0.2,
    cooldown: 45,
    description: 'Tethers the target to their current location for #5sec#, pulling them back to that spot every time they attempt to move too far away.\r' +
      'The target can\'t move further than #5m#.',
  },
  {
    icon: FuryIcon,
    name: 'Fury',
    mana: 29,
    cooldown: 30,
    effects: [BUFF.MALICE_CHARGE],
    description: 'Stacks a #${effects[0]}# every second for #10 sec#. Malice Charges stack up to a maximum of #10# and remain for #5 sec#, but a new stack resets the timer.\r' +
      'The effects of #Serpent Bite#, #Ghastly Pack#, #Ring Throw#, #Shadow Cloak# and #Bladefall# are enhanced, when used with the appropriate amount of Malice Charges.',
    descriptionNote: 'This skill does not trigger a Global Cooldown.',
  },
  {
    icon: SoulboundEdgeIcon,
    name: 'Soulbound Edge',
    rank: 3,
    mana: 246,
    range: [0, 20],
    damage: { base: 899, attack: ATTACK.MAGIC, ratio: 200 },
    dotDamage: { base: 72, attack: ATTACK.MAGIC, ratio: 16 },
    cooldown: 15,
    description: 'Throws otherworldly blades that surround the target, dealing ${damage} Magic Damage.\r' +
      'The blades then continue to deal ${dotDamage} Magic Damage every second for #10sec#.\r' +
      'On every hit, the enemy suffers a reduction of #-150# Physical Defense and #-150# Magic Defense, which stacks up to #15 times#, and lasts for #6sec#.',
    combos: [
      {
        buff: BUFF.MALICIOUS_BINDING,
        text: 'Increases the damage to all enemy targets #+50%#',
      },
    ],
  },
  {
    icon: GhastlyPackIcon,
    name: 'Ghastly Pack',
    rank: 9,
    mana: 124,
    damage: { base: 736, attack: ATTACK.MAGIC, ratio: 200 },
    cooldown: 18,
    description: 'Summons a Snowlion Spectre to charge through enemies up to #50m# in front of you, dealing ${damage} Magic Damage.',
    combos: [
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#5 ${b}s:#\r' +
          '- Summons 2 Snowlion Specters',
      },
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#10 ${b}s:#\r' +
          '- Summons 2 Snowlion Specters\r' +
          '- Pushes the target back, cancelling it\'s casting\r' +
          '- Increases Damage #+100%#',
      },
    ],
  },
  {
    icon: GraspingVoidIcon,
    name: 'Grasping Void',
    mana: 110,
    range: [0, 35],
    effectRange: 10,
    castTime: 1.5,
    cooldown: 60,
    description: 'Teleports the cater and up to #10# allies to a selected location within #10m#.',
    descriptionNote: 'Allies that are Invincible or carrying a trade pack can\'t be teleported. If the caster is under the effects of Snared, only the allies are teleported.',
    noWalls: true,
  },
  {
    icon: VoidSurgeIcon,
    name: 'Void Surge',
    mana: 47,
    cooldown: 21,
    description: 'Teleports the caster to a random location up to #15m# away.\r' +
      'Can be used as many as the number on the dice rolled.\r' +
      'Can\'t be used while Snared.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: RingThrowIcon,
    name: 'Ring Throw',
    rank: 3,
    mana: 142,
    range: [0, 10],
    damage: { base: 518, attack: ATTACK.MAGIC, ratio: 100 },
    cooldown: 28,
    description: 'Launches a powerful ring at the enemy, dealing ${damage} Magic Damage and temporarily disabling the target\'s #Right-Hand Weapon.# The ring then bounces to #3# additional enemies within a #10m# radius and deals Magic Damage.',
    combos: [
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#5 ${b}s:#\r' +
          '- Deals damage to 6 additional enemies',
      },
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#10 ${b}s:#\r' +
          '- Deals damage to 6 additional enemies\r' +
          '- Shackles the target for #3sec#',
      },
    ],
  },
  {
    icon: ShadowCloakIcon,
    name: 'Shadow Cloak',
    mana: 72,
    cooldown: 70,
    description: 'Cloaks the caster in magical shadows that deflect eyes and minds for #1sec#.\r' +
      'The caster cannot be targeted for the duration.',
    descriptionNote: 'This skill doesn\'t trigger a Global Cooldown.',
    combos: [
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#5 ${b}s:#\r' +
          '- Increases the duration #+3 seconds#',
      },
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#10 ${b}s:#\r' +
          '- Increases the duration #+5 seconds#',
      },
    ],
  },
  {
    icon: BladefallIcon,
    name: 'Bladefall',
    mana: 323,
    range: [0, 15],
    effectRange: 8,
    damage: { base: 1008, attack: ATTACK.MAGIC, ratio: 270 },
    cooldown: 23,
    description: 'Calls down blades at the target location, dealing ${damage} Magic Damage to all enemies within an #${effectRange}m# radius.',
    combos: [
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#5 ${b}s:#\r' +
          '- Calls down #3# waves of blades',
      },
      {
        buff: BUFF.MALICE_CHARGE,
        text: '#10 ${b}s:#\r' +
          '- Calls down #4# waves of blades\r' +
          '- Impales the target for #2sec#',
      },
    ],
  },
]);

export const passives = Object.freeze([
  {
    icon: SpitefulCursesIcon,
    name: 'Spiteful Curses',
    description: 'Stacks 1 #Malice Charge# every time Critical Damage is received.',
  },
  {
    icon: EmpoweredMaliceIcon,
    name: 'Empowered Malice',
    description: 'Increases Magic Skill Damage of Malediction Skills #+7%.#',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.07, dotDamage: 1.07 },
        skills: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  },
  {
    icon: GleefulDestructionIcon,
    name: 'Gleeful Destruction',
    description: 'Triggers #Gleeful Destruction#, when a #Malediction# Skill Attack lands a Critical Hit.\r' +
      '#Gleeful Destruction:#\r' +
      '- Decreases the enemy\'s Melee, Ranged and Magic Accuracy #-1%# per stack\r' +
      '- Stacks up to #10 times#\r' +
      '- Duration: 5 seconds',
  },
  {
    icon: WrathfulCastingIcon,
    name: 'Wrathful Casting',
    description: 'Consuming a #Malice Charge# decreases the Global Cooldown of Malediction Skills #-12%#, and increases the damage of #Crashing Waves +10%#.\r' +
      'Stacks up to #3 times#.',
  },
  {
    icon: CuttingMaliceIcon,
    name: 'Cutting Malice',
    description: 'Decreases the Cooldown of #Serpent Glare -10 seconds#, when #Malice Charges# are consumed to enhance the effects of Malediction skills.',
  },
  {
    icon: MurderousIntentIcon,
    name: 'Murderous Intent',
    description: 'Increases Magic Critical Damage #+12%#\r' +
      'Increases Skill Damage #+5%# for skills that consume Malice Charges.',
    skillMod: [
      {
        type: SKILLMOD.PERCENT,
        vars: { damage: 1.05 },
        skills: [2, 6, 9, 11],
      },
    ],
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Mana Bolts'),
    variants: [
      {
        element: ELEMENT.QUAKE,
        icon: ManaBoltsQuake,
        mana: 12,
        range: [0, 12],
        effectRange: 6,
        damage: { base: 0, attack: ATTACK.MAGIC, ratio: 45 },
        description: 'Launches your mana as a razor-sharp bolt that causes a small explosion in a #${effectRange}m# area, dealing ${damage} Magic Damage to the target.',
      },
      {
        element: ELEMENT.WAVE,
        icon: ManaBoltsWave,
        damage: { base: 0, attack: ATTACK.MAGIC, ratio: 70 },
        description: 'Launches your mana as three razor-sharp bolts, dealing ${damage} Magic Damage and increasing your Move Speed #+1%# per successful hit, up to #10%.#',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Bladefall'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: BladeFallFlame,
        cooldown: 33,
        description: 'Calls down blades at the target location, dealing ${damage} Magic Damage to all enemies #once# within an #${effectRange}m# radius.',
        ancestralNote: '\r\rThis skill consumes less Malice Charges.',
        combos: [
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#3 ${b}s:#\r' +
              '- Calls down #3# waves of blades',
          },
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#5 ${b}s:#\r' +
              '- Calls down #4# waves of blades\r' +
              '- Impales the target for #2sec#',
          },
        ],
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: BladeFallLightning,
        damage: { base: 806, attack: ATTACK.MAGIC, ratio: 220 },
        description: 'Calls down blades quickly at the target location, dealing ${damage} Magic Damage to all enemies #once# within an #${effectRange}m# radius.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Serpent Bite'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: SerpentBiteFlame,
        cooldown: 31,
        ancestralNote: '\rThis skill consumes less Malice Charges.',
        combos: [
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#3 ${b}s:#\r' +
              '- Increases Skill Damage #+200%#\r' +
              '- Deals additional #+140%# Magic Damage in a #7m# radius around the target',
          },
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#5 ${b}s:#\r' +
              '- Increases Skill Damage #+200%#\r' +
              '- Petrifies the target for #2.5 seconds#\r' +
              '- Deals additional #+140%# Magic Damage in a #7m# radius around the target',
          },
        ],
      },
      {
        element: ELEMENT.STONE,
        icon: SerpentBiteStone,
        description: 'Summons a magical serpent that burrows underground and erupts beneath the target to inflict up to ${damage} Magic Damage.\r' +
          '#Petrifies# enemies facing the target within #15m# for #2.5sec#.\r\r' +
          'Cancels if the casting is interrupted before the magical serpent hits the target.',
        combos: [
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#5 ${b}s:#\r' +
              '- Increases Skill Damage #+200%#\r' +
              '- Deals additional #+70%# Magic Damage in a #7m# radius around the target',
          },
          {
            buff: BUFF.MALICE_CHARGE,
            text: '#10 ${b}s:#\r' +
              '- Increases Skill Damage #+200%#\r' +
              '- Petrifies the target for #2.5 seconds#\r' +
              '- Deals additional #+70%# Magic Damage in a #7m# radius around the target',
          },
        ],
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Grasping Void'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: GraspingVoidFlame,
        range: [0, 20],
        damage: { base: 518, attack: ATTACK.MAGIC, ratio: 150 },
        description: 'Teleports the caster and up to #10# allies to a selected location within #10m#.\r' +
          'Deals ${damage} Magic Damage to enemies at the location and decreases their Move Speed.',
      },
      {
        element: ELEMENT.MIST,
        icon: GraspingVoidMist,
        effectRange: 5,
        castTime: 3,
        description: 'Teleports up to #5 enemies# in a selected #5m# radius to your location.',
        descriptionNote: '\rCan only be used on hostile targets.',
        noWalls: false,
      },
    ],
  },
]);

export default skills;
