import {
  CLEAR_ALERTS,
  SET_ALERT,
  SET_REGION,
  SET_SPEAK,
  SET_VOLUME,
  SPEECH_PRONUNCIATIONS,
  VOLUME_DEFAULT,
} from 'constants/schedule';
import { pathOr } from 'ramda';
import { maxDecimals } from 'utils/number';

export const triggerLocalStorageUpdate = [
  CLEAR_ALERTS,
  SET_ALERT,
  SET_REGION,
  SET_SPEAK,
  SET_VOLUME,
];

export const setRegion = (value) => (dispatch) => {
  dispatch({ type: SET_REGION, region: value });
};

export const setAlert = (eventId, value) => (dispatch) => () => {
  dispatch({ type: SET_ALERT, eventId, value });
};

export const clearAlerts = () => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
};

export const setVolume = (volume) => (dispatch) => {
  dispatch({ type: SET_VOLUME, volume });
};

export const setSpeak = (eventId, value) => (dispatch, getState) => () => {
  dispatch({ type: SET_SPEAK, eventId, value });
  if (value) {
    const event = getState().gameData.events[eventId];
    dispatch(speak(event.name));
  } else {
    cancelSpeak();
  }
};

export const getStartMessage = (event, time) => (_, getState) => {
  const defaultFormat = pathOr('', ['gameData', 'eventTypes', event.eventType, 'startMessage'])(getState());
  const format = time.startMessage || defaultFormat;
  const vars = [event.name, time.startTime.to(time.endTime, true), time.name || ''];
  return format.replace(/\$([0-9]+)/g, (_, v) => vars[v]);
};

export const getReminderMessage = (event, time) => (_, getState) => {
  const defaultFormat = pathOr('', ['gameData', 'eventTypes', event.eventType, 'reminderMessage'])(getState());
  const format = time.reminderMessage || defaultFormat;
  const vars = [event.name, time.startTime.fromNow(true), time.startTime.to(time.endTime, true), time.name || ''];
  return format.replace(/\$([0-9]+)/g, (_, v) => vars[v]);
};

/**
 * Speech Synthesis setup and actions.
 */
export const CAN_SPEAK = ('speechSynthesis' in window);

let preferredVoice;

const loadVoice = () => {
  preferredVoice = Object.freeze(speechSynthesis.getVoices().find(voice => voice.name === 'Google US English'));
};

if (CAN_SPEAK) {
  if ('onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoice;
  } else {
    loadVoice();
  }
}

export const speak = (text) => (_, getState) => {
  if (!CAN_SPEAK) return;

  const volume = pathOr(VOLUME_DEFAULT, ['calendar', 'volume'])(getState());
  const message = new SpeechSynthesisUtterance();
  Object.entries(SPEECH_PRONUNCIATIONS).forEach(([key, value]) => {
    text = text.replace(key, value);
  });
  message.text = text;
  message.volume = maxDecimals(volume / 150, 2);
  if (preferredVoice) {
    message.voice = preferredVoice;
  }

  window.speechSynthesis.speak(message);
};

export const cancelSpeak = () => {
  if (!CAN_SPEAK) return;

  window.speechSynthesis.cancel();
};
