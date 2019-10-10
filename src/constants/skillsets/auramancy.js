import ThwartIcon from 'images/skill/auramancy/Thwart.png';
import CometsBoonIcon from 'images/skill/auramancy/Comets_Boon.png';
import ConversionShieldIcon from 'images/skill/auramancy/Conversion_Shield.png';
import ViciousImplosionIcon from 'images/skill/auramancy/Vicious_Implosion.png';
import TeleportationIcon from 'images/skill/auramancy/Teleportation.png';
import CourageousActionIcon from 'images/skill/auramancy/Courageous_Action.png';
import MeditateIcon from 'images/skill/auramancy/Meditate.png';
import ShrugItOffIcon from 'images/skill/auramancy/Shrug_It_Off.png';
import HealthLiftIcon from 'images/skill/auramancy/Health_Lift.png';
import BanishmentIcon from 'images/skill/auramancy/Banishment.png';
import ProtectiveWingsIcon from 'images/skill/auramancy/Protective_Wings.png';
import BracingBlastIcon from 'images/skill/auramancy/Bracing_Blast.png';
import AbsorbDamageIcon from 'images/skill/auramancy/Absorb_Damage.png';
import InnerPeaceIcon from 'images/skill/auramancy/Inner_Peace.png';
import UnassailableIcon from 'images/skill/auramancy/Unassailable.png';
import WardMasteryIcon from 'images/skill/auramancy/Ward_Mastery.png';
import AcceleratedCastingIcon from 'images/skill/auramancy/Accelerated_Casting.png';
import UnwaveringWillIcon from 'images/skill/auramancy/Unwavering_Will.png';
import ThwartMist from 'images/skill/auramancy/Thwart_Mist.png';
import ThwartStone from 'images/skill/auramancy/Thwart_Stone.png';
import ConversionShieldFlame from 'images/skill/auramancy/Conversion_Shield_Flame.png';
import ConversionShieldMist from 'images/skill/auramancy/Conversion_Shield_Mist.png';
import ProtectiveWingsFlame from 'images/skill/auramancy/Protective_Wings_Flame.png';
import ProtectiveWingsMist from 'images/skill/auramancy/Protective_Wings_Mist.png';
import TeleportationLightning from 'images/skill/auramancy/Teleportation_Lightning.png';
import TeleportationMist from 'images/skill/auramancy/Teleportation_Mist.png';
import ViciousImplosionFlame from 'images/skill/auramancy/Vicious_Implosion_Flame.png';
import ViciousImplosionStone from 'images/skill/auramancy/Vicious_Implosion_Stone.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: ThwartIcon,
    name: 'Thwart',
  },
  {
    icon: CometsBoonIcon,
    name: 'Comet\'s Boon',
  },
  {
    icon: ConversionShieldIcon,
    name: 'Conversion Shield',
  },
  {
    icon: ViciousImplosionIcon,
    name: 'Vicious Implosion',
  },
  {
    icon: TeleportationIcon,
    name: 'Teleportation',
  },
  {
    icon: CourageousActionIcon,
    name: 'Courageous Action',
  },
  {
    icon: MeditateIcon,
    name: 'Meditate',
  },
  {
    icon: ShrugItOffIcon,
    name: 'Shrug It Off',
  },
  {
    icon: HealthLiftIcon,
    name: 'Health Lift',
  },
  {
    icon: BanishmentIcon,
    name: 'Banishment',
  },
  {
    icon: ProtectiveWingsIcon,
    name: 'Protective Wings',
  },
  {
    icon: BracingBlastIcon,
    name: 'Bracing Blast',
  },
]);

export const passives = Object.freeze([
  {
    icon: AbsorbDamageIcon,
    name: 'Absorb Damage',
  },
  {
    icon: InnerPeaceIcon,
    name: 'Inner Peace',
  },
  {
    icon: UnassailableIcon,
    name: 'Unassailable',
  },
  {
    icon: WardMasteryIcon,
    name: 'Ward Mastery',
  },
  {
    icon: AcceleratedCastingIcon,
    name: 'Accelerated Casting',
  },
  {
    icon: UnwaveringWillIcon,
    name: 'Unwavering Will',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Thwart'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: ThwartMist,
      },
      {
        element: ELEMENT.STONE,
        icon: ThwartStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Conversion Shield'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ConversionShieldFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: ConversionShieldMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Protective Wings'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ProtectiveWingsFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: ProtectiveWingsMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Teleportation'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: TeleportationLightning,
      },
      {
        element: ELEMENT.MIST,
        icon: TeleportationMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Vicious Implosion'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ViciousImplosionFlame,
      },
      {
        element: ELEMENT.STONE,
        icon: ViciousImplosionStone,
      },
    ],
  },
]);

export default skills;
