import React from 'react';
import { Typography } from '@material-ui/core';
import ItemLink from 'components/Item/ItemLink';
import Link from 'components/Link';
import MapEmbed from 'components/MapEmbed';
import { ZONE } from 'constants/map';
import ITEM from 'data/items';
import Ability from 'components/Ability';
import SkillLink from 'components/Skill/SkillLink';

export const name = 'Red Dragon\'s Keep';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Nov 6, 2019',
};

export const sections = Object.freeze([
  {
    title: 'Overview',
    paragraphs: [
      'Red Dragon\'s Keep is an instanced raid of 50 players, requiring 6000 equipment points to enter, fighting against the coveted Red Dragon of Karkasse Ridgelands.',
      <Typography>This instance is only available on certain days of the week. To see when it's
        available next, please see the <Link to="/schedule">Event Schedule</Link> page.</Typography>,
      <Typography>For successfully killing the Red Dragon, you'll receive a <ItemLink
        item={ITEM.RED_DRAGON_POUCH} /> that contains a bunch of goodies.</Typography>,
      'The fight has several phases, switching back and forth between the dragon being in flight and grounded.',
    ],
  },
  {
    title: 'Preparation',
    paragraphs: [
      <MapEmbed
        zone={ZONE.RED_DRAGONS_KEEP}
        points={[
          { label: 'Red Dragon', icon: 'boss', coords: [{ x: 41, y: 38.5 }] },
          { label: 'Workbench', icon: 1, coords: [{ x: 51.5, y: 51.5 }] },
        ]}
      />,
      'While the server is looking to fill your instance with 50 players (it won\'t start with less), you are able to craft your Red Dragon Harpoon from the workbench near the spawn point, which is free to craft. Every player should get a harpoon.',
      <Typography variant="subtitle2">A note from Legacy: Due to how instances work, when players are spawning in,
        everyone is friendly with one another. It's not until all 50 players are in the instance that they are put into
        a raid and onto a team that's an enemy of the Red Dragon's "team". As a result, any vehicles you summon before
        the raid is formed will stay on the neutral-friendly team. This means that you can summon a car and it will stay
        friendly with the Red Dragon, unable to be harmed by it. This is very useful for mobility during Phase 1. Have
        players stand on a car, with the owner driving it.</Typography>,
    ],
  },
  {
    title: 'Phase 1',
    paragraphs: [
      'The Red Dragon starts the fight flying in the air, making counter-clockwise laps around the keep. This phase ends when the Red Dragon goes below 90% HP.',
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Flame attack"
        description="The Red Dragon will periodically bombard locations near players, dealing medium magic damage to players caught in the blast and leaving a damage over time fire debuff for a short period."
        counters={[
          'The delay between the red circle appearing and the explosion hitting is long enough that it can be side-stepped easily.',
          'Healers can cleanse the fire debuff or use heal over time effects to counter its damage.',
        ]}
      />,
      <Typography variant="h6">Tactics</Typography>,
      'The only way to damage the Red Dragon is by using the Harpoon that you can craft from the workbench. It doesn\'t deal a lot of damage and has a 5 seconds cooldown. This phase will most likely take the longest amount of time.',
      'Avoid getting hit by the Red Dragon\'s flame attack by side-stepping the red circles when you see them.',
      <Typography variant="subtitle2">If you're using the car trick, you can fire the harpoon while standing on a moving
        car. The driver should be able to keep up with the Red Dragon while driving counter-clockwise around the keep.
        This method can greatly accelerate the speed of getting through this phase, as you will always be in range of
        the Red Dragon to fire your harpoon.</Typography>,
    ],
  },
  {
    title: 'Phase 2',
    paragraphs: [
      'The Red Dragon will land in the center of the at the start of the phase. Phase 2 ends when the Red Dragon goes below 50% HP.',
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Summon Fanatics"
        description="Periodically, the Red Dragon will summon a bunch of fanatics. They will jump at players and deal damage."
        counters={[
          'Switch targets to focus down these adds as soon as they can be attacked.',
        ]}
      />,
      <Ability
        name="Levitate"
        description="The Red Dragon frequently confines nearby players and lifts them into the air. After a short delay, all players are slam into the ground, taking heavy damage."
        counters={[
          <React.Fragment>You can cancel the effect of this ability on yourself to prevent the slam by using <SkillLink
            skillset="Auramancy" name="Shrug It Off" />.</React.Fragment>,
        ]}
      />,
      <Ability
        name="Wing Flap"
        description="The Red Dragon flaps his wings twice, creating massive gusts of wind and knocking back players 30 meters each time."
      />,
      <Ability
        name="Regeneration"
        description="The Red Dragon periodically gains a buff that causes him to regenerate a massive amount of health."
      />,
      <Typography variant="h6">Tactics</Typography>,
      'All players that aren\'t the one player tanking the Red Dragon should be stacking on the backside of the Red Dragon\'s leg, burning as much as possible.',
      'Switch targets to focus the adds when they spawn.',
      'As the dragon gets closer to his phase threshold of health, he will use his regeneration ability, quickly regenerating health. After his regeneration is There will be a semi-short duration where he doesn\'t have his regeneration, and this is when you need to push him below 50% before he uses his regeneration ability again.',
      'The lower you get his health in this window between the first and second regeneration casts, the less he will need to be damaged by harpoons in Phase 3. If you can get him below 40% during this burn, you will skip phase 3 entirely.',
      'If his second regeneration ability is cast before you enter phase 3, then he will continue using regeneration during phase 3.'
    ],
  },
  {
    title: 'Phase 3',
    paragraphs: [
      'The Red Dragon will fly back into the sky, continuing his counter-clockwise flight around the keep. This phase will end when he gets to 39% health.',
      'This phase is identical to phase 1.',
    ],
  },
  {
    title: 'Phase 4',
    paragraphs: [
      'The Red Dragon will land back in the center of the keep. This is the final phase of the fight, and it is the same as the Phase 2.',
    ],
  },
]);

export default { name, meta, sections };
