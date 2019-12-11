import ArcherySkills, {
  ancestrals as ArcheryAncestrals,
  passives as ArcheryPassives,
} from './archery';
import AuramancySkills, {
  ancestrals as AuramancyAncestrals,
  passives as AuramancyPassives,
} from './auramancy';
import BasicSkills from './basic';
import BattlerageSkills, {
  ancestrals as BattlerageAncestrals,
  passives as BattleragePassives,
} from './battlerage';
import DefenseSkills, {
  ancestrals as DefenseAncestrals,
  passives as DefensePassives,
} from './defense';
import MaledictionSkills, {
  ancestrals as MaledictionAncestrals,
  passives as MaledictionPassives,
} from './malediction';
import OccultismSkills, {
  ancestrals as OccultismAncestrals,
  passives as OccultismPassives,
} from './occultism';
import ShadowplaySkills, {
  ancestrals as ShadowplayAncestrals,
  passives as ShadowplayPassives,
} from './shadowplay';
import SongcraftSkills, {
  ancestrals as SongcraftAncestrals,
  passives as SongcraftPassives,
} from './songcraft';
import SorcerySkills, {
  ancestrals as SorceryAncestrals,
  passives as SorceryPassives,
} from './sorcery';
import SwiftbladeSkills, {
  ancestrals as SwiftbladeAncestrals,
  passives as SwiftbladePassives,
} from './swiftblade';
import VitalismSkills, {
  ancestrals as VitalismAncestrals,
  passives as VitalismPassives,
} from './vitalism';
import WitchcraftSkills, {
  ancestrals as WitchcraftAncestrals,
  passives as WitchcraftPassives,
} from './witchcraft';

export default Object.freeze({
  ARCHERY: {
    name: 'Archery',
    skills: ArcherySkills,
    passives: ArcheryPassives,
    ancestrals: ArcheryAncestrals,
  },
  AURAMANCY: {
    name: 'Auramancy',
    skills: AuramancySkills,
    passives: AuramancyPassives,
    ancestrals: AuramancyAncestrals,
  },
  BATTLERAGE: {
    name: 'Battlerage',
    skills: BattlerageSkills,
    passives: BattleragePassives,
    ancestrals: BattlerageAncestrals,
  },
  DEFENSE: {
    name: 'Defense',
    skills: DefenseSkills,
    passives: DefensePassives,
    ancestrals: DefenseAncestrals,
  },
  MALEDICTION: {
    name: 'Malediction',
    skills: MaledictionSkills,
    passives: MaledictionPassives,
    ancestrals: MaledictionAncestrals,
  },
  OCCULTISM: {
    name: 'Occultism',
    skills: OccultismSkills,
    passives: OccultismPassives,
    ancestrals: OccultismAncestrals,
  },
  SHADOWPLAY: {
    name: 'Shadowplay',
    skills: ShadowplaySkills,
    passives: ShadowplayPassives,
    ancestrals: ShadowplayAncestrals,
  },
  SONGCRAFT: {
    name: 'Songcraft',
    skills: SongcraftSkills,
    passives: SongcraftPassives,
    ancestrals: SongcraftAncestrals,
  },
  SORCERY: {
    name: 'Sorcery',
    skills: SorcerySkills,
    passives: SorceryPassives,
    ancestrals: SorceryAncestrals,
  },
  SWIFTBLADE: {
    name: 'Swiftblade',
    skills: SwiftbladeSkills,
    passives: SwiftbladePassives,
    ancestrals: SwiftbladeAncestrals,
  },
  VITALISM: {
    name: 'Vitalism',
    skills: VitalismSkills,
    passives: VitalismPassives,
    ancestrals: VitalismAncestrals,
  },
  WITCHCRAFT: {
    name: 'Witchcraft',
    skills: WitchcraftSkills,
    passives: WitchcraftPassives,
    ancestrals: WitchcraftAncestrals,
  },
  BASIC: {
    name: 'Basic',
    skills: BasicSkills,
    visible: false,
  },
});
