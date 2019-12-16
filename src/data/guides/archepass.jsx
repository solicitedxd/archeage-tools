import { Typography } from '@material-ui/core';
import Ability from 'components/Ability';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import Lightbox from 'components/Lightbox';
import { CURRENCY } from 'constants/items';
import ITEM from 'data/items';
import ArchePass from 'images/guides/ArchePass.png';
import ArchePassChange from 'images/guides/ArchePass_Change.png';
import React from 'react';

const name = 'ArchePass';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 12, 2019',
};

const sections = [
  {
    title: 'The ArchePass',
    paragraphs: [
      <Lightbox
        title="ArchePass Window"
        image={ArchePass}
        float="right"
      />,
      <Typography>The ArchePass is a weekly mission system unique to ArcheAge Unchained with the main rewards consisting
        of <ItemLink item={ITEM.DILIGENCE_COIN} plural="s" /> and&nbsp;
        <ItemLink item={ITEM.LABOR_RECHARGE} plural="s" />.</Typography>,
      'There are four passes: a Basic pass (which has ludicrous point requirements for the rewards), and "quarterly" rotating Combat, Equipment, and Vocation passes.',
      'Those rotating passes will change every so often, but it\'s uncertain how long is in between these rotations at this time.',
      <Lightbox
        title="Change ArchePass Window"
        image={ArchePassChange}
        float="right"
      />,
      'Each pass has its own progress and you can only have one pass active at a time. Swapping to another pass will force you to unlock its missions again and will resume its progress.',
      'There are three different types of missions available, each when completed will grant you progress towards your active pass.',
      'When your pass increases in tier, rewards become available. There is also a premium category that must be unlocked for 1500 Credits on a per-pass basis for the quarterly passes.',
    ],
  },
  {
    title: 'Passes',
    paragraphs: [
      <Typography variant="h6">Basic Pass</Typography>,
      <Typography>
        This pass costs <Currency type={CURRENCY.COIN} count={1} inline /> to unlock, and can be upgraded to
        premium for only <Currency type={CURRENCY.COIN} count={100000} inline />.
      </Typography>,
      'Each tier requires a whopping 3000 ArchePass points to progress and has 98 tiers to progress through. When compared to the quarterly passes, this pass will take you a lot more time per tier and has twice the number of tiers.',
      'The free track has sparing rewards of Honor Potions, Vocation Potions, and Hiram Infusions.',
      'The premium track rewards 3 Gilda Stars at every tier.',
      <Typography color="primary">Completion Breakdown</Typography>,
      'You can acquire 6 tiers per week. It requires 196 ArchePass missions to complete the entire pass, which would take you 12 full weeks of missions and then 4 missions on the 13th week.',
      <Typography variant="h6">Quarterly Passes</Typography>,
      <Typography>
        These passes costs <Currency type={CURRENCY.COIN} count={50000} inline /> each to unlock, and can be
        upgraded to premium for <Currency type={CURRENCY.CREDIT} count={1500} inline />.
      </Typography>,
      'Each tier requires 1268 ArchePass points to progress and each have 44 tiers to progress through.',
      'All free tracks have Diligence Coins every 5th tier and Bound Labor Rechargers spread throughout.',
      '- The Combat free track also has Kyrios Badges and potions that increase Honor gain. The final reward is an exclusive glider.',
      '- The Equipment free track also has Honor Potions, potions that increase loot drop rate, a couple of tempers, and Hiram infusions. The final reward is an exclusive battle pet.',
      '- The Vocation free track also has Vocation Potions, potions that increase Vocation Badge gain, and a couple Expansion Scrolls. The final reward is an exclusive costume.',
      'The premium tracks awards something cosmetic every 5 tiers with an exclusive title for the final reward.',
      <Typography color="primary">Completion Breakdown</Typography>,
      'You can acquire 14 tiers per week. It requires 38 ArchePass missions to complete an entire pass, which would take you 3 full weeks of missions and then 1 mission on the 4th week.',
    ],
  },
  {
    title: 'Missions',
    paragraphs: [
      <Typography>
        Every mission rewards 1500 ArchePass points and <ItemLink item={ITEM.DILIGENCE_COIN} count={2} />.
      </Typography>,
      'You can complete 12 missions per week, which is shared across all passes.',
      'You are allotted 6 mission change attempts per day, also shared across all passes.',
      <Typography variant="h6">With the Watch</Typography>,
      <Typography variant="subtitle2">Requires <ItemLink item={ITEM.GILDA_STAR} count={5} /> to unlock.</Typography>,
      <Ability
        name="Kill 100 Hostile Players"
        description="Hostile faction kills only count towards this mission, if the level gap is below 4 levels."
        counters={[
          'It appears that kills in War will always count, but outside of war the player cannot be lower than 4 levels from you.',
          'This is doable, but I try to avoid this mission.',
        ]}
      />,
      <Ability
        name="Kill 200 Hostile Players"
        description="Hostile faction kills only count towards this mission, if the level gap is below 4 levels."
        counters={[
          'It appears that kills in War will always count, but outside of war the player cannot be lower than 4 levels from you.',
          'This can take a long time. Rerolling is advised.',
        ]}
      />,
      <Ability
        name="Kill 300 Monsters"
        description="Kill monster that are level 30+"
        counters={[
          'It says 30+, and it might be. However, it seems like insignificant monsters do not count (such as ones that have heavily reduced health for their level).',
          'Can easily be completed during a Hiram daily raid.',
        ]}
      />,
      <Ability
        name="Kill 500 Monsters"
        description="Kill monster that are level 30+"
        counters={[
          'It says 30+, and it might be. However, it seems like insignificant monsters do not count (such as ones that have heavily reduced health for their level).',
          'Can easily be completed during a Hiram daily raid.',
        ]}
      />,
      <Ability
        name="Obtain 2,000 Honor Points"
        counters={[
          'This can easily be completed by using Honor Points obtained from events such as Golden Plains Battle, the Fall of Hiram City, or Red Dragon\'s Keep.',
        ]}
      />,
      <Ability
        name="Obtain 4,000 Honor Points"
        counters={[
          'This can easily be completed by using Honor Points obtained from events such as Golden Plains Battle, the Fall of Hiram City, or Red Dragon\'s Keep.',
        ]}
      />,
      <Ability
        name="Kill 10 Higher Grade Monsters"
        description="Kill 'Legendary or Mythic Monsters'"
        counters={[
          'This is referring to world bosses.',
          'Warning - It appears that this mission may not always count every boss.',
          'Rerolling is advised.',
        ]}
      />,
      <Ability
        name="Kill 20 Higher Grade Monsters"
        counters={[
          'This is referring to world bosses.',
          'Warning - It appears that this mission may not always count every boss.',
          'Rerolling is advised.',
        ]}
      />,
      <Typography variant="h6">Til It Like It Is</Typography>,
      <Typography variant="subtitle2">Requires <ItemLink item={ITEM.BLUE_SALT_HAMMER} count={2} /> to
        unlock.</Typography>,
      <Ability
        name="Obtain 2,000 Vocation Badges"
        counters={[
          'All vocation gains count towards this mission. Easily completed by doing family quests.',
        ]}
      />,
      <Ability
        name="Obtain 4,000 Vocation Badges"
        counters={[
          'All vocation gains count towards this mission. Easily completed by doing family quests.',
        ]}
      />,
      <Ability
        name="Workin' Overtime"
        description="Use 2000 Labor"
      />,
      <Ability
        name="Nose to the Grindstone"
        description="Use 4000 Labor"
      />,
      <Ability
        name="Blue Salt Bond Quest x1"
        description="Complete 1 Supply Demand quest at a Community Center."
        counters={[
          'Warning - Supply Demand: Lumber is bugged and doesn\'t count towards this mission.',
        ]}
      />,
      <Ability
        name="Blue Salt Bond Quest x2"
        description="Complete 2 Supply Demand quests at Community Centers."
        counters={[
          'Warning - Supply Demand: Lumber is bugged and doesn\'t count towards this mission.',
        ]}
      />,
      <Typography variant="h6">ArcheMaster Challenges</Typography>,
      <Typography variant="subtitle2">Requires <ItemLink item={ITEM.GILDA_STAR} count={10} /> to unlock.</Typography>,
      <Ability
        name="100k XP"
        description="Only available for non-ancestral level players."
      />,
      <Ability
        name="1 mil XP"
        description="Only available for ancestral level players."
      />,
      <Ability
        name="Temper a Piece of Gear x3"
        counters={[
          'You must use 3 of the same temper type to complete this mission.',
        ]}
      />,
      <Ability
        name="Equipment Synthesis x5"
        counters={[
          'This counts each time a synthesis is completed.',
          'Easiest way to complete is to synthesize with one item five times.',
        ]}
      />,
      <Ability
        name="Socket a Lunagem"
        counters={[
          'As with lunagems, this can be expensive or not possible for some players',
          'Rerolling is advised.',
        ]}
      />,
    ],
  },
  {
    title: 'Known Issues',
    paragraphs: [
      'There are a few issues that are currently known about the ArchePass. You should try to avoid these situations if you can:',
      <Typography component="div">
        <ul>
          <li>
            When purchasing a pass, it won't be swapped to automatically. You need to go back to the Change menu and
            register it for it to switch.
          </li>
          <li>
            Completing a mission while in an instance from the Instance menu (e.g. Golden Plains Battle, Red Dragon's
            Keep, Abyssal Library), you will get the 2 Diligence coins but you&nbsp;
            <span className="alert-red">will not get progress towards your ArchePass.</span>
            <ul>
              <li>Don't do Abyssal Library with the XP mission active.</li>
              <li>Don't do Red Dragon's Keep with the Kill Monsters mission active.</li>
              <li>Don't do arenas or Golden Plains Battle with Kill Hostile Players active.</li>
            </ul>
          </li>
          <li>
            Blue Salt Bond Quest x1 and x2 <span className="alert-red">do not count Supply Demand: Lumber</span>.
          </li>
          <li>
            The XP mission loses progress when logging off your character or switching to an instance from the Instance
            menu. It's possible for it to even show as completed, but able to give the reward, or be reduced to a
            negative value.
          </li>
          <li>
            Switching your active pass will lock its missions again, forcing you to pay again to unlock each mission.
          </li>
        </ul>
      </Typography>,
    ],
  },
];

export default { name, meta, sections };
