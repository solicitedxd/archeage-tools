import React from 'react';
import { Typography } from '@material-ui/core';
import MapEmbed from 'components/MapEmbed';
import { ZONE } from 'constants/map';
import SkillLink from 'components/Skill/SkillLink';
import Ability from 'components/Ability';
import Item from 'components/Item';
import ITEM from 'data/items';

const name = 'Serpentis';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 1, 2019',
};

const sections = [
  {
    title: 'Overview',
    paragraphs: [
      <MapEmbed
        zone={ZONE.EXELOCH}
        points={[{ icon: 'port', label: '[Dungeon] Serpentis', coords: [{ x: 46.9, y: 29.1 }] }]}
      />,
      'Serpentis is a 5-man dungeon located in Exeloch of Auroria. It requires level 50, and I\'d recommend an average gear score of at least 4000 for your group.',
      'Your composition will need at least one healer. If your group\'s average gear score is less than 5000, you should definitely have a dedicated tank.',
      <Typography>I recommend that at least one person take <SkillLink skillset="Auramancy" name="Protective Wings" />
        &nbsp;if your group's average gear score is less than 5000.</Typography>,
      'There are a total of 6 rooms to progress through. Three rooms are always the same, and the other three have their own sets of possible rooms.',
      'The boss from room 5 will drop armor and the boss from room 6 will drop weapons.',
      'Note that when a boss is spawned in a room, other players are prevented from entering that room. Should your group fail to defeat a boss, all players must die to fully reset the boss.',
    ],
  },
  {
    title: 'Room 1',
    paragraphs: [
      <Typography variant="subtitle1">Notable Loot</Typography>,
      <Typography variant="caption" color="primary">You will get one of these every run:</Typography>,
      <div className="quest-items">
        <Item {...ITEM.REDTALON_HELM} />
        <Item {...ITEM.REDTALON_ARMOR} />
        <Item {...ITEM.REDTALON_SADDLE} />
        <Item {...ITEM.REDTALON_LEGGUARDS} />
      </div>,
      <Typography variant="h5">Abyssal Trap</Typography>,
      'The Abyssal Trap will always be the first room you get in every run of Serpentis.',
      'In ths room, there will be two Serpentis Keepers, located on the left and right sides of the room. When engaged, they will leash together.',
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Serpentis Keeper's Trampling"
        description="The Keeper tramples its target, dealing heavy physical damage to enemies around its target."
        counters={[
          'The player tanking the keeper should keep it faced away from the party.',
        ]}
      />,
      <Ability
        name="Angry Serpentis Keeper"
        description="The Keeper enrages when it falls to one-third health, briefly knocking down all enemies in the room."
      />,
      <Typography variant="h6">Tactics</Typography>,
      'If there is a designated tank, have that player deal damage to both Keepers before the rest of the party begins attacking in order to stack some aggro.',
      'Have the player who is tanking face the keepers away from the rest of melee of the party, as to not cause Trampling to splash onto them.',
      'The healer should be prepared by having everyone nearly topped off before everyone is tripped at around the one-third health mark for a single Keeper.',
    ],
  },
  {
    title: 'Room 2',
    paragraphs: [
      <Typography variant="h5">Creature's Vault</Typography>,
      'In this room, you will have to defeat five waves of enemies. Each wave will have a larger, more powerful enemy that usually will have a random buff.',
      'Interact with the box in the center of the room to spawn the first wave. After a box has been interacted with, a wave of enemies will spawn and the next box will appear. The final box is located in the north-east corner.',
      'The final wave includes the boss Balius. There really isn\'t anything difficult about it. Engaging with all area of effect will kill most of the adds.',
      <Typography variant="h6">Possible Buffs</Typography>,
      <Ability
        name="Savage"
        description="Casts Savage Passion with each attack. Savage Passion increases all Attacks +10%, stacks up to 10 times, and lasts for 30 seconds."
        counters={['Focus this enemy first.']}
      />,
      <Ability
        name="Mettle"
        description="Increases HP +100%. When your HP falls below 10%, this buff restores full HP every 30 seconds."
        counters={['If you can\'t deal this enemy\'s full health in under 30 seconds, kill it last.']}
      />,
      <Ability
        name="Defense"
        description="Increases Physical Defense +100%. Casts Impenetrable Barrier every 30 seconds to shield you for the next 10 seconds every time you receive Melee Damage."
        counters={['Magic damage dealers need to focus this enemy.']}
      />,
      <Typography variant="h5">Nightmare's Embrace</Typography>,
      'The goal of this room is to protect Lerman while he performs his ritual. During this time there are 8 waves of enemies to fend off, with wave 8 also including an Awakened Keeper (that acts exactly like a Serpentis Keeper from the Abyssal Trap).',
      'The waves will approach you automatically, and there is a chance that a wave will have a Lost Tribe Shade King. When this enemy dies, he will drop a Stun Bomb at his location.',
      <Ability
        name="Stun Bomb"
        description="Interact with the Stun Bomb to briefly stun all enemies."
      />,
      'Use the Stun Bomb when you feel like you\'re overwhelmed.',
      <Typography variant="h5">Mouth of Chaos</Typography>,
      'When you interact with the box to start this room, Conqueror Cellus will instantly spawn and begin attacking.',
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Fire Armor"
        description="Cellus is immune to damage."
      />,
      <Ability
        name="Unknown frost object"
        description="Spawns at the feet of a certain enemy when they die. Can be used to remove Cellus' Fire Armor"
      />,
      <Typography variant="h6">Tactics</Typography>,
      'Stack on Cellus to make healing and cleaving easier.',
      'Use the frost object that spawns after killing the adds Cellus summons to remove his Fire Armor.',
      'Use Protective Wings when damage gets too rough.',
    ],
  },
  {
    title: 'Room 3',
    paragraphs: [
      <Typography variant="subtitle1">Notable Loot</Typography>,
      <div className="quest-items">
        <Item {...ITEM.LABYRINTH_VALUABLES_CHEST} />
      </div>,
      <Typography variant="caption" color="primary">Chance of:</Typography>,
      <div className="quest-items">
        <Item {...ITEM.CARMILAS_MEMORY} />
      </div>,
      <Typography variant="h5">Sanctuary of Darkness</Typography>,
      'The Distorted Duaxini deals magic damage with two primary attacks and has a stacking damage buff as the fight goes on.',
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Distorted Duaxini's Flamebolt"
        description="The Distorted Duaxini's basic attack dealing minor magic damage. Upon hitting its target, it splashes into 3 pools of fire around its target."
      />,
      <Ability
        name="Distorted Duaxini's Blazing Twister"
        description="The Duaxini spins around, flinging fire all around. Each fire projectile leaves a pool of fire on the ground that deals magic damage."
        counters={[
          'Don\'t stand still when you see the Duaxini spin to avoid taking massive damage from this ability.',
          <Typography component="span">Stack and stand in <SkillLink skillset="Auramancy" name="Protective Wings" /> to
            mitigate the damage taken.</Typography>,
        ]}
        deadly
      />,
      <Ability
        name="Distorted Duaxini's Judgement"
        description="The Distorted Duaxini increases the damage it deals, stacking."
      />,
      <Ability
        name="Distorted Duaxini's Ward"
        description="The Duaxini puts up a ward. Unknown effect."
      />,
      <Typography variant="h6">Tactics</Typography>,
      <Typography>This fight is simple. You either want to stay completely still and stack while using&nbsp;
        <SkillLink skillset="Auramancy" name="Protective Wings" /> to mitigate the Blazing Twister, or keep moving and
        spread out.</Typography>,
      'As long as you burn the boss as fast as possible, you won\'t need to worry about getting high Judgement stacks.',
      'I don\'t know what the Ward does. I\'ve only seen it once and didn\'t get a good look at what it does.',
    ],
  },
  {
    title: 'Room 4',
    paragraphs: [
      'Work in progress...',
    ],
  },
  {
    title: 'Room 5',
    paragraphs: [
      'Work in progress...',
    ],
  },
  {
    title: 'Room 6',
    paragraphs: [
      'Work in progress...',
    ],
  },
];

export default { name, meta, sections };
