import BossIcon from 'images/event_type/boss.png';
import ExplorationIcon from 'images/event_type/exploration.png';
import FlagIcon from 'images/event_type/flag.png';
import InstanceIcon from 'images/event_type/instance.png';
import NavalIcon from 'images/event_type/naval.png';
import PvpIcon from 'images/event_type/pvp.png';
import TorchIcon from 'images/event_type/torch.png';
import VocationIcon from 'images/event_type/vocation.png';

export const SET_REGION = 'SET_REGION';

export const DAY = Object.freeze({
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
});

export const TYPE_ICON = (id) => ({
  1: InstanceIcon,
  2: PvpIcon,
  3: TorchIcon,
  4: BossIcon,
  5: FlagIcon,
  // unused
  6: NavalIcon,
  7: ExplorationIcon,
  8: VocationIcon,
}[id] || OtherIcon);
