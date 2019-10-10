import CripplingMireIcon from 'images/skill/occultism/Crippling_Mire.png';
import AbsorbLifeIcon from 'images/skill/occultism/Absorb_Life.png';
import PlayDeadIcon from 'images/skill/occultism/Play_Dead.png';
import CursedThornsIcon from 'images/skill/occultism/Cursed_Thorns.png';
import ShadowstepIcon from 'images/skill/occultism/Shadowstep.png';
import BoneyardIcon from 'images/skill/occultism/Boneyard.png';
import SummonCrowsIcon from 'images/skill/occultism/Summon_Crows.png';
import HellSpearIcon from 'images/skill/occultism/Hell_Spear.png';
import PainHarvestIcon from 'images/skill/occultism/Pain_Harvest.png';
import ShadowVortexIcon from 'images/skill/occultism/Shadow_Vortex.png';
import SummonWraithIcon from 'images/skill/occultism/Summon_Wraith.png';
import DeathsVengeanceIcon from 'images/skill/occultism/Deaths_Vengeance.png';
import UnnaturalSpeedIcon from 'images/skill/occultism/Unnatural_Speed.png';
import TraumatizeIcon from 'images/skill/occultism/Traumatize.png';
import InevitabilityIcon from 'images/skill/occultism/Inevitability.png';
import BurningBrandIcon from 'images/skill/occultism/Burning_Brand.png';
import DeathsBeckoningIcon from 'images/skill/occultism/Deaths_Beckoning.png';
import CriticalFailureIcon from 'images/skill/occultism/Critical_Failure.png';
import CripplingMireQuake from 'images/skill/occultism/Crippling_Mire_Quake.png';
import CripplingMireStone from 'images/skill/occultism/Crippling_Mire_Stone.png';
import HellSpearFlame from 'images/skill/occultism/Hell_Spear_Flame.png';
import HellSpearMist from 'images/skill/occultism/Hell_Spear_Mist.png';
import SummonWraithMist from 'images/skill/occultism/Summon_Wraith_Mist.png';
import SummonWraithWave from 'images/skill/occultism/Summon_Wraith_Wave.png';
import ShadowStepLightning from 'images/skill/occultism/Shadowstep_Lightning.png';
import ShadowStepMist from 'images/skill/occultism/Shadowstep_Mist.png';
import AbsorbLifeforceFlame from 'images/skill/occultism/Absorb_Life_Flame.png';
import AbsorbLifeforceStone from 'images/skill/occultism/Absorb_Life_Stone.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: CripplingMireIcon,
    name: 'Crippling Mire',
  },
  {
    icon: AbsorbLifeIcon,
    name: 'Absorb Lifeforce',
  },
  {
    icon: PlayDeadIcon,
    name: 'Play Dead',
  },
  {
    icon: CursedThornsIcon,
    name: 'Cursed Thorns',
  },
  {
    icon: ShadowstepIcon,
    name: 'Shadow Step',
  },
  {
    icon: BoneyardIcon,
    name: 'Boneyard',
  },
  {
    icon: SummonCrowsIcon,
    name: 'Summon Crows',
  },
  {
    icon: HellSpearIcon,
    name: 'Hell Spear',
  },
  {
    icon: PainHarvestIcon,
    name: 'Pain Harvest',
  },
  {
    icon: ShadowVortexIcon,
    name: 'Shadow Vortex',
  },
  {
    icon: SummonWraithIcon,
    name: 'Summon Wraith',
  },
  {
    icon: DeathsVengeanceIcon,
    name: 'Death\'s Vengeance',
  },
]);

export const passives = Object.freeze([
  {
    icon: UnnaturalSpeedIcon,
    name: 'Unnatural Speed',
  },
  {
    icon: TraumatizeIcon,
    name: 'Traumatize',
  },
  {
    icon: InevitabilityIcon,
    name: 'Inevitability',
  },
  {
    icon: BurningBrandIcon,
    name: 'Burning Brand',
  },
  {
    icon: DeathsBeckoningIcon,
    name: 'Death\'s Beckoning',
  },
  {
    icon: CriticalFailureIcon,
    name: 'Critical Failure',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Crippling Mire'),
    variants: [
      {
        element: ELEMENT.QUAKE,
        icon: CripplingMireQuake,
      },
      {
        element: ELEMENT.STONE,
        icon: CripplingMireStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Hell Spear'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: HellSpearFlame,
      },
      {
        element: ELEMENT.MIST,
        icon: HellSpearMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Summon Wraith'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: SummonWraithMist,
      },
      {
        element: ELEMENT.WAVE,
        icon: SummonWraithWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Shadow Step'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: ShadowStepLightning,
      },
      {
        element: ELEMENT.MIST,
        icon: ShadowStepMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Absorb Lifeforce'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: AbsorbLifeforceFlame,
      },
      {
        element: ELEMENT.STONE,
        icon: AbsorbLifeforceStone,
      },
    ],
  },
]);

export default skills;
