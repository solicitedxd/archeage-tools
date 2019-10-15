export const SET_TIME = 'SET_TIME';
export const SET_REGION = 'SET_REGION';
export const MARK_COMPLETE = 'MARK_COMPLETE';
export const RESET_COMPLETE = 'RESET_COMPLETE';

export const EVENT_STATUS = Object.freeze({
  WAITING: 'waiting',
  STANDBY: 'standby',
  IN_PROGRESS: 'in-progress',
  ENDED: 'ended',
});

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
