import React from 'react';
import { Typography } from '@material-ui/core';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import Lightbox from 'components/Lightbox';
import Link from 'components/Link';
import SkillIcon from 'components/Skill/SkillIcon';
import SkillLink from 'components/Skill/SkillLink';
import ITEM from 'data/items';
import GallantGreenElk from 'images/guides/mounts/Gallant_Green_Elk.png';
import GallantSnowmaneSnowlion from 'images/guides/mounts/Gallant_Snowmane_Snowlion.png';
import GallantCoalmaneSnowlion from 'images/guides/mounts/Gallant_Coalmane_Snowlion.png';
import ThunderDash from 'images/guides/mounts/Thunder_Dash.png';
import { REWARD } from 'constants/dailies';
import MapEmbed from 'components/MapEmbed';
import { ZONE } from 'constants/map';

const name = 'Upgraded Mounts';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 10, 2019',
};

const sections = [
  {
    title: 'Gallant Animas',
    paragraphs: [
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Typography>
        The original <Link to="/guides/starter-mounts">Starter Mounts</Link> (Horse, Elk, Snowlion, and Leomorph) can be
        upgraded into better versions of themselves with a faster base movement speed and an updated set of skills using
        Gallant Animas that can be crafted using dungeon drops and other materials.
      </Typography>,
      <Typography variant="h6">Materials</Typography>,
      'The recipes are nearly identical, but there is one material that changes based on the color of the mount.',
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.SUNSET_PORTALSTONE} count={28} noLink /></li>
          <li><ItemLink item={ITEM.ABYSSAL_SHARD} count={144} noLink /></li>
          <li><ItemLink item={ITEM.PRIME_LUNARITE} count={6} plural="" noLink /></li>
          <li><ItemLink item={ITEM.ETERNAL_WINTER_CHILL} count={5} noLink /></li>
          <li><ItemLink item={ITEM.HEAT_OF_ETERNAL_SUMMER} count={12} name="Heats of Eternal Summer" noLink /></li>
        </ul>
        <ul>
          <li>
            <ItemLink item={ITEM.AMETHYST} count={3} noLink />
            <ul>
              <li>Gallant Violet Elk</li>
            </ul>
          </li>
          <li>
            <ItemLink item={ITEM.BLACK_PEARL} count={3} noLink />
            <ul>
              <li>Gallant Blacktail Leomorph</li>
              <li>Gallant Coalmane Snowlion</li>
              <li>Gallant Gray Lilyut Horse</li>
            </ul>
          </li>
          <li>
            <ItemLink item={ITEM.DIAMOND} count={3} noLink />
            <ul>
              <li>Gallant Snowmane Snowlion</li>
              <li>Gallant White Elk</li>
              <li>Gallant Whitetail Leomorph</li>
            </ul>
          </li>
          <li>
            <ItemLink item={ITEM.EMERALD} count={3} noLink />
            <ul>
              <li>Gallant Green Elk</li>
            </ul>
          </li>
          <li>
            <ItemLink item={ITEM.TOPAZ} count={3} noLink />
            <ul>
              <li>Gallant Brown Lilyut Horse</li>
              <li>Gallant Browntail Leomorph</li>
              <li>Gallant Buckskin Lilyut Horse</li>
              <li>Gallant Sandmane Snowlion</li>
            </ul>
          </li>
        </ul>
      </Typography>,
      <Typography variant="h5" id="gallant-lilyut-horse">Gallant Lilyut Horse</Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Mounted Attack" requiredLevel={10} />
        <SkillIcon skillset="Basic" id="Run" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Mounted Defense" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Breakthrough" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Reckless Charge" requiredLevel={50} />
      </div>,
      <Typography variant="subtitle1">
        <SkillLink skillset="Basic" name="Reckless Charge" /> replaces <SkillLink skillset="Basic" name="Back Kick" />,
        giving this mount three movement abilities.
      </Typography>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox title="Gallant Gray Lilyut Horse" />
        <Lightbox title="Gallant Brown Lilyut Horse" />
        <Lightbox title="Gallant Buckskin Lilyut Horse" />
      </div>,
      <Typography variant="h5" id="gallant-elk">Gallant Elk</Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Mounted Arrowshot" requiredLevel={10} />
        <SkillIcon skillset="Basic" id="Run" requiredLevel={20} />
        <SkillIcon skillset="Basic" id="Mounted Fire Arrow Gallant" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Elegant Leap" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Precise Shot" requiredLevel={50} />
      </div>,
      <Typography variant="subtitle1">
        <SkillLink skillset="Basic" name="Mounted Fire Arrow" /> gains a reduced cooldown but loses damage.<br />
        <SkillLink skillset="Basic" name="Snipe" /> loses its combo, but increases further ranged damage on the target.
      </Typography>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={GallantGreenElk} title="Gallant Green Elk" />
        <Lightbox title="Gallant White Elk" />
        <Lightbox title="Gallant Violet Elk" />
      </div>,
      <Typography variant="h5" id="gallant-snowlion">Gallant Snowlion</Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Overrun" requiredLevel={10} />
        <SkillIcon skillset="Basic" id="Run" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Beastsense" requiredLevel={30} />
        <SkillIcon skillset="Basic" id="Dash Gallant" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Leader of the Pack" requiredLevel={50} />
      </div>,
      <Typography variant="subtitle1">
        <SkillLink skillset="Basic" name="Beastsense" /> replaces&nbsp;
        <SkillLink skillset="Basic" name="Mounted Arrowshot" />, swapping tagging utility for increased stealth
        detection.<br />
        <SkillLink skillset="Basic" name="Leader of the Pack" /> replaces&nbsp;
        <SkillLink skillset="Basic" name="Anabolica" />, providing more speed in group situations.<br />
        <SkillLink skillset="Basic" name="Dash" /> shares a cooldown with&nbsp;
        <SkillLink skillset="Basic" name="Leader of the Pack" />.
      </Typography>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={GallantCoalmaneSnowlion} title="Gallant Coalmane Snowlion" />
        <Lightbox title="Gallant Sandmane Snowlion" />
        <Lightbox image={GallantSnowmaneSnowlion} title="Gallant Snowmane Snowlion" />
      </div>,
      <Typography variant="h5" id="gallant-leomorph">Gallant Leomorph</Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Mounted Attack" requiredLevel={10} />
        <SkillIcon skillset="Basic" id="Run" requiredLevel={20} />
        <SkillIcon skillset="Basic" id="Drop Back Gallant" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Enhanced Owner's Escape" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Improved Stealth Move" requiredLevel={50} />
      </div>,
      <Typography variant="subtitle1">
        <SkillLink skillset="Basic" name="Drop Back" /> gains an additional 3 meter distance, but gains 2 additional
        seconds on its cooldown.<br />
        <SkillLink skillset="Basic" name="Owner's Escape" /> grants you a move speed increase after the teleport.<br />
        <SkillLink skillset="Basic" name="Stealth Move" />'s cooldown and move speed penalty are halved.
      </Typography>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox title="Gallant Browntail Leomorph" />
        <Lightbox title="Gallant Whitetail Leomorph" />
        <Lightbox title="Gallant Blacktail Leomorph" />
      </div>,
    ],
  },
  {
    title: 'Thunder Dash',
    paragraphs: [
      <blockquote>
        Legendary for its speed, this mount evolved from a Stormdarter.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Thunder Dash"
        image={ThunderDash}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Vicious Bite" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Overrun" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Thunder Dash" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Ram" requiredLevel={45} />
        <SkillIcon skillset="Basic" name="Terrifying Roar" requiredLevel={50} />
      </div>,
      <Typography variant="h6">Past the Storm, Now the Thunder</Typography>,
      <Typography>After obtaining a <Link to="/guides/gilda-mounts#stormdarter">Stormdarter</Link>, this quest will be
        available from any Honor Point Collector.</Typography>,
      <Typography>To complete this quest, you must summon a level 50 Stormdarter and have <ItemLink
        item={ITEM.HONORFORGED_MEDAL} count={15} /> (costs&nbsp;
        <Currency type={REWARD.HONOR} count="30,000" component="span" /> from the Honor Shop).</Typography>,
      'As a reward, you will receive an Essence-fed Stormdarter which can be consumed to grant you a level 30 Thunder Dash.',
    ],
  },
  {
    title: 'Ebonfur Bjorne',
    paragraphs: [
      <blockquote>
        This hulking bear may look fierce, but has been trained to be a protective--and cuddly--mount.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items" style={{ marginBottom: 20 }}>
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="I Am the Bear!" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Health Regen" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Roll" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Carry and Run" requiredLevel={25} />
      </div>,
      <MapEmbed
        zone={ZONE.MIRAGE_ISLE}
        points={[
          { label: ['Morudo', 'Garini'], coords: [{ x: 38.5, y: 25.5 }, { x: 28, y: 34.5 }] },
        ]}
      />,
      <Lightbox
        title="Ebonfur Bjorne"
        float="right"
      />,
      <Typography variant="h6">Be Prepared for Anything</Typography>,
      <Typography>After obtaining a <Link to="/guides/special-mounts#polaris-bjorne">Polaris Bjorne</Link>, this quest
        will be available from the daru Morudo in Mirage Isle.</Typography>,
      <Typography>
        To complete this quest, you must summon a level 50 Polaris Bjorne and have a <ItemLink
        item={ITEM.PUREBRED_BEAR_CERTIFICATE} count={1} /> (purchase for <Currency
        type={REWARD.COIN} count={1000000} component="span" /> from any Stablehand) and <ItemLink
        item={ITEM.HONEY} count={500} plural="" />.
      </Typography>,
      'As a reward, you will receive an Sealed Ebonfur Bjrone (cannot be traded) which can be consumed to grant you an Ebonfur Bjorne.',
      <Typography variant="h6">Going Bear-zerk</Typography>,
      <Typography>After obtaining a Fleetpaw Bjorne (current obtainment method is unknown), this quest will be available
        from the daru Garini in Mirage Isle.</Typography>,
      <Typography>
        To complete this quest, you must summon a level 50 Fleetpaw Bjorne and have a <ItemLink
        item={ITEM.PUREBRED_BEAR_CERTIFICATE} count={1} /> (purchase for <Currency
        type={REWARD.COIN} count={1000000} component="span" /> from any Stablehand) and <ItemLink
        item={ITEM.HONEY} count={500} plural="" />.
      </Typography>,
      'As a reward, you will receive an Sealed Ebonfur Bjrone (cannot be traded) which can be consumed to grant you an Ebonfur Bjorne.',
    ],
  },
];

export default { name, meta, sections };
