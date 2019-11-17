import React from 'react';
import { QUALITY } from 'constants/dailies';
import GildaStarIcon from 'images/item/gilda_star.png';
import ShatigonsSandIcon from 'images/item/shatigons_sand.png';
import HonorableVictoryIcon from 'images/item/honorable_victory.png';
import HonorableVocationIcon from 'images/item/honorable_vocation.png';
import LaborRechargeIcon from 'images/item/labor_recharge.png';
import SupplyKitIcon from 'images/item/supply_box.png';
import BlueSaltBondIcon from 'images/item/blue_salt_bond.png';
import SprinklerIcon from 'images/item/sprinkler.png';
import MiningDrillIcon from 'images/item/mining_drill.png';
import FeatherGreenIcon from 'images/item/feather_green.png';
import AcidGobbetIcon from 'images/item/acid_gobbet.png';
import ArmorScrapIcon from 'images/item/armor_scrap.png';
import HiramInfusionIcon from 'images/item/hiram_infusion.png';
import HiramScrollIcon from 'images/item/hiram_awakening_scroll.png';
import RedDragonPouchIcon from 'images/item/red_dragon_pouch.png';
import KadumsCrateIcon from 'images/item/kadums_crate.png';
import GoldCrateIcon from 'images/item/gold_crate.png';
import OnyxEssenceIcon from 'images/item/onyx_essence.png';
import DragonEssenceIcon from 'images/item/dragon_essence_stabilizer.png';
import RevenantSoulstoneIcon from 'images/item/revenant_soulstone.png';
import GlowingPrismIcon from 'images/item/glowing_prism.png';
import OriginalTitansWingsIcon from 'images/item/original_titans_wings.png';
import FierceTitansWingsIcon from 'images/item/fierce_titans_wings.png';
import CondensedScentIcon from 'images/item/conensed_scent.png';
import PotatoIcon from 'images/item/potato.png';
import WaterIcon from 'images/item/water.png';
import ChoppedProduceIcon from 'images/item/chopped_produce.png';
import TrimmedMeatIcon from 'images/item/trimmed_meat.png';
import DriedFlowersIcon from 'images/item/dried_flowers.png';
import MedicinalPowderIcon from 'images/item/medicinal_powder.png';
import GroundSpicesIcon from 'images/item/ground_spices.png';
import GroundGrainIcon from 'images/item/ground_grain.png';
import OrchardPureeIcon from 'images/item/orchard_puree.png';
import SunlightDustIcon from 'images/item/sunlight_dust.png';
import MoonlightDustIcon from 'images/item/moonlight_dust.png';
import StarlightDustIcon from 'images/item/starlight_dust.png';
import AbyssalEnhancerIcon from 'images/item/abyssal_enhancer.png';
import NoryetteEarringIcon from 'images/item/noryette_earring.png';
import NoryetteRingIcon from 'images/item/noryette_ring.png';
import NoryetteAwakeningScrollIcon from 'images/item/noryette_awakening_scroll.png';
import GreaterGrindingScrollIcon from 'images/item/greater_grinding_scroll.png';
import ExplorersBowIcon from 'images/item/explorers_bow.png';
import ExplorersCrateIcon from 'images/item/explorer_crate.png';
import ExplorersClothCrateIcon from 'images/item/explorer_cloth_crate.png';
import ExplorersLeatherCrateIcon from 'images/item/explorer_leather_crate.png';
import ExplorersPlateCrateIcon from 'images/item/explorer_plate_crate.png';
import StoryInfusionIcon from 'images/item/story_infusion.png';
import StoryAwakeningScrollIcon from 'images/item/story_awakening_scroll.png';
import TimeStoneIcon from 'images/item/time_stone.png';
import AgingLarderIcon from 'images/item/multi-purpose_aging_larder.png';
import HoneyIcon from 'images/item/honey.png';
import HayBaleIcon from 'images/item/hay_bale.png';
import EggIcon from 'images/item/egg.png';
import LemonIcon from 'images/item/lemon.png';
import AppleIcon from 'images/item/apple.png';
import CarrotIcon from 'images/item/carrot.png';
import LavenderIcon from 'images/item/lavender.png';
import GrapeIcon from 'images/item/grape.png';
import AvocadoIcon from 'images/item/avocado.png';
import TomatoIcon from 'images/item/tomato.png';
import GarlicIcon from 'images/item/garlic.png';
import FigIcon from 'images/item/fig.png';
import BananaIcon from 'images/item/banana.png';
import CucumberIcon from 'images/item/cucumber.png';
import WoolIcon from 'images/item/wool.png';
import RiceIcon from 'images/item/rice.png';
import RoseIcon from 'images/item/rose.png';
import AzaleaIcon from 'images/item/azalea.png';
import GooseDownIcon from 'images/item/goose_down.png';
import DuckDownIcon from 'images/item/duck_down.png';
import SunflowerIcon from 'images/item/sunflower.png';
import LilyIcon from 'images/item/lily.png';
import CornflowerIcon from 'images/item/cornflower.png';
import MilkIcon from 'images/item/milk.png';
import OliveIcon from 'images/item/olive.png';
import MintIcon from 'images/item/mint.png';
import PomegranateIcon from 'images/item/pomegranate.png';
import OrangeIcon from 'images/item/orange.png';
import AloeIcon from 'images/item/aloe.png';
import PeanutIcon from 'images/item/peanut.png';
import YamIcon from 'images/item/yam.png';
import TurmericIcon from 'images/item/turmeric.png';
import GinsengIcon from 'images/item/ginseng.png';
import JujubeIcon from 'images/item/jujube.png';
import CherryIcon from 'images/item/cherry.png';
import YataFurIcon from 'images/item/yata_fur.png';
import SaffronIcon from 'images/item/saffron.png';
import QuinoaIcon from 'images/item/quinoa.png';
import SmallSeedOilIcon from 'images/item/small_seed_oil.png';
import SmallRootPigmentIcon from 'images/item/small_root_pigment.png';
import OpaquePolishIcon from 'images/item/opaque_polish.png';
import LumberIcon from 'images/item/lumber.png';
import StoneBrickIcon from 'images/item/stone_brick.png';
import IronIngotIcon from 'images/item/iron_ingot.png';
import LeatherIcon from 'images/item/leather.png';
import FabricIcon from 'images/item/fabric.png';
import RoyalSeedIcon from 'images/item/royal_seed.png';
import BlueSaltHammerIcon from 'images/item/blue_salt_hammer.png';
import TimeSpaceShardIcon from 'images/item/time_space_rift_shard.png';
import YetisPeltIcon from 'images/item/yetis_pelt.png';
import TwinViperFangIcon from 'images/item/twinhead_viper_fang.png';
import RevenantSoulIcon from 'images/item/revenant_soul.png';
import GhostBladeShardIcon from 'images/item/ghost_blade_weapon_shard.png';

const Green = ({ children }) => <span className="tt-green">{children}</span>;
const BGreen = ({ children }) => <span className="tt-bgreen">{children}</span>;
const Blue = ({ children }) => <span className="tt-blue">{children}</span>;
const Yellow = ({ children }) => <span className="tt-yellow">{children}</span>;
const Orange = ({ children }) => <span className="tt-orange">{children}</span>;
const Use = ({ children, title = 'Use' }) => (
  <React.Fragment>
    <span className="tt-use">{title}:</span>
    {children && <Green>{children}</Green>}
  </React.Fragment>
);
const Process = ({ into, labor = 5, count = 10, knives = 1 }) => (
  <React.Fragment>
    <Use>
      Spend {labor} Labor to process {into}.<br />
      Auto-use with shift + right-click.<br /><br />
      Requirements<br />
      - {count} items of the same type<br />
      - {knives} Blue Salt Knife
    </Use>
  </React.Fragment>
);

export default Object.freeze({
  GILDA_STAR: {
    name: 'Gilda Star',
    icon: GildaStarIcon,
    type: 'Coin',
    description: <span>
      An ancient coin made of pure gold and minted in Auroria centuries ago.
      They are the rarest and most valuable coins still in circulation, and can purchase the most important quality
      goods, such as the <Orange>houses</Orange> and <Orange>workbench designs</Orange> sold
      on <Orange>Mirage Isle</Orange>.<br /><br />
      Can be obtained from <Yellow>Daily Contracts</Yellow>, other quests, and special events.
    </span>,
    quality: QUALITY.BASIC,
    bindsOnPickup: true,
  },
  SHATIGONS_SAND: {
    name: 'Shatigon\'s Sand',
    icon: ShatigonsSandIcon,
    type: 'Talisman',
    description: <span>
      Sand extracted from Shatigon's Sandglass.<br /><br />
      Turns back time and restores broken machines in the Hereafter (ships, vehicles, and equipment).<br /><br />
      Takes 5 minutes to repair ships and vehicles, and immediately repairs equipment.<br /><br />
      <Use>
        Time-Turning Sand:<br />
        The flow of time around the sand is strange.
      </Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  HONORABLE_VICTORY_14: {
    name: 'Honorable Victory Rank 14',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <Use>Gain 100 Honor Points.</Use>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  HONORABLE_VICTORY_5: {
    name: 'Honorable Victory Rank 5',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <Use>Gain 1,000 Honor Points.</Use>,
    quality: QUALITY.CELESTIAL,
    bindsOnPickup: true,
  },
  HONORABLE_VICTORY_4: {
    name: 'Honorable Victory Rank 4',
    icon: HonorableVictoryIcon,
    type: 'Potion',
    description: <Use>Gain 1,500 Honor Points.</Use>,
    quality: QUALITY.DIVINE,
    bindsOnPickup: true,
  },
  HONORABLE_VOCATION_4: {
    name: 'Honorable Vocation Potion Rank 4',
    icon: HonorableVocationIcon,
    type: 'Potion',
    description: <Use>Gain 1,500 Vocation Badges.</Use>,
    quality: QUALITY.DIVINE,
    bindsOnPickup: true,
  },
  LABOR_RECHARGE: {
    name: 'Bound Labor Recharge',
    icon: LaborRechargeIcon,
    type: 'Other',
    description: <span>
      Restores <BGreen>Server Labor</BGreen> over multiple uses, but the amount gradually decreases.<br />
      Hover over the Labor bar on the bottom-left of the screen to see details.<br /><br />
      <Use />
      <BGreen>Restores <Orange>+1000</Orange> Server Labor.</BGreen>
    </span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  IMPROVED_INFUSION_KIT: {
    name: 'Improved Infusion Supply Kit',
    icon: SupplyKitIcon,
    type: 'Crate',
    description: <span>
      An improved supply kit that can be opened to receive one of the following items:<br />
      <Blue>
        - Mysterious Hiram Infusion x1<br />
        - Mysterious Abyssal Enhancer x3
      </Blue><br /><br />
      <Use>Open the Improved Infusion Supply Kit.</Use>
    </span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
    price: 15,
  },
  BLUE_SALT_BOND: {
    name: 'Blue Salt Bond',
    icon: BlueSaltBondIcon,
    type: 'Quest Item',
    description: <span>A token issued by the Blue Salt Brotherhood. Can be used to help rank up your Community Center, or to support your faction activities.</span>,
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
  },
  RAINBOW_SPRINKLER: {
    name: 'Rainbow Sprinkler',
    icon: SprinklerIcon,
    type: 'Contraption',
    description: <span>
      Places a <Yellow>Rainbow Sprinkler</Yellow> that allows you to water seeds and seed bundles in a large area in a single action.<br />
      It takes 10 minutes to refill the water after each use. Can be used up to 5 times.<br /><br />
      <Use>
        Use with right-click.<br />
        Can be positioned on the ground with left-click.<br /><br />
        Costs 5 Labor if not placed on personal land.
      </Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  SHARPWIND_MINING_DRILL: {
    name: 'Sharpwind Mining Drill',
    icon: MiningDrillIcon,
    type: 'Contraption',
    description: <span>
      Installs a <Yellow>Sharpwind Mining Drill</Yellow>.<br />
      If placed outside protected land, it will eventually become public property.<br /><br />
      Vocation: Mining<br />
      Mines for 12 h before disappearing<br /><br />
      Can mine for <Yellow>stone, ore, and gems</Yellow>.<br /><br />
      <Use>
        Use with right-click.<br />
        Can be positioned on the ground with left-click.<br /><br />
        Costs 5 Labor if not placed on personal land.
      </Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  STAR_WINGS: {
    name: 'Star Wings',
    icon: FeatherGreenIcon,
    type: 'Contraption',
    description: <span>
      Enhances certain glider effects.<br /><br />
      Can't use if you are in a Lv6+ guild.<br /><br />
      <Use>
        Use the Glider Nitro or Somersault skills to briefly increase gliding speed.<br />
        Creates a protection ward when closing that reduces fall damage for 6 seconds.
      </Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
  },
  ACID_GOBBET: {
    name: 'Acid Gobbet',
    icon: AcidGobbetIcon,
    type: 'Material',
    description: <span>
      Can be obtained on <Blue>Aegis Island</Blue>.<br />
      Used to make <Orange>Acid Pouches</Orange>, which are required to craft an Ipnysh Blessing.<br /><br />
      <Use>Spend 500 Labor to combine 50 Acid Bubbles into an Acid Poison Pouch.<br />Auto-use: shift + right-click</Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  CURSED_ARMOR_SCRAP: {
    name: 'Cursed Armor Scrap',
    icon: ArmorScrapIcon,
    type: 'Material',
    description: <span>
      Can be obtained in <Blue>Whalesong Harbor</Blue>.<br />
      Used to make <Orange>Cursed Armor</Orange>, which is required to craft an Ipnysh Blessing.<br /><br />
      <Use>Spend 500 Labor to combine 50 Cursed Armor Scraps into a Complete Cursed Armor.<br />Auto-use: shift + right-click</Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  UNIDENTIFIED_HIRAM_INFUSION: {
    name: 'Unidentified Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>
      Used as a synthesis material to enhance <Yellow>Hiram Guardian Equipment</Yellow>.<br /><br />
      Found by killing the <Yellow>Abyssal Legion</Yellow> in <Yellow>Reedwind, Sungold Fields, and Exeloch.</Yellow><br /><br />
      <Use>Spend up to 20 Labor to identify the Hiram Infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  MYSTERIOUS_HIRAM_INFUSION: {
    name: 'Mysterious Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>
      An mysteriously powerful infusion.<br /><br />
      Open to reveal the content.<br />
      This item grants better infusions than Unidentified Infusion.<br /><br />
      <Use>Spend up to 25 Labor to identify the Mysterious Hiram Infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
    quality: QUALITY.GRAND,
    price: 150,
    bindsOnPickup: true,
  },
  RADIANT_HIRAM_INFUSION: {
    name: 'Radiant Hiram Infusion',
    icon: HiramInfusionIcon,
    unidentified: true,
    type: 'Synthesis Materials',
    description: <span>
      A mysteriously powerful infusion.<br />
      The infusions granted are of higher rarity, than the infusionen granted by Mysterious Hiram Infusions.<br />
      Open to reveal the content.<br /><br />
      <Use>Spend up to 40 Labor to identify the Luminous Hiram Infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
    quality: QUALITY.RARE,
    price: 200,
    bindsOnPickup: true,
  },
  AWAKENING_SCROLL: {
    name: 'Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description: <span>
      Used to awaken Hiram Guardian equipment, unlocking higher item grades and synthesis effects.<br /><br />
      Can only be used on <Yellow>Hiram Guardian Equipment</Yellow> of <Yellow>Celestial</Yellow> grade or higher.<br />
      Successful awakening can cause equipment with tempering points above <Yellow>+20</Yellow> to loose up to <Yellow>-2</Yellow> points, but won't drop the item below +20.<br /><br />
      Found by killing the <Yellow>Abyssal Legion</Yellow> in <Yellow>Reedwind, Sungold Fields, and Exeloch.</Yellow><br /><br />
      <Use>Use <Orange>10</Orange> Hiram Awakening Scrolls and <Orange>300</Orange> Labor to awaken a piece of Hiram Guardian Equipment.</Use>
    </span>,
    quality: QUALITY.RARE,
    price: 20,
    bindsOnPickup: true,
  },
  RADIANT_AWAKENING_SCROLL: {
    name: 'Radiant Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description: <span>
      Used to awaken Radiant Hiram Guardian equipment, unlocking higher item grades and synthesis effects.<br /><br />
      Can only be used on <Yellow>Radiant Hiram Equipment</Yellow> of <Yellow>Divine</Yellow> grade or higher.<br />
      Successful awakening can cause equipment with tempering points above<Orange>+20</Orange> to lose up to<Orange>-2</Orange> points, but won't drop the item below +20.<br /><br />
      Found by killing the <Yellow>Abyssal Legion</Yellow> in the <Yellow>Western Hiram Mountains.</Yellow><br /><br />
      <Use>Use <Orange>25</Orange> Hiram Awakening Scroll and <Orange>300</Orange> Labor to awaken a piece of Radiant Hiram Guardian Equipment.</Use>
    </span>,
    quality: QUALITY.HEROIC,
    price: 30,
    bindsOnPickup: true,
  },
  BRILLIANT_AWAKENING_SCROLL: {
    name: 'Brilliant Hiram Awakening Scroll',
    icon: HiramScrollIcon,
    type: 'Awakening Scroll',
    description: <span>
      Used to awaken Brilliant Hiram Guardian Equipment, unlocking higher item grades and synthesis effects.<br /><br />
      Can only be used on <Yellow>Brilliant Hiram Guardian Equipment</Yellow> of <Yellow>Epic</Yellow> grade or higher.<br />
      Successful awakening can cause equipment with tempering points above <Orange>+20</Orange> to lose up to <Orange>-2</Orange> points, but won't drop the item below +20.<br /><br />
      Can be obtained from dailies quests available in <Yellow>Eastern Hiram Mountains</Yellow>.<br /><br />
      <Use>Use <Orange>50</Orange> Brilliant Hiram Awakening Scrolls and <Orange>300</Orange> Labor to awaken a piece of Brilliant Hiram Guardian Equipment.</Use>
    </span>,
    quality: QUALITY.CELESTIAL,
    price: 40,
    bindsOnPickup: true,
  },
  RED_DRAGON_POUCH: {
    name: 'Red Dragon Pouch',
    icon: RedDragonPouchIcon,
    type: 'Unidentified',
    description: <span>
      A pouch found in the Red Dragon's stomach.<br /><br />
      <Orange>[Guaranteed Drops]</Orange><br />
      - 2000 Honor Points<br />
      - Locked Gold Crate x2<br />
      - Red Dragon Spinal Ridge Shard x1-4<br /><br />
      <Orange>[Possible Bonus Drops]</Orange><br />
      - Red Dragon Spinal Ridge x1<br />
      - Evenglow Lunagem: Impact x1<br />
      - Enraged Red Dragon Weapon<br /><br />
      <Use>Spend 10 Labor to see what's inside.<br />Auto-use: shift+right-click</Use>
    </span>,
    quality: QUALITY.UNIQUE,
    bindsOnPickup: true,
  },
  KADUMS_CRATE: {
    name: 'Kadum\'s Crate',
    icon: KadumsCrateIcon,
    type: 'Unidentified',
    quality: QUALITY.UNIQUE,
    bindsOnPickup: true,
    description: <span>
      A wooden crate dropped by Kadum.<br /><br />
      <Orange>[Guaranteed Drops]</Orange><br />
      - Honorable Victory Rank 5 x2<br />
      - Gilda Star x4<br />
      - Superior Glow Lunarite x1-3<br />
      - Evenglow Lunarite x3-4<br /><br />
      <Orange>[Possible Bonus Drops]</Orange><br />
      - Kadum's Infusion x1<br /><br />
      <Use>Spend 10 Labor to see what's inside.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  GOLD_CRATE: {
    name: 'Locked Gold Crate',
    icon: GoldCrateIcon,
    type: 'Unidentified',
    description: <span>
      Valuable crates of treasure dropped by certain World Bosses, as well as Shadow Invasion bosses and sub-bosses.<br /><br />
      Requires a <Yellow>Gold Key</Yellow> to open. Higher tiers of rewards are unlocked as additional <Yellow>Gold Crates</Yellow> are opened, until the maximum tier is reached.<br /><br />
      <Use>Open the box to check its contents.</Use>
    </span>,
    quality: QUALITY.RARE,
    price: 400,
    bindsOnPickup: true,
  },
  ONYX_ARCHEUM_ESSENCE: {
    name: 'Onyx Archeum Essence',
    icon: OnyxEssenceIcon,
    type: 'Archeum',
    description: <span>
      Imbued with mysterious garden lights, as a core source of magic, it is used in crafting consumables and machines.<br /><br />
      Can be acquired by delivering Cargo to <Yellow>Cargo Exchangers</Yellow>, or Delphinad Ghost Ship Stone Slabs to the <Yellow>Shadow Merchant</Yellow> on Freedich Island.
    </span>,
    quality: QUALITY.BASIC,
    price: 9500,
  },
  DRAGON_ESSENCE_STABILIZER: {
    name: 'Dragon Essence Stabilizer',
    icon: DragonEssenceIcon,
    type: 'Material',
    description: <span>
      Used in processing and to stop unwanted chemical reactions.<br /><br />
      - Acquire at the Freedich Island <Yellow>Cargo Exchanger</Yellow> in trade for Cargo Packs.
    </span>,
    price: 10,
  },
  REVENANT_SOULSTONE: {
    name: 'Revenant Soulstone',
    icon: RevenantSoulstoneIcon,
    type: 'Other',
    description: <span>
      A soulstone that contains the residual energy of a vanquished revenant.<br /><br />
      Acquire from defeating Aust Followers; can be used to create weapons and armor at the <Yellow>Soulforged Anvil</Yellow> in <Blue>Diamond Shores</Blue>.
    </span>,
    quality: QUALITY.BASIC,
    price: 50,
    bindsOnPickup: true,
  },
  ORIGINAL_TITANS_WINGS: {
    name: 'Original Titan\'s Wings',
    icon: OriginalTitansWingsIcon,
    type: 'Other',
    description: <span>
      A prototype of Titan's Wings.<br />
      Used in crafting Fierce Titan's Wings at the Thunderwing Call in Reedwind.
    </span>,
    quality: QUALITY.BASIC,
    price: 100,
    bindsOnPickup: true,
  },
  FIERCE_TITANS_WINGS: {
    name: 'Fierce Titan\'s Wings',
    icon: FierceTitansWingsIcon,
    type: 'Magithopter',
    description: <span>
      Crafted from the feathers of the legendary Thunderwing Titan; each one still seems to burn with the creature's mad fury.<br /><br />
      Allows you to select the appropriate status for your role.<br /><br />
      Note: Most skills are only effective near the Thunderwing Titan.
      <Use>Equip wings to use Free Glide. The location of the Thunderwing Titan within 800m is displayed on the map. While using Free Glide, only designated skills can be used. Parry, Evasion, and Shield Block do not trigger.<br />Landing or flying out of the Reedwind automatically ends the Free Glide mode.<br /><br />This skill can only be used in Reedwind.</Use>
    </span>,
    quality: QUALITY.BASIC,
    bindsOnPickup: true,
    remainingTime: '1h 0m',
  },
  GLOWING_PRISM: {
    name: 'Glowing Prism',
    icon: GlowingPrismIcon,
    type: 'Material',
    description: <span>
      Can be acquired from hunting monsters.<br />
      Mostly used for crafting.
    </span>,
    quality: QUALITY.BASIC,
    price: 500,
  },
  CONDENSED_SCENT: {
    name: 'Condensed Scent',
    icon: CondensedScentIcon,
    type: 'Quest Item',
    description: <span>A pleasant aroma, condensed into the form of a crystal.</span>,
    quality: QUALITY.BASIC,
    bindsOnPickup: true,
  },
  VITA_ROOT: {
    name: 'Vita Root',
    icon: PotatoIcon,
    type: 'Grain',
    description: <span>This enchanted fruit makes mounts and battle pets grow to maturity quickly.</span>,
    quality: QUALITY.BASIC,
    price: 1,
  },
  WATER: {
    name: 'Water',
    icon: WaterIcon,
    type: 'Contraption',
    description: <span>Widely useful, especially for extinguishing fires and watering crops.</span>,
    quality: QUALITY.BASIC,
  },
  MULTI_PURPOSE_AGING_LARDER: {
    name: 'Multi-Purpose Aging Larder',
    icon: AgingLarderIcon,
    reqLevel: 30,
    type: 'Contraption',
    description: <span>
      Used for aging specialty trade packs.<br />
      Can only be installed in specialty crafting areas.<br />
      Disappears in <Orange>10 minutes</Orange> if no ingredients are added.<br /><br />
      Vocation: Husbandry<br />
      Acquire from a Farmer's Workstation<br />
      Aging Time: 3 days<br /><br />
      <Orange>Ingredients</Orange><br />
      For Aged Salve: 20 Cultivated Ginseng and 30 Olives<br />
      For Aged Cheese: 50 Milk and 30 Lemons<br />
      For Aged Honey: 4 Honey and 20 Hay Bales<br /><br />
      <Orange>Required Proficiency:</Orange><br />
      For Aged Salve: none<br />
      For Aged Cheese: Commerce 10,000+<br />
      For Aged Honey: Commerce 20,000+<br /><br />
      <Use>
        Use with right-click.<br />
        Can be positioned on the ground with left-click.<br /><br />
        Costs 5 Labor if not placed on personal land.
      </Use>
    </span>,
    price: 300,
  },
  CHOPPED_PRODUCE: {
    name: 'Chopped Produce',
    icon: ChoppedProduceIcon,
    type: 'Material',
    description: <span>
      Vegetables such as <Yellow>potatoes</Yellow> and <Yellow>carrots</Yellow> chopped with a <Yellow>Blue Salt Knife</Yellow> into bite-size pieces.
      Blue Salt Knives can be purchased from <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  TRIMMED_MEAT: {
    name: 'Trimmed Meat',
    icon: TrimmedMeatIcon,
    type: 'Material',
    description: <span>
      Meat such as <Yellow>chicken</Yellow> and <Yellow>beef</Yellow> trimmed with a <Yellow>Blue Salt Knife</Yellow>.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  DRIED_FLOWERS: {
    name: 'Dried Flowers',
    icon: DriedFlowersIcon,
    type: 'Material',
    description: <span>
      Flowers such as <Yellow>azaleas</Yellow> and <Yellow>roses</Yellow> processed with a <Yellow>Blue Salt Knife</Yellow>.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  MEDICINAL_POWDER: {
    name: 'Medicinal Powder',
    icon: MedicinalPowderIcon,
    type: 'Material',
    description: <span>
      Medicinals such as <Yellow>mushrooms</Yellow> and <Yellow>cultivated ginseng</Yellow> ground with a <Yellow>Blue Salt Knife</Yellow>.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  GROUND_GRAIN: {
    name: 'Ground Grain',
    icon: GroundGrainIcon,
    type: 'Material',
    description: <span>
      Grain such as <Yellow>barley</Yellow> and <Yellow>rice</Yellow> ground with a <Yellow>Blue Salt Knife</Yellow>.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  GROUND_SPICES: {
    name: 'Ground Spices',
    icon: GroundSpicesIcon,
    type: 'Material',
    description: <span>
      Spices such as <Yellow>iris</Yellow> and <Yellow>mint</Yellow> processed with a <Yellow>Blue Salt Knife</Yellow>.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  ORCHARD_PUREE: {
    name: 'Orchard Puree',
    icon: OrchardPureeIcon,
    type: 'Material',
    description: <span>
      Fruits such as <Yellow>grapes</Yellow> and <Yellow>apples</Yellow> chopped with a <Yellow>Blue Salt Knife</Yellow> into bite-size pieces.
      Blue Salt Knives are sold by <Blue>general merchants</Blue>.<br />
      Used in cooking, local specialties, and various crafts.
    </span>,
    price: 20,
  },
  HONEY: {
    name: 'Honey',
    icon: HoneyIcon,
    type: 'Herb',
    description: <span>
      Can be harvested from <Yellow>Acorn Beehives</Yellow>. It's chiefly used in husbandry and raising pets.
    </span>,
    price: 200,
  },
  HAY_BALE: {
    name: 'Hay Bale',
    icon: HayBaleIcon,
    type: 'Contraption',
    description: <span>
      A material often found when harvesting grains. It can be used as food for livestock.
    </span>,
    price: 15,
  },
  EGG: {
    name: 'Egg',
    icon: EggIcon,
    type: 'Material',
    description: <span>
      A material found by collecting from <Yellow>thriving hens</Yellow> that have been fed <Yellow>ground grain</Yellow>. It's chiefly used in cooking.
    </span>,
    price: 20,
  },
  LEMON: {
    name: 'Lemon',
    icon: LemonIcon,
    type: 'Fruit',
    description: <span>
      A material found by gathering from <Yellow>fruited lemon trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  APPLE: {
    name: 'Apple',
    icon: AppleIcon,
    type: 'Fruit',
    description: <span>
      A material found by gathering from <Yellow>fruited apple trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  CARROT: {
    name: 'Carrot',
    icon: CarrotIcon,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>carrots</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  LAVENDER: {
    name: 'Lavender',
    icon: LavenderIcon,
    type: 'Spice',
    description: <span>
      A material found by harvesting <Yellow>lavender</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Spices" />
    </span>,
    price: 20,
  },
  GRAPE: {
    name: 'Grape',
    icon: GrapeIcon,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited grapevines</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  AVOCADO: {
    name: 'Avocado',
    icon: AvocadoIcon,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited avocado trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  TOMATO: {
    name: 'Tomato',
    icon: TomatoIcon,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>tomatoes</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  GARLIC: {
    name: 'Garlic',
    icon: GarlicIcon,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>garlic</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  CUCUMBER: {
    name: 'Cucumber',
    icon: CucumberIcon,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>cucumber</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  POTATO: {
    name: 'Potato',
    icon: PotatoIcon,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>potatoes</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  FIG: {
    name: 'Fig',
    icon: FigIcon,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited fig trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  BANANA: {
    name: 'Banana',
    icon: BananaIcon,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited banana trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  RICE: {
    name: 'Rice',
    icon: RiceIcon,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>rice</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  MILLET: {
    name: 'Millet',
    icon: QuinoaIcon,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>millet</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  ROSE: {
    name: 'Rose',
    icon: RoseIcon,
    type: 'Flower',
    description: <span>
      A material found by harvesting <Yellow>roses</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="10 Dried Flowers" />
    </span>,
    price: 20,
  },
  AZALEA: {
    name: 'Azalea',
    icon: AzaleaIcon,
    type: 'Flower',
    description: <span>
      A material found by harvesting <Yellow>azaleas</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="10 Dried Flowers" />
    </span>,
    price: 20,
  },
  GOOSE_DOWN: {
    name: 'Goose Down',
    icon: GooseDownIcon,
    type: 'Textile',
    description: <span>
      A material found by harvesting from <Yellow>thriving geese</Yellow> that have been fed <Yellow>ground grain</Yellow>.
      It's chiefly used in carpentry and local specialties.
    </span>,
    price: 10,
  },
  DUCK_DOWN: {
    name: 'Duck Down',
    icon: DuckDownIcon,
    type: 'Textile',
    description: <span>
      A material found by harvesting from <Yellow>thriving ducks</Yellow> that have been fed <Yellow>ground grain</Yellow>.
      It's chiefly used in making furniture and local specialties.
    </span>,
    price: 10,
  },
  WOOL: {
    name: 'Wool',
    icon: WoolIcon,
    type: 'Textile',
    description: <span>
      A material found by shearing <Yellow>Thriving Sheep</Yellow> that have been fed <Yellow>Combined Feed</Yellow>.
      It can be processed into <Yellow>Fabric</Yellow> at <Blue>Weaving Looms</Blue> and used for various crafting purposes.
    </span>,
    price: 10,
  },
  SUNFLOWER: {
    name: 'Sunflower',
    icon: SunflowerIcon,
    type: 'Spice',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>sunflowers</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Spices" />
    </span>,
    price: 105,
  },
  LILY: {
    name: 'Lily',
    icon: LilyIcon,
    type: 'Flower',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>lilies</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="20 Dried Flowers" />
    </span>,
    price: 105,
  },
  CORNFLOWER: {
    name: 'Cornflower',
    icon: CornflowerIcon,
    type: 'Flower',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>cornflowers</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="20 Dried Flowers" />
    </span>,
    price: 105,
  },
  MILK: {
    name: 'Milk',
    icon: MilkIcon,
    type: 'Material',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by milking <Yellow>Thriving Dairy Cows</Yellow> that have been fed <Yellow>Combined Feed</Yellow>.
      It's chiefly used in cooking and husbandry.
    </span>,
    price: 30,
  },
  OLIVE: {
    name: 'Olive',
    icon: OliveIcon,
    type: 'Fruit',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>fruited olive trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Orchard Puree" />
    </span>,
    price: 600,
  },
  MINT: {
    name: 'Mint',
    icon: MintIcon,
    type: 'Spice',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by harvesting <Yellow>mint</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Spices" />
    </span>,
    price: 105,
  },
  POMEGRANATE: {
    name: 'Pomegranate',
    icon: PomegranateIcon,
    type: 'Fruit',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>fruited pomegranate trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Orchard Puree" />
    </span>,
    price: 600,
  },
  ORANGE: {
    name: 'Orange',
    icon: OrangeIcon,
    type: 'Fruit',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>fruited orange trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Orchard Puree" />
    </span>,
    price: 600,
  },
  ALOE: {
    name: 'Aloe',
    icon: AloeIcon,
    type: 'Herb',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>aloe</Yellow>. It's chiefly used in cooking, alchemy, and local specialties.<br /><br />
      <Process into="20 Medicinal Powder" />
    </span>,
    price: 105,
  },
  PEANUT: {
    name: 'Peanut',
    icon: PeanutIcon,
    type: 'Grain',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>peanuts</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Grain" />
    </span>,
    price: 105,
  },
  YAM: {
    name: 'Yam',
    icon: YamIcon,
    type: 'Vegetable',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>yams</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Chopped Produce" />
    </span>,
    price: 105,
  },
  TURMERIC: {
    name: 'Turmeric',
    icon: TurmericIcon,
    type: 'Spice',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering <Yellow>turmeric</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="45 Ground Spices" />
    </span>,
    price: 300,
  },
  CULTIVATED_GINSENG: {
    name: 'Cultivated Ginseng',
    icon: GinsengIcon,
    type: 'Herb',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering from <Yellow>cultivated ginseng</Yellow>. It's chiefly used in cooking and alchemy.<br /><br />
      <Process into="45 Medicinal Powder" />
    </span>,
    price: 300,
  },
  JUJUBE: {
    name: 'Jujube',
    icon: JujubeIcon,
    type: 'Fruit',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering from <Yellow>fruited jujube trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="45 Orchard Puree" />
    </span>,
    price: 1000,
  },
  CHERRY: {
    name: 'Cherry',
    icon: CherryIcon,
    type: 'Fruit',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering from <Yellow>fruited cherry trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="45 Orchard Puree" />
    </span>,
    price: 1000,
  },
  MORINGA_FRUIT: {
    name: 'Moringa Fruit',
    icon: OliveIcon,
    type: 'Fruit',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering from <Yellow>fruited moringa trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="45 Orchard Puree" />
    </span>,
    price: 1000,
  },
  SAFFRON: {
    name: 'Saffron',
    icon: SaffronIcon,
    type: 'Spice',
    quality: QUALITY.RARE,
    description: <span>
      A material found by gathering from <Yellow>saffron</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="45 Ground Spices" />
    </span>,
    price: 300,
  },
  YATA_FUR: {
    name: 'Yata Fur',
    icon: YataFurIcon,
    type: 'Textile',
    quality: QUALITY.RARE,
    description: <span>
      Obtained from shearing <Yellow>Thriving Cashmere Yatas</Yellow> fed with <Yellow>Combined Feed</Yellow>.
      It's chiefly used in tailoring.
    </span>,
    price: 50,
  },
  SMALL_SEED_OIL: {
    name: 'Small Seed Oil',
    icon: SmallSeedOilIcon,
    type: 'Material',
    description: <span>
      It's chiefly used for making Leather Armor and other crafts.<br /><br />
      Vocation: Alchemy<br />
      Workbench: Alchemy Table
    </span>,
    price: 1000,
  },
  SMALL_ROOT_PIGMENT: {
    name: 'Small Root Pigment',
    icon: SmallRootPigmentIcon,
    type: 'Material',
    description: <span>
      It's chiefly used for making Cloth Armor and other crafts.<br /><br />
      Vocation: Alchemy<br />
      Workbench: Alchemy Table
    </span>,
    price: 1000,
  },
  OPAQUE_POLISH: {
    name: 'Opaque Polish',
    icon: OpaquePolishIcon,
    type: 'Material',
    description: <span>
      It's chiefly used for making plate armor and other crafts.<br /><br />
      Vocation: Alchemy<br />
      Workbench: Alchemy Table
    </span>,
    price: 1000,
  },
  SUNLIGHT_ARCHEUM_DUST: {
    name: 'Sunlight Archeum Dust',
    icon: SunlightDustIcon,
    type: 'Archeum',
    description: <span>
      Pure, condensed magic, trapped in physical form. Energy from the sun makes it especially useful in weapon crafting.<br /><br />
      A lack of magic--or life force--creates monsters, changes the climate, and weakens the barriers that protect the world from other dimensions.
      Using Archeum releases healing magic back into nature.
      <Use>Alchemy: Spend 5 Labor to combine 5 Sunlight Archeum Dusts into 1 Sunlight Archeum Shard. Auto-use: shift+right-click</Use>
    </span>,
    price: 50,
  },
  MOONLIGHT_ARCHEUM_DUST: {
    name: 'Moonlight Archeum Dust',
    icon: MoonlightDustIcon,
    type: 'Archeum',
    description: <span>
      Pure, condensed magic, trapped in physical form. Energy from the moon makes it especially useful in armorcrafting.<br /><br />
      A lack of magic--or life force--creates monsters, changes the climate, and weakens the barriers that protect the world from other dimensions.
      Using Archeum releases healing magic back into nature.
      <Use>Alchemy: Spend 5 Labor to combine 5 Moonlight Archeum Dusts into 1 Moonlight Archeum Shard. Auto-use: shift+right-click</Use>
    </span>,
    price: 50,
  },
  STARLIGHT_ARCHEUM_DUST: {
    name: 'Starlight Archeum Dust',
    icon: StarlightDustIcon,
    type: 'Archeum',
    description: <span>
      Pure, condensed magic, trapped in physical form. Energy from the stars makes it especially useful in handicrafting.<br /><br />
      A lack of magic--or life force--creates monsters, changes the climate, and weakens the barriers that protect the world from other dimensions.
      Using Archeum releases healing magic back into nature.
      <Use>Alchemy: Spend 5 Labor to combine 5 Starlight Archeum Dusts into 1 Starlight Archeum Shard. Auto-use: shift+right-click</Use>
    </span>,
    price: 50,
  },
  MYSTERIOUS_ABYSSAL_ENHANCER: {
    name: 'Mysterious Abyssal Enhancer',
    icon: AbyssalEnhancerIcon,
    quality: QUALITY.GRAND,
    unidentified: true,
    type: 'Synthesis Material',
    bindsOnPickup: true,
    description: <span>
      This enhancer is sealed with abyssal energy. Infuse magic to break the seal.<br /><br />
      <Use>Spend up to 25 Labor to unseal the Hiram Infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
    price: 150,
  },
  NORYETTE_EARRING: {
    name: 'Noryette Earring',
    icon: NoryetteEarringIcon,
    type: 'Earring',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    reqLevel: 50,
    synthesisXP: 31840,
    synthesisGrade: QUALITY.DIVINE,
    slot: 'Ear',
    durability: 15,
    description: <span>
      <Use title="Combo Effect">Triggers the <Orange>Spiritual Focus Rank 1</Orange> if attacked in the Noryette Challenge.</Use><br /><br />
      <Use title="Equip Effect">Decreases <Blue>PvE Received Damage</Blue> <Orange>-2.0%</Orange>.</Use>
    </span>,
  },
  NORYETTE_RING: {
    name: 'Noryette Ring',
    icon: NoryetteRingIcon,
    type: 'Ring',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    reqLevel: 50,
    synthesisXP: 31840,
    synthesisGrade: QUALITY.DIVINE,
    slot: 'Finger',
    durability: 15,
    description: <span>
      <Use title="Combo Effect">Triggers the <Orange>Challenger's Valor Rank 1</Orange> when using a skill in the Noryette Challenge.</Use><br /><br />
      <Use title="Equip Effect">Increaes <Blue>PvE Skill Damage</Blue> <Orange>+2.0%</Orange>.</Use>
    </span>,
  },
  NORYETTE_AWAKENING_SCROLL: {
    name: 'Noryette Awakening Scroll',
    icon: NoryetteAwakeningScrollIcon,
    type: 'Awakening Materials',
    quality: QUALITY.RARE,
    bindsOnPickup: true,
    description: <span>
      An awakening scroll, made by the <Blue>Noryette</Blue> family.<br /><br />
      Can only be used on <Yellow>Noryette Accessories</Yellow> of <Yellow>Divine</Yellow> grade or higher.<br /><br />
      Can be obtained by clearing Round 20 or higher in the <Blue>Noryette Challenge</Blue>.<br /><br />
      <Use>Spend <Orange>1</Orange> Noryette Awakening Scroll and <Orange>300</Orange> Labor to awaken the equipment.</Use>
    </span>,
    price: 20,
  },
  LUMINOUS_NORYETTE_AWAKENING_SCROLL: {
    name: 'Luminous Noryette Awakening Scroll',
    icon: NoryetteAwakeningScrollIcon,
    type: 'Awakening Materials',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      An awakening scroll, made by the <Blue>Noryette</Blue> family.<br /><br />
      Can only be used on <Yellow>Luminous Noryette Accessories</Yellow> of <Yellow>Legendary</Yellow> grade or higher.<br /><br />
      Can be obtained by clearing Round 20 or higher in the <Blue>Noryette Challenge</Blue>.<br /><br />
      <Use>Spend <Orange>1</Orange> Luminous Noryette Awakening Scroll and <Orange>300</Orange> Labor to awaken the equipment.</Use>
    </span>,
    price: 30,
  },
  MISTSONG_GRINDING_GUARDIAN_SCROLL: {
    name: 'Mistsong Grinding Guardian Scroll',
    icon: GreaterGrindingScrollIcon,
    type: 'Other',
    quality: QUALITY.RARE,
    description: <span>
      Grants continued dungeon access after you pass your daily entrance limit.<br /><br />
      <Yellow>Caution:</Yellow><br />
      Entering the same dungeon after the daily entrance limit was met will consume this scroll.<br />
      Only for dungeons with a level limit of <Orange>55 or higher</Orange>.<br /><br />
      <Blue>Valid Dungeons</Blue><br />
      Mistsong Summit<br />
      Abyssal Library<br />
      Noryette Challenge
    </span>,
    price: 10000,
  },
  EXPLORERS_BOW: {
    name: 'Explorer\'s Bow',
    icon: ExplorersBowIcon,
    type: 'Bow',
    quality: QUALITY.BASIC,
    synthesisGrade: QUALITY.ARCANE,
    reqLevel: 1,
    bindsOnPickup: true,
    slot: 'Ranged Weapon',
    attackSpeed: 1.0,
    weaponType: 'Piercing',
    dps: '77.3(77 - 78)',
    description: <span>
      Designed to be equipped by Lv1+ adventurers.<br />
      Can be awakened to the next tier, once it reaches its max grade.<br /><br />
      <Use title="Synthesis Effect" />
      Use <Yellow>Story Quest Infusions</Yellow> as Synthesis Material to improve equipment.
    </span>,
  },
  EXPLORERS_1H_WEAPON_CRATE: {
    name: 'Explorer\'s 1H Weapon Crate',
    icon: ExplorersCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      Allows you to obtain a 1H-Weapon.<br /><br />
      <Orange>[1H-Weapon]</Orange><br />
      - Can be equipped to both left and right hand.<br /><br />
      <Orange>[Right-Hand Weapon]</Orange><br />
      - Can only be equipped to the right hand.<br /><br />
      <Orange>[Left-Hand Weapon]</Orange><br />
      - Can only be equipped to the left hand.<br /><br />
      <Orange>[Ranged Weapon]</Orange><br />
      - Can be equipped as bow.<br /><br />
      <Use>Open the Explorer's 1H-Weapon Crate.</Use>
    </span>,
  },
  EXPLORERS_2H_WEAPON_CRATE: {
    name: 'Explorer\'s 2H Weapon Crate',
    icon: ExplorersCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>Allows you to choose a 2H Weapon.<br /><br />
      <Use>Open the Explorer's 2H-Weapon Crate.</Use>
    </span>,
  },
  EXPLORERS_CLOTH_CRATE: {
    name: 'Explorer\'s Cloth Crate',
    icon: ExplorersClothCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Cloth Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Hood<br />
      - Shirt<br />
      - Pants<br />
      - Shoes<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_LEATHER_CRATE: {
    name: 'Explorer\'s Leather Crate',
    icon: ExplorersLeatherCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Leather Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Cap<br />
      - Jerkin<br />
      - Breeches<br />
      - Boots<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_PLATE_CRATE: {
    name: 'Explorer\'s Plate Crate',
    icon: ExplorersPlateCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Plate Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Helm<br />
      - Cuirass<br />
      - Greaves<br />
      - Sabatons<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_CLOTH_COMPONENT_CRATE: {
    name: 'Explorer\'s Cloth Component Crate',
    icon: ExplorersClothCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Cloth Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Gloves<br />
      - Sleeves<br />
      - Sash<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_LEATHER_COMPONENT_CRATE: {
    name: 'Explorer\'s Leather Component Crate',
    icon: ExplorersLeatherCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Leather Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Fists<br />
      - Guards<br />
      - Belt<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  EXPLORERS_PLATE_COMPONENT_CRATE: {
    name: 'Explorer\'s Plate Component Crate',
    icon: ExplorersPlateCrateIcon,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>
      This crate contains a selection of Plate Armor.<br /><br />
      <Yellow>Available Items:</Yellow><br />
      - Gauntlets<br />
      - Vambraces<br />
      - Tassets<br /><br />
      <Use>Open to see what's inside.</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_1: {
    name: 'Unidentified Story Quest Infusion: Rank 1',
    icon: StoryInfusionIcon,
    type: 'Synthesis Materials',
    quality: QUALITY.GRAND,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_2: {
    name: 'Unidentified Story Quest Infusion: Rank 2',
    icon: StoryInfusionIcon,
    type: 'Synthesis Materials',
    quality: QUALITY.RARE,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_QUEST_INFUSION_RANK_3: {
    name: 'Unidentified Story Quest Infusion: Rank 3',
    icon: StoryInfusionIcon,
    type: 'Synthesis Materials',
    quality: QUALITY.ARCANE,
    unidentified: true,
    bindsOnPickup: true,
    description: <span>
      Used as synthesis material to enhance equipment.<br />
      Infuse the energy to identify the hidden infusion.<br /><br />
      <Use>Unseal the infusion.<br />Auto-use: shift+right-click</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_1: {
    name: 'Equipment Awakening Scroll Rank 1',
    icon: StoryAwakeningScrollIcon,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.GRAND,
    description: <span>
      Used to awaken <Yellow>Ancient</Yellow> Faction Mission Equipment, unlocking higher item grades.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_2: {
    name: 'Equipment Awakening Scroll Rank 2',
    icon: StoryAwakeningScrollIcon,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.RARE,
    description: <span>
      Used to awaken Explorer's Equipment, unlocking higher item grades.<br />
      Can only be used on <Yellow>Explorer's Equipment</Yellow> or <Yellow>Heroic</Yellow> grade or higher.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  STORY_AWAKENING_SCROLL_RANK_3: {
    name: 'Equipment Awakening Scroll Rank 3',
    icon: StoryAwakeningScrollIcon,
    type: 'Awakening Materials',
    bindsOnPickup: true,
    quality: QUALITY.ARCANE,
    description: <span>
      Used to awaken Explorer's Equipment, unlocking higher item grades.<br />
      Can only be used on <Yellow>Radiant Explorer's Equipment</Yellow> or <Yellow>Unique</Yellow> grade or higher.<br /><br />
      <Use>Use <Orange>1</Orange> Awakening Scroll to awaken the equipment.</Use>
    </span>,
  },
  ADVENTURERS_EVENSTONE: {
    name: 'Adventurer\'s Evenstone',
    icon: TimeStoneIcon,
    type: 'Talisman',
    bindsOnPickup: true,
    description: <span>
      Used to revert equipment to its original state and recover the enhancement materials.<br />
      Can be purchased from <Blue>General Merchants</Blue> and <Blue>Blacksmiths</Blue>.<br /><br />
      ;Extractable Item<br />
      <Blue>- Mission Equipment</Blue><br />
      <Blue>- Radiant Explorer's Equipment</Blue><br />
      <Blue>- Brilliant Explorer's Equipment</Blue><br />
      Can not be used on Instruments.<br /><br />
      <Use>Masonry: Spend up to 10 Labor to extract magic ingredients from the item.</Use>
    </span>,
    price: 50,
  },
  LUMBER: {
    name: 'Lumber',
    icon: LumberIcon,
    type: 'Lumber',
    description: <span>
      Processed from <Yellow>Logs</Yellow>. It's chiefly used in carpentry.<br /><br />
      Vocation: Carpentry<br />
      Workbench: Sawmill Station
    </span>,
    price: 10,
  },
  STONE_BRICK: {
    name: 'Stone Brick',
    icon: StoneBrickIcon,
    type: 'Stone Brick',
    description: <span>
      A processed <Yellow>Stone</Yellow>.<br />
      It's chiefly used for Masonry purposes.<br /><br />
      Vocation: Masonry<br />
      Workbench: Stonemason Workbench
    </span>,
    price: 10,
  },
  IRON_INGOT: {
    name: 'Iron Ingot',
    icon: IronIngotIcon,
    type: 'Metal',
    description: <span>
      Processed from <Yellow>Iron Ore</Yellow>. It's chiefly used in making weapons and plate armor.<br /><br />
      Vocation: Metalwork<br />
      Workbench: Smelter
    </span>,
    price: 10,
  },
  LEATHER: {
    name: 'Leather',
    icon: LeatherIcon,
    type: 'Hide',
    description: <span>
      Processed from <Yellow>pelts</Yellow>. It's chiefly used in leather armor and other leather goods.<br /><br />
      Vocation: Leatherwork<br />
      Workbench: Leather Workbench
    </span>,
    price: 10,
  },
  FABRIC: {
    name: 'Fabric',
    icon: FabricIcon,
    type: 'Fabric',
    description: <span>
      Processed from <Yellow>Wool</Yellow> or <Yellow>Cotton</Yellow>. It's chiefly used in cloth armor and other tailoring goods.<br /><br />
      Vocation: Tailoring<br />
      Workbench: Weaving Loom
    </span>,
    price: 10,
  },
  ROYAL_SEED: {
    name: 'Royal Seed',
    icon: RoyalSeedIcon,
    type: 'Seed',
    quality: QUALITY.ARCANE,
    description: <span>
      A rare material sometimes found by harvesting, or can be purchased from Vocation Shop. Chances for a rare drop increase with higher Farming proficiency.<br />
      It's chiefly used in improving plants or crafting decor items.
    </span>,
    price: 100,
  },
  BLUE_SALT_HAMMER: {
    name: 'Blue Salt Hammer',
    icon: BlueSaltHammerIcon,
    type: 'Contraption',
    description: <span>
      A blessed hammer.<br />
      Used for various crafting purposes and builders' rites.<br />
      Can be purchased from a <Blue>General Merchant</Blue>.
    </span>,
    price: 1000,
  },
  TIME_SPACE_RIFT_SHARD: {
    name: 'Time-Space Rift Shard',
    icon: TimeSpaceShardIcon,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      A shard from the time-space rift.<br />
      Can be obtained from Boss Creatures from the Past.<br /><br />
      Used for crafting specialties.
    </span>,
    price: 500,
  },
  YETIS_PELT: {
    name: 'Yeti\'s Pelt',
    icon: YetisPeltIcon,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Mhondra the Brute</Yellow> in <Blue>Rookborne Basin</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 500,
  },
  TWINHEAD_VIPER_FANG: {
    name: 'Twinhead Viper Fang',
    icon: TwinViperFangIcon,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>The Dunemaker</Yellow> in <Blue>Windscour Savannah</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 500,
  },
  REVENANT_SOUL: {
    name: 'Revenant Soul',
    icon: RevenantSoulIcon,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Biskilon the Shade</Yellow> in <Blue>Perinoor Ruins</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 500,
  },
  GHOST_BLADES_WEAPON_SHARD: {
    name: 'Ghost Blade\'s Weapon Shard',
    icon: GhostBladeShardIcon,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Grul, the Dragon's Flame</Yellow> in <Blue>Hasla</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 500,
  },
});
