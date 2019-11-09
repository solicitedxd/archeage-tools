import React from 'react';
import MapEmbed from 'components/MapEmbed';
import { ZONE } from 'constants/map';
import Ability from 'components/Ability';
import { Typography } from '@material-ui/core';
import SkillLink from 'components/Skill/SkillLink';

const name = 'Meina and Glenn';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Nov 6, 2019',
};

const sections = [
  {
    title: 'Meina and Glenn',
    paragraphs: [
      <MapEmbed
        zone={ZONE.SUNGOLD_FIELDS}
        points={[{ label: 'Meina and Glenn', icon: 'boss', coords: [{ x: 38.8, y: 72.1 }] }]}
      />,
      'Meina and Glenn are a pair of world bosses that spawn in Sungold Fields at 06:00 in-game time and stick around until 12:00 (two hours real-time).',
      'They share a couple of mechanics and are extremely difficult to fight if they are engaged together. Glenn also poses more of a challenge to fight than Meina.',
      'To engage one at a time, have an archer use a long range, single target shot at Meina or use a mount with a long range arrow attack, then run back towards the mountains to fight.',
      'Regardless of if Glenn was engaged, while Glenn is alive, he will use occasionally use Fervent Healing on himself or Meina. This will not cause him to engage you if you\'re fighting Meina.',
    ],
  },
  {
    title: 'Meina',
    paragraphs: [
      <Typography variant="subtitle2">I don't have much information on this boss. She's not the most difficult when
        fighting her alone.</Typography>,
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Sunder Earth"
        description="Meina ruptures the earth, dealing medium damage to players in the area."
      />,
      <Ability
        name="Tiger Strike"
        description="Meina dashes through several players, dealing medium damage."
      />,
      <Typography variant="h6">Tactics</Typography>,
      'The easiest way to kill Meina is with a large group of players and to just burn her as fast as you can.',
      <Typography>Use <SkillLink skillset="Battlerage" name="Tiger Strike" /> on a rotation to maintain the Overpowered
        debuff, slowing her health regeneration.</Typography>,
      <Typography>Healers must avoid using <SkillLink skillset="Vitalism" name="Resurgence" />! While Glenn is alive
        (regardless of if he was engaged alongside Meina), he will steal this buff and apply a beefed up version of it
        to Meina or himself, causing immense healing.</Typography>,
    ],
  },
  {
    title: 'Glenn',
    paragraphs: [
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Skewer"
        description="Glenn frequently casts Skewer, marking the location of players and pets with blue circles. After a brief delay, all enemies in the impact zones are impaled for 2 seconds and suffer high magic damage for each Skewer they are affected by."
        counters={[
          'Do whatever it takes to get out of the Skewer effect circles. Movement abilities and gliders help.',
          'Avoid summoning pets and mounts during this fight to lessen the number of Skewers that are thrown out.',
          'If you are going to get hit by a Skewer, try to only get hit by one. You will take damage multiple times in overlapping Skewer areas.',
        ]}
        deadly
      />,
      <Ability
        name="Conversion Shield"
        description="Glenn periodically gains a magic shield that heals him for 200% of all magic damage received for 20 seconds."
        counters={[
          'Players who deal magic damage should refrain from dealing damage during this window.',
        ]}
      />,
      <Ability
        name="Resurgence"
        description="Glenn steals an active Resurgence buff from a player and applies his own version to either Meina or himself. This heals for immense amounts."
        counters={[
          <React.Fragment>Healers should not use <SkillLink skillset="Vitalism" name="Resurgence" /> at
            all.</React.Fragment>,
        ]}
      />,
      <Ability
        name="Fervent Healing"
        description="Glenn occasionally heals Meina or himself for a large amount of health."
      />,
      <Typography variant="h6">Tactics</Typography>,
      <Typography>Skewer can easily wipe a raid if players don't get out of the impact zones fast enough. You can be hit
        by multiple Skewers if you stand in an overlapping zone, effectively killing you. De-summon your battle pets and
        mounts before engaging Glenn. Use any kind of movement ability (such as&nbsp;
        <SkillLink skillset="Auramancy" name="Teleportation" />,&nbsp;
        <SkillLink skillset="Shadowplay" name="Drop Back" />,&nbsp;
        <SkillLink skillset="Battlerage" name="Behind Enemy Lines" />) or your glider to get out of Skewer impact zones
        as fast as possible.</Typography>,
      <Typography>Use <SkillLink skillset="Battlerage" name="Tiger Strike" /> on a rotation to maintain the Overpowered
        debuff, slowing his health regeneration.</Typography>,
      <Typography>Healers must avoid using <SkillLink skillset="Vitalism" name="Resurgence" />!</Typography>,
      'Magic DPS must refrain from using spells during Conversion Shield, as all magic damage will heal Glenn.',
    ],
  },
];

export default { name, meta, sections };
