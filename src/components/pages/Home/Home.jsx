import {
  Link as MuiLink,
  Typography,
} from '@material-ui/core';
import Banner from 'components/Banner';
import Link from 'components/Link';
import NewsPost from 'components/NewsPost';
import navigation from 'constants/navigation';
import React from 'react';
import { setTitle } from 'utils/string';

const Home = () => {
  setTitle();
  return (
    <div>
      <div className="home-banners section">
        {navigation.map(navLink => <Banner {...navLink} text={navLink.name} key={navLink.path || navLink.name} />)}
      </div>
      <NewsPost
        title="Minor Updates"
        date="Feb 19, 2020"
      >
        <p>February 26: Updated Skills and Event Schedule for the 6.2 patch.</p>
        <hr />
        <p>I've been working on a big update, but in the meantime, here are a bunch of fixes (some have been stealthily
          fixed over the past month):</p>
        <ul>
          <li>
            Schedule:
            <ul>
              <li>Updated Leviathan NA timer.</li>
              <li>Added DGS EU timer.</li>
            </ul>
          </li>
          <li>
            Trade Packs:
            <ul>
              <li>Fixed Karkasse Local Specialty missing materials.</li>
              <li>Fixed White Arden's freshness type.</li>
            </ul>
          </li>
          <li>
            Dailies:
            <ul>
              <li>Added daily quests for all of the remodeled houses.</li>
              <li>Clarified the Blue Salt Requests that originally stated "Farmhouse".</li>
              <li>
                Added the Blue Salt residential daily quests (the corresponding quests for Community Center Supplies and
                the Trade Outlet quests).<br />
                Missing the Community Center Supplies zones for Airain Rock, Marianople, Karkasse Ridgelands, and
                Tigerspine Mountains. If you can provide which quest is supplied in any of these zones, please drop me a
                message in Discord.
              </li>
              <li>
                Rewards Filter:
                <ul>
                  <li>Replaced Family XP with Blue Salt Bonds.</li>
                  <li>Fixed Kyrios Badges showing on the list.</li>
                </ul>
              </li>
              <li>Quest Types: removed Bonds.</li>
              <li>
                Added "Reset Filters" option. Use this if you previously had the Family XP or Bonds filter on to get rid
                of them.
              </li>
            </ul>
          </li>
          <li>
            Mounts:
            <ul>
              <li>Fixed some links to mounts in descriptions.</li>
              <li>Updated all Manastorm descriptions to indicate that they can only be obtained in Legacy.</li>
              <li>Added a few missing mount pictures.</li>
              <li>Added an image credit line to the mount description.</li>
            </ul>
          </li>
          <li>Updated ArchePass guide.</li>
          <li>Minor styling fixes.</li>
        </ul>
      </NewsPost>
      <NewsPost
        title="Discord Event Notifications"
        date="Jan 4, 2020"
      >
        <p>The <MuiLink href="https://discord.gg/5acTKYu" target="_blank">Mokulu.io Discord</MuiLink> is
          available for everyone to join. You can get notifications about announcements for ArcheAge Tools and leave
          feedback.</p>
        <p>I've also created a Discord bot that will post messages every time there's an event about to start in
          ArcheAge.</p>
        <p>Patrons have the perk of being mentioned whenever chosen event types are posted, giving them a direct ping as
          a notice.</p>
        <p>The Daily Checklist received new quests:</p>
        <ul>
          <li>Mistsong Summit dailies.</li>
          <li>Castle dailies.</li>
          <li>Safety in Numbers (Blue Salt daily)</li>
        </ul>
        <p>The Trade Pack calculator now allows you to choose the quantity of the price you enter for mats
          (Gold per unit, per 10, or per 100) [Thanks to Travinns]. The labor cost calculation was also fixed to
          properly reduce the labor cost of multiple packs when a proficiency bonus was active.</p>
      </NewsPost>
      <NewsPost
        title="Mount Gallery"
        date="Dec 17, 2019"
      >
        <p>The <Link to="/mounts">Mount Gallery</Link> is now available!</p>
        <p>The Mount Gallery still incomplete, as this game has many mounts, but it has a majority of the available
          mounts in ArcheAge Unchained. Pictures of mounts are available for a large selection of the mounts, but
          unfortunately it's difficult to get them all, and there are guides for obtaining all the available mounts in
          the gallery.</p>
        <p>Mounts will be trickling in from here on.</p>
        <p>The ArchePass reset timer is back, along with a new guide on <Link to="/guides/archepass">the
          ArchePass</Link>.</p>
        <p>12/20/2019: Updated Skills to the 6.1.9 patch.</p>
      </NewsPost>
      <NewsPost
        title="Event Schedule Update"
        date="Nov 27, 2019"
      >
        <p>
          The Event Schedule has received a much needed update. Events are now sorted with the nearest events rising
          towards the top, but actively running events stickied to the very top.
        </p>
        <p>
          I've also added approximations for in-game events, such as the Grimghast and Crimson Rifts. It appears that
          in-game time is synced with UTC but may vary by a minute or so depending on your server.
        </p>
        <p>
          Lastly, I've added "phases" to events. For now, it's only used on Castle Siege and Crimson Rift. Castle Siege
          was broken up into the "Preparation" and "Siege" phases on EU, with only the "Claim" phase available for now
          on NA. Crimson Rift and Crimson Rift (Auroria) were combined into a single timer, with the title alternating
          to indicate whether it was taking place in the mainland or Auroria.
        </p>
        <Typography variant="caption" component="p">
          Library Bosses were permanently removed.<br />
          ArchePass Reset and Ayanad Trader have been temporarily disabled until their respective systems are re-enabled
          in ArcheAge Unchained.
        </Typography>
      </NewsPost>
      <NewsPost
        title="Interactive Trade Pack Calculator"
        date="Nov 22, 2019"
      >
        <p>
          The Interactive Trade Pack Calculator is live! There are two parts to it. The overall page will display a
          single continent's turn-in zone's prices. The percentage that every pack is displayed at can be modified
          with a slider at the top of the page.<br />
          The Commerce and Husbandry proficiencies are used in the second part of the tool...
        </p>
        <p>
          Clicking on any price on a table will open the pack inspector. From here, you will see all materials needed
          to make a pack, along with the ability to enter the price it would cost to obtain one of them.<br />
          Total gold and labor costs are calculated, and a separate demand percentage slider is available here along
          with a dropdown to select the pack's freshness profit, a toggle to include interest, and (for Cinderstone and
          Ynystere) if the +15% War bonus is active. All of this boils down into showing you the profit for this pack
          and the silver per labor of the profit.
        </p>
        <p>
          Guides for general Honor Point gain and Honor Point dailies have been added.
        </p>
        <p>
          Library bosses and Siege timers have been added to the Event Schedule for NA. Know when the EU time is?&nbsp;
          <MuiLink href="https://www.reddit.com/message/compose/?to=mokulu">Send me a reddit PM.</MuiLink>
        </p>
      </NewsPost>
      <NewsPost
        title="Guides"
        date="Nov 9, 2019"
      >
        <p>
          It's been a while since the last update, but that's because I've been making a bunch of guides for ArcheAge
          and there's a lot of content. This preliminary release contains guides for Hiram and Gilda dailies, world
          bosses for CR and GR as well as Meina and Glenn, and for the instances Noryette Challenge and Red Dragon's
          Keep.
        </p>
        <p>
          The Red Dragon's Keep guide may be wrong at some parts and the Noryette Challenge isn't anywhere near
          complete. It's been a while since I've done Red Dragon's Keep and I've never done the Noryette Challenge
          before playing on Unchained.
        </p>
        <p>The Event Schedule was also updated to include links to the newly created guides, as well as a few
          event time fixes.</p>
        <p>Supply Demand dailies on the checklist were reworked to better suit how they work
          in-game.</p>
      </NewsPost>
      <NewsPost
        title="Hide Selective Daily Quests"
        date="Oct 26, 2019"
      >
        <p>
          A new "Hide Mode" has been added to the Daily Checklist. Clicking the "Hide Undesired Quests" button in the
          filters panel will now put you into a "hide mode". All quests are selected by default, and unchecking a
          quest
          will hide it entirely from the normal view of the dailies checklist.<br />When you're done hiding or
          re-showing quests, just click the "Stop Hiding Quests" button to go back to the normal checklist.
        </p>
        <p>
          Event Schedule - Red Dragon's available days have been added.<br />
          Sorting issues have been fixed on Chrome for the Dailies Checklist, Event Schedule, and the Combos section
          of the Skill Builder.
        </p>
      </NewsPost>
      <NewsPost
        title="Thunderstruck Timer"
        date="Oct 22, 2019"
      >
        <p>
          The Thunderstruck tool is now available. You can start timing something of yours from scratch or time
          someone else's public tree farm by entering a remaining time. Timers will count down until each possible
          thunderstruck growth phase for the tree, based on the region's climate.
        </p>
        <p>
          I also made a few fixes for the event schedule page and added the "Clean the Kiddies" daily in Ahnimar to
          the checklist.
        </p>
        <p>
          <b>Update:</b> Event Schedule - Kadum has been added, along with Stillwater Gulf.
        </p>
      </NewsPost>
      <NewsPost
        title="Feedback and Updates"
        date="Oct 20, 2019"
      >
        <p>
          Thank you everyone for the feedback you've provided from my reddit post!
        </p>
        <p>
          - I've implemented a Dark Mode that can be toggled from the navigation menu. <br />
          - I've fixed a couple site issues. <br />
          - Auroria guild quests are now marked as Guild Missions. <br />
          - Kadum raid timer will be added at a later date, some modifications need to be added to support his odd
          availability times.
        </p>
        <p>
          As a note for the event schedule, ArcheAge Unchained's NA servers appear to use EU times for their instance
          availability times. I'll work on adding a method to select Unchained event times.
        </p>
        <p>
          I've also set up a <MuiLink href="https://www.patreon.com/bePatron?u=12806740"
                                      target="_blank">Patreon</MuiLink> for
          those would like to support the site. Thank you all!
        </p>
        <p>
          See an issue? Drop an email to <MuiLink href="mailto:admin@mokulu.io">admin@mokulu.io</MuiLink> or send a PM
          to <MuiLink href="https://www.reddit.com/message/compose/?to=mokulu">u/Mokulu</MuiLink>. I know my event
          schedule
          is not 100%
          accurate, and I'm even missing EU times.
        </p>
      </NewsPost>
      <NewsPost
        title="Mokulu's ArcheAge Tools"
        date=""
      >
        <p>
          Welcome to my ArcheAge tools site. It's currently in development and not all features are available.
        </p>
        <p>
          Check back every so often to see what's new.
        </p>
      </NewsPost>
    </div>
  );
};

export default Home;
