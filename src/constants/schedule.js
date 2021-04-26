import AuctionBid from 'audio/auction_bidding.mp3';
import BattlefieldCount from 'audio/battlefield_count.mp3';
import AudioTest from 'audio/empty.mp3';
import UnpackLaunch from 'audio/interaction_unpack_launch.mp3';
import MailAlarm from 'audio/mail_alarm.mp3';
import QuestAccept2 from 'audio/quest_accept_2.mp3';
import { ZONE } from 'constants/map';
import { REGIONS } from 'constants/myGame';
import { getDayNum } from 'utils/schedule';

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
  EVENT_PRE_0: {
    name: '1 minute before',
    time: 1,
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
  SHIP_LEAVING: {
    name: 'ship_leaving',
    priority: 4,
    file: AuctionBid,
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

export const MAINTENANCE_TIME = Object.freeze({
  // 5 AM PDT
  [REGIONS.NA]: getDayNum(DAY.THURSDAY) + ':12:00:00',
  // 8 AM UTC
  [REGIONS.EU]: getDayNum(DAY.THURSDAY) + ':08:00:00',
  // 6 AM UTC+8
  [REGIONS.SEA]: getDayNum(DAY.WEDNESDAY) + ':22:00:00',
});

export const SCHEDULE_COLS = Object.freeze({
  1: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  2: [[0, 3, 4, 5, 7, 9], [1, 2, 6, 8]],
  3: [[0, 3, 5, 8], [1, 4, 6, 9], [2, 7]],
});

export const CARGO_ID = 9000;

export const CARGO_SCHEDULE = Object.freeze([
  {
    text: 'docked in Solis Headlands',
    port: ZONE.SOLIS_HEADLANDS,
    portFrom: ZONE.AUSTERA,
    duration: 1200,
    next: 'Depart Solis',
  },
  {
    text: 'sailing to Two Crowns',
    reverse: true,
    sailing: true,
    portTo: ZONE.TWO_CROWNS,
    duration: 621.2,
    next: 'Arrive TC',
  },
  {
    text: 'docked in Two Crowns',
    reverse: true,
    port: ZONE.TWO_CROWNS,
    portFrom: ZONE.TWO_CROWNS,
    duration: 1200,
    next: 'Depart TC',
  },
  {
    text: 'sailing to Solis Headlands',
    sailing: true,
    portTo: ZONE.AUSTERA,
    duration: 647.25,
    next: 'Arrive Solis',
  },
]);

export const CARGO_ALERTS = Object.freeze({
  ARRIVE_SOLIS_3: {
    name: 'Arriving in Solis in 3 min',
    portTo: ZONE.AUSTERA,
    duration: 180,
    speech: 'The cargo ship will arrive at the Solis Headlands port in 3 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  ARRIVED_SOLIS: {
    name: 'Arrived in Solis',
    portTo: ZONE.AUSTERA,
    duration: 0,
    speech: 'The cargo ship has arrived at the Solis Headlands port.',
    cue: ALERT_CUE.SHIP_LEAVING,
  },
  LEAVE_SOLIS_10: {
    name: 'Leaving Solis in 10 min',
    portFrom: ZONE.AUSTERA,
    duration: 600,
    speech: 'The cargo ship will leave the Solis Headlands port in 10 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVE_SOLIS_5: {
    name: 'Leaving Solis in 5 min',
    portFrom: ZONE.AUSTERA,
    duration: 300,
    speech: 'The cargo ship will leave the Solis Headlands port in 5 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVE_SOLIS_2: {
    name: 'Leaving Solis in 2 min',
    portFrom: ZONE.AUSTERA,
    duration: 120,
    speech: 'The cargo ship will leave the Solis Headlands port in 2 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVING_SOLIS: {
    name: 'Leaving Solis Port',
    portFrom: ZONE.AUSTERA,
    duration: 0,
    speech: 'The cargo ship is leaving the Solis Headlands port.',
    cue: ALERT_CUE.SHIP_LEAVING,
  },
  ARRIVE_TC_3: {
    name: 'Arriving in Two Crowns in 3 min',
    portTo: ZONE.TWO_CROWNS,
    duration: 180,
    speech: 'The cargo ship will arrive at the Two Crowns port in 3 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  ARRIVED_TC: {
    name: 'Arrived in Two Crowns',
    portTo: ZONE.TWO_CROWNS,
    duration: 0,
    speech: 'The cargo ship has arrived at the Two Crowns port.',
    cue: ALERT_CUE.SHIP_LEAVING,
  },
  LEAVE_TC_10: {
    name: 'Leaving Two Crowns in 10 min',
    portFrom: ZONE.TWO_CROWNS,
    duration: 600,
    speech: 'The cargo ship will leave the Two Crowns port in 10 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVE_TC_5: {
    name: 'Leaving Two Crowns in 5 min',
    portFrom: ZONE.TWO_CROWNS,
    duration: 300,
    speech: 'The cargo ship will leave the Two Crowns port in 5 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVE_TC_2: {
    name: 'Leaving Two Crowns in 2 min',
    portFrom: ZONE.TWO_CROWNS,
    duration: 120,
    speech: 'The cargo ship will leave the Two Crowns port in 2 minutes.',
    cue: ALERT_CUE.REMINDER,
  },
  LEAVING_TC: {
    name: 'Leaving Two Crowns Port',
    portFrom: ZONE.TWO_CROWNS,
    duration: 0,
    speech: 'The cargo ship is leaving the Two Crowns port.',
    cue: ALERT_CUE.SHIP_LEAVING,
  },
});

export const SPEECH_PRONUNCIATIONS = Object.freeze({
  'Akasch': 'Uh kawsh',
  'Arche': 'ark',
  'Grimghast': 'Grim ghast',
});
