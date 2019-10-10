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
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: HolyBoltIcon,
    name: 'Holy Bolt',
  },
  {
    icon: MirrorLightIcon,
    name: 'Mirror Light',
  },
  {
    icon: AntithesisIcon,
    name: 'Antithesis',
  },
  {
    icon: ResurgenceIcon,
    name: 'Resurgence',
  },
  {
    icon: SkewerIcon,
    name: 'Skewer',
  },
  {
    icon: MendIcon,
    name: 'Mend',
  },
  {
    icon: ReviveIcon,
    name: 'Revive',
  },
  {
    icon: FerventHealingIcon,
    name: 'Fervent Healing',
  },
  {
    icon: RenewalIcon,
    name: 'Renewal',
  },
  {
    icon: AranzebsBoonIcon,
    name: 'Aranzeb\'s Boon',
  },
  {
    icon: ManaBarrierIcon,
    name: 'Mana Barrier',
  },
  {
    icon: HealingCircleIcon,
    name: 'Healing Circle',
  },
]);

export const passives = Object.freeze([
  {
    icon: ProphetsVoiceIcon,
    name: 'Prophet\'s Voice',
  },
  {
    icon: QuickRecoveryIcon,
    name: 'Quick Recovery',
  },
  {
    icon: VibrantCastingIcon,
    name: 'Vibrant Casting',
  },
  {
    icon: MartyrsWayIcon,
    name: 'Martyr\'s Way',
  },
  {
    icon: InvigoratedHealingIcon,
    name: 'Invigorated Healing',
  },
  {
    icon: JoyousSpiritIcon,
    name: 'Joyous Spirit',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Antithesis'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: AntithesisLife,
      },
      {
        element: ELEMENT.QUAKE,
        icon: AntithesisQuake,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Skewer'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: SkewerFlame,
      },
      {
        element: ELEMENT.LIFE,
        icon: SkewerLife,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Fervent Healing'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: FerventHealingFlame,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: FerventHealingLightning,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Holy Bolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: HolyBoltFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: HolyBoltMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Healing Circle'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: HealingCircleLife,
      },
      {
        element: ELEMENT.WAVE,
        icon: HealingCircleWave,
      },
    ],
  },
]);

export default skills;
