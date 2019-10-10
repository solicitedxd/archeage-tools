import RapidStrikeIcon from 'images/skill/shadowplay/Rapid_Strike.png';
import PoisonedWeaponsIcon from 'images/skill/shadowplay/Poisoned_Weapons.png';
import DropBackIcon from 'images/skill/shadowplay/Drop_Back.png';
import PinDownIcon from 'images/skill/shadowplay/Pin_Down.png';
import OverwhelmIcon from 'images/skill/shadowplay/Overwhelm.png';
import StalkersMarkIcon from 'images/skill/shadowplay/Stalkers_Mark.png';
import WallopIcon from 'images/skill/shadowplay/Wallop.png';
import StealthIcon from 'images/skill/shadowplay/Stealth.png';
import FreerunnerIcon from 'images/skill/shadowplay/Freerunner.png';
import ShadowsmiteIcon from 'images/skill/shadowplay/Shadowsmite.png';
import LeechIcon from 'images/skill/shadowplay/Leech.png';
import ThrowDaggerIcon from 'images/skill/shadowplay/Throw_Dagger.png';
import ShadowTrainingIcon from 'images/skill/shadowplay/Shadow_Training.png';
import BecomeVoidIcon from 'images/skill/shadowplay/Become_Void.png';
import RuthlessAssaultIcon from 'images/skill/shadowplay/Ruthless_Assault.png';
import BloodthirstIntensifiedIcon from 'images/skill/shadowplay/Bloodthirst_Intensified.png';
import LethalToxinsIcon from 'images/skill/shadowplay/Lethal_Toxins.png';
import ShadowMasteryIcon from 'images/skill/shadowplay/Shadow_Mastery.png';
import OverwhelmFlame from 'images/skill/shadowplay/Overwhelm_Flame.png';
import OverwhelmLightning from 'images/skill/shadowplay/Overwhelm_Lightning.png';
import DropBackMist from 'images/skill/shadowplay/Drop_Back_Mist.png';
import DropBackWave from 'images/skill/shadowplay/Drop_Back_Wave.png';
import ShadowsmiteLightning from 'images/skill/shadowplay/Shadowsmite_Lightning.png';
import ShadowsmiteMist from 'images/skill/shadowplay/Shadowsmite_Mist.png';
import FreerunnerFlame from 'images/skill/shadowplay/Freerunner_Flame.png';
import FreerunnerQuake from 'images/skill/shadowplay/Freerunner_Quake.png';
import PoisonedWeaponsFlame from 'images/skill/shadowplay/Poisoned_Weapons_Flame.png';
import PoisonedWeaponsWave from 'images/skill/shadowplay/Poisoned_Weapons_Wave.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: RapidStrikeIcon,
    name: 'Rapid Strike',
  },
  {
    icon: PoisonedWeaponsIcon,
    name: 'Poisoned Weapons',
  },
  {
    icon: DropBackIcon,
    name: 'Drop Back',
  },
  {
    icon: PinDownIcon,
    name: 'Pin Down',
  },
  {
    icon: OverwhelmIcon,
    name: 'Overwhelm',
  },
  {
    icon: StalkersMarkIcon,
    name: 'Stalker\'s Mark',
  },
  {
    icon: WallopIcon,
    name: 'Wallop',
  },
  {
    icon: StealthIcon,
    name: 'Stealth',
  },
  {
    icon: FreerunnerIcon,
    name: 'Freerunner',
  },
  {
    icon: ShadowsmiteIcon,
    name: 'Shadowsmite',
  },
  {
    icon: LeechIcon,
    name: 'Leech',
  },
  {
    icon: ThrowDaggerIcon,
    name: 'Throw Dagger',
  },
]);

export const passives = Object.freeze([
  {
    icon: ShadowTrainingIcon,
    name: 'Shadow Training',
  },
  {
    icon: BecomeVoidIcon,
    name: 'Become Void',
  },
  {
    icon: RuthlessAssaultIcon,
    name: 'Ruthless Assault',
  },
  {
    icon: BloodthirstIntensifiedIcon,
    name: 'Bloodthirst Intensified',
  },
  {
    icon: LethalToxinsIcon,
    name: 'Lethal Toxins',
  },
  {
    icon: ShadowMasteryIcon,
    name: 'Shadow Mastery',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Overwhelm'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: OverwhelmFlame,
      },
      {
        element: ELEMENT.LIGHTNING,
        icon: OverwhelmLightning,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Drop Back'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: DropBackMist,
      },
      {
        element: ELEMENT.WAVE,
        icon: DropBackWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Shadowsmite'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: ShadowsmiteLightning,
      },
      {
        element: ELEMENT.MIST,
        icon: ShadowsmiteMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Freerunner'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: FreerunnerFlame,
      },
      {
        element: ELEMENT.QUAKE,
        icon: FreerunnerQuake,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Poisoned Weapons'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: PoisonedWeaponsFlame,
      },
      {
        element: ELEMENT.WAVE,
        icon: PoisonedWeaponsWave,
      },
    ],
  },
]);

export default skills;
