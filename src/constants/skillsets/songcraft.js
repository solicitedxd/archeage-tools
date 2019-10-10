import CriticalDiscordIcon from 'images/skill/songcraft/Critical_Discord.png';
import StartlingStrainIcon from 'images/skill/songcraft/Startling_Strain.png';
import QuickstepIcon from 'images/skill/songcraft/Quickstep.png';
import DissonanceIcon from 'images/skill/songcraft/Dissonance.png';
import DoubleTimeIcon from 'images/skill/songcraft/Double-Time.png';
import OdetoRecoveryIcon from 'images/skill/songcraft/Ode_to_Recovery.png';
import HealingHymnIcon from 'images/skill/songcraft/Healing_Hymn.png';
import DeadlyRefrainIcon from 'images/skill/songcraft/Deadly_Refrain.png';
import BulwarkBalladIcon from 'images/skill/songcraft/Bulwark_Ballad.png';
import SonicWaveIcon from 'images/skill/songcraft/Sonic_Wave.png';
import BloodyChanteyIcon from 'images/skill/songcraft/Bloody_Chantey.png';
import BattleHymnIcon from 'images/skill/songcraft/Battle_Hymn.png';
import PiercingMelodyIcon from 'images/skill/songcraft/Piercing_Melody.png';
import HoldtheNoteIcon from 'images/skill/songcraft/Hold_the_Note.png';
import ZealIcon from 'images/skill/songcraft/Zeal.png';
import DisciplinedPerformanceIcon from 'images/skill/songcraft/Disciplined_Performance.png';
import LingeringImpactIcon from 'images/skill/songcraft/Lingering_Impact.png';
import LoudspeakerIcon from 'images/skill/songcraft/Loudspeaker.png';
import StartlingStrainLife from 'images/skill/songcraft/Startling_Strain_Life.png';
import StartlingStrainWave from 'images/skill/songcraft/Startling_Strain_Wave.png';
import HealingHymnStone from 'images/skill/songcraft/Healing_Hymn_Stone.png';
import HealingHymnWave from 'images/skill/songcraft/Healing_Hymn_Wave.png';
import SonicWaveLife from 'images/skill/songcraft/Sonic_Wave_Life.png';
import SonicWaveMist from 'images/skill/songcraft/Sonic_Wave_Mist.png';
import DoubleTimeFlame from 'images/skill/songcraft/Double-Time_Flame.png';
import DoubleTimeWave from 'images/skill/songcraft/Double-Time_Wave.png';
import CriticalDiscordFlame from 'images/skill/songcraft/Critical_Discord_Flame.png';
import CriticalDiscordQuake from 'images/skill/songcraft/Critical_Discord_Quake.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: CriticalDiscordIcon,
    name: 'Critical Discord',
  },
  {
    icon: StartlingStrainIcon,
    name: 'Startling Strain',
  },
  {
    icon: QuickstepIcon,
    name: '[Perform] Quickstep',
  },
  {
    icon: DissonanceIcon,
    name: 'Dissonance',
  },
  {
    icon: DoubleTimeIcon,
    name: 'Double-Time',
  },
  {
    icon: OdetoRecoveryIcon,
    name: '[Perform] Ode to Recovery',
  },
  {
    icon: HealingHymnIcon,
    name: 'Healing Hymn',
  },
  {
    icon: DeadlyRefrainIcon,
    name: 'Deadly Refrain',
  },
  {
    icon: BulwarkBalladIcon,
    name: '[Perform] Bulwark Ballad',
  },
  {
    icon: SonicWaveIcon,
    name: 'Sonic Wave',
  },
  {
    icon: BloodyChanteyIcon,
    name: '[Perform] Bloody Chantey',
  },
  {
    icon: BattleHymnIcon,
    name: 'Battle Hymn',
  },
]);

export const passives = Object.freeze([
  {
    icon: PiercingMelodyIcon,
    name: 'Piercing Melody',
  },
  {
    icon: HoldtheNoteIcon,
    name: 'Hold the Note',
  },
  {
    icon: ZealIcon,
    name: 'Zeal',
  },
  {
    icon: DisciplinedPerformanceIcon,
    name: 'Disciplined Performance',
  },
  {
    icon: LingeringImpactIcon,
    name: 'Lingering Impact',
  },
  {
    icon: LoudspeakerIcon,
    name: 'Loudspeaker',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Startling Strain'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: StartlingStrainLife,
      },
      {
        element: ELEMENT.WAVE,
        icon: StartlingStrainWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Healing Hymn'),
    variants: [
      {
        element: ELEMENT.STONE,
        icon: HealingHymnStone,
      },
      {
        element: ELEMENT.WAVE,
        icon: HealingHymnWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Sonic Wave'),
    variants: [
      {
        element: ELEMENT.LIFE,
        icon: SonicWaveLife,
      },
      {
        element: ELEMENT.MIST,
        icon: SonicWaveMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Double-Time'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: DoubleTimeFlame,
      },
      {
        element: ELEMENT.WAVE,
        icon: DoubleTimeWave,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Critical Discord'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: CriticalDiscordFlame,
      },
      {
        element: ELEMENT.QUAKE,
        icon: CriticalDiscordQuake,
      },
    ],
  },
]);

export default skills;
