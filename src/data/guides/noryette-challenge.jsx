import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import SkillLink from 'components/Skill/SkillLink';
import Item from 'components/Item';
import ITEM from 'data/items';
import { ELEMENT } from 'constants/skills';

const name = 'Noryette Challenge';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Nov 4, 2019',
};

const rewards = [
  { // 1
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 1 },
    ],
    random: [],
  },
  { // 2
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 2 },
    ],
    random: [],
  },
  { // 3
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 3 },
    ],
    random: [
      { item: ITEM.NORYETTE_EARRING },
      { item: ITEM.NORYETTE_RING },
    ],
  },
  { // 4
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 5 },
    ],
    random: [
      { item: ITEM.NORYETTE_EARRING },
      { item: ITEM.NORYETTE_RING },
    ],
  },
  { // 5
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 7 },
      { item: ITEM.MISTSONG_GRINDING_GUARDIAN_SCROLL },
    ],
    random: [
      { item: ITEM.NORYETTE_EARRING },
      { item: ITEM.NORYETTE_RING },
      { item: ITEM.NORYETTE_AWAKENING_SCROLL },
    ],
  },
  { // 6
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 12 },
      { item: ITEM.MISTSONG_GRINDING_GUARDIAN_SCROLL },
    ],
    random: [
      { item: ITEM.NORYETTE_EARRING },
      { item: ITEM.NORYETTE_RING },
      { item: ITEM.NORYETTE_AWAKENING_SCROLL },
    ],
  },
  { // 7
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 17 },
      { item: ITEM.MISTSONG_GRINDING_GUARDIAN_SCROLL },
      { item: ITEM.NORYETTE_EARRING, oneOf: true },
      { item: ITEM.NORYETTE_RING, oneOf: true },
    ],
    random: [
      { item: ITEM.NORYETTE_AWAKENING_SCROLL },
      { item: ITEM.LUMINOUS_NORYETTE_AWAKENING_SCROLL },
    ],
  },
  { // 8
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 26 },
      { item: ITEM.MISTSONG_GRINDING_GUARDIAN_SCROLL },
      { item: ITEM.NORYETTE_EARRING, oneOf: true },
      { item: ITEM.NORYETTE_RING, oneOf: true },
    ],
    random: [
      { item: ITEM.NORYETTE_AWAKENING_SCROLL },
      { item: ITEM.LUMINOUS_NORYETTE_AWAKENING_SCROLL },
    ],
  },
  { // 9
    guaranteed: [
      { item: ITEM.MYSTERIOUS_ABYSSAL_ENHANCER, count: 34 },
      { item: ITEM.MISTSONG_GRINDING_GUARDIAN_SCROLL },
      { item: ITEM.NORYETTE_EARRING, oneOf: true },
      { item: ITEM.NORYETTE_RING, oneOf: true },
      { item: ITEM.NORYETTE_AWAKENING_SCROLL },
    ],
    random: [
      { item: ITEM.LUMINOUS_NORYETTE_AWAKENING_SCROLL },
    ],
  },
];

const Ability = ({ name, description, counters, deadly }) => (
  <ExpansionPanel elevation={2}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMore />}
      aria-controls={`${name}-content`}
      id={`${name}-content`}
    >
      <Typography>
        {deadly === true &&
        <Tooltip title={'Caution! Deadly Ability'}>
          <span className="deadly-icon" />
        </Tooltip>
        }
        {name}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        {description}
      </Typography>
      {counters !== undefined && counters.length > 0 &&
      <React.Fragment>
        <Typography variant="subtitle2" color="primary" component="div" className="tips">Tips:</Typography>
        <ul className="dashed">
          {counters.map((tip, i) => <li key={`${name}-${i}`}><Typography component="span">{tip}</Typography></li>)}
        </ul>
      </React.Fragment>}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const sections = [
  {
    title: 'Noryette Challenge',
    paragraphs: [
      'Noryette Challenge is a 5-player instance that can be queued up cross-server using the Instance menu. In the ' +
      'challenge, you\'ll face off against up to 40 waves of enemies that increase in strength. Defeating bosses at ' +
      'every 5th wave will increase the rewards that you get.',
      'Each boss has different mechanics, and the waves leading up to boss waves will showcase the mechanics to come. However, the trash waves can mostly be grouped up with a Vicious Implosion and then killed promptly with a meteor strike.',
      'This guide will highlight the mechanics of each of the bosses and includes some strategy to defeating them.',
      'I\'m not 100% certain on this detail, but it looks like you aren\'t presented with trash waves in between bosses that you\'ve successfully defeated after wave 1.',
      'As a final note, this guide will continuously be updated as I am also new to this instance. I will be updating it accordingly as I progress through it.',
    ],
  },
  {
    title: 'Team Composition',
    paragraphs: [
      'Your team should consist of at least one healer, at least one mage, and at least one melee with Auramancy. My team has found at least two melees useful, one with occultism and the other with auramancy.',
      'Below is a list of impactful skills by role:',
      <Typography variant="h6">Mage</Typography>,
      <Typography>Channel <SkillLink skillset="Sorcery" name="Meteor Strike" element={ELEMENT.WAVE} /> on the center
        enemy of a wave before the pull for maximum opening damage.&nbsp;
        <SkillLink skillset="Shadowplay" name="Stealth" /> or&nbsp;
        <SkillLink skillset="Malediction" name="Shadow Cloak" /> can be used to drop aggro after your meteor
        strike.</Typography>,
      <Typography variant="h6">Melee</Typography>,
      <Typography>Use <SkillLink skillset="Auramancy" name="Vicious Implosion" /> to start the fight, pulling all
        enemies into the center area for the mage's meteor strike.</Typography>,
      <Typography><SkillLink skillset="Occultism" name="Hell Spear" /> combos well after a Vicious Implosion to keep
        the
        enemies in a meteor strike.</Typography>,
      <Typography variant="h6">Healer</Typography>,
      <Typography><SkillLink skillset="Vitalism" name="Skewer" element={ELEMENT.LIFE} /> is helpful to make up for
        missed cc-rotations.</Typography>,
    ],
  },
  {
    title: 'Rewards',
    paragraphs: [
      <div className="table-wrapper">
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Wave</TableCell>
              <TableCell>Reward Level</TableCell>
              <TableCell>Guaranteed Reward</TableCell>
              <TableCell>Possible Reward</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewards.map((rewards, tier) => (
              <React.Fragment key={`reward-${tier}`}>
                <TableRow>
                  <TableCell rowSpan={tier !== 8 ? 1 : 5}>{tier * 5 + (tier === 0 ? 1 : 0)}</TableCell>
                  <TableCell rowSpan={tier === 0 ? 4 : 5}>Rank {tier + 1} Crate</TableCell>
                  <TableCell rowSpan={tier === 0 ? 4 : 5} className="reward-cell">
                    {rewards.guaranteed.filter(r => !r.oneOf).map((reward, i) => (
                      <Item {...reward.item} count={reward.count || 1} key={`guaranteed-${tier}-${i}`} />
                    ))}
                    {rewards.guaranteed.some(r => r.oneOf) &&
                    <div className="one-of">
                      {rewards.guaranteed.filter(r => r.oneOf).map((reward, i) => (
                        <Item {...reward.item} count={reward.count || 1} key={`guaranteed-one-${tier}-${i}`} />
                      ))}
                    </div>}
                  </TableCell>
                  <TableCell rowSpan={tier === 0 ? 4 : 5} className="reward-cell">
                    {rewards.random.map((reward, i) => (
                      <Item {...reward.item} count={reward.count || 1} key={`random-${tier}-${i}`} />
                    ))}
                  </TableCell>
                </TableRow>
                {tier < 8 && <TableRow><TableCell>{tier * 5 + (tier === 0 ? 2 : 1)}</TableCell></TableRow>}
                {tier < 8 && <TableRow><TableCell>{tier * 5 + (tier === 0 ? 3 : 2)}</TableCell></TableRow>}
                {tier < 8 && <TableRow><TableCell>{tier * 5 + (tier === 0 ? 4 : 3)}</TableCell></TableRow>}
                {tier > 0 && tier < 8 && <TableRow><TableCell>{tier * 5 + 4}</TableCell></TableRow>}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>,
    ],
  },
  {
    title: 'Wave 5: Marian Noryette',
    paragraphs: [
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Tiger Strike"
        description="Marian dashes through all enemies, dealing minimal damage."
      />,
      <Typography variant="h6">Strategy</Typography>,
      'Group the adds into the boss with a Vicious Implosion during the cast of a Wave Meteor Strike. This boss should be easy enough that it can just be burned down after the adds are dead.',
    ],
  },
  {
    title: 'Wave 10: Ynga Mk.II',
    paragraphs: [
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Unknown barrage name"
        description="Ynga Mk.II's target is periodically assaulted with a barrage of missile that each deal medium damage."
        counters={[
          'If you\'re not equipped to handle large incoming damage, drop your aggro to prevent being the target of this attack.',
          <React.Fragment>Use defensive abilities, like <SkillLink skillset="Auramancy" name="Thwart" />, to help
            mitigate the incoming damage.</React.Fragment>,
          'Healer: Keep the player who is tanking topped off to prevent this attack from finishing them off.',
        ]}
        deadly
      />,
      <Ability
        name="Time Bomb"
        description="Ynga Mk.II places a time bomb at his current location. After a short period of time, it will detonate and deal heavy damage to all players within a range of the bomb."
        counters={[
          'The bomb can be deactivated early by walking up and interacting with it. This should be done immediately for it to not detonate while attempting to deactivate it.',
        ]}
      />,
      <Typography variant="h6">Strategy</Typography>,
      'After the initial burn, melee should attempt to defuse the bombs as soon as they come up. Be careful as it seems like they still do some damage when defused.',
      'The healer should keep the player who is tanking topped off to prevent a death from his barrage attack.',
    ],
  },
  {
    title: 'Wave 15: Mahra Nahvi',
    paragraphs: [
      <Typography variant="h6">Abilities</Typography>,
      <Ability
        name="Large Arrow Snipe"
        description="Mahra targets an enemy and channels Large Arrow Snipe on the target, dealing lethal damage after 2 seconds."
        counters={[
          'Alternate the use of abilities that interrupt such as Stuns, Impales, and Shackles, to cancel the channel and avoid applying a crowd control school immunity.',
          <React.Fragment><SkillLink skillset="DEFENSE" name="Invincibility" /> can be used to mitigate the damage
            instead.</React.Fragment>,
        ]}
        deadly
      />,
      <Ability
        name="Shrapnel Rapid Blows"
        description="Mahra shoots a volley of four waves of arrows in a cone in front of her, each wave dealing heavy damage."
        counters={[
          'If you\'re not the target of Rapid Blows, move out of the cone as fast as possible. If you are the target, you\'ll need heals to help sustain you.',
        ]}
      />,
      <Ability
        name="Unknown projectile name"
        description="Mahra shoots a ball of blue energy at a target that follows until it hits
        them. Upon colliding with the target, a pool of mist lingers on the ground that deals damage to players that
        stand in it."
        counters={[
          'When you have the orb following you, try to move towards the outer edge of the arena to prevent dropping it on the party. Once the mist is on the ground, move out of it as fast as you can.',
        ]}
      />,
      <Ability
        name="Infinite Passion"
        description="Mahra receives stacks of Infinite Passion based on the damage she takes. At
        one million stacks, Mahra consumes all stacks to heal herself."
        counters={[
          <React.Fragment>Use <SkillLink skillset="Shadowplay" name="Leech" /> to steal high stacks of
            Infinite Passion.</React.Fragment>,
        ]}
      />,
      <Ability
        name="Unknown evasive ability name"
        description="Mahra leaps backwards and into the shadows, entering stealth until she is revealed by a player."
      />,
      <Typography variant="h6">Strategy</Typography>,
      'Mehra occasionally sends a blue orb at a player that seeks them out and turns into a lingering mist that deals a lot of damage. This player should try to drop the orb off towards the outside of the arena and then quickly get out of the cloud.',
      <Typography>When Mehra jumps into stealth, she needs to be revealed by being attacked. Non-targeted, ranged AoE
        spells like <SkillLink skillset="Sorcery" name="Gods' Whip" /> are good to quickly bring her out of
        stealth.</Typography>,
      <Typography>
        Mehra needs to be interrupted immediately when she starts channeling her Snipe ability on a player. Crowd
        control effects should be rotated as to not apply any specific cc-school immunity. For example: use a <SkillLink
        skillset="Battlerage" name="Hammer Toss" />, then a&nbsp;
        <SkillLink skillset="Vitalism" name="Skewer" element={ELEMENT.LIFE} />, then another Stun,
        then another Impale.
      </Typography>,
    ],
  },
];

export default { name, meta, sections };
