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
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: FlameboltIcon,
    name: 'Flamebolt',
  },
  {
    icon: FreezingArrowIcon,
    name: 'Freezing Arrow',
  },
  {
    icon: InsulatingLensIcon,
    name: 'Insulating Lens',
  },
  {
    icon: ArcLightningIcon,
    name: 'Arc Lightning',
  },
  {
    icon: MagicCircleIcon,
    name: 'Magic Circle',
  },
  {
    icon: FreezingEarthIcon,
    name: 'Freezing Earth',
  },
  {
    icon: FlameBarrierIcon,
    name: 'Flame Barrier',
  },
  {
    icon: ChainLightningIcon,
    name: 'Chain Lightning',
  },
  {
    icon: SearingRainIcon,
    name: 'Searing Rain',
  },
  {
    icon: FrigidTracksIcon,
    name: 'Frigid Tracks',
  },
  {
    icon: MeteorStrikeIcon,
    name: 'Meteor Strike',
  },
  {
    icon: GodsWhipIcon,
    name: 'Gods\' Whip',
  },
]);

export const passives = Object.freeze([
  {
    icon: ManaPoolIncreaseIcon,
    name: 'Mana Pool Increase',
  },
  {
    icon: AranzebsInfusionIcon,
    name: 'Aranzeb\'s Infusion',
  },
  {
    icon: MindOverMatterIcon,
    name: 'Mind Over Matter',
  },
  {
    icon: ManaFountainIcon,
    name: 'Mana Fountain',
  },
  {
    icon: HeirtoAyanadIcon,
    name: 'Heir to Ayanad',
  },
  {
    icon: SorceryAdeptIcon,
    name: 'Sorcery Adept',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Flamebolt'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: FlameboltFlame,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: FlameboltLightning,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Chain Lightning'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: ChainLightningFlame,
      },
      {
        element: ELEMENT.WAVE,
        icon: ChainLightningWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Meteor Strike'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: MeteorStrikeLightning,
      },
      {
        element: ELEMENT.WAVE,
        icon: MeteorStrikeWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Gods\' Whip'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: GodsWhipLightning,
      },
      {
        element: ELEMENT.WAVE,
        icon: GodsWhipWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Flame Barrier'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: FlameBarrierMist,
      },
      {
        element: ELEMENT.WAVE,
        icon: FlameBarrierWave,
      },
    ],
  },
]);

export default skills;
