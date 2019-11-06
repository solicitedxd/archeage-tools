export default [
  { name: 'Daily Checklist', short: 'Dailies', path: '/dailies' },
  { name: 'Skill Builder', short: 'Skills', path: '/skills' },
  { name: 'Trade Pack Calculator', short: 'Trade Packs', path: '/trade-packs', disabled: true },
  { name: 'Event Schedule', short: 'Events', path: '/schedule' },
  { name: 'Taxes Calculator', short: 'Taxes', path: '/taxes', noBanner: true },
  { name: 'Thunderstrucks', path: '/thunderstruck', noBanner: true },
  {
    name: 'Guides', path: '/guides', noBanner: true, children: [
      {
        name: 'Daily Quests', children: [
          { name: 'Gilda Dailies', path: '/guides/gilda-dailies' },
        ],
      },
      {
        name: 'World Bosses', children: [
          { name: 'Hounds and Nightmares', path: '/guides/hounds-and-nightmares' },
        ],
      },
      {
        name: 'Instances', children: [
          { name: 'Noryette Challenge', path: '/guides/noryette-challenge' },
        ],
      },
    ],
  },

  { name: 'Toggle Dark Mode', darkMode: true, noBanner: true },
];
