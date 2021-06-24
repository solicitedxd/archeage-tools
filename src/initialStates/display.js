import { isMobileBrowser } from 'utils/display';

export default {
  mobile: isMobileBrowser(),
  darkMode: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  dialog: null,
  dialogFunc: null,
  hideAds: false,
};

export const override = {
  mobile: isMobileBrowser(),
  dialog: null,
  dialogFunc: null,
};
