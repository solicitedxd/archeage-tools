import { ZONE } from 'constants/map';

export const SET_REGION = 'SET_REGION';
export const SET_CARGO_SHIP = 'SET_CARGO_SHIP';

export const DAY = Object.freeze({
  SUNDAY: 'Sunday',
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
});

export const EVENT_TYPE = Object.freeze({
  REAL_TIME_EVENT: 'Real Time Events',
  WORLD_BOSSES: 'World Bosses',
  GAME_TIME_EVENT: 'Game Time Events',
});

export const CARGO_SCHEDULE = Object.freeze([
  {
    text: 'docked in Solis Headlands',
    port: ZONE.SOLIS_HEADLANDS,
    reverse: true,
    duration: 1200,
  },
  {
    text: 'sailing to Two Crowns',
    sailing: true,
    duration: 620,
  },
  {
    text: 'docked in Two Crowns',
    port: ZONE.TWO_CROWNS,
    duration: 1200,
  },
  {
    text: 'sailing to Solis Headlands',
    sailing: true,
    reverse: true,
    duration: 648,
  },
]);
