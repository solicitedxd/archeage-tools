import { QUALITY } from 'constants/items';
import React from 'react';
// import * as Icon from '../images/item/';
const Icon = {};

const Green = ({ children }) => <span className="tt-green">{children}</span>;
const BGreen = ({ children }) => <span className="tt-bgreen">{children}</span>;
const Blue = ({ children }) => <span className="tt-blue">{children}</span>;
const Yellow = ({ children }) => <span className="tt-yellow">{children}</span>;
const Orange = ({ children }) => <span className="tt-orange">{children}</span>;
const Use = ({ children, title = 'Use:' }) => (
  <>
    <span className="tt-use">{title}</span>
    {children && <Green>{children}</Green>}
  </>
);
const Process = ({ into, labor = 5, count = 10, knives = 1 }) => (
  <>
    <Use>
      Spend {labor} Labor to process {into}.<br />
      Auto-use with shift + right-click.<br /><br />
      Requirements<br />
      - {count} items of the same type<br />
      - {knives} Blue Salt Knife
    </Use>
  </>
);

const ITEM = Object.freeze({
  GILDA_STAR: 23633,
  SHATIGONS_SAND: 35898,
  HONORABLE_VICTORY_14: 43779,
  HONORABLE_VICTORY_5: 32492,
  HONORABLE_VICTORY_4: 32491,
  HONORABLE_VOCATION_4: 42852,
  BOUND_LABOR_RECHARGER: 46250,
  IMPROVED_INFUSION_SUPPLY_KIT: 47218,
  BLUE_SALT_BOND: 41488,
  RAINBOW_SPRINKLER: 35721,
  SHARPWIND_MINING_DRILL: 35303,
  STAR_WINGS: 685,
  ACID_GOBBET: 43129,
  CURSED_ARMOR_SCRAP: 43128,
  UNIDENTIFIED_HIRAM_INFUSION: 45731,
  MYSTERIOUS_HIRAM_INFUSION: 46023,
  RADIANT_HIRAM_INFUSION: 47052,
  HIRAM_AWAKENING_SCROLL: 45729,
  RADIANT_HIRAM_AWAKENING_SCROLL: 45908,
  BRILLIANT_HIRAM_AWAKENING_SCROLL: 47064,
  RED_DRAGON_POUCH: 46569,
  KADUMS_CRATE: 47702,
  ONYX_ARCHEUM_ESSENCE: 32103,
  DRAGON_ESSENCE_STABILIZER: 32106,
  REVENANT_SOULSTONE: 38093,
  ORIGINAL_TITANS_WINGS: 44018,
  FIERCE_TITANS_WINGS: 44460,
  GLOWING_PRISM: 15621,
  CONDENSED_SCENT: 26505,
  VITA_ROOT: 21850,
  WATER: 15694,
  ECO_FRIENDLY_FUEL: 26548,
  AXLE_GREASE: 42314,
  RECOVERY_POUCH_KIT: 19034,
  SALVE_AGING_LARDER: {
    name: 'Salve Aging Larder',
    icon: Icon.SalveAgingLarder,
    type: 'Contraption',
    description: <span>
      Used for producing <Yellow>Aged Cheese Specialties.</Yellow><br />
      Can only be installed in specialty crafting areas.<br />
      <Orange>Placed Larders disappear after 24 hours.</Orange><br /><br />
      Must be Lv30+ to craft a pack.<br /><br />
      Vocation: Commerce<br />
      Workbench: Farmer's Workstation<br /><br />
      <Use>
        Use with right-click.<br />
        Can be positioned on the ground with left-click.<br /><br />
        Costs 5 Labor if not placed on personal land.
      </Use>
    </span>,
    price: 300,
  },
  CHEESE_AGING_LARDER: {
    name: 'Cheese Aging Larder',
    icon: Icon.CheeseAgingLarder,
    type: 'Contraption',
    description: <span>
      Used for producing <Yellow>Aged Cheese Specialties.</Yellow><br />
      Can only be installed in specialty crafting areas.<br />
      <Orange>Placed Larders disappear after 24 hours.</Orange><br /><br />
      Must be Lv30+ to craft a pack.<br /><br />
      Vocation: Commerce<br />
      Workbench: Farmer's Workstation<br /><br />
      <Use>
        Use with right-click.<br />
        Can be positioned on the ground with left-click.<br /><br />
        Costs 5 Labor if not placed on personal land.
      </Use>
    </span>,
    price: 300,
  },
  HONEY_AGING_LARDER: {
    name: 'Honey Aging Larder',
    icon: Icon.HoneyAgingLarder,
    type: 'Contraption',
    description: <span>
      Used for producing <Yellow>Aged Honey Specialties.</Yellow><br />
      Can only be installed in specialty crafting areas.<br />
      <Orange>Placed Larders disappear after 24 hours.</Orange><br /><br />
      Must be Lv30+ to craft a pack.<br /><br />
      Vocation: Commerce<br />
      Workbench: Farmer's Workstation<br /><br />
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
    icon: Icon.ChoppedProduce,
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
    icon: Icon.TrimmedMeat,
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
    icon: Icon.DriedFlowers,
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
    icon: Icon.MedicinalPowder,
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
    icon: Icon.GroundGrain,
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
    icon: Icon.GroundSpices,
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
    icon: Icon.OrchardPuree,
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
    icon: Icon.Honey,
    type: 'Herb',
    description: <span>
      Can be harvested from <Yellow>Acorn Beehives</Yellow>. It's chiefly used in husbandry and raising pets.
    </span>,
    price: 200,
  },
  HAY_BALE: {
    name: 'Hay Bale',
    icon: Icon.HayBale,
    type: 'Contraption',
    description: <span>
      A material often found when harvesting grains. It can be used as food for livestock.
    </span>,
    price: 15,
  },
  EGG: {
    name: 'Egg',
    icon: Icon.Egg,
    type: 'Material',
    description: <span>
      A material found by collecting from <Yellow>thriving hens</Yellow> that have been fed <Yellow>ground grain</Yellow>. It's chiefly used in cooking.
    </span>,
    price: 20,
  },
  LEMON: {
    name: 'Lemon',
    icon: Icon.Lemon,
    type: 'Fruit',
    description: <span>
      A material found by gathering from <Yellow>fruited lemon trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  APPLE: {
    name: 'Apple',
    icon: Icon.Apple,
    type: 'Fruit',
    description: <span>
      A material found by gathering from <Yellow>fruited apple trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  CARROT: 7998,
  LAVENDER: {
    name: 'Lavender',
    icon: Icon.Lavender,
    type: 'Spice',
    description: <span>
      A material found by harvesting <Yellow>lavender</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Spices" />
    </span>,
    price: 20,
  },
  GRAPE: {
    name: 'Grape',
    icon: Icon.Grape,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited grapevines</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  AVOCADO: {
    name: 'Avocado',
    icon: Icon.Avocado,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited avocado trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  TOMATO: {
    name: 'Tomato',
    icon: Icon.Tomato,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>tomatoes</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  GARLIC: {
    name: 'Garlic',
    icon: Icon.Garlic,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>garlic</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  CUCUMBER: {
    name: 'Cucumber',
    icon: Icon.Cucumber,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>cucumber</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  ONION: {
    name: 'Onion',
    icon: Icon.Onion,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>onions</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  POTATO: {
    name: 'Potato',
    icon: Icon.Potato,
    type: 'Vegetable',
    description: <span>
      A material found by harvesting <Yellow>potatoes</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Chopped Produce" />
    </span>,
    price: 20,
  },
  FIG: {
    name: 'Fig',
    icon: Icon.Fig,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited fig trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  BANANA: {
    name: 'Banana',
    icon: Icon.Banana,
    type: 'Fruit',
    description: <span>
      A material found by harvesting <Yellow>fruited banana trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Orchard Puree" />
    </span>,
    price: 80,
  },
  RICE: {
    name: 'Rice',
    icon: Icon.Rice,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>rice</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  MILLET: {
    name: 'Millet',
    icon: Icon.Quinoa,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>millet</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  BARLEY: {
    name: 'Barley',
    icon: Icon.Barley,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>barley</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  CORN: {
    name: 'Corn',
    icon: Icon.Corn,
    type: 'Grain',
    description: <span>
      A material found by harvesting <Yellow>corn</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Grain" />
    </span>,
    price: 20,
  },
  ROSE: {
    name: 'Rose',
    icon: Icon.Rose,
    type: 'Flower',
    description: <span>
      A material found by harvesting <Yellow>roses</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="10 Dried Flowers" />
    </span>,
    price: 20,
  },
  AZALEA: {
    name: 'Azalea',
    icon: Icon.Azalea,
    type: 'Flower',
    description: <span>
      A material found by harvesting <Yellow>azaleas</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="10 Dried Flowers" />
    </span>,
    price: 20,
  },
  NARCISSUS: {
    name: 'Narcissus',
    icon: Icon.Narcissus,
    type: 'Flower',
    description: <span>
      A material found by harvesting <Yellow>narcissus</Yellow>. It's chiefly used in alchemy and local specialties.<br /><br />
      <Process into="10 Dried Flowers" />
    </span>,
    price: 20,
  },
  IRIS: {
    name: 'Iris',
    icon: Icon.Iris,
    type: 'Spice',
    description: <span>
      A material found by harvesting <Yellow>irises</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Ground Spices" />
    </span>,
    price: 20,
  },
  MUSHROOM: {
    name: 'Mushroom',
    icon: Icon.Mushroom,
    type: 'Herb',
    description: <span>
      A material found by harvesting <Yellow>mushrooms</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="10 Medicinal Powder" />
    </span>,
    price: 50,
  },
  GOOSE_DOWN: {
    name: 'Goose Down',
    icon: Icon.GooseDown,
    type: 'Textile',
    description: <span>
      A material found by harvesting from <Yellow>thriving geese</Yellow> that have been fed <Yellow>ground grain</Yellow>.
      It's chiefly used in carpentry and local specialties.
    </span>,
    price: 10,
  },
  DUCK_DOWN: {
    name: 'Duck Down',
    icon: Icon.DuckDown,
    type: 'Textile',
    description: <span>
      A material found by harvesting from <Yellow>thriving ducks</Yellow> that have been fed <Yellow>ground grain</Yellow>.
      It's chiefly used in making furniture and local specialties.
    </span>,
    price: 10,
  },
  WOOL: {
    name: 'Wool',
    icon: Icon.Wool,
    type: 'Textile',
    description: <span>
      A material found by shearing <Yellow>Thriving Sheep</Yellow> that have been fed <Yellow>Combined Feed</Yellow>.
      It can be processed into <Yellow>Fabric</Yellow> at <Blue>Weaving Looms</Blue> and used for various crafting purposes.
    </span>,
    price: 10,
  },
  SUNFLOWER: {
    name: 'Sunflower',
    icon: Icon.Sunflower,
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
    icon: Icon.Lily,
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
    icon: Icon.Cornflower,
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
    icon: Icon.Milk,
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
    icon: Icon.Olive,
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
    icon: Icon.Mint,
    type: 'Spice',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by harvesting <Yellow>mint</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Spices" />
    </span>,
    price: 105,
  },
  ROSEMARY: {
    name: 'Rosemary',
    icon: Icon.Rosemary,
    type: 'Spice',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by harvesting <Yellow>rosemary</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Spices" />
    </span>,
    price: 105,
  },
  POMEGRANATE: {
    name: 'Pomegranate',
    icon: Icon.Pomegranate,
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
    icon: Icon.Orange,
    type: 'Fruit',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>fruited orange trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Orchard Puree" />
    </span>,
    price: 600,
  },
  STRAWBERRY: {
    name: 'Strawberry',
    icon: Icon.Strawberry,
    type: 'Fruit',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>strawberries</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Orchard Puree" />
    </span>,
    price: 600,
  },
  ALOE: {
    name: 'Aloe',
    icon: Icon.Aloe,
    type: 'Herb',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>aloe</Yellow>. It's chiefly used in cooking, alchemy, and local specialties.<br /><br />
      <Process into="20 Medicinal Powder" />
    </span>,
    price: 105,
  },
  BAY_LEAF: {
    name: 'Bay Leaf',
    icon: Icon.BayLeaf,
    type: 'Herb',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>leafy bay trees</Yellow>. It's chiefly used in cooking and alchemy.<br /><br />
      <Process into="20 Medicinal Powder" />
    </span>,
    price: 105,
  },
  GINKGO_LEAF: {
    name: 'Ginkgo Leaf',
    icon: Icon.GinkgoLeaf,
    type: 'Herb',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>bushy ginkgo trees</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Medicinal Powder" />
    </span>,
    price: 105,
  },
  PEANUT: {
    name: 'Peanut',
    icon: Icon.Peanut,
    type: 'Grain',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>peanuts</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Grain" />
    </span>,
    price: 105,
  },
  OATS: {
    name: 'Oats',
    icon: Icon.Barley,
    type: 'Grain',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>oats</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Grain" />
    </span>,
    price: 105,
  },
  RYE: {
    name: 'Rye',
    icon: Icon.Wheat,
    type: 'Grain',
    quality: QUALITY.GRAND,
    description: <span>
      A material found by gathering from <Yellow>rye</Yellow>. It's chiefly used in cooking and local specialties.<br /><br />
      <Process into="20 Ground Grain" />
    </span>,
    price: 105,
  },
  YAM: {
    name: 'Yam',
    icon: Icon.Yam,
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
    icon: Icon.Turmeric,
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
    icon: Icon.Ginseng,
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
    icon: Icon.Jujube,
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
    icon: Icon.Cherry,
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
    icon: Icon.Olive,
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
    icon: Icon.Saffron,
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
    icon: Icon.YataFur,
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
    icon: Icon.SmallSeedOil,
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
    icon: Icon.SmallRootPigment,
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
    icon: Icon.OpaquePolish,
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
    icon: Icon.SunlightDust,
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
    icon: Icon.MoonlightDust,
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
    icon: Icon.StarlightDust,
    type: 'Archeum',
    description: <span>
      Pure, condensed magic, trapped in physical form. Energy from the stars makes it especially useful in handicrafting.<br /><br />
      A lack of magic--or life force--creates monsters, changes the climate, and weakens the barriers that protect the world from other dimensions.
      Using Archeum releases healing magic back into nature.
      <Use>Alchemy: Spend 5 Labor to combine 5 Starlight Archeum Dusts into 1 Starlight Archeum Shard. Auto-use: shift+right-click</Use>
    </span>,
    price: 50,
  },
  MYSTERIOUS_ABYSSAL_ENHANCER: 46576,
  NORYETTE_EARRING: {
    name: 'Noryette Earring',
    icon: Icon.NoryetteEarring,
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
      <Use title="Equip effect">Decreases <Blue>PvE Received Damage</Blue> <Orange>-2.0%</Orange>.</Use>
    </span>,
  },
  NORYETTE_RING: {
    name: 'Noryette Ring',
    icon: Icon.NoryetteRing,
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
    icon: Icon.NoryetteAwakeningScroll,
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
    icon: Icon.NoryetteAwakeningScroll,
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
    icon: Icon.GreaterGrindingScroll,
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
    icon: Icon.ExplorersBow,
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
    icon: Icon.ExplorerCrate,
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
    icon: Icon.ExplorerCrate,
    type: 'Crate',
    bindsOnPickup: true,
    description: <span>Allows you to choose a 2H Weapon.<br /><br />
      <Use>Open the Explorer's 2H-Weapon Crate.</Use>
    </span>,
  },
  EXPLORERS_CLOTH_CRATE: {
    name: 'Explorer\'s Cloth Crate',
    icon: Icon.ExplorerClothCrate,
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
    icon: Icon.ExplorerLeatherCrate,
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
    icon: Icon.ExplorerPlateCrate,
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
    icon: Icon.ExplorerClothCrate,
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
    icon: Icon.ExplorerLeatherCrate,
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
    icon: Icon.ExplorerPlateCrate,
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
    icon: Icon.StoryInfusion,
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
    icon: Icon.StoryInfusion,
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
    icon: Icon.StoryInfusion,
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
    icon: Icon.StoryAwakeningScroll,
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
    icon: Icon.StoryAwakeningScroll,
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
    icon: Icon.StoryAwakeningScroll,
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
    icon: Icon.TimeStone,
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
    icon: Icon.Lumber,
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
    icon: Icon.StoneBrick,
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
    icon: Icon.IronIngot,
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
    icon: Icon.Leather,
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
    icon: Icon.Fabric,
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
    icon: Icon.RoyalSeed,
    type: 'Seed',
    quality: QUALITY.ARCANE,
    description: <span>
      A rare material sometimes found by harvesting, or can be purchased from Vocation Shop. Chances for a rare drop increase with higher Farming proficiency.<br />
      It's chiefly used in improving plants or crafting decor items.
    </span>,
    price: 100,
  },
  BLUE_SALT_KNIFE: 8326,
  BLUE_SALT_HAMMER: 8329,
  TIME_SPACE_RIFT_SHARD: {
    name: 'Time-Space Rift Shard',
    icon: Icon.TimeSpaceRiftShard,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      A shard from the time-space rift.<br />
      Can be obtained from Boss Creatures from the Past.<br /><br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  YETIS_PELT: {
    name: 'Yeti\'s Pelt',
    icon: Icon.YetisPelt,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Mhondra the Brute</Yellow> in <Blue>Rookborne Basin</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  TWINHEAD_VIPER_FANG: {
    name: 'Twinhead Viper Fang',
    icon: Icon.TwinheadViperFang,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>The Dunemaker</Yellow> in <Blue>Windscour Savannah</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  REVENANT_SOUL: {
    name: 'Revenant Soul',
    icon: Icon.RevenantSoul,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Biskilon the Shade</Yellow> in <Blue>Perinoor Ruins</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  GHOST_BLADES_WEAPON_SHARD: {
    name: 'Ghost Blade\'s Weapon Shard',
    icon: Icon.GhostBladeWeaponShard,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Grul, the Dragon's Flame</Yellow> in <Blue>Hasla</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  CENTAURS_TAIL: {
    name: 'Centaur\'s Tail',
    icon: Icon.CentaurTail,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Hargath the War Leader</Yellow> in <Blue>Halcyona</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  SHARK_FIN: {
    name: 'Shark Fin',
    icon: Icon.SharkFin,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Vikon Shipsbane</Yellow> in <Blue>Sanddeep</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  DROWNED_CORPSE_FLUID: {
    name: 'Drowned Corpse Fluid',
    icon: Icon.DrownedCorpseFluid,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Magella the Corpse Queen</Yellow> in <Blue>Hellswamp</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  MINOTAUR_HORN: {
    name: 'Minotaur Horn',
    icon: Icon.MinotaurHorn,
    type: 'Material',
    quality: QUALITY.HEROIC,
    bindsOnPickup: true,
    description: <span>
      Proof that you have defeated a shadow invasion.<br />
      Can be obtained from <Yellow>Myrnock the Elder</Yellow> in <Blue>Karkasse Ridgelands</Blue>.<br />
      Used for crafting specialties.
    </span>,
    price: 1500,
  },
  REDTALON_HELM: {
    name: 'Redtalon Helm',
    icon: Icon.RedtalonHelm,
    type: 'Pet Gear',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    petLevel: 50,
    durability: 85,
    slot: 'Head',
    stats: {
      'Physical Defense': 550,
      'Magic Defense': 550,
    },
    tempering: true,
    sockets: 5,
    description: <span>A protective helm for mounts and battle pets.</span>,
    additionalEffect: <span>
      Physical Defense +418<br />
      Continuous Health Regen +17<br />
      Post-Cast Mana Regen +14
    </span>,
    price: 2888,
  },
  REDTALON_ARMOR: {
    name: 'Redtalon Armor',
    icon: Icon.RedtalonArmor,
    type: 'Pet Gear',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    petLevel: 50,
    durability: 140,
    slot: 'Chest',
    stats: {
      'Physical Defense': 917,
      'Magic Defense': 917,
    },
    tempering: true,
    sockets: 6,
    description: <span>Protects a <Orange>battle pet's</Orange> body and increases its critical attacks.</span>,
    additionalEffect: <span>
      Max Health +2100<br />
      Max Mana +1380<br />
      Melee Critical Rate +8.8%<br />
      Ranged Critical Rate +8.8%<br />
      Magic Critical Rate +8.8%
    </span>,
    price: 4125,
  },
  REDTALON_SADDLE: {
    name: 'Redtalon Saddle',
    icon: Icon.RedtalonSaddle,
    type: 'Pet Gear',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    petLevel: 50,
    durability: 25,
    slot: 'Chest',
    stats: {
      'Physical Defense': 183,
      'Magic Defense': 183,
    },
    tempering: true,
    sockets: 3,
    description: <span>A special saddle for increased riding stability. It can only be equipped on mounts.</span>,
    additionalEffect: <span>
      Max Health +1750<br />
      Max Mana +1150<br />
      Move Speed +3.0%
    </span>,
    price: 825,
  },
  REDTALON_LEGGUARDS: {
    name: 'Redtalon Legguards',
    icon: Icon.RedtalonLegguards,
    type: 'Pet Gear',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    petLevel: 50,
    durability: 55,
    slot: 'Feet',
    stats: {
      'Physical Defense': 367,
      'Magic Defense': 367,
    },
    tempering: true,
    sockets: 4,
    description: <span>Protection for the legs of mounts and battle pets.</span>,
    additionalEffect: <span>
      Move Speed +11.0%<br />
      Evasion +8.8%
    </span>,
    price: 2063,
  },
  LABYRINTH_VALUABLES_CHEST: {
    name: 'Labyrinth Valuables Chest',
    icon: Icon.LabyrinthValuablesChest,
    type: 'Other',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    description: <span>
      This chest is rife with the dark energy of Serpentis. Though foreboding, it is extremely powerful.<br /><br />
      <Use>Open the box.</Use>
    </span>,
    price: 250,
  },
  CARMILAS_MEMORY: {
    name: 'Carmila\'s Memory',
    icon: Icon.CarmilasMemory,
    type: 'Earring',
    quality: QUALITY.ARCANE,
    reqLevel: 50,
    bindsOnPickup: true,
    stats: {
      Spirit: 17,
    },
    salvageable: true,
    description: <Use title="Equip effect">Increases the effectiveness of healing skills +<Orange>2%</Orange>.</Use>,
    price: 618,
  },
  SUNSET_PORTALSTONE: 39780,
  SUPERIOR_DOOMSHADOW_NODACHI: {
    name: 'Superior Doomshadow Nodachi',
    icon: Icon.SuperiorDoomshadowNodachi,
    type: 'Nodachi',
    quality: QUALITY.RARE,
    reqLevel: 53,
    bindsOnPickup: true,
    synthesisXP: 7580,
    slot: '2H Weapon',
    attackSpeed: 2.0,
    durability: 163,
    weaponType: 'Slashing',
    dps: '401.2 (722 - 883)',
    stats: {
      Strength: 56,
      Agility: 42,
    },
    sockets: 6,
    description: <span>
      <Use>
        Increase Melee Attack <Orange>+5%</Orange> and Attack Speed <Orange>+111</Orange> for <Orange>12 sec</Orange>,
        but decreases Physical Defense <Orange>-5%</Orange>.<br />
        Cooldown: <Orange>45 sec.</Orange><br />
        <Yellow>Shares a cooldown with other Dungeon items.</Yellow>
      </Use><br /><br />
      <Use title="Equip effect">
        Activates <Orange>Dimensional Destroyer</Orange> in <Orange>Lv50+</Orange> dungeons.
      </Use>
    </span>,
    price: 9055,
  },
  SUNPOINT: {
    name: 'Sunpoint',
    icon: Icon.Sunpoint,
    type: 'Gem',
    quality: QUALITY.RARE,
    description: <span>Drawing on the power of sunlight, this jewel is required to create Regrade Scrolls.</span>,
    price: 2000,
  },
  MOONPOINT: {
    name: 'Moonpoint',
    icon: Icon.Moonpoint,
    type: 'Gem',
    quality: QUALITY.RARE,
    description: <span>Drawing on the power of moonlight, this jewel is required to create Regrade Scrolls.</span>,
    price: 2000,
  },
  STARPOINT: {
    name: 'Starpoint',
    icon: Icon.Starpoint,
    type: 'Gem',
    quality: QUALITY.RARE,
    description: <span>Drawing on the power of starlight, this jewel is required to create Regrade Scrolls.</span>,
    price: 2000,
  },
  SUNGLOW_LUNAGEM: {
    name: 'Sunglow Lunagem',
    icon: Icon.SunglowLunagem,
    type: 'Lunagem',
    quality: QUALITY.RARE,
    description: <span>
      <Yellow>Sunglow Lunagems</Yellow> provide different bonuses depending on how they are refined. Right-click to
      refine this Lunagem into its final form, which will decide which bonuses it gives.<br /><br />
      Waist:<br />
      - Triple Slash (Battlerage)<br />
      - Pain Harvest (Occultism)<br />
      - Revitalizing Cheer (Defense)<br />
      - Warding Light (Auramancy)<br />
      - Stillness (Witchcraft)<br />
      - Blazing Arrow (Archery)<br />
      - Frigid Tracks (Sorcery)<br />
      - Rapid Strike (Shadowplay)<br />
      - Startling Strain (Songcraft)<br />
      - Fervent Healing (Vitalism)<br />
      - Serpent Glare (Malediction)<br /><br />
      Can be acquired from Greater or higher dungeon bosses.<br /><br />
      <Use>Choose an effect of the Lunagem.</Use>
    </span>,
    price: 132,
  },
  DERANGED_SPIRIT: {
    name: 'Deranged Spirit',
    icon: Icon.DerangedSpirit,
    type: 'Material',
    quality: QUALITY.HEROIC,
    description: <span>
      A haze of madness clouds the energy of this troubled spirit.<br />
      Can be obtained in <Orange>Serpentis</Orange>.
    </span>,
    price: 54000,
  },
  MYSTERIOUS_GEM: {
    name: 'Mysterious Gem',
    icon: Icon.MysteriousGem,
    type: 'Quest Item',
    quality: QUALITY.ARCANE,
    questStarter: true,
    bindsOnPickup: true,
    reqLevel: 50,
    description: 'Begins the quest "Gentle Whispers."',
  },
  ABYSSAL_SHARD: 28189,
  ABYSSAL_CRYSTAL: 28188,
  ETERNAL_WINTER_CHILL: {
    name: 'Eternal Winter Chill',
    icon: Icon.EternalWinterChill,
    type: 'Material',
    description: 'This crafting material radiates the chill of rocky cavern.',
    price: 1000,
  },
  HEAT_OF_ETERNAL_SUMMER: {
    name: 'Heat of Eternal Summer',
    icon: Icon.HeatOfEternalSummer,
    type: 'Material',
    description: 'The crafting material radiates the warmth of a summer garden.',
    price: 500,
  },
  PRIME_LUNARITE: {
    name: 'Prime Lunarite',
    icon: Icon.PrimeLunarite,
    type: 'Alchemy',
    description: 'Used to craft lunastones, this essence shines softly with the arcane glow of the moon.',
    price: 4500,
  },
  BLACK_PEARL: {
    name: 'Black Pearl',
    icon: Icon.BlackPearl,
    type: 'Gem',
    quality: QUALITY.RARE,
    description: <span>
      A rare material found by gathering from <Blue>Black Pearl Shells</Blue> on the beach. It's chiefly used in alchemy, local specialties, and components.<br /><br />
      <Use>
        Spend 5 Labor to process 100 Sparkling Shell Dust.<br />
        Auto-use with shift+right-click.<br /><br />
        Requirements<br />
        - 1 Black Pearl<br />
        - 1 Blue Salt Knife
      </Use>
    </span>,
    price: 10000,
  },
  AMETHYST: {
    name: 'Amethyst',
    icon: Icon.Amethyst,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  DIAMOND: {
    name: 'Diamond',
    icon: Icon.Diamond,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  EMERALD: {
    name: 'Emerald',
    icon: Icon.Emerald,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  RUBY: {
    name: 'Ruby',
    icon: Icon.Ruby,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  SAPPHIRE: {
    name: 'Sapphire',
    icon: Icon.Sapphire,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  TOPAZ: {
    name: 'Topaz',
    icon: Icon.Topaz,
    type: 'Gem',
    description: <span>
      A material found by mining <Blue>Fortuna Veins</Blue>, which appear randomly when mining <Yellow>Stone Piles</Yellow>.<br />
      It's chiefly used in making accessories and handicrafts.
    </span>,
  },
  SMALL_BREATH_OF_LIFE: {
    name: 'Small Breath of Life',
    icon: Icon.SmallBreathOfLife,
    type: 'Furniture',
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
    description: <span>
      Places a <Yellow>Small Breath of Life</Yellow> apparatus in a completed house, that allows you to sooth a pet's soul and grow it to maturity.<br /><br />
      Placement: house floor or yard
    </span>,
    price: 2250,
  },
  BLANK_REGRADE_SCROLL: {
    name: 'Blank Regrade Scroll',
    icon: Icon.BlankRegradeScroll,
    type: 'Talisman',
    description: <span>
      This paper has been specifically processed to absorb the energy of specialized crafting materials, such as Sunpoints and Moonpoints.<br /><br />
      Vocation: Printing<br />
      Workbench: Paper Press
    </span>,
    price: 10,
  },
  BEAUTIFULLY_COLORED_FABRIC: {
    name: 'Beautifully Colored Fabric',
    icon: Icon.BeautifullyColoredFabric,
    type: 'Fabric',
    description: <span>
      Processed from <Yellow>Fabric</Yellow>. It's chiefly used in cloth armor and other tailoring goods.<br /><br />
      Vocation: Tailoring<br />
      Workbench: Weaving Loom
    </span>,
    price: 2500,
  },
  STURDY_INGOT: {
    name: 'Sturdy Ingot',
    icon: Icon.SturdyIngot,
    type: 'Metal',
    description: <span>
      Processed from <Yellow>Iron Ingots</Yellow>. It's chiefly used in making weapons and plate armor.<br /><br />
      Vocation: Metalwork<br />
      Workbench: Smelter
    </span>,
    price: 2500,
  },
  FINE_LEATHER: {
    name: 'Fine Leather',
    icon: Icon.FineLeather,
    type: 'Hide',
    description: <span>
      Processed from <Yellow>Leather</Yellow>. It's chiefly used in leather armor and other leather goods.<br /><br />
      Vocation: Leatherwork<br />
      Workbench: Leather Workbench
    </span>,
    price: 2500,
  },
  PRISMATIC_DIAMOND: {
    name: 'Prismatic Diamond',
    icon: Icon.PrismaticDiamond,
    type: 'Material',
    description: <span>
      Made of marine resources and jewels; can be used for advanced crafts.<br /><br />
      Vocation: Handicraft<br />
      Workstation: Handicraft Kiln
    </span>,
    price: 100,
  },
  PRISMATIC_PEARL: {
    name: 'Prismatic Pearl',
    icon: Icon.PrismaticPearl,
    type: 'Material',
    description: <span>
      Made of marine resources and jewels; can be used for advanced crafts.<br /><br />
      Vocation: Handicraft<br />
      Workstation: Handicraft Kiln
    </span>,
    price: 100,
  },
  HONORFORGED_MEDAL: {
    name: 'Honorforged Medal',
    icon: Icon.HonorforgedMedal,
    type: 'Material',
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
    description: 'Proof of an honorable performance. Can be used in crafting.',
    price: 30,
  },
  PUREBRED_BEAR_CERTIFICATE: {
    name: 'Purebred Bear Certificate',
    icon: Icon.Certificate,
    type: 'Material',
    quality: QUALITY.RARE,
    description: 'Certifies that a bear is purebred and healthy. Deliver to the rancher on Mirage Isle.',
    price: 20,
  },
  DILIGENCE_COIN: {
    name: 'Diligence Coin',
    icon: Icon.DiligenceCoin,
    type: 'Coin',
    quality: QUALITY.ARCANE,
    bindsOnPickup: true,
    description: 'A coin gifted to diligent, hard workers, for a job well done.',
    price: 250,
  },
  MANASTORM_CRYSTAL: {
    name: 'Manastorm Crystal',
    icon: Icon.ManastormCrystal,
    type: 'Other',
    quality: QUALITY.GRAND,
    bindsOnPickup: true,
    description: <span>
      The crystal swirls with powerful magic. It can be found by opening <Orange>Locked Gold Crates.</Orange><br /><br />
      Used in crafting <Orange>gliders, pets, mounts and their armor.</Orange>
    </span>,
    price: 750,
  },
  CHILLED_SEAFOAM: {
    name: 'Chilled Seafoam',
    icon: Icon.ChilledSeafoam,
    type: 'Material',
    quality: QUALITY.UNIQUE,
    description: <span>
      Once spent, the sea's energy condenses into the whipped froth that tops waves and whitecaps.<br />
      Can be obtained in the <Blue>Sea of Drowned Love</Blue>. Used in equipment crafting.
    </span>,
    price: 350000,
  },
  TERRITORY_COIN: 48078,
  BLAZING_WIND_SPIRIT_LEATHER: {
    name: 'Blazing Wind Spirit Leather',
    icon: Icon.BlazingWindSpiritLeather,
    type: 'Hide',
    description: <span>
      This ancient leather was treated with scorching steam to make it more durable.<br /><br />
      Vocation: Leatherwork<br />
      Workbench: Leather Workbench
    </span>,
    price: 9500,
  },
  BLAZING_CLOUDSPUN_FABRIC: {
    name: 'Blazing Cloudspun Fabric',
    icon: Icon.BlazingCloudspunFabric,
    type: 'Fabric',
    description: <span>
      This ancient fabric was treated with scorching steam to make it more durable (not to mention wrinkle-free!).<br /><br />
      Vocation: Tailoring<br />
      Workbench: Weaving Loom
    </span>,
    price: 9500,
  },
  TERRITORY_PENCE: 40229,
  TERRITORY_RESOURCE_COIN: 48133,
});

export default ITEM;
