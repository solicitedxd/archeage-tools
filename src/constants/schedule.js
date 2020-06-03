import BattlefieldCount from 'audio/battlefield_count.mp3';
import AudioTest from 'audio/empty.mp3';
import UnpackLaunch from 'audio/interaction_unpack_launch.mp3';
import MailAlarm from 'audio/mail_alarm.mp3';
import QuestAccept2 from 'audio/quest_accept_2.mp3';

export const SET_REGION = 'SET_REGION';
export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERTS = 'CLEAR_ALERTS';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_SPEAK = 'SET_SPEAK';

export const VOLUME_DEFAULT = 70;

export const ALERT_OPTIONS = Object.freeze({
  EVENT_START: {
    name: 'Start of Event',
    multiplier: 0,
  },
  EVENT_PRE_1: {
    name: '${time} minutes before',
    multiplier: 0.5,
  },
  EVENT_PRE_2: {
    name: '${time} minutes before',
    multiplier: 1,
  },
  EVENT_PRE_3: {
    name: '${time} minutes before',
    multiplier: 2,
  },
});

export const ALERT_CUE = Object.freeze({
  TEST: {
    name: 'test',
    priority: 0,
    file: AudioTest,
  },
  REMINDER: {
    name: 'reminder',
    priority: 1,
    file: BattlefieldCount,
  },
  START: {
    name: 'start',
    priority: 2,
    file: QuestAccept2,
  },
  START_OTHER: {
    name: 'start_other',
    priority: 3,
    file: UnpackLaunch,
  },

  OTHER: {
    name: 'other',
    priority: 99,
    file: MailAlarm,
  },
});

export const ALERT_DEFAULT = '00:15:00';

export const EVENT_TYPE_OTHER = 5;

export const DAY = Object.freeze({
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
});

export const DAY_ABBR = Object.freeze({
  SUNDAY: 'S',
  MONDAY: 'M',
  TUESDAY: 'T',
  WEDNESDAY: 'W',
  THURSDAY: 'Th',
  FRIDAY: 'F',
  SATURDAY: 'Sa',
});

export const REGIONS = Object.freeze(['NA', 'EU', 'SEA']);
