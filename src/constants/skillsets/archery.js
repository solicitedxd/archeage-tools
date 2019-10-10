import EndlessArrowsIcon from 'images/skill/archery/Endless_Arrows.png';
import ChargedBoltIcon from 'images/skill/archery/Charged_Bolt.png';
import SteadyShootingIcon from 'images/skill/archery/Steady_Shooting.png';
import FendingArrowIcon from 'images/skill/archery/Fending_Arrow.png';
import BlazingArrowIcon from 'images/skill/archery/Blazing_Arrow.png';
import SnareIcon from 'images/skill/archery/Snare.png';
import DeadeyeIcon from 'images/skill/archery/Deadeye.png';
import ConcussiveArrowIcon from 'images/skill/archery/Concussive_Arrow.png';
import HuntersGuileIcon from 'images/skill/archery/Hunters_Guile.png';
import DoubleRecurveIcon from 'images/skill/archery/Double_Recurve.png';
import MissileRainIcon from 'images/skill/archery/Missile_Rain.png';
import SnipeIcon from 'images/skill/archery/Snipe.png';
import WildInstinctsIcon from 'images/skill/archery/Wild_Instincts.png';
import RelentlessIcon from 'images/skill/archery/Relentless.png';
import SharpshootingIcon from 'images/skill/archery/Sharpshooting.png';
import FeralClawsIcon from 'images/skill/archery/Feral_Claws.png';
import MarksmanIcon from 'images/skill/archery/Marksman.png';
import EagleEyesIcon from 'images/skill/archery/Eagle_Eyes.png';
import ChargedBoltFlame from 'images/skill/archery/Charged_Bolt_Flame.png';
import ChargedBoltGale from 'images/skill/archery/Charged_Bolt_Gale.png';
import ConcussiveArrowFlame from 'images/skill/archery/Concussive_Arrow_Flame.png';
import ConcussiveArrowMist from 'images/skill/archery/Concussive_Arrow_Mist.png';
import MissileRainFlame from 'images/skill/archery/Missile_Rain_Flame.png';
import MissileRainMist from 'images/skill/archery/Missile_Rain_Mist.png';
import EndlessArrowsFlame from 'images/skill/archery/Endless_arrows_Flame.png';
import EndlessArrowsStone from 'images/skill/archery/Endless_Arrows_Stone.png';
import SnipeFlame from 'images/skill/archery/Snipe_Flame.png';
import SnipeLightning from 'images/skill/archery/Snipe_Lightning.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: EndlessArrowsIcon,
    name: 'Endless Arrows',
  },
  {
    icon: ChargedBoltIcon,
    name: 'Charged Bolt',
  },
  {
    icon: SteadyShootingIcon,
    name: 'Steady Shooting',
  },
  {
    icon: FendingArrowIcon,
    name: 'Fending Arrow',
  },
  {
    icon: BlazingArrowIcon,
    name: 'Blazing Arrow',
  },
  {
    icon: SnareIcon,
    name: 'Snare',
  },
  {
    icon: DeadeyeIcon,
    name: 'Deadeye',
  },
  {
    icon: ConcussiveArrowIcon,
    name: 'Concussive Arrow',
  },
  {
    icon: HuntersGuileIcon,
    name: 'Hunter\'s Guile',
  },
  {
    icon: DoubleRecurveIcon,
    name: 'Double Recurve',
  },
  {
    icon: MissileRainIcon,
    name: 'Missile Rain',
  },
  {
    icon: SnipeIcon,
    name: 'Snipe',
  },
]);

export const passives = Object.freeze([
  {
    icon: WildInstinctsIcon,
    name: 'Wild Instincts',
  },
  {
    icon: RelentlessIcon,
    name: 'Relentless',
  },
  {
    icon: SharpshootingIcon,
    name: 'Sharpshooting',
  },
  {
    icon: FeralClawsIcon,
    name: 'Feral Claws',
  },
  {
    icon: MarksmanIcon,
    name: 'Marksman',
  },
  {
    icon: EagleEyesIcon,
    name: 'Eagle Eyes',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Charged Bolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ChargedBoltFlame,
      },
      {
        element: ELEMENT.GALE,
        icon: ChargedBoltGale,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Concussive Arrow'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ConcussiveArrowFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: ConcussiveArrowMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Missile Rain'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: MissileRainFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: MissileRainMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Endless Arrows'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: EndlessArrowsFlame,
      },
      {
        element: ELEMENT.STONE,
        icon: EndlessArrowsStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Snipe'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: SnipeFlame,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: SnipeLightning,
      },
    ],
  },
]);

export default skills;
