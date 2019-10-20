import AbyssalAttackIcon from 'images/event/abyssal_attack.png';
import AyanadMerchantIcon from 'images/event/ayanad_merchant.png';
import BossMonsterIcon from 'images/event/boss_monster.png';
import CrimsonRiftIcon from 'images/event/crimson_rift.png';
import DailyResetIcon from 'images/event/daily_reset.png';
import DGSIcon from 'images/event/delphinad_ghost_ships.png';
import DragonBlackIcon from 'images/event/dragon_black.png';
import DragonRedIcon from 'images/event/dragon_red.png';
import FallOfHiramIcon from 'images/event/fall_of_hiram.png';
import FishFestIcon from 'images/event/fish_fest.png';
import GoldenPlainsIcon from 'images/event/goldplain.png';
import GrimghastRiftIcon from 'images/event/grimghast_rift.png';
import LeviathanIcon from 'images/event/leviathan.png';
import LuscaAwakeningIcon from 'images/event/lusca_awakening.png';
import KadumIcon from 'images/event/kadum.png';
import {
  DAY,
  EVENT_TYPE,
} from 'constants/calendar';

export const REAL_TIME_EVENTS = Object.freeze([
  {
    icon: AbyssalAttackIcon,
    name: 'Abyssal Attack',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '22:30:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '17:30:00', duration: '02:00:00' },
      ],
    },
  },
  {
    icon: AyanadMerchantIcon,
    name: 'Ayanad Merchant',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '18:00:00', duration: '06:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: DragonBlackIcon,
    name: 'Black Dragon',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
    },
    times: {
      NA: [
        { time: '02:00:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '21:30:00', duration: '02:00:00' },
      ],
    },
  },
  {
    icon: DailyResetIcon,
    name: 'Daily Reset',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '00:00:00' },
      ],
      EU: [
        { time: '00:00:00' },
      ],
    },
  },
  {
    icon: DGSIcon,
    name: 'Delphinad Ghost Ships',
    type: EVENT_TYPE.WORLD_BOSSES,
    times: {
      NA: [
        { time: '01:15:00', duration: '01:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: FallOfHiramIcon,
    name: 'The Fall of Hiram City (Instance)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '00:00:00', duration: '04:00:00' },
        { time: '14:00:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '09:00:00', duration: '02:00:00' },
        { time: '19:00:00', duration: '04:00:00' },
      ],
    },
  },
  {
    icon: GoldenPlainsIcon,
    name: 'Golden Plains Battle (Instance)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '01:30:00', duration: '01:00:00' },
        { time: '16:00:00', duration: '01:30:00' },
      ],
      EU: [
        { time: '11:00:00', duration: '01:30:00' },
        { time: '20:30:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: AbyssalAttackIcon,
    name: 'Kraken',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [],
    },
    times: {
      NA: [
        { time: '00:00:00', duration: '02:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: LeviathanIcon,
    name: 'Leviathan',
    type: EVENT_TYPE.WORLD_BOSSES,
    days: {
      NA: [DAY.TUESDAY, DAY.THURSDAY, DAY.SATURDAY],
      EU: [],
    },
    times: {
      NA: [
        { time: '02:00:00', duration: '02:00:00' },
      ],
      EU: [],
    },
  },
  {
    icon: LuscaAwakeningIcon,
    name: 'Lusca Awakening',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '23:00:00', duration: '01:00:00' },
      ],
      EU: [
        { time: '18:00:00', duration: '01:00:00' },
      ],
    },
  },
  {
    icon: FishFestIcon,
    name: 'Mirage Isle Fish Fest',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    days: {
      NA: [DAY.SUNDAY],
      EU: [DAY.SUNDAY],
    },
    times: {
      NA: [
        { time: '22:00:00', duration: '02:00:00' },
      ],
      EU: [
        { time: '12:00:00', duration: '02:00:00' },
      ],
    },
  },
  {
    icon: DragonRedIcon,
    name: 'Red Dragon\'s Keep (Instance)',
    type: EVENT_TYPE.REAL_TIME_EVENT,
    times: {
      NA: [
        { time: '01:00:00', duration: '01:00:00' },
        { time: '15:30:00', duration: '01:00:00' },
      ],
      EU: [
        { time: '10:30:00', duration: '01:00:00' },
        { time: '20:00:00', duration: '01:00:00' },
      ],
    },
  },
]);

export const GAME_TIME_EVENTS = Object.freeze([
  {
    icon: CrimsonRiftIcon,
    name: 'Crimson Rift',
    type: EVENT_TYPE.GAME_TIME_EVENT,
    time: '12:00',
    duration: '00:20',
  },
  {
    icon: CrimsonRiftIcon,
    name: 'Crimson Rift (Auroria)',
    type: EVENT_TYPE.GAME_TIME_EVENT,
    time: '18:00',
    duration: '00:20',
  },
  {
    icon: GrimghastRiftIcon,
    name: 'Grimghast Rift',
    type: EVENT_TYPE.GAME_TIME_EVENT,
    time: '00:00',
    duration: '00:45',
  },
  {
    icon: BossMonsterIcon,
    name: 'Jola',
    type: EVENT_TYPE.GAME_TIME_EVENT,
    time: '06:00',
    duration: '06:00',
  },
  {
    icon: BossMonsterIcon,
    name: 'Meina & Glenn',
    type: EVENT_TYPE.GAME_TIME_EVENT,
    time: '06:00',
    duration: '06:00',
  },
]);
