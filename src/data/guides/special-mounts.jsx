import React from 'react';
import { Typography } from '@material-ui/core';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import Lightbox from 'components/Lightbox';
import Link from 'components/Link';
import MapEmbed from 'components/MapEmbed';
import SkillIcon from 'components/Skill/SkillIcon';
import { REWARD } from 'constants/dailies';
import { ZONE } from 'constants/map';
import ITEM from 'data/items';
import Yata from 'images/guides/mounts/Yata.png';
// Striped Yata
// Palomino Yata
import BlackYata from 'images/guides/mounts/Black_Yata.png';
import PolarisBjorne from 'images/guides/mounts/Polaris_Bjorne.png';
import Fuchsiafin from 'images/guides/mounts/Fuchsiafin.png';

const name = 'Special Mounts';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 11, 2019',
};

const sections = [
  {
    title: 'Yatas',
    paragraphs: [
      <blockquote>
        In a long race, the average yata could easily outpace the average horse. However, yatas aren't as robust in a fight; it's sadly impossible to cuddle something to death.
      </blockquote>,
      <Typography>
        There are 4 Yata mounts that are available, all of which are grown from calves using&nbsp;
        <ItemLink item={ITEM.VITA_ROOT} />.
      </Typography>,
      <Typography variant="h5">Yata</Typography>,
      <Lightbox
        title="Yata"
        image={Yata}
        float="right"
      />,
      <Typography>
        This yata is the easiest to get. It can be purchased from any Stablehand for&nbsp;
        <Currency type={REWARD.COIN} count={50000} component="span" />. As such, it isn't as good as the rest.
      </Typography>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Fleeing Yata" requiredLevel={20} />
      </div>,
      <Typography variant="h5">Striped, Palomino, and Black Yata</Typography>,
      <Typography>
        These three yatas are the result of breeding Cashmere Yatas. Striped Yatas are the most common type born, while
        the Palomino and Black Yatas are much rarer. All three of these calves can be traded and sold on the auction
        house, so look out for your neighborhood yata breeder to get your hands on one.
      </Typography>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        11.5 m/s
      </Typography>,
      <Typography variant="h6">Striped Yata Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Fleeing Yata" requiredLevel={20} />
      </div>,
      <Typography variant="h6">Palomino and Black Yata Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Fleeing Yata" requiredLevel={20} />
      </div>,
      <br />,
      <div className="lightbox-group">
        <Lightbox
          title="Striped Yata"
        />
        <Lightbox
          title="Palomino Yata"
        />
        <Lightbox
          title="Black Yata"
          image={BlackYata}
        />
      </div>
    ],
  },
  {
    title: 'Polaris Bjorne',
    paragraphs: [
      <blockquote>
        This hulking bear may look fierce, but has been trained to be a protective--and cuddly--mount.
      </blockquote>,
      <Lightbox
        title="Polaris Bjorne"
        image={PolarisBjorne}
        float="right"
      />,
      <Typography>
        The Polaris Bjorne is the result of raising a Polaris Cub, a baby bear that comes from breeding Blizzard Bears.
        What can make this difficult is not only obtaining a Polaris Cub, but that a Polaris Cub can also become a
        battle pet when raised. It could take you raising multiple cubs to finally get this mount, which can be costly.
      </Typography>,
      <Typography>This mount can be upgraded into <Link to="/guides/upgraded-mounts#ebonfur-bjorne">Ebonfur Bjorne</Link>.</Typography>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        10.5 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="I Am the Bear!" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Health Regen" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Carry and Run" requiredLevel={20} />
      </div>,
    ],
  },
  {
    title: 'Fuchsiafin',
    paragraphs: [
      <blockquote>
        It's said Dahuta, the Goddess of the Sea, created this species in a rare moment of tenderness, simply to enjoy their beauty. Others claim she utilizes their speed by harnessing them to her personal chariot.
      </blockquote>,
      <Lightbox
        title="Fuschiafin"
        image={Fuchsiafin}
        float="right"
      />,
      <Typography>
        The Fuschiafin is a marine mount that can be obtained in three different ways. The first is from the dungeon,
        Sea of Drowned Love, as a drop from the boss Dahuta. The other two ways are by crafting.
      </Typography>,
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        7.5 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" name="Scan Ships" />
        <SkillIcon skillset="Basic" name="Dolphin Dash" />
        <SkillIcon skillset="Basic" name="Produce ultrasonic waves" />
        <SkillIcon skillset="Basic" name="Acrobatics" requiredLevel={20} />
      </div>,
    ],
  }
];

export default { name, meta, sections };
