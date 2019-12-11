import React from 'react';
import { Typography } from '@material-ui/core';
import { REWARD } from 'constants/dailies';
import { ZONE } from 'constants/map';
import Currency from 'components/Currency';
import Lightbox from 'components/Lightbox';
import MapEmbed from 'components/MapEmbed';
import SkillIcon from 'components/Skill/SkillIcon';
import CoalmaneSnowlion from 'images/guides/Coalmane_Snowlion.png';
import SandmaneSnowlion from 'images/guides/Sandmane_Snowlion.png';
import SnowmaneSnowlion from 'images/guides/Snowmane_Snowlion.png';
import BrowntailLeomorph from 'images/guides/Browntail_Leomorph.png';
import WhitetailLeomorph from 'images/guides/Whitetail_Leomorph.png';
import BlacktailLeomorph from 'images/guides/Blacktail_Leomorph.png';
import BlackscalePangolin from 'images/guides/Blackscale_Pangolin.png';
import SilverscalePangolin from 'images/guides/Silverscale_Pangolin.png';
import RedscalePangolin from 'images/guides/Redscale_Pangolin.png';
import GrayHorse from 'images/guides/Gray_Lilyut_Horse.png';
import BrownHorse from 'images/guides/Brown_Lilyut_Horse.png';
import BuckskinHorse from 'images/guides/Buckskin_Lilyut_Horse.png';
import GreenElk from 'images/guides/Green_Elk.png';
import WhiteElk from 'images/guides/White_Elk.png';
import VioletElk from 'images/guides/Violet_Elk.png';
import NightslaverBoar from 'images/guides/Nightslaver_Boar.png';
import SnowrendBoar from 'images/guides/Snowrend_Boar.png';
import HooftigerBoar from 'images/guides/Hooftiger_Boar.png';

const name = 'Starter Mounts';

const meta = {
  author: 'Mokulu',
  lastUpdated: 'Dec 10, 2019',
};

const sections = [
  {
    title: 'About Starter Mounts',
    paragraphs: [
      'Players are able to acquire their first starter mount for free during questing at around levels 5 to 8.',
      <Typography>
        Each race has their own three colorations of a mount and if you want to collect another race's mount(s), you
        will have to travel to their starting zone and purchase the youngling yourself for&nbsp;
        <Currency type={REWARD.COIN} count={1000} component="span" /> and then raise it.
      </Typography>,
    ],
  },
  {
    title: 'Lilyut Horses',
    paragraphs: [
      <blockquote>
        This horse is from the Lilyut Hills, a region known for its fine horses.
      </blockquote>,
      <MapEmbed
        zone={ZONE.SOLZREED_PENINSULA}
        points={[
          { label: 'Lilyut Foals', icon: 'stable', coords: [{ x: 61.5, y: 66.6 }] },
          { label: 'Solzreed Community Center', icon: 'port', coords: [{ x: 62.7, y: 67.4 }] },
        ]}
      />,
      'Lilyut foals can be acquired from the stables by the Solzreed Community Center.',
      'For West players: you can easily go to Solzreed with the nearest teleport location being the Community Center.',
      'For East players: if you\'ve already been to the Solzreed Community Center, you can teleport to that point and the stable is right next to it. ' +
      'If you have not, the easiest way to get there is to start from the dungeon teleport for Burnt Castle Armory, head north across the Feuille Sound and into Solzreed, and then north towards the Community Center.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Attack" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Back Kick" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Mounted Defense" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Breakthrough" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={GrayHorse} title="Gray Lilyut Horse" />
        <Lightbox image={BrownHorse} title="Brown Lilyut Horse" />
        <Lightbox image={BuckskinHorse} title="Buckskin Lilyut Horse" />
      </div>,
    ],
  },
  {
    title: 'Elks',
    paragraphs: [
      <MapEmbed
        zone={ZONE.GWEONID_FOREST}
        points={[
          { label: 'Elk Calves', icon: 'stable', coords: [{ x: 38.5, y: 48.3 }] },
          { label: 'Gweonid Community Center', icon: 'port', coords: [{ x: 49.7, y: 46.1 }] },
        ]}
      />,
      'Elk calves can be acquired from the stables west of the Gweonid Community Center.',
      'For West players: you can easily go to Gweonid with the nearest teleport location being the Community Center.',
      'For East players: if you\'ve already been to the Gweonid Community Center, you can teleport to that point and head west to the stables. ' +
      'If you have not, the trek is not easy nor short. If you\'ve already been to Solzreed\'s Community Center, start there and head through Lilyut Hills and into Gweonid Forest. If not, you can start in Dewstone Plains by using the dungeon teleport to Sharpwind Mines, then head north to Lilyut Hills and promptly west into Gweonid. Watch out for guards and other players.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Arrowshot" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Mounted Fire Arrow" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Snipe" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Elegant Leap" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={GreenElk} title="Green Elk" />
        <Lightbox image={WhiteElk} title="White Elk" />
        <Lightbox image={VioletElk} title="Violet Elk" />
      </div>,
    ],
  },
  {
    title: 'Boars',
    paragraphs: [
      <blockquote>
        Airain boars may look fierce, but once trained, they are extremely faithful to their owners and gentle among trusted friends.
      </blockquote>,
      <MapEmbed
        zone={ZONE.AUBRE_CRADLE}
        points={[
          { label: 'Boar Shoats', icon: 'stable', coords: [{ x: 50, y: 58.5 }] },
          { label: 'Aubre Cradle Community Center', icon: 'port', coords: [{ x: 47.2, y: 57.5 }] },
        ]}
      />,
      'Boar shoats can be acquired from the stables right next to the Aubre Cradle Community Center.',
      'For West players: you can easily go to Aubre Cradle with the nearest teleport location being the Community Center.',
      'For East players: if you\'ve already been to the Aubre Cradle Community Center, you can teleport to that point and the stable is right next to it. ' +
      'If you have not, the trek is not easy nor short. You can start at Solisa in Halcyona, then head north to Marianople, north-west into White Arden, and then west into Aubre Cradle. Watch out for guards and other players.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Gnaw" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Boar's Bore" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Unstoppable Race" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="War Cry" requiredLevel={50} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={NightslaverBoar} title="Nightslaver Boar" />
        <Lightbox image={SnowrendBoar} title="Snowrend Boar" />
        <Lightbox image={HooftigerBoar} title="Hooftiger Boar" />
      </div>,
    ],
  },
  {
    title: 'Snowlions',
    paragraphs: [
      <blockquote>
        Snowlion mounts run like the wind; give them the reins on flat ground, and they'll run for hours.
      </blockquote>,
      <MapEmbed
        zone={ZONE.FALCORTH_PLAINS}
        points={[
          { label: 'Snowlion Cubs', icon: 'stable', coords: [{ x: 39.2, y: 56.8 }] },
          { label: 'Cloudgrain', icon: 'port', coords: [{ x: 37.9, y: 53 }] },
          { label: 'Falcorth Community Center', icon: 'port', coords: [{ x: 45.6, y: 33.7 }] },
        ]}
      />,
      'Snowlions cubs can be acquired from the stables south of Cloudgrain.',
      'For East players: you can easily go to Falcorth with the nearest teleport location being Cloudgrain.',
      'For West players: if you\'ve already been to the Falcorth Community Center, you can head southwest while avoiding guards to get to the stable master. ' +
      'If you have not, the easiest way to get there is to start from the Rookborne Community Center, head west over the mountains and into Falcorth, and continue through towards Cloudgrain.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Arrowshot" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Overrun" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Anabolica" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Dash" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={CoalmaneSnowlion} title="Coalmane Snowlion" />
        <Lightbox image={SandmaneSnowlion} title="Sandmane Snowlion" />
        <Lightbox image={SnowmaneSnowlion} title="Snowmane Snowlion" />
      </div>,
    ],
  },
  {
    title: 'Leomorphs',
    paragraphs: [
      <blockquote>
        Leomorphs are friendly-looking, sturdy mounts. They even develop unique abilities once fully grown.
      </blockquote>,
      <MapEmbed
        zone={ZONE.ARCUM_IRIS}
        points={[
          { label: 'Leomorph Cubs', icon: 'stable', coords: [{ x: 37.2, y: 59.6 }] },
          { label: 'Arcum Iris Community Center', icon: 'port', coords: [{ x: 32.2, y: 56 }] },
        ]}
      />,
      'Leomorph cubs can be acquired from the stables east of Parchsun Settlement.',
      'For East players: you can easily go to Arcum Iris with the nearest teleport location being Parchsun Settlement.',
      'For West players: if you\'ve already been to the Arcum Iris Community Center, you can head east around the city to avoiding guards to get to the stable master. ' +
      'If you have not, the easiest way to get there is to start from the dungeon teleport for Palace Cellar, head south the Mahadevi-Arcum mountains and into Arcum Iris, and continue through towards Parchsun Settlement.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={5} />
        <SkillIcon skillset="Basic" name="Mounted Attack" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Drop Back" requiredLevel={15} />
        <SkillIcon skillset="Basic" name="Owner's Escape" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Stealth Move" requiredLevel={25} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={BrowntailLeomorph} title="Browntail Leomorph" />
        <Lightbox image={WhitetailLeomorph} title="Whitetail Leomorph" />
        <Lightbox image={BlacktailLeomorph} title="Blacktail Leomorph" />
      </div>,
    ],
  },
  {
    title: 'Pangolins',
    paragraphs: [
      <blockquote>
        Pangolins are revered by Warborn as aspirational symbols: outwardly, pangolins have a tough, armored hide, but
        inwardly, they are incredibly gentle and loyal creatures.
      </blockquote>,
      <MapEmbed
        zone={ZONE.SUNBITE_WILDS}
        points={[
          { label: 'Pangolin Pups', icon: 'stable', coords: [{ x: 19.2, y: 24 }, { x: 83.6, y: 33.2 }] },
          { label: 'Harani Construction Site', icon: 'port', coords: [{ x: 15.7, y: 17.4 }]},
          { label: 'Sunbite Community Center', icon: 'port', coords: [{ x: 53.4, y: 40.7 }] },
          { label: 'Communal Ranch', icon: 'port', coords: [{ x: 84.5, y: 31 }]}
        ]}
      />,
      'Pangolin pups can be acquired from the stables south-east of Harani Construction Site or from the stable at Communal Ranch.',
      'For East players: you can easily go to Sunbite Wilds with the nearest teleports of the locations previously stated.',
      'For West players: if you\'ve already been to the Sunbite Community Center, you can head west around the city at Fleurstad, take the north path and then head over the mountains to get to the Harani Construction Site stables to avoid guards to get to the stable master. ' +
      'If you have not, the easiest way is to go to the Communal Ranch by starting from Firetalon in Windscour Savannah, heading west into Arcum Iris, and then south towards the Wild Road to get into Sunbite with the Communal Ranch along the road.',
      <Typography>
        <Typography color="primary" component="span">Base Move Speed: </Typography>
        9 m/s
      </Typography>,
      <Typography variant="h6">Skills</Typography>,
      <div className="quest-items">
        <SkillIcon skillset="Basic" id="Run" requiredLevel={10} />
        <SkillIcon skillset="Basic" name="Slam" requiredLevel={20} />
        <SkillIcon skillset="Basic" name="Pangocharge" requiredLevel={30} />
        <SkillIcon skillset="Basic" name="Stubborn Dash" requiredLevel={40} />
        <SkillIcon skillset="Basic" name="Patience" requiredLevel={50} />
      </div>,
      <Typography variant="h6">Colorations</Typography>,
      <div className="lightbox-group">
        <Lightbox image={BlackscalePangolin} title="Blackscale Pangolin" />
        <Lightbox image={SilverscalePangolin} title="Silverscale Pangolin" />
        <Lightbox image={RedscalePangolin} title="Redscale Pangolin" />
      </div>,
    ],
  },
];

export default { name, meta, sections };
