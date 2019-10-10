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
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: ManaBoltsIcon,
    name: 'Mana Bolts',
  },
  {
    icon: SerpentGlareIcon,
    name: 'Serpent Glare',
  },
  {
    icon: SerpentBiteIcon,
    name: 'Serpent Bite',
  },
  {
    icon: MaliciousBindingIcon,
    name: 'Malicious Binding',
  },
  {
    icon: FuryIcon,
    name: 'Fury',
  },
  {
    icon: SoulboundEdgeIcon,
    name: 'Soulbound Edge',
  },
  {
    icon: GhastlyPackIcon,
    name: 'Ghastly Pack',
  },
  {
    icon: GraspingVoidIcon,
    name: 'Grasping Void',
  },
  {
    icon: VoidSurgeIcon,
    name: 'Void Surge',
  },
  {
    icon: RingThrowIcon,
    name: 'Ring Throw',
  },
  {
    icon: ShadowCloakIcon,
    name: 'Shadow Cloak',
  },
  {
    icon: BladefallIcon,
    name: 'Bladefall',
  },
]);

export const passives = Object.freeze([
  {
    icon: SpitefulCursesIcon,
    name: 'Spiteful Curses',
  },
  {
    icon: EmpoweredMaliceIcon,
    name: 'Empowered Malice',
  },
  {
    icon: GleefulDestructionIcon,
    name: 'Gleeful Destruction',
  },
  {
    icon: WrathfulCastingIcon,
    name: 'Wrathful Casting',
  },
  {
    icon: CuttingMaliceIcon,
    name: 'Cutting Malice',
  },
  {
    icon: MurderousIntentIcon,
    name: 'Murderous Intent',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Mana Bolts'),
    variants: [
      {
        element: ELEMENT.QUAKE,
        icon: ManaBoltsQuake,
      },
      {
        element: ELEMENT.WAVE,
        icon: ManaBoltsWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Bladefall'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: BladeFallFlame,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: BladeFallLightning,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Serpent Bite'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: SerpentBiteFlame,
      },
      {
        element: ELEMENT.STONE,
        icon: SerpentBiteStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Grasping Void'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: GraspingVoidFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: GraspingVoidMist,
      },
    ],
  },
]);

export default skills;
