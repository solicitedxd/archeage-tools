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
    text: 'docked at Solis Trade Outlet.',
    port: ZONE.SOLIS_HEADLANDS,
    reverse: true,
    duration: 1200,
  },
  {
    text: 'sailing from Solis to Two Crowns.',
    sailing: true,
    duration: 620,
  },
  {
    text: 'docked at Two Crowns Trade Outlet.',
    port: ZONE.TWO_CROWNS,
    duration: 1200,
  },
  {
    text: 'sailing from Two Crowns to Solis.',
    sailing: true,
    reverse: true,
    duration: 648,
  },
]);
