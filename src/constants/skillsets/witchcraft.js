import EarthenGripIcon from 'images/skill/witchcraft/Earthen_Grip.png';
import EnervateIcon from 'images/skill/witchcraft/Enervate.png';
import BubbleTrapIcon from 'images/skill/witchcraft/Bubble_Trap.png';
import InsidiousWhisperIcon from 'images/skill/witchcraft/Insidious_Whisper.png';
import MirrorWarpIcon from 'images/skill/witchcraft/Mirror_Warp.png';
import PurgeIcon from 'images/skill/witchcraft/Purge.png';
import LassitudeIcon from 'images/skill/witchcraft/Lassitude.png';
import StillnessIcon from 'images/skill/witchcraft/Stillness.png';
import DahutasBreathIcon from 'images/skill/witchcraft/Dahutas_Breath.png';
import FocalConcussionIcon from 'images/skill/witchcraft/Focal_Concussion.png';
import BansheeWailIcon from 'images/skill/witchcraft/Banshee_Wail.png';
import FiendsKnellIcon from 'images/skill/witchcraft/Fiends_Knell.png';
import FoldingTimeIcon from 'images/skill/witchcraft/Folding_Time.png';
import HomingHexesIcon from 'images/skill/witchcraft/Homing_Hexes.png';
import IllusionsFavorIcon from 'images/skill/witchcraft/Illusions_Favor.png';
import ExploitationIcon from 'images/skill/witchcraft/Exploitation.png';
import AugmentWitchcraftIcon from 'images/skill/witchcraft/Augment_Witchcraft.png';
import EnshroudIcon from 'images/skill/witchcraft/Enshroud.png';
import EarthenGripLightning from 'images/skill/witchcraft/Earthen_Grip_Lightning.png';
import EarthenGripQuake from 'images/skill/witchcraft/Earthen_Grip_Quake.png';
import BubbleTrapGale from 'images/skill/witchcraft/Bubble_Trap_Gale.png';
import BubbleTrapMist from 'images/skill/witchcraft/Bubble_Trap_Mist.png';
import BansheeWailMist from 'images/skill/witchcraft/Banshee_Wail_Mist.png';
import BansheeWailStone from 'images/skill/witchcraft/Banshee_Wail_Stone.png';
import MirrorWarpFlame from 'images/skill/witchcraft/Mirror_Warp_Flame.png';
import MirrorWarpStone from 'images/skill/witchcraft/Mirror_Warp_Stone.png';
import DahutasBreathMist from 'images/skill/witchcraft/Dahutas_Breath_Mist.png';
import DahutasBreathQuake from 'images/skill/witchcraft/Dahutas_Breath_Quake.png';
import { getSkillIdByName } from 'utils/skillsets';
import { ELEMENT } from 'constants/skills';

const skills = Object.freeze([
  {
    icon: EarthenGripIcon,
    name: 'Earthen Grip',
  },
  {
    icon: EnervateIcon,
    name: 'Enervate',
  },
  {
    icon: BubbleTrapIcon,
    name: 'Bubble Trap',
  },
  {
    icon: InsidiousWhisperIcon,
    name: 'Insidious Whisper',
  },
  {
    icon: MirrorWarpIcon,
    name: 'Mirror Warp',
  },
  {
    icon: PurgeIcon,
    name: 'Purge',
  },
  {
    icon: LassitudeIcon,
    name: 'Lassitude',
  },
  {
    icon: StillnessIcon,
    name: 'Stillness',
  },
  {
    icon: DahutasBreathIcon,
    name: 'Dahuta\'s Breath',
  },
  {
    icon: FocalConcussionIcon,
    name: 'Focal Concussion',
  },
  {
    icon: BansheeWailIcon,
    name: 'Banshee Wail',
  },
  {
    icon: FiendsKnellIcon,
    name: 'Fiend\'s Knell',
  },
]);

export const passives = Object.freeze([
  {
    icon: FoldingTimeIcon,
    name: 'Folding Time',
  },
  {
    icon: HomingHexesIcon,
    name: 'Homing Hexes',
  },
  {
    icon: IllusionsFavorIcon,
    name: 'Illusion\'s Favor',
  },
  {
    icon: ExploitationIcon,
    name: 'Exploitation',
  },
  {
    icon: AugmentWitchcraftIcon,
    name: 'Augment Witchcraft',
  },
  {
    icon: EnshroudIcon,
    name: 'Enshroud',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Earthen Grip'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: EarthenGripLightning,
      },
      {
        element: ELEMENT.QUAKE,
        icon: EarthenGripQuake,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Bubble Trap'),
    variants: [
      {
        element: ELEMENT.GALE,
        icon: BubbleTrapGale,
      },
      {
        element: ELEMENT.MIST,
        icon: BubbleTrapMist,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Banshee Wail'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: BansheeWailMist,
      },
      {
        element: ELEMENT.STONE,
        icon: BansheeWailStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Mirror Warp'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: MirrorWarpFlame,
      },
      {
        element: ELEMENT.STONE,
        icon: MirrorWarpStone,
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Dahuta\'s Breath'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: DahutasBreathMist,
      },
      {
        element: ELEMENT.QUAKE,
        icon: DahutasBreathQuake,
      },
    ],
  },
]);

export default skills;
