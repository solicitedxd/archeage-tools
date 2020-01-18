import { isMobileBrowser } from 'utils/display';

export default {
  mobile: isMobileBrowser(),
  darkMode: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
};

export const override = {
  mobile: isMobileBrowser(),
};
