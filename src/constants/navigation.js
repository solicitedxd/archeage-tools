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
        name: 'Gameplay', children: [
          { name: 'Leveling to 55', path: '/guides/leveling-to-55' },
        ],
      },
      {
        name: 'Daily Quests', children: [
          { name: 'Gilda Dailies', path: '/guides/gilda-dailies' },
          { name: 'Hiram Dailies', path: '/guides/hiram-dailies' },
        ],
      },
      {
        name: 'World Bosses', children: [
          { name: 'Hounds and Nightmares', path: '/guides/hounds-and-nightmares' },
          { name: 'Meina & Glenn', path: '/guides/meina-and-glenn' },
        ],
      },
      {
        name: 'Instances', children: [
          { name: 'Red Dragon\'s Keep', path: '/guides/red-dragons-keep' },
          { name: 'Noryette Challenge', path: '/guides/noryette-challenge' },
        ],
      },
    ],
  },

  { name: 'Toggle Dark Mode', darkMode: true, noBanner: true },
];
