import { Typography } from '@material-ui/core';
import Currency from 'components/Currency';
import ItemLink from 'components/Item/ItemLink';
import Link from 'components/Link';
import MapEmbed from 'components/MapEmbed';
import SkillLink from 'components/Skill/SkillLink';
import { CURRENCY } from 'constants/items';
import { ZONE } from 'constants/map';
import {
  CRAFTED,
  HUSBANDRY,
  MOUNT_TYPE,
  QUEST,
} from 'constants/mounts';
import ITEM from 'data/items';
import React from 'react';
import { slug } from 'utils/string';

const HORSE_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.SOLZREED_PENINSULA}
      points={[
        { label: 'Lilyut Foals', icon: 'stable', coords: [{ x: 61.5, y: 66.6 }] },
        { label: 'Solzreed Community Center', icon: 'port', coords: [{ x: 62.7, y: 67.4 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Lilyut foals can be acquired from the stables by the Solzreed Community Center for&nbsp;
      <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For West players: you can easily go to Solzreed with the nearest teleport location being the Community
      Center.</p>
    <p>For East players: if you've already been to the Solzreed Community Center, you can teleport to that point and the
      stable is right next to it.<br />
      If you have not, the easiest way to get there is to start from the dungeon teleport for Burnt Castle Armory, head
      north across the Feuille Sound and into Solzreed, and then north towards the Community Center.</p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const ELK_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.GWEONID_FOREST}
      points={[
        { label: 'Elk Calves', icon: 'stable', coords: [{ x: 38.5, y: 48.3 }] },
        { label: 'Gweonid Community Center', icon: 'port', coords: [{ x: 49.7, y: 46.1 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Elk calves can be acquired from the stables west of the Gweonid Community Center for&nbsp;
      <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For West players: you can easily go to Gweonid with the nearest teleport location being the Community Center.</p>
    <p>For East players: if you've already been to the Gweonid Community Center, you can teleport to that point and head
      west to the stables.<br />
      If you have not, the next easiest way is to take the airship that runs from the Karkasse Community Center to
      Marianople which passes over Gweonid, and jump off when you get close to the stable area. Have either a skill to
      negative fall damage or
      your glider ready!</p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const BOAR_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.AUBRE_CRADLE}
      points={[
        { label: 'Boar Shoats', icon: 'stable', coords: [{ x: 50, y: 58.5 }] },
        { label: 'Aubre Cradle Community Center', icon: 'port', coords: [{ x: 47.2, y: 57.5 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Boar shoats can be acquired from the stables right next to the Aubre Cradle Community Center for&nbsp;
      <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For West players: you can easily go to Aubre Cradle with the nearest teleport location being the Community
      Center.</p>
    <p>For East players: if you've already been to the Aubre Cradle Community Center, you can teleport to that point
      and the stable is right next to it.<br />
      If you have not, the trek is not easy nor short. You can start at Solisa in Halcyona, then head north to
      Marianople, north-west into White Arden, and then west into Aubre Cradle. Watch out for guards and other players.
    </p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const SNOWLION_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.FALCORTH_PLAINS}
      points={[
        { label: 'Snowlion Cubs', icon: 'stable', coords: [{ x: 39.2, y: 56.8 }] },
        { label: 'Cloudgrain', icon: 'port', coords: [{ x: 37.9, y: 53 }] },
        { label: 'Falcorth Community Center', icon: 'port', coords: [{ x: 45.6, y: 33.7 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Snowlions cubs can be acquired from the stables south of Cloudgrain for&nbsp;
      <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For East players: you can easily go to Falcorth with the nearest teleport location being Cloudgrain.</p>
    <p>For West players: if you've already been to the Falcorth Community Center, you can head southwest while avoiding
      guards to get to the stable master.<br />
      If you have not, the easiest way to get there is to start from the Rookborne Community Center, head west over the
      mountains and into Falcorth, and continue through towards Cloudgrain.</p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const LEOMORPH_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.ARCUM_IRIS}
      points={[
        { label: 'Leomorph Cubs', icon: 'stable', coords: [{ x: 37.2, y: 59.6 }] },
        { label: 'Arcum Iris Community Center', icon: 'port', coords: [{ x: 32.2, y: 56 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Leomorph cubs can be acquired from the stables east of Parchsun Settlement for&nbsp;
      <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For East players: you can easily go to Arcum Iris with the nearest teleport location being Parchsun
      Settlement.</p>
    <p>For West players: if you've already been to the Arcum Iris Community Center, you can head east around the city
      to avoiding guards to get to the stable master.<br />
      If you have not, the easiest way to get there is to start from the dungeon teleport for Palace Cellar, head south
      the Mahadevi-Arcum mountains and into Arcum Iris, and continue through towards Parchsun Settlement.</p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const PANGOLIN_HOW_TO = (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.SUNBITE_WILDS}
      points={[
        { label: 'Pangolin Pups', icon: 'stable', coords: [{ x: 19.2, y: 24 }, { x: 83.6, y: 33.2 }] },
        { label: 'Harani Construction Site', icon: 'port', coords: [{ x: 15.7, y: 17.4 }] },
        { label: 'Sunbite Community Center', icon: 'port', coords: [{ x: 53.4, y: 40.7 }] },
        { label: 'Communal Ranch', icon: 'port', coords: [{ x: 84.5, y: 31 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>Pangolin pups can be acquired from the stables south-east of Harani Construction Site or from the stable
      at Communal Ranch for <Currency type={CURRENCY.COIN} count={1000} inline />.</Typography>
    <p>For East players: you can easily go to Sunbite Wilds with the nearest teleports of the locations previously
      stated.</p>
    <p>For West players: if you've already been to the Sunbite Community Center, you can head west around the city at
      Fleurstad, take the north path and then head over the mountains to get to the Harani Construction Site stables to
      avoid guards to get to the stable master.<br />
      If you have not, the easiest way is to go to the Communal Ranch by starting from Firetalon in Windscour Savannah,
      heading west into Arcum Iris, and then south towards the Wild Road to get into Sunbite with the Communal Ranch
      along the road.</p>
    <p>You can also get this mount by purchasing a Mount Youngster Basket for&nbsp;
      <Currency type={CURRENCY.VOCATION} count={10000} inline /> from the Vocation Shop.</p>
  </React.Fragment>
);

const GILDA_HOW_TO = ({ children, gilda }) => (
  <React.Fragment>
    <div className="right" style={{ display: 'grid', gridGap: '0.5em', padding: '0 0 0 8px' }}>
      <MapEmbed
        zone={ZONE.MARIANOPLE_CITY}
        points={[
          { label: 'Gilda Star Soul Merchant', icon: 'gilda', coords: [{ x: 45.9, y: 44.2 }] },
        ]}
        button="Marianople Map"
      />
      <MapEmbed
        zone={ZONE.AUSTERA}
        points={[
          { label: 'Gilda Star Soul Merchant', icon: 'gilda', coords: [{ x: 47.2, y: 27 }] },
        ]}
        button="Austera Map"
      />
    </div>
    <Typography>
      In order to obtain this mount, you must first purchase its Gilda Soul for&nbsp;
      <ItemLink item={ITEM.GILDA_STAR} count={gilda} /> from the Gilda Start Soul Merchant in Marianople or Austera.
    </Typography>
    <p>You will also need to purchase a <ItemLink item={ITEM.SMALL_BREATH_OF_LIFE} /> for&nbsp;
      <ItemLink item={ITEM.GILDA_STAR} count={10} /> if you don't have one already, which must be placed on land that
      you own.</p>
    <p>To soothe the soul and raise the mount, it requires 500 Labor and the following materials:</p>
    {children}
  </React.Fragment>
);

const GALLANT_HOW_TO = ({ animaType, mountFrom, material, gatherFrom, differences }) => (
  <React.Fragment>
    <MapEmbed
      zone={ZONE.DIAMOND_SHORES}
      points={[
        { label: 'Distorted Mistsong Workbench', coords: [{ x: 48.6, y: 43.3 }] },
      ]}
      button="View on Map"
      buttonFloat="right"
    />
    <Typography>
      To obtain this mount, you must first craft the Gallant {animaType} Anima at the Distorted Mistsong Workbench,
      located outside of Mistsong Summit.
    </Typography>
    <p>Crafting a Gallant {animaType} Anima will require the following materials:</p>
    <ul>
      <li>
        <ItemLink item={ITEM.SUNSET_PORTALSTONE} count={28} noLink />
        <ul>
          <li><i>Acquired in Mistsong Summit from dailies, rare drops from trash, and one from each boss that must be
            shared.</i></li>
        </ul>
      </li>
      <li>
        <ItemLink item={ITEM.ABYSSAL_SHARD} count={144} noLink />
        <ul>
          <li><i>Acquired in normal and greater dungeons from dailies, rare drops from trash, and handfuls as personal
            loot from bosses.</i></li>
        </ul>
      </li>
      <li>
        <ItemLink item={ITEM.PRIME_LUNARITE} count={6} plural="" noLink />
        <ul>
          <li><i>Acquired by combining up tiers of Lunarite, which is acquired from salvaging Lunagems. Can be
            traded.</i></li>
        </ul>
      </li>
      <li>
        <ItemLink item={ITEM.ETERNAL_WINTER_CHILL} count={5} noLink />
        <ul>
          <li><i>Acquired sparingly in greater dungeons and as handfuls inside Supply Crates that drop from Serpentis.
            Can be traded.</i></li>
        </ul>
      </li>
      <li>
        <ItemLink item={ITEM.HEAT_OF_ETERNAL_SUMMER} count={12} name="Heats of Eternal Summer" noLink />
        <ul>
          <li><i>Acquired sparingly in greater dungeons and as handfuls inside Supply Crates that drop from Serpentis.
            Can be traded.</i></li>
        </ul>
      </li>
      <li>
        <ItemLink item={material} count={3} noLink />
        <ul>
          <li><i>A rare drop from {gatherFrom}. Can be traded.</i></li>
        </ul>
      </li>
    </ul>
    <p>After you've crafted your Gallant {animaType} Anima, you will need a&nbsp;
      <Link to={`/mounts/${slug(mountFrom)}`}>{mountFrom}</Link> of any level and 250 Labor. Use the Anima on the mount
      to upgrade it, but remember to take its armor off first or it will be lost in the process.</p>
    <Typography variant="h6">Skill Differences</Typography>
    {differences}
  </React.Fragment>
);

export const DONKEY_HOW_TO = (
  <React.Fragment>
    <Typography>At level 30, you can pick up the quest <Typography color="primary" component="span"><span
      className="dropdown-icon Quest" /> The Basics of Trade</Typography> from the Blue Salt Brotherhood NPC inside the
      hero hall of Marianople or Austera.</Typography>
    <p>Completing the quest is very easy; just go to the Dewstone Plains or Mahadevi Community Center and talk to the
      Community Center Manager and pick this foal.</p>
    <p>If you picked a different foal from this quest line, the only way to get this one is to purchase it for&nbsp;
      <Currency type={CURRENCY.VOCATION} count="10,000" inline /> from the Vocation Shop.</p>
    <p>After you have the foal, raise it to get this donkey mount.</p>
  </React.Fragment>
);

const MOUNT = [
  {
    name: 'Gray Lilyut Horse',
    quote: 'This horse is from the Lilyut Hills, a region known for its fine horses.',
    speed: 9,
    upgrade: 'Gallant Gray Lilyut Horse',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Back Kick',
      'Mounted Defense',
      'Breakthrough',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {HORSE_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Brown Lilyut Horse',
    quote: 'This horse is from the Lilyut Hills, a region known for its fine horses.',
    speed: 9,
    upgrade: 'Gallant Brown Lilyut Horse',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Back Kick',
      'Mounted Defense',
      'Breakthrough',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: HORSE_HOW_TO,
  },
  {
    name: 'Buckskin Lilyut Horse',
    quote: 'This horse is from the Lilyut Hills, a region known for its fine horses.',
    speed: 9,
    upgrade: 'Gallant Buckskin Lilyut Horse',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Back Kick',
      'Mounted Defense',
      'Breakthrough',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {HORSE_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Green Elk',
    speed: 9,
    upgrade: 'Gallant Green Elk',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {ELK_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'White Elk',
    speed: 9,
    upgrade: 'Gallant White Elk',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: ELK_HOW_TO,
  },
  {
    name: 'Violet Elk',
    speed: 9,
    upgrade: 'Gallant Violet Elk',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {ELK_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Nightslaver Boar',
    quote: 'Airain boars may look fierce, but once trained, they are extremely faithful to their owners and gentle among trusted friends.',
    speed: 9,
    skills: [
      ['Run'],
      'Gnaw',
      'Boar\'s Bore',
      'Unstoppable Race',
      'War Cry',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: BOAR_HOW_TO,
  },
  {
    name: 'Snowrend Boar',
    quote: 'Airain boars may look fierce, but once trained, they are extremely faithful to their owners and gentle among trusted friends.',
    speed: 9,
    skills: [
      ['Run'],
      'Gnaw',
      'Boar\'s Bore',
      'Unstoppable Race',
      'War Cry',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: BOAR_HOW_TO,
  },
  {
    name: 'Hooftiger Boar',
    quote: 'Airain boars may look fierce, but once trained, they are extremely faithful to their owners and gentle among trusted friends.',
    speed: 9,
    skills: [
      ['Run'],
      'Gnaw',
      'Boar\'s Bore',
      'Unstoppable Race',
      'War Cry',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: BOAR_HOW_TO,
  },
  {
    name: 'Coalmane Snowlion',
    quote: 'Snowlion mounts run like the wind; give them the reins on flat ground, and they\'ll run for hours.',
    speed: 9,
    upgrade: 'Gallant Coalmane Snowlion',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Overrun',
      'Anabolica',
      'Dash',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: SNOWLION_HOW_TO,
  },
  {
    name: 'Sandmane Snowlion',
    quote: 'Snowlion mounts run like the wind; give them the reins on flat ground, and they\'ll run for hours.',
    speed: 9,
    upgrade: 'Gallant Sandmane Snowlion',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Overrun',
      'Anabolica',
      'Dash',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {SNOWLION_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Snowmane Snowlion',
    quote: 'Snowlion mounts run like the wind; give them the reins on flat ground, and they\'ll run for hours.',
    speed: 9,
    upgrade: 'Gallant Snowmane Snowlion',
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Overrun',
      'Anabolica',
      'Dash',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {SNOWLION_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Browntail Leomorph',
    quote: 'Leomorphs are friendly-looking, sturdy mounts. They even develop unique abilities once fully grown.',
    speed: 9,
    upgrade: 'Gallant Browntail Leomorph',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Drop Back',
      'Owner\'s Escape',
      'Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {LEOMORPH_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Whitetail Leomorph',
    quote: 'Leomorphs are friendly-looking, sturdy mounts. They even develop unique abilities once fully grown.',
    speed: 9,
    upgrade: 'Gallant Whitetail Leomorph',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Drop Back',
      'Owner\'s Escape',
      'Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: LEOMORPH_HOW_TO,
  },
  {
    name: 'Blacktail Leomorph',
    quote: 'Leomorphs are friendly-looking, sturdy mounts. They even develop unique abilities once fully grown.',
    speed: 9,
    upgrade: 'Gallant Blacktail Leomorph',
    skills: [
      ['Run'],
      'Mounted Attack',
      'Drop Back',
      'Owner\'s Escape',
      'Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      {LEOMORPH_HOW_TO}
      <p>On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={400} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Blackscale Pangolin',
    quote: 'Pangolins are revered by Warborn as aspirational symbols: outwardly, pangolins have a tough, armored hide, but inwardly, they are incredibly gentle and loyal creatures.',
    speed: 9,
    skills: [
      ['Run'],
      'Slam',
      'Pangocharge',
      'Stubborn Dash',
      'Patience',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: PANGOLIN_HOW_TO,
  },
  {
    name: 'Silverscale Pangolin',
    quote: 'Pangolins are revered by Warborn as aspirational symbols: outwardly, pangolins have a tough, armored hide, but inwardly, they are incredibly gentle and loyal creatures.',
    speed: 9,
    skills: [
      ['Run'],
      'Slam',
      'Pangocharge',
      'Stubborn Dash',
      'Patience',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: PANGOLIN_HOW_TO,
  },
  {
    name: 'Redscale Pangolin',
    quote: 'Pangolins are revered by Warborn as aspirational symbols: outwardly, pangolins have a tough, armored hide, but inwardly, they are incredibly gentle and loyal creatures.',
    speed: 9,
    skills: [
      ['Run'],
      'Slam',
      'Pangocharge',
      'Stubborn Dash',
      'Patience',
    ],
    types: [
      MOUNT_TYPE.STARTER,
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.VOCATION,
    ],
    obtainText: PANGOLIN_HOW_TO,
  },
  {
    name: 'Black Arrow',
    quote: 'These lightning-fast horses can trace their bloodlines back to Auroria.',
    speed: 11.5,
    skills: [
      'Health Regen',
      ['Run'],
      'Mounted Defense',
      'Breakthrough',
      'Jousting Lance Charge',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
    ],
    obtainText: <GILDA_HOW_TO gilda={500}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={95} plural="" noLink /></li>
      </ul>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Soulmare',
    quote: 'These ghostly steeds are said to come from the Hereafter itself. Legends claim that they will serve their chosen riders even after death.',
    speed: 11.5,
    skills: [
      'Back Kick',
      'Hereafter Dash',
      'Nui\'s Veil',
      'Ghostly Steps',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
    ],
    obtainText: <GILDA_HOW_TO gilda={500}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={95} plural="" noLink /></li>
      </ul>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Stormdarter',
    quote: 'Sturdy and very fast.',
    speed: 10.5,
    upgrade: 'Thunder Dash',
    skills: [
      ['Run'],
      ['GnawBleed'],
      'Overrun',
      'Anabolica',
      'Keep Running!',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.STURDY_INGOT} count={5} noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={2} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={5} plural="" noLink /></li>
      </ul>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Cloudstrike Panther',
    quote: 'These shy creatures are rarely seen in the wild, except during the most vicious lightning storms. At the first growl of thunder, they are known to take off running for no reason other than the joy of the wind and rain in their fur.',
    speed: 11.5,
    skills: [
      'Vicious Bite',
      'Overrun',
      'Cloudstrike Dash',
      'Electric Dash',
      'Stand Strong',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.STURDY_INGOT} count={5} noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={2} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={5} plural={''} noLink /></li>
      </ul>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Royal Griffin',
    quote: 'Often featured in heraldic crests and murals, Royal Griffins are a symbol of freedom throughout Halcyona.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Wind Strike',
      'Glide',
      'Skydash',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.GILDA,
      CURRENCY.MANASTORM,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural="" noLink /></li>
      </ul>
      <p>This mount can also be acquired outright for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={80} />.</p>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Moonfeather Griffin',
    quote: 'Famous for their luminous plumage, these ghostly predators are said to hunt exclusively by moonlight.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Wind Strike',
      'Glide',
      'Skydash',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      <Typography>This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={80} />.</Typography>
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={3500} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Coral',
    quote: 'Captured at a young age, Coral spent years as the unwilling pet of a spoiled Harani noble. Though she eventually escaped, the experience left the enormous rabbit with a terrible fear of cages—and a rather unusual sense of fashion.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Hippity Hop',
      'Hop Back',
      'Owner\'s Escape',
      'Carrot Care',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
      CURRENCY.MANASTORM,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.BEAUTIFULLY_COLORED_FABRIC} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural="" noLink /></li>
      </ul>
      <p>This mount can also be acquired outright for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={80} />.</p>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Mirage Bjorne',
    speed: 10.2,
    skills: [
      'Warmfuzzy Dash',
      'I Am the Bear!',
      'Health Regen',
      'Roll',
      'Carry and Run',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
      CURRENCY.MANASTORM,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={10} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural="" noLink /></li>
      </ul>
      <p>This mount can also be acquired outright for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={100} />.</p>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Mirage Elk',
    speed: 10.2,
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
      CURRENCY.CREDIT,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural="" noLink /></li>
      </ul>
      <p>On Legacy, this mount can be purchased outright for <Currency type={CURRENCY.CREDIT} count={1345} inline />.
      </p>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Mirage Leomorph',
    speed: 10.2,
    skills: [
      ['Run'],
      'Mounted Attack',
      'Drop Back',
      'Owner\'s Escape',
      'Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.GILDA,
      CURRENCY.CREDIT,
    ],
    obtainText: <GILDA_HOW_TO gilda={350}>
      <ul>
        <li><ItemLink item={ITEM.BLANK_REGRADE_SCROLL} count={50} noLink /></li>
        <li><ItemLink item={ITEM.FINE_LEATHER} count={20} plural="" noLink /></li>
        <li><ItemLink item={ITEM.PRISMATIC_DIAMOND} count={5} noLink /></li>
        <li><ItemLink item={ITEM.ONYX_ARCHEUM_ESSENCE} count={80} plural="" noLink /></li>
      </ul>
      <p>On Legacy, this mount can be purchased outright for <Currency type={CURRENCY.CREDIT} count={1345} inline />.
      </p>
    </GILDA_HOW_TO>,
  },
  {
    name: 'Gallant Gray Lilyut Horse',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      'Mounted Defense',
      'Breakthrough',
      'Reckless Charge',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Gray Horse"
        mountFrom="Gray Lilyut Horse"
        material={ITEM.BLACK_PEARL}
        gatherFrom="farming pearls and harvesting barnacles"
        differences={<p>
          <SkillLink skillset="Basic" name="Reckless Charge" /> replaces <SkillLink skillset="Basic" name="Back Kick" />,
          giving this mount three movement abilities.
        </p>}
      />,
  },
  {
    name: 'Gallant Brown Lilyut Horse',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      'Mounted Defense',
      'Breakthrough',
      'Reckless Charge',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Brown Horse"
        mountFrom="Brown Lilyut Horse"
        material={ITEM.TOPAZ}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Reckless Charge" /> replaces <SkillLink skillset="Basic" name="Back Kick" />,
          giving this mount three movement abilities.
        </p>}
      />,
  },
  {
    name: 'Gallant Buckskin Lilyut Horse',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      'Mounted Defense',
      'Breakthrough',
      'Reckless Charge',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Buckskin"
        mountFrom="Buckskin Lilyut Horse"
        material={ITEM.TOPAZ}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Reckless Charge" /> replaces <SkillLink skillset="Basic" name="Back Kick" />,
          giving this mount three movement abilities.
        </p>}
      />,
  },
  {
    name: 'Gallant Green Elk',
    speed: 11.5,
    skills: [
      'Mounted Arrowshot',
      ['Run'],
      ['Mounted Fire Arrow Gallant'],
      'Elegant Leap',
      'Precise Shot',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Green Elk"
        mountFrom="Green Elk"
        material={ITEM.TOPAZ}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Mounted Fire Arrow" /> gains a reduced cooldown but loses damage.<br />
          <SkillLink skillset="Basic" name="Snipe" /> loses its combo, but increases further ranged damage on the
          target.
        </p>}
      />,
  },
  {
    name: 'Gallant White Elk',
    speed: 11.5,
    skills: [
      'Mounted Arrowshot',
      ['Run'],
      ['Mounted Fire Arrow Gallant'],
      'Elegant Leap',
      'Precise Shot',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="White Elk"
        mountFrom="White Elk"
        material={ITEM.DIAMOND}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Mounted Fire Arrow" /> gains a reduced cooldown but loses damage.<br />
          <SkillLink skillset="Basic" name="Snipe" /> loses its combo, but increases further ranged damage on the
          target.
        </p>}
      />,
  },
  {
    name: 'Gallant Violet Elk',
    speed: 11.5,
    skills: [
      'Mounted Arrowshot',
      ['Run'],
      ['Mounted Fire Arrow Gallant'],
      'Elegant Leap',
      'Precise Shot',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Violet Elk"
        mountFrom="Violet Elk"
        material={ITEM.AMETHYST}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Mounted Fire Arrow" /> gains a reduced cooldown but loses damage.<br />
          <SkillLink skillset="Basic" name="Snipe" /> loses its combo, but increases further ranged damage on the
          target.
        </p>}
      />,
  },
  {
    name: 'Gallant Coalmane Snowlion',
    speed: 11.5,
    skills: [
      'Overrun',
      ['Run'],
      'Beastsense',
      ['Dash Gallant'],
      'Leader of the Pack',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Coalmane"
        mountFrom="Coalmane Snowlion"
        material={ITEM.BLACK_PEARL}
        gatherFrom="farming pearls and harvesting barnacles"
        differences={<p>
          <SkillLink skillset="Basic" name="Beastsense" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Mounted Arrowshot" />, swapping tagging utility for increased stealth
          detection.<br />
          <SkillLink skillset="Basic" name="Leader of the Pack" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Anabolica" />, providing high engage speed in group situations.<br />
          <SkillLink skillset="Basic" name="Dash" /> now shares a cooldown with&nbsp;
          <SkillLink skillset="Basic" name="Leader of the Pack" />.
        </p>}
      />,
  },
  {
    name: 'Gallant Sandmane Snowlion',
    speed: 11.5,
    skills: [
      'Overrun',
      ['Run'],
      'Beastsense',
      ['Dash Gallant'],
      'Leader of the Pack',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Sandmane"
        mountFrom="Sandmane Snowlion"
        material={ITEM.TOPAZ}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Beastsense" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Mounted Arrowshot" />, swapping tagging utility for increased stealth
          detection.<br />
          <SkillLink skillset="Basic" name="Leader of the Pack" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Anabolica" />, providing high engage speed in group situations.<br />
          <SkillLink skillset="Basic" name="Dash" /> now shares a cooldown with&nbsp;
          <SkillLink skillset="Basic" name="Leader of the Pack" />.
        </p>}
      />,
  },
  {
    name: 'Gallant Snowmane Snowlion',
    speed: 11.5,
    skills: [
      'Overrun',
      ['Run'],
      'Beastsense',
      ['Dash Gallant'],
      'Leader of the Pack',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Sandmane"
        mountFrom="Sandmane Snowlion"
        material={ITEM.DIAMOND}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Beastsense" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Mounted Arrowshot" />, swapping tagging utility for increased stealth
          detection.<br />
          <SkillLink skillset="Basic" name="Leader of the Pack" /> replaces&nbsp;
          <SkillLink skillset="Basic" name="Anabolica" />, providing high engage speed in group situations.<br />
          <SkillLink skillset="Basic" name="Dash" /> now shares a cooldown with&nbsp;
          <SkillLink skillset="Basic" name="Leader of the Pack" />.
        </p>}
      />,
  },
  {
    name: 'Gallant Browntail Leomorph',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      ['Drop Back Gallant'],
      'Enhanced Owner\'s Escape',
      'Improved Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Browntail"
        mountFrom="Browntail Leomorph"
        material={ITEM.TOPAZ}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Drop Back" /> gains an additional 3 meter distance, but gains 2 additional
          seconds on its cooldown.<br />
          <SkillLink skillset="Basic" name="Owner's Escape" /> grants you a move speed increase after teleporting.<br />
          <SkillLink skillset="Basic" name="Stealth Move" />'s cooldown and move speed penalty are halved.
        </p>}
      />,
  },
  {
    name: 'Gallant Whitetail Leomorph',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      ['Drop Back Gallant'],
      'Enhanced Owner\'s Escape',
      'Improved Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Whitetail"
        mountFrom="Whitetail Leomorph"
        material={ITEM.DIAMOND}
        gatherFrom="mining Fortuna veins"
        differences={<p>
          <SkillLink skillset="Basic" name="Drop Back" /> gains an additional 3 meter distance, but gains 2 additional
          seconds on its cooldown.<br />
          <SkillLink skillset="Basic" name="Owner's Escape" /> grants you a move speed increase after teleporting.<br />
          <SkillLink skillset="Basic" name="Stealth Move" />'s cooldown and move speed penalty are halved.
        </p>}
      />,
  },
  {
    name: 'Gallant Blacktail Leomorph',
    speed: 11.5,
    skills: [
      'Mounted Attack',
      ['Run'],
      ['Drop Back Gallant'],
      'Enhanced Owner\'s Escape',
      'Improved Stealth Move',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CRAFTED,
    ],
    obtainText:
      <GALLANT_HOW_TO
        animaType="Blacktail"
        mountFrom="Blacktail Leomorph"
        material={ITEM.BLACK_PEARL}
        gatherFrom="farming pearls and harvesting barnacles"
        differences={<p>
          <SkillLink skillset="Basic" name="Drop Back" /> gains an additional 3 meter distance, but gains 2 additional
          seconds on its cooldown.<br />
          <SkillLink skillset="Basic" name="Owner's Escape" /> grants you a move speed increase after teleporting.<br />
          <SkillLink skillset="Basic" name="Stealth Move" />'s cooldown and move speed penalty are halved.
        </p>}
      />,
  },
  {
    name: 'Thunder Dash',
    quote: 'Legendary for its speed, this mount evolved from a Stormdarter.',
    speed: 11.5,
    skills: [
      'Vicious Bite',
      'Overrun',
      'Thunder Dash',
      'Ram',
      'Terrifying Roar',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      QUEST,
    ],
    obtainText: <React.Fragment>
      <Typography color="primary"><span className="dropdown-icon Quest" /> Past the Storm, Now the Thunder</Typography>
      <p>After obtaining a <Link to="/mount/stormdarter">Stormdarter</Link>, this quest will be available from
        any Honor Point Collector.</p>
      <p>To complete this quest, you must summon a level 50 Stormdarter and have&nbsp;
        <ItemLink item={ITEM.HONORFORGED_MEDAL} count={15} /> (costs&nbsp;
        <Currency type={CURRENCY.HONOR} count="30,000" inline /> from the Honor Shop).</p>
      <p>As a reward, you will receive an Essence-fed Stormdarter which can be consumed to grant you a level 30 Thunder
        Dash.</p>
    </React.Fragment>,
  },
  {
    name: 'Ebonfur Bjorne',
    quote: 'This hulking bear may look fierce, but has been trained to be a protective--and cuddly--mount.',
    speed: 10.2,
    skills: [
      ['Run'],
      'I Am the Bear!',
      'Health Regen',
      'Roll',
      'Carry and Run',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      QUEST,
    ],
    obtainText: <React.Fragment>
      <MapEmbed
        zone={ZONE.MIRAGE_ISLE}
        points={[
          { label: ['Morudo', 'Garini'], coords: [{ x: 38.5, y: 25.5 }, { x: 28, y: 34.5 }] },
        ]}
        button="View on Map"
        buttonFloat="right"
      />
      <Typography color="primary"><span className="dropdown-icon Quest" /> Be Prepared for Anything</Typography>
      <p>After obtaining a <Link to="/mount/polaris-bjorne">Polaris Bjorne</Link>, this quest
        will be available from the daru Morudo in Mirage Isle.</p>
      <p>To complete this quest, you must summon a level 50 Polaris Bjorne and have a <ItemLink
        item={ITEM.PUREBRED_BEAR_CERTIFICATE} count={1} /> (purchase for <Currency
        type={CURRENCY.COIN} count={1000000} inline /> from any Stablehand) and <ItemLink
        item={ITEM.HONEY} count={500} plural="" />.</p>
      <p>As a reward, you will receive an Sealed Ebonfur Bjrone (cannot be traded) which can be consumed to grant you an
        Ebonfur Bjorne.</p>
      <Typography color="primary"><span className="dropdown-icon Quest" /> Going Bear-zerk</Typography>
      <p>After obtaining a Fleetpaw Bjorne (current obtainment method is unknown), this quest will be available
        from the daru Garini in Mirage Isle.</p>
      <p>To complete this quest, you must summon a level 50 Fleetpaw Bjorne and have a <ItemLink
        item={ITEM.PUREBRED_BEAR_CERTIFICATE} count={1} /> (purchase for <Currency
        type={CURRENCY.COIN} count={1000000} inline /> from any Stablehand) and <ItemLink
        item={ITEM.HONEY} count={500} plural="" />.</p>
      <p>As a reward, you will receive an Sealed Ebonfur Bjrone (cannot be traded) which can be consumed to grant you an
        Ebonfur Bjorne.</p>
    </React.Fragment>,
  },
  {
    name: 'Yata',
    quote: 'In a long race, the average yata could easily outpace the average horse. However, yatas aren\'t as robust in a fight; it\'s sadly impossible to cuddle something to death.',
    speed: 9,
    skills: [
      'Fleeing Yata',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainable: [
      CURRENCY.COIN,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      <Typography>The Yata mount can be purchased as a calf from any Stablehand for&nbsp;
        <Currency type={CURRENCY.COIN} count={50000} inline /> and raised.</Typography>
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={500} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Striped Yata',
    quote: 'In a long race, the average yata could easily outpace the average horse. However, yatas aren\'t as robust in a fight; it\'s sadly impossible to cuddle something to death.',
    speed: 10.5,
    skills: [
      'Fleeing Yata',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainable: [
      HUSBANDRY,
    ],
    obtainText: <React.Fragment>
      <Typography>The Striped Yata Calf is a common drop from pregnant Cashmere Yatas, which is an uncommon event that
        occurs when a female Cashmere Yata is nearby a male Cashmere Yata. Some players partake in yata breeding, which
        involves filling many farms with Cashmere Yatas for the chance to produce rare pets.</Typography>
      <p>The calf can be traded and sold on the auction house. As the breeding process can be expensive, it might be
        more worthwhile to find a yata breeder and buy a calf from them.</p>
      <p>Once you have a calf, simply raise it to get this mount.</p>
      <p>When compared to the Yata, this mount has increased speed.</p>
    </React.Fragment>,
  },
  {
    name: 'Palomino Yata',
    quote: 'In a long race, the average yata could easily outpace the average horse. However, yatas aren\'t as robust in a fight; it\'s sadly impossible to cuddle something to death.',
    speed: 10.5,
    skills: [
      ['Run'],
      'Fleeing Yata',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainable: [
      HUSBANDRY,
    ],
    obtainText: <React.Fragment>
      <Typography>The Palomino Yata Calf is a rare drop from pregnant Cashmere Yatas, which is an uncommon event that
        occurs when a female Cashmere Yata is nearby a male Cashmere Yata. Some players partake in yata breeding, which
        involves filling many farms with Cashmere Yatas for the chance to produce rare pets.</Typography>
      <p>The calf can be traded and sold on the auction house. As the breeding process can be expensive, it might be
        more worthwhile to find a yata breeder and buy a calf from them.</p>
      <p>Once you have a calf, simply raise it to get this mount.</p>
      <p>When compared to the Striped Yata, this mount has the <SkillLink skillset="Basic" id="Run" /> skill, and is
        equivalent to the Black Yata.</p>
    </React.Fragment>,
  },
  {
    name: 'Black Yata',
    quote: 'In a long race, the average yata could easily outpace the average horse. However, yatas aren\'t as robust in a fight; it\'s sadly impossible to cuddle something to death.',
    speed: 10.5,
    skills: [
      ['Run'],
      'Fleeing Yata',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainable: [
      HUSBANDRY,
    ],
    obtainText: <React.Fragment>
      <Typography>The Palomino Yata Calf is a rare drop from pregnant Cashmere Yatas, which is an uncommon event that
        occurs when a female Cashmere Yata is nearby a male Cashmere Yata. Some players partake in yata breeding, which
        involves filling many farms with Cashmere Yatas for the chance to produce rare pets.</Typography>
      <p>The calf can be traded and sold on the auction house. As the breeding process can be expensive, it might be
        more worthwhile to find a yata breeder and buy a calf from them.</p>
      <p>Once you have a calf, simply raise it to get this mount.</p>
      <p>When compared to the Striped Yata, this mount has the <SkillLink skillset="Basic" id="Run" /> skill, and is
        equivalent to the Palomino Yata.</p>
    </React.Fragment>,
  },
  {
    name: 'Polaris Bjorne',
    quote: 'This hulking bear may look fierce, but has been trained to be a protective--and cuddly--mount.',
    upgrade: 'Ebonfur Bjorne',
    speed: 10.5,
    skills: [
      ['Run'],
      'I Am the Bear!',
      'Health Regen',
      'Carry and Run',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      HUSBANDRY,
    ],
    obtainText: <React.Fragment>
      <Typography>The Polaris Cub is produced by pregnant Blizzard Bears, which is an uncommon event that
        occurs when a female Blizzard Bear is nearby a male Blizzard Bear. Some players partake in bear breeding, which
        involves filling many farms with Blizzard Bears for the chance to produce rare pets.</Typography>
      <p>The cub can be traded and sold on the auction house. As the breeding process can be expensive, it might be
        more worthwhile to find a yata breeder and buy a calf from them.</p>
      <p>The the cub is raised, it will either become the Polaris Ursun (which is a battle pet) or the Polaris Bjorne
        (this mount).</p>
      <p>Note that the upgrade loses 0.3 m/s in speed, but gains the skill <SkillLink skillset="Basic" name="Roll" />.
      </p>
    </React.Fragment>,
  },
  {
    name: 'Fuchsiafin',
    quote: 'It\'s said Dahuta, the Goddess of the Sea, created this species in a rare moment of tenderness, simply to enjoy their beauty. Others claim she utilizes their speed by harnessing them to her personal chariot.',
    speed: 7.5,
    skills: [
      'Scan Ships',
      'Dolphin Dash',
      'Produce ultrasonic waves',
      'Acrobatics',
    ],
    types: [
      MOUNT_TYPE.AQUATIC,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
      CRAFTED,
    ],
    obtainText: <React.Fragment>
      <MapEmbed
        zone={ZONE.SEA_OF_DROWNED_LOVE}
        points={[
          { label: ['Sea of Drowned Love', 'Center of Dahuta\'s Power'], coords: [{ x: 51, y: 76.6 }] },
        ]}
        button="View on Map"
        buttonFloat="right"
      />
      <Typography>This mount can be obtained in one of two ways.</Typography>
      <p>The first is by collecting materials from the 5-player dungeon, Sea of Drowned Love. You will need the
        following materials and can combine them at the workbench "Center of Dahuta's Power" located in the Sunspeck
        Sea:</p>
      <ul>
        <li>
          <ItemLink item={ITEM.CHILLED_SEAFOAM} count={35} plural="" noLink />
          <ul>
            <li>Drops from the final boss, Dahuta. Only one drops per kill and only one player will get it. Can be
              traded.
            </li>
          </ul>
        </li>
        <li>
          <ItemLink item={ITEM.ABYSSAL_CRYSTAL} count={10} noLink />
          <ul>
            <li>Drops from bosses in Greater dungeons or higher as personal loot and from daily quests. Can also be
              crafted, though expensive.
            </li>
          </ul>
        </li>
      </ul>
      <p>Alternatively, Fuchsiafin can be created using <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={80} />.</p>
    </React.Fragment>,
  },
  {
    name: 'Cyanfin',
    quote: 'It\'s said Dahuta, the Goddess of the Sea, created this species in a rare moment of tenderness, simply to enjoy their beauty. Others claim she utilizes their speed by harnessing them to her personal chariot.',
    speed: 7.5,
    skills: [
      'Scan Ships',
      'Dolphin Dash',
      'Produce ultrasonic waves',
      'Acrobatics',
    ],
    types: [
      MOUNT_TYPE.AQUATIC,
    ],
    obtainText: <p>This mount used to be obtainable on Legacy from the Aquatic Archeum Supply Crate.</p>,
  },
  {
    name: 'White Donkey',
    quote: 'This shaggy donkey walks surprisingly quickly.',
    speed: 7.2,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
      MOUNT_TYPE.STARTER,
    ],
    obtainable: [
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
      QUEST,
    ],
    obtainText: <React.Fragment>
      {DONKEY_HOW_TO}
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={600} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Brown Donkey',
    quote: 'This shaggy donkey walks surprisingly quickly.',
    speed: 7.2,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
      MOUNT_TYPE.STARTER,
    ],
    obtainable: [
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
      QUEST,
    ],
    obtainText: <React.Fragment>
      {DONKEY_HOW_TO}
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={600} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Gray Donkey',
    quote: 'This shaggy donkey walks surprisingly quickly.',
    speed: 7.2,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
      MOUNT_TYPE.STARTER,
    ],
    obtainable: [
      CURRENCY.VOCATION,
      CURRENCY.CREDIT,
      QUEST,
    ],
    obtainText: <React.Fragment>
      {DONKEY_HOW_TO}
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={600} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'Black Donkey',
    quote: 'This shaggy donkey walks surprisingly quickly.',
    speed: 7.2,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
      MOUNT_TYPE.STARTER,
    ],
    obtainable: [
      CURRENCY.VOCATION,
      QUEST,
    ],
    obtainText: DONKEY_HOW_TO,
  },
  {
    name: 'Mirage Donkey',
    quote: 'This donkey was born in a region known for its fine mounts, but raised in the magic of Mirage Isle. It\'s a little faster than its brethren.',
    speed: 8.0,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
    ],
  },
  {
    name: 'Carrot Dash',
    quote: 'A donkey of a different color, this brilliant citrine creature walks much faster than ordinary donkeys. It gets its unusual hue from eating far too many carrots.',
    speed: 9.0,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={150} />.
    </Typography>,
  },
  {
    name: 'Carrot Wings',
    quote: 'An unfortunate magical accident has gifted this Carrot Dash with a pair of stubby little wings. While the effects left the poor creature a bit... strange, its speed is without question. And the limited bursts of flight can prove quite useful to a skilled rider.',
    speed: 9.0,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
      'Powerful Wingbeats',
    ],
    types: [
      MOUNT_TYPE.DONKEY,
    ],
    obtainable: [
      CURRENCY.VOCATION,
    ],
    obtainText: <Typography>
      This mount can be purchased for <Currency type={CURRENCY.VOCATION} count="450,000" inline /> from the Vocation
      Shop.
    </Typography>,
  },
  {
    name: 'Soulmule',
    quote: 'Not all of Nui\'s messengers are graceful mares and stallions. Some take the form of simpler creatures, and offer their assistance with life\'s more mundane struggles.',
    speed: 9.0,
    skills: [
      'Dreaming Donkey',
      'La Mancha\'s Call',
      ['Nui\'s Veil Donkey'],
    ],
    types: [
      MOUNT_TYPE.DONKEY,
    ],
    obtainable: [
      CURRENCY.VOCATION,
      CURRENCY.MANASTORM,
    ],
    obtainText: <React.Fragment>
      <Typography>This mount can be purchased for <Currency type={CURRENCY.VOCATION} count="600,000" inline /> from
        the Vocation Shop.</Typography>
      <p>This mount can also be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={150} />.</p>
    </React.Fragment>,
  },
  {
    name: 'Mirage Lilyut Horse',
    quote: 'This horse is was born in the Lilyut Hills, a region known for its fine horses, but raised in the magic of Mirage Isle. It\'s a little faster than its brethren.',
    speed: 10.5,
    skills: [
      ['Run'],
      'Mounted Attack',
      'Back Kick',
      'Quick Movement',
      'Breakthrough',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.CREDIT,
    ],
    obtainText: <Typography>
      This mount is only obtainable on Legacy and can be purchased for&nbsp;
      <Currency type={CURRENCY.CREDIT} count={1345} inline />.
    </Typography>,
  },
  {
    name: 'Black Lilyut Horse',
    quote: 'This horse is was born in the Lilyut Hills, a region known for its fine horses, but raised in the magic of Mirage Isle. It\'s a little faster than its brethren.',
    speed: 10.2,
    skills: [
      ['Run'],
      'Mounted Attack',
      'Back Kick',
      'Quick Movement',
      'Breakthrough',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
  },
  {
    name: 'Mirage Snowlion',
    quote: 'This snowlion was born in the Falcorth Plains, a region known for its fine mounts, but raised in the magic of Mirage Isle. It\'s a little faster than its brethren.',
    speed: 10.2,
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Overrun',
      'Anabolica',
      'Dash',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.CREDIT,
    ],
    obtainText: <Typography>
      This mount is only obtainable on Legacy and can be purchased for&nbsp;
      <Currency type={CURRENCY.CREDIT} count={1345} inline />.
    </Typography>,
  },
  {
    name: 'Tamed Owlina',
    quote: 'Native to the Hiram Mountains, Owlinas have adapted to the chilling colds and rough landscapes of this area. The Hiram, recognizing the animal\'s emanating warm aura and strong carrying capacities, trained wild Ownlinas to become their companions and personal space heaters.',
    speed: 11.5,
    skills: [
      ['Run Owlina'],
      'Ripping Claws',
      'Protective Roll',
      'Floofy',
      'Wild Gaze',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      QUEST,
    ],
    obtainText: <Typography>Obtained from the quest <Typography color="primary" component="span"><span
      className="dropdown-icon Quest" /> Neverending Disaster</Typography>, the 8th and final quest of the story chapter
      "Hiram Mountains Chapter 3. Hage's Prophecy". </Typography>,
  },
  {
    name: 'Frost Dragon',
    quote: 'After the great dragon god Misagon was slain by the ancient Nuons, dragonkind vanished from the world. But in dark corners and hidden lairs, secretive dragon cults have attempted to revive them throughout the years. Raised from hibernating eggs discovered in the Frozen Cradle, these frost dragons are proof that their kind may yet return to Erenor.',
    speed: 11.5,
    skills: [
      ['Run Glide'],
      ['Glide Dragon'],
      'Chilling Footsteps',
      'Ice Shield',
      'Frost Breath',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Typhoon Drake',
    quote: 'Typhoon Drakes were first tamed by a courageous Warborn, who\'d spent years laboring in a wealthy Harani\'s stables. The nobleman had no idea how much his stall mucker was secretly learning.',
    speed: 11.5,
    skills: [
      'A Dashardly Plan',
      'Overwhelm',
      'Lightning Glide',
      'Conductive Charge',
      'Thunderbreath',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Candy-fueled Bestcargot',
    quote: 'Empowered by the Purple Pumpkin Candies, Bestcargot can now climb hills faster than any other snail.',
    speed: 5,
    skills: [
      'Pumpkin Candy Power',
      'Buck Up, Friends',
      'Launch Owner',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={80} />.
    </Typography>,
  },
  {
    name: 'Candy-fueled Fastropod',
    quote: 'Empowered by the Azure Pumpkin Candies, Fastropod can now climb hills faster than any other snail.',
    speed: 5,
    skills: [
      'Buck Up, Friends',
      'Launch Owner',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainText: <p>
      On Legacy, this mount was previously available as a reward from Hallowtide festivities.
    </p>,
  },
  {
    name: 'Candy-fueled Shellraiser',
    quote: 'Empowered by the Yellow Pumpkin Candies, Shellraiser can now climb hills faster than any other snail.',
    speed: 5,
    skills: [
      'Pumpkin Candy Power',
      'Buck Up, Friends',
    ],
    types: [
      MOUNT_TYPE.CLIMBING,
    ],
    obtainText: <p>
      On Legacy, this mount was previously available as a reward from Hallowtide festivities.
    </p>,
  },
  {
    name: 'Flaming Soulscar',
    quote: 'This elemental tiger embodies the rage and destruction that dwells within its kind. It appears only to those who match its fury, carrying them into battle in a burst of fire and glory.',
    speed: 11.5,
    skills: [
      ['Gnaw Predator'],
      '4-Leg Lope',
      ['Overrun Predator'],
      ['Dash Predator'],
      'Invisible Predator',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Freezing Soulscar',
    quote: 'This elemental tiger embodies the beauty and cunning for which all tigers are known. It chooses only the wisest and most clever riders, guiding them in battle and protecting them from danger.',
    speed: 11.5,
    skills: [
      ['Gnaw Predator'],
      '4-Leg Lope',
      ['Overrun Predator'],
      ['Dash Predator'],
      'Invisible Predator',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Vanhi',
    quote: 'Once thought to be an old soldier\'s tale, this legendary tiger is an omen of war throughout Haranya.',
    speed: 11.5,
    skills: [
      ['Gnaw Predator'],
      '4-Leg Lope',
      ['Overrun Predator'],
      ['Dash Predator'],
      'Invisible Predator',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Kamari',
    quote: 'Empress Pavitra\'s cavalrymen were feared across the continent for riding ferocious golden war tigers into battle. The most bloodthirsty tiger, Kamari, belonged to one of her generals. Now, all golden tigers are known by that name.',
    speed: 11.5,
    skills: [
      ['Gnaw Predator'],
      '4-Leg Lope',
      ['Overrun Predator'],
      ['Dash Predator'],
      'Invisible Predator',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      <Typography>
        On Legacy, this mount can be purchased for <Currency type={CURRENCY.CREDIT} count={2500} inline />.
      </Typography>
      <p>On Unchained, it currently cannot be obtainable.</p>
    </React.Fragment>,
  },
  {
    name: 'Hellwing Pegasus',
    quote: 'Born in the fires of Esya Dena, the Hellwing Pegasus is nearly impossible to catch. Many a hunter has lost their life in pursuit of this noble creature, realizing far too late that no mortal net can contain its burning fury.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Pega-Glide',
      'Skydash',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={150} />.
    </Typography>,
  },
  {
    name: 'Stormwing Pegasus',
    quote: 'The embodiment of thunder and lightning, this mythical creature is as wild as the storms that birthed it. Only the very brave or very foolish dare to ride it.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Pega-Glide',
      'Skydash',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Celestial Pegasus',
    quote: 'Said to make its home amongst the clouds, the Celestial Pegasus will only carry a rider it deems worthy.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Pega-Glide',
      'Skydash',
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={250} />.
    </Typography>,
  },
  {
    name: 'Earthen Roar',
    quote: 'Sturdy and very fast.',
    upgrade: 'Crimson Lightning',
    speed: 10.2,
    skills: [
      ['Run'],
      'Gnaw',
      'Overrun',
      'Health Regen',
      'Dash',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.DILIGENCE,
    ],
    obtainText: <React.Fragment>
      <Typography>
        On Unchained, this mount can be obtained for <ItemLink item={ITEM.DILIGENCE_COIN} count={550} />.
      </Typography>
      <p>On Legacy, this mount is no longer obtainable.</p>
    </React.Fragment>,
  },
  {
    name: 'Steel Lightning',
    quote: 'This fearless snowlion is rumored to have been born during a midnight lightning storm, as the moon dyed each strike a steely blue.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Vicious Bite',
      'Overrun',
      'Ram',
      'Lightning Stealth',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Crimson Lightning',
    quote: 'This fearless snowlion is rumored to have been born during a sunset lightning storm, as the sun dyed each strike a bloody red.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Vicious Bite',
      'Overrun',
      'Ram',
      'Lightning Stealth',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <React.Fragment>
      <MapEmbed
        zone={ZONE.HASLA}
        points={[
          { label: 'Hasaru', coords: [{ x: 58.2, y: 81.3 }] },
        ]}
        button="View on Map"
        buttonFloat="right"
      />
      <Typography>If you have an <Link to="/mounts/earthen-roar">Earthen Roar</Link>, you can upgrade it into this mount
        by using <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={100} /> to obtain a Crimson Lightning
        Essence.</Typography>
      <p>The essence, along with a level 50 Earthen Roar, can be presented to Hasaru, the Stablehand at the Abandoned
        Drill Camp in Hasla, to complete the quest <span className="dropdown-icon Quest" />&nbsp;
        <Typography color="primary" component="span">A Bolt of Crimson Lightning</Typography> in exchange for a Crimson
        Lightning.</p>
      <p>
        Alternatively, this mount can be obtained outright for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
      </p>
    </React.Fragment>,
  },
  {
    name: 'Moonlight Kitsu',
    quote: 'The Moonlight Kitsu is a creature of beauty and enchantment. It can mesmerize its prey with a wave of its glowing tails, rendering them helpless to its attacks. Those lucky enough to tame such a creature often learn to use its powers in battle, charming enemies to increase the effectiveness of their own spells.',
    speed: 11.5,
    skills: [
      'Power Dash',
      'Overrun',
      'Scratch',
      ['Dash 1m'],
      'Bewitching Tails',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Celestial Kitsu',
    quote: 'A supreme form of the elegant kitsu pet, this shy mount was long thought to exist in legends only. It has revealed itself only as more of Auroria has been reclaimed. Its skills focus on preventing damage and recovering health.',
    speed: 11.5,
    skills: [
      'Overrun',
      'Health Regen',
      'Power Dash',
      'Quick Movement',
      'Protective Dash',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={150} />.
    </Typography>,
  },
  {
    name: 'Siegeram Taurus',
    quote: 'Built by Andelph machinists as a gift to the people of Marianople, the Taurus spent years as nothing more than a mechanical novelty. It wasn\'t until the Demon War that the construct\'s military applications were fully realized; historians still credit its terrifying strength as one of the city\'s most valuable assets in their defense against the Warborn.',
    speed: 11.5,
    skills: [
      'Iron Dash',
      'Rocket Lunge',
      'Kinetic Shield',
      'Juggernaut Charge',
      'Rampage',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={150} />.
    </Typography>,
  },
  {
    name: 'Stormrose',
    quote: 'Related to the Soulmare, these ghostly steeds are said to come from the Hereafter itself. Legends claim that they will serve their chosen riders even after death.',
    speed: 11.5,
    skills: [
      'Back Kick',
      'Hereafter Dash',
      'Nui\'s Veil',
      'Ghostly Steps',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={100} />.
    </Typography>,
  },
  {
    name: 'Brown Reindeer',
    speed: 11.5,
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
      CURRENCY.CREDIT,
    ],
    obtainText: <React.Fragment>
      <Typography>This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={100} />.</Typography>
      <p>On Legacy, this mount can also be purchased for <Currency type={CURRENCY.CREDIT} count={1345} inline />.</p>
    </React.Fragment>,
  },
  {
    name: 'White Reindeer',
    speed: 11.5,
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainText: <p>
      On Legacy, this mount was once obtainable from the Rudolph Archeum Supply Crate.
    </p>,
  },
  {
    name: 'Black Reindeer',
    speed: 11.5,
    skills: [
      ['Run'],
      'Mounted Arrowshot',
      'Mounted Fire Arrow',
      'Snipe',
      'Elegant Leap',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainText: <p>
      On Legacy, this mount was once obtainable from the Rudolph Archeum Supply Crate.
    </p>,
  },
  {
    name: 'Stormwraith Kirin',
    quote: 'These ancient creatures are said to have been created by a Nuon god. Combining the elegant spirit of an elk with the ferocious nature of a wolf, Kirin act as magical guardians of the remote wilds of Erenor.',
    speed: 11.5,
    skills: [
      ['Run Kirin'],
      'Shred',
      ['Overrun Kirin'],
      'Guardian\'s Eyes',
      'Evasive Leap',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={200} />.
    </Typography>,
  },
  {
    name: 'Gweonid Vine Giant',
    quote: 'An Elven mage of Gweonid, Hyrion, created this mount using the vines and branches of the massive Green Lord itself.',
    speed: 11.5,
    skills: [
      'Boulder Toss',
      ['Run Vine Giant'],
      'Strangling Vines',
      'Wild Charge',
      'Force of Nature',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.MANASTORM,
    ],
    obtainText: <Typography>
      This mount can be obtained for <ItemLink item={ITEM.MANASTORM_CRYSTAL} count={100} />.
    </Typography>,
  },
  {
    name: 'Lady Fluffsworth',
    quote: 'The mysterious heir to the Fluffsworth estate, this gentle doe enjoys poetry, painting, and long hops on the beach.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Hippity Hop',
      'Hop Back',
      'Owner\'s Escape',
      'Carrot Care',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.DILIGENCE,
    ],
    obtainText: <React.Fragment>
      <Typography>On Legacy, this mount cannot currently be obtained.</Typography>
      <p>On Unchained, this mount can be purchased for <ItemLink item={ITEM.DILIGENCE_COIN} count={140} />.</p>
    </React.Fragment>,
  },
  {
    name: 'Lord Cottontail',
    quote: 'The only rabbit rumored to possess his own pack of hunting dogs, Lord Cottontail is the iron-pawed patriarch of the legendary Cottontail family. All of his dates are very important, and he is never late. Ever.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Hippity Hop',
      'Hop Back',
      'Owner\'s Escape',
      'Carrot Care',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.DILIGENCE,
    ],
    obtainText: <React.Fragment>
      <Typography>On Legacy, this mount cannot currently be obtained.</Typography>
      <p>On Unchained, this mount can be purchased for <ItemLink item={ITEM.DILIGENCE_COIN} count={140} />.</p>
    </React.Fragment>,
  },
  {
    name: 'Sir Hoppington',
    quote: 'A notorious rogue, Sir Hoppington fills his days with practical jokes, carrot-eating competitions, and daring midnight raids on the local farmers\' vegetable gardens.',
    speed: 11.5,
    skills: [
      ['Run'],
      'Hippity Hop',
      'Hop Back',
      'Owner\'s Escape',
      'Carrot Care',
    ],
    types: [
      MOUNT_TYPE.STANDARD,
    ],
    obtainable: [
      CURRENCY.DILIGENCE,
    ],
    obtainText: <React.Fragment>
      <Typography>On Legacy, this mount cannot currently be obtained.</Typography>
      <p>On Unchained, this mount can be purchased for <ItemLink item={ITEM.DILIGENCE_COIN} count={140} />.</p>
    </React.Fragment>,
  },
  {
    name: 'Andelph Drakora',
    quote: 'During the wars between the dwarves and the Astras, it was the Astras\' wings and their dominance over the air that kept the dwarves at bay. Desperate for the tides of battle to turn, a dwarven inventor constructed a mechanical creature that would take to the skies. In the presence of the Andelph Drakora, no Astra dared take flight.',
    speed: 16,
    skills: [
      ['Run Drakora'],
      ['Glide Drakora'],
      ['Breakthrough Drakora'],
    ],
    types: [
      MOUNT_TYPE.FLYING,
    ],
    obtainable: [
      QUEST,
    ],
    obtainText: <React.Fragment>
      <Typography>
        This mount is acquired by completing the <Typography color="primary" component="span">Skywarden
        Collection</Typography>, an achievement for collecting 38 prestigious mounts.
      </Typography>

      <ul className="list-cols">
        <li>
          Celestial Creature
          <ul>
            <li><Link to="/mounts/celestial-pegasus">Celestial Pegasus</Link></li>
            <li><Link to="/mounts/typhoon-drake">Typhoon Drake</Link></li>
            <li><Link to="/mounts/frost-dragon">Frost Dragon</Link></li>
          </ul>
        </li>
        <li>
          Hereafter Herald
          <ul>
            <li><Link to="/mounts/flaming-soulscar">Flaming Soulscar</Link></li>
            <li><Link to="/mounts/soulmule">Soulmule</Link></li>
            <li><Link to="/mounts/stormrose">Stormrose</Link></li>
          </ul>
        </li>
        <li>
          Stormy Soul
          <ul>
            <li><Link to="/mounts/thunder-dash">Thunder Dash</Link></li>
            <li><Link to="/mounts/steel-lightning">Steel Lightning</Link></li>
            <li><Link to="/mounts/cloudstrike-panther">Cloudstrike Panther</Link></li>
          </ul>
        </li>
        <li>
          Winter Wildlife
          <ul>
            <li><Link to="/mounts/freezing-soulscar">Freezing Soulscar</Link></li>
            <li><Link to="/mounts/brown-reindeer">Brown Reindeer</Link></li>
            <li><Link to="/mounts/moonfeather-griffin">Moonfeather Griffin</Link></li>
          </ul>
        </li>
        <li>
          Fiery Familiar
          <ul>
            <li><Link to="/mounts/vanhi">Vanhi</Link></li>
            <li><Link to="/mounts/hellwing-pegasus">Hellwing Pegasus</Link></li>
            <li><Link to="/mounts/crimson-lightning">Crimson Lightning</Link></li>
          </ul>
        </li>
        <li>
          Shadowy Sidekick
          <ul>
            <li><Link to="/mounts/moonlight-kitsu">Moonlight Kitsu</Link></li>
            <li><Link to="/mounts/stormwraith-kirin">Stormwraith Kirin</Link></li>
            <li><Link to="/mounts/stormwing-pegasus">Stormwing Pegasus</Link></li>
          </ul>
        </li>
        <li>
          Best Buddy
          <ul>
            <li><Link to="/mounts/gweonid-vine-giant">Gweonid Vine Giant</Link></li>
            <li><Link to="/mounts/carrot-dash">Carrot Dash</Link></li>
            <li><Link to="/mounts/mirage-bjorne">Mirage Bjorne</Link></li>
            <li><Link to="/mounts/siegeram-tarus">Siegeram Taurus</Link></li>
          </ul>
        </li>
        <li>
          Cute Companion
          <ul>
            <li><Link to="/mounts/candyfueled-bestcargot">Candy-fueled Bestcargot</Link></li>
            <li><Link to="/mounts/coral">Coral</Link></li>
            <li><Link to="/mounts/celstial-kitsu">Celestial Kitsu</Link></li>
          </ul>
        </li>
        <li>
          Pale Pal
          <ul>
            <li><Link to="/mounts/whitetail-leomorph">Whitetail Leomorph</Link></li>
            <li><Link to="/mounts/white-elk">White Elk</Link></li>
            <li><Link to="/mounts/snowrend-boar">Snowrend Boar</Link></li>
            <li><Link to="/mounts/snowmane-snowlion">Snowmane Snowlion</Link></li>
          </ul>
        </li>
      </ul>
    </React.Fragment>,
  },
];

export default MOUNT;
