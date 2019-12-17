import { Typography } from '@material-ui/core';
import ItemLink from 'components/Item/ItemLink';
import Lightbox from 'components/Lightbox';
import Link from 'components/Link';
import MapEmbed from 'components/MapEmbed';
import SkillIcon from 'components/Skill/SkillIcon';
import TabContent from 'components/TabContent';
import { ZONE } from 'constants/map';
import ITEM from 'data/items';
import BlackArrow from 'images/mount/Black_Arrow.png';
import CloudstrikePanther from 'images/mount/Cloudstrike_Panther.png';
import Coral from 'images/mount/Coral.png';
import GildaStarSoulMerchant from 'images/mount/Gilda_Star_Soul_Merchant.png';
import MirageBjorne from 'images/mount/Mirage_Bjorne.png';
import MirageElk from 'images/mount/Mirage_Elk.png';
import RoyalGriffin from 'images/mount/Royal_Griffin.png';
import Soulmare from 'images/mount/Soulmare.png';
import Stormdarter from 'images/mount/Stormdarter.png';
import React from 'react';
// Mirage Leomorph

const name = 'Gilda Mounts';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 10, 2019',
};

const sections = [
  {
    title: 'About',
    paragraphs: [
      <TabContent
        tabs={[
          {
            label: 'Marianople',
            content:
              <MapEmbed
                zone={ZONE.MARIANOPLE_CITY}
                points={[
                  { label: 'Gilda Star Soul Merchant', icon: 'gilda', coords: [{ x: 45.9, y: 44.2 }] },
                ]}
              />,
          },
          {
            label: 'Austera',
            content:
              <MapEmbed
                zone={ZONE.AUSTERA}
                points={[
                  { label: 'Gilda Star Soul Merchant', icon: 'gilda', coords: [{ x: 47.2, y: 27 }] },
                ]}
              />,
          },
        ]}
      />,
      <Lightbox
        image={GildaStarSoulMerchant}
        title="Gilda Star Soul Merchant"
        float="right"
      />,
      <Typography>The Souls of these listed mounts can be purchased for&nbsp;
        <ItemLink item={ITEM.GILDA_STAR} plural={'s'} /> from the Gilda Star Soul Merchant who is located in Marianople
        and Austera, as noted by the above map.</Typography>,
      <Typography>In order to raise any soul, you must also purchase a <ItemLink
        item={ITEM.SMALL_BREATH_OF_LIFE} /> for <ItemLink item={ITEM.GILDA_STAR} count={10} />. This only needs to be
        purchased once per character, and you must own land in order to use it as it is a furniture item. Each soul also
        has its own extensive material list, which can make one even more expensive than others.</Typography>,
    ],
  },
  {
    title: 'Black Arrow',
    paragraphs: [
      <blockquote>
        These lightning-fast horses can trace their bloodlines back to Auroria.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Black Arrow"
        image={BlackArrow}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Health Regen" requiredLevel={10} />
        <SkillIcon skillset="Basic" id="Run" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Mounted Defense" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Breakthrough" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Jousting Lance Charge" requiredLevel={50} />
      </div>,
      <Typography variant="h6">Black Arrow Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={500} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={95} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Soulmare',
    paragraphs: [
      <blockquote>
        These ghostly steeds are said to come from the Hereafter itself. Legends claim that they will serve their chosen riders even after death.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Soulmare"
        image={Soulmare}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Back Kick" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Hereafter Dash" requiredLevel={25} />
        <SkillIcon skillset="Basic" name="Nui's Veil" requiredLevel={25} />
        <SkillIcon skillset="Basic" name="Ghostly Steps" requiredLevel={30} />
      </div>,
      <Typography variant="h6">Soulmare Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={500} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={95} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Stormdarter',
    paragraphs: [
      <blockquote>
        Sturdy and very fast.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        10.5 m/s
      </Typography>,
      <Typography>This mount can be upgraded into <Link to="/guides/upgraded-mounts#thunder-dash">Thunder
        Dash</Link>.</Typography>,
      <Lightbox
        title="Stormdarter"
        image={Stormdarter}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" id="GnawBleed" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Overrun" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Anabolica" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Keep Running!" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Stormdarter Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.STURDY_INGOT} count={5} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={2} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={5} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Cloudstrike Panther',
    paragraphs: [
      <blockquote>
        These shy creatures are rarely seen in the wild, except during the most vicious lightning storms. At the first growl of thunder, they are known to take off running for no reason other than the joy of the wind and rain in their fur.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Cloudstrike Panther"
        image={CloudstrikePanther}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Vicious Bite" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Overrun" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Cloudstrike Dash" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Electric Dash" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Stand Strong" requiredLevel={50} />
      </div>,
      <Typography variant="h6">Cloudstrike Panther Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.STURDY_INGOT} count={5} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={2} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={5} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Royal Griffin',
    paragraphs: [
      <blockquote>
        Often featured in heraldic crests and murals, Royal Griffins are a symbol of freedom throughout Halcyona.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Royal Griffin"
        image={RoyalGriffin}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Wind Strike" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Glide" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Skydash" requiredLevel={5} />
      </div>,
      <Typography variant="h6">Royal Griffin Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Coral',
    paragraphs: [
      <blockquote>
        Captured at a young age, Coral spent years as the unwilling pet of a spoiled Harani noble. Though she eventually escaped, the experience left the enormous rabbit with a terrible fear of cages—and a rather unusual sense of fashion.
      </blockquote>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Coral"
        image={Coral}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Hippity Hop" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Hop Back" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Owner's Escape" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Carrot Care" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Coral Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Mirage Bjorne',
    paragraphs: [
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        10.2 m/s
      </Typography>,
      <Lightbox
        title="Mirage Bjorne"
        image={MirageBjorne}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Warmfuzzy Dash" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="I Am the Bear!" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Health Regen" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Roll" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Carry and Run" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Mirage Bjorne Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Mirage Elk',
    paragraphs: [
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Mirage Elk"
        image={MirageElk}
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Arrowshot" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Mounted Fire Arrow" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Snipe" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Elegant Leap" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Mirage Elk Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
  {
    title: 'Mirage Leomorph',
    paragraphs: [
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Lightbox
        title="Mirage Leomorph"
        float="right"
      />,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Attack" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Drop Back" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Owner's Escape" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Stealth Move" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Mirage Leomorph Soul</Typography>,
      <Typography>
        <Typography color="primary" component="span">Cost: </Typography>
        <ItemLink item={ITEM.GILDA_STAR} count={350} noLink />
      </Typography>,
      <Typography color="primary">Materials:</Typography>,
      <Typography component="div">
        <ul>
          <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
          <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural={''} noLink /></li>
          <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
          <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural={''} noLink /></li>
        </ul>
      </Typography>,
    ],
  },
];

export default { name, meta, sections };
