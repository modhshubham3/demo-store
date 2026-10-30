// Fake catalogue for the demo. Replace with real products (or a CMS / DB)
// and add real images — `emoji` + `tint` stand in for photos here.

export type Category = { slug: string; name: string; blurb: string };

export type Product = {
  slug: string;
  name: string;
  category: string; // Category.slug
  price: number; // INR, whole rupees
  mrp?: number; // strike-through price
  emoji: string;
  tint: string;
  short: string;
  description: string;
  details: string[];
};

export const categories: Category[] = [
  { slug: "kitchen", name: "Kitchen", blurb: "Cookware and everyday kitchen essentials." },
  { slug: "home-decor", name: "Home decor", blurb: "Small pieces that make a room feel finished." },
  { slug: "accessories", name: "Accessories", blurb: "Bags, bottles, and things you carry daily." },
];

export const products: Product[] = [
  {
    slug: "cast-iron-tawa",
    name: "Pre-seasoned Cast Iron Tawa",
    category: "kitchen",
    price: 1499,
    mrp: 1899,
    emoji: "🍳",
    tint: "#e8dccb",
    short: "28 cm, pre-seasoned, works on gas and induction.",
    description:
      "A heavy 28 cm tawa that holds heat evenly for rotis, dosas, and searing. Arrives pre-seasoned and gets better with use.",
    details: ["28 cm diameter", "Pre-seasoned, no coating", "Gas, induction, and oven safe"],
  },
  {
    slug: "stoneware-mug-set",
    name: "Stoneware Mug Set of 4",
    category: "kitchen",
    price: 999,
    emoji: "☕",
    tint: "#dfe6e0",
    short: "Hand-glazed, 300 ml each, dishwasher safe.",
    description: "Four sturdy mugs in a speckled glaze. Comfortable handle, microwave and dishwasher safe.",
    details: ["Set of 4, 300 ml each", "Microwave and dishwasher safe", "Lead-free glaze"],
  },
  {
    slug: "bamboo-chopping-board",
    name: "Bamboo Chopping Board",
    category: "kitchen",
    price: 649,
    mrp: 799,
    emoji: "🔪",
    tint: "#efe3c8",
    short: "Large, reversible, with a juice groove.",
    description: "A large reversible board with a juice groove, gentle on knife edges and easy to clean.",
    details: ["40 x 28 cm", "Reversible with juice groove", "Hand wash only"],
  },
  {
    slug: "ceramic-vase",
    name: "Matte Ceramic Vase",
    category: "home-decor",
    price: 1199,
    emoji: "🏺",
    tint: "#e5dde8",
    short: "Matte finish, 24 cm tall, waterproof inside.",
    description: "A tall matte vase that looks good with flowers or on its own. Glazed inside, so it holds water.",
    details: ["24 cm tall", "Glazed inside, holds water", "Available in sand and sage"],
  },
  {
    slug: "woven-wall-basket",
    name: "Woven Wall Basket",
    category: "home-decor",
    price: 799,
    emoji: "🧺",
    tint: "#ecdcc4",
    short: "Hand-woven seagrass, 35 cm, ready to hang.",
    description: "A hand-woven seagrass basket that works as wall decor or as storage. Comes with a hanging loop.",
    details: ["35 cm diameter", "Natural seagrass", "Hanging loop included"],
  },
  {
    slug: "soy-candle-trio",
    name: "Soy Wax Candle Trio",
    category: "home-decor",
    price: 1099,
    mrp: 1399,
    emoji: "🕯️",
    tint: "#f1e2d3",
    short: "Three 120 g candles, about 25 hours each.",
    description: "Three soy wax candles in cotton-wick tins, with light cedar, jasmine, and vanilla scents.",
    details: ["3 x 120 g", "About 25 hours burn time each", "Cotton wicks, recyclable tins"],
  },
  {
    slug: "steel-water-bottle",
    name: "Insulated Steel Bottle",
    category: "accessories",
    price: 899,
    emoji: "🥤",
    tint: "#dbe5ee",
    short: "750 ml, keeps cold 24 hours and hot 12 hours.",
    description: "Double-walled stainless steel bottle with a leak-proof lid and a powder-coated grip.",
    details: ["750 ml", "Cold 24 h, hot 12 h", "BPA-free, leak proof"],
  },
  {
    slug: "canvas-tote",
    name: "Heavy Canvas Tote",
    category: "accessories",
    price: 549,
    emoji: "👜",
    tint: "#e6e1d6",
    short: "Thick cotton canvas with an inner zip pocket.",
    description: "A roomy tote in thick cotton canvas with reinforced straps and a zip pocket inside.",
    details: ["Cotton canvas, 12 oz", "Inner zip pocket", "Machine washable"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (category: string) => products.filter((p) => p.category === category);
