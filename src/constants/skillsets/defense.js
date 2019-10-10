import ShieldSlamIcon from 'images/skill/defense/Shield_Slam.png';
import ToughenIcon from 'images/skill/defense/Toughen.png';
import BullRushIcon from 'images/skill/defense/Bull_Rush.png';
import BoastfulRoarIcon from 'images/skill/defense/Boastful_Roar.png';
import LassoIcon from 'images/skill/defense/Lasso.png';
import RedoubtIcon from 'images/skill/defense/Redoubt.png';
import MockingHowlIcon from 'images/skill/defense/Mocking_Howl.png';
import RefreshmentIcon from 'images/skill/defense/Refreshment.png';
import RetributionIcon from 'images/skill/defense/Retribution.png';
import RevitalizingCheerIcon from 'images/skill/defense/Revitalizing_Cheer.png';
import ImprisonIcon from 'images/skill/defense/Imprison.png';
import InvincibilityIcon from 'images/skill/defense/Invincibility.png';
import SupplementalBlockIcon from 'images/skill/defense/Supplemental_Block.png';
import SpryFortressIcon from 'images/skill/defense/Spry_Fortress.png';
import ShieldofSteelIcon from 'images/skill/defense/Shield_of_Steel.png';
import BearsVigorIcon from 'images/skill/defense/Bears_Vigor.png';
import UrsineRoarIcon from 'images/skill/defense/Ursine_Roar.png';
import ShieldMasteryIcon from 'images/skill/defense/Shield_Mastery.png';
import ShieldSlamGale from 'images/skill/defense/Shield_Slam_Gale.png';
import ShieldSlamQuake from 'images/skill/defense/Shield_Slam_Quake.png';
import RedoubtGale from 'images/skill/defense/Redoubt_Gale.png';
import RedoubtLife from 'images/skill/defense/Redoubt_Life.png';
import ImprisonMist from 'images/skill/defense/Imprison_Mist.png';
import ImprisonWave from 'images/skill/defense/Imprison_Wave.png';
import LassoGale from 'images/skill/defense/Lasso_Gale.png';
import LassoLife from 'images/skill/defense/Lasso_Life.png';
import RetributionFlame from 'images/skill/defense/Retribution_Flame.png';
import RetributionMist from 'images/skill/defense/Retribution_Mist.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: ShieldSlamIcon,
    name: 'Shield Slam',
  },
  {
    icon: ToughenIcon,
    name: 'Toughen',
  },
  {
    icon: BullRushIcon,
    name: 'Bull Rush',
  },
  {
    icon: BoastfulRoarIcon,
    name: 'Boastful Roar',
  },
  {
    icon: LassoIcon,
    name: 'Lasso',
  },
  {
    icon: RedoubtIcon,
    name: 'Redoubt',
  },
  {
    icon: MockingHowlIcon,
    name: 'Mocking Howl',
  },
  {
    icon: RefreshmentIcon,
    name: 'Emitting Health',
  },
  {
    icon: RetributionIcon,
    name: 'Retribution',
  },
  {
    icon: RevitalizingCheerIcon,
    name: 'Revitalizing Cheer',
  },
  {
    icon: ImprisonIcon,
    name: 'Imprison',
  },
  {
    icon: InvincibilityIcon,
    name: 'Invincibility',
  },
]);

export const passives = Object.freeze([
  {
    icon: SupplementalBlockIcon,
    name: 'Supplemental Block',
  },
  {
    icon: SpryFortressIcon,
    name: 'Spry Fortress',
  },
  {
    icon: ShieldofSteelIcon,
    name: 'Shield of Steel',
  },
  {
    icon: BearsVigorIcon,
    name: 'Bear\'s Vigor',
  },
  {
    icon: UrsineRoarIcon,
    name: 'Ursine Roar',
  },
  {
    icon: ShieldMasteryIcon,
    name: 'Shield Mastery',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Shield Slam'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: ShieldSlamGale,
      },
      {
        element: ELEMENT.QUAKE,
        icon: ShieldSlamQuake,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Redoubt'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: RedoubtGale,
      },
      {
        element: ELEMENT.LIFE,
        icon: RedoubtLife,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Imprison'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: ImprisonMist,
      },
      {
        element: ELEMENT.WAVE,
        icon: ImprisonWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Lasso'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: LassoGale,
      },
      {
        element: ELEMENT.LIFE,
        icon: LassoLife,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Retribution'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: RetributionFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: RetributionMist,
      },
    ],
  },
]);

export default skills;
