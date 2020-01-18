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
      { name: 'Recipes', path: '/recipes' },
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
