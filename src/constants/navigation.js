export default [
  {
    name: 'Calculators',
    children: [
      { name: 'Skill Builder', path: '/skills' },
      { name: 'Trade Pack Calculator', path: '/trade-packs' },
      { name: 'Land Tax Calculator', path: '/taxes' },
    ],
  },
  {
    name: 'Timers',
    children: [
      { name: 'Event Schedule', path: '/schedule' },
      { name: 'Crop Timers', path: '/crops' },
    ],
  },
  {
    name: 'Lists',
    children: [
      { name: 'Daily Checklist', path: '/dailies' },
      { name: 'Crafting Folio', path: '/folio' },
    ],
  },
  {
    name: 'Guides',
    path: '/guides',
    children: [
      { name: 'Gameplay', path: '/guides/gameplay' },
      { name: 'Daily Quests', path: '/guides/dailies' },
      { name: 'Classes', path: '/guides/classes' },
      { name: 'Mounts', path: '/mounts' },
      { name: 'Dungeons', path: '/guides/dungeons' },
      { name: 'World Bosses', path: '/guides/world-bosses' },
      { name: 'Instances', path: '/guides/instances' },
    ],
  },
];

export const banners = [
  { name: 'Event Schedule', info: 'Timers and schedule for daily events.', path: '/schedule' },
  // { name: 'Crafting Folio', info: 'View the crafting folio and plan out recipes.', path: '/folio' },
  { name: 'Trade Pack Calculator', info: 'Calculate that sweet pack run money.', path: '/trade-packs' },
  { name: 'Daily Checklist', info: 'Keep track of your daily quests.', path: '/dailies' },
  { name: 'Skill Builder', info: 'Build and share skillset setups.', path: '/skills' },
  { name: 'Mount Gallery', info: 'See available mounts and details on how to get them.', path: '/mounts' },
  // { name: 'Crop Timers', info: 'Keep time of your planted crops, trees, and livestock.', path: '/crops' },
  { name: 'Tax Calculator', info: 'Calculate the cost of property tax.', path: '/taxes' },
];
