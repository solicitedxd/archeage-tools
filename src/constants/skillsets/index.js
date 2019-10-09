import ArcherySkills, { passives as ArcheryPassives } from './archery';
import AuramancySkills, { passives as AuramancyPassives } from './auramancy';
import BattlerageSkills, { passives as BattleragePassives } from './battlerage';
import DefenseSkills, { passives as DefensePassives } from './defense';
import MaledictionSkills, { passives as MaledictionPassives } from './malediction';
import OccultismSkills, { passives as OccultismPassives } from './occultism';
import ShadowplaySkills, { passives as ShadowplayPassives } from './shadowplay';
import SongcraftSkills, { passives as SongcraftPassives } from './songcraft';
import SorcerySkills, { passives as SorceryPassives } from './sorcery';
import SwiftbladeSkills, { passives as SwiftbladePassives } from './swiftblade';
import VitalismSkills, { passives as VitalismPassives } from './vitalism';
import WitchcraftSkills, { passives as WitchcraftPassives } from './witchcraft';

export default Object.freeze({
  ARCHERY: {
    name: 'Archery',
    skills: ArcherySkills,
    passives: ArcheryPassives,
  },
  AURAMANCY: {
    name: 'Auramancy',
    skills: AuramancySkills,
    passives: AuramancyPassives,
  },
  BATTLERAGE: {
    name: 'Battlerage',
    skills: BattlerageSkills,
    passives: BattleragePassives,
  },
  DEFENSE: {
    name: 'Defense',
    skills: DefenseSkills,
    passives: DefensePassives,
  },
  MALEDICTION: {
    name: 'Malediction',
    skills: MaledictionSkills,
    passives: MaledictionPassives,
  },
  OCCULTISM: {
    name: 'Occultism',
    skills: OccultismSkills,
    passives: OccultismPassives,
  },
  SHADOWPLAY: {
    name: 'Shadowplay',
    skills: ShadowplaySkills,
    passives: ShadowplayPassives,
  },
  SONGCRAFT: {
    name: 'Songcraft',
    skills: SongcraftSkills,
    passives: SongcraftPassives,
  },
  SORCERY: {
    name: 'Sorcery',
    skills: SorcerySkills,
    passives: SorceryPassives,
  },
  SWIFTBLADE: {
    name: 'Swiftblade',
    skills: SwiftbladeSkills,
    passives: SwiftbladePassives,
  },
  VITALISM: {
    name: 'Vitalism',
    skills: VitalismSkills,
    passives: VitalismPassives,
  },
  WITCHCRAFT: {
    name: 'Witchcraft',
    skills: WitchcraftSkills,
    passives: WitchcraftPassives,
  },
});
