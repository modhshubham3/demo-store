// Fake catalogue for the demo. Brands, ratings and review counts are fictional.
// Replace with real products (or a CMS / DB) and real images — `emoji` + `tint`
// stand in for photos here.

export type Category = { slug: string; name: string; blurb: string; emoji: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string; // Category.slug
  price: number; // INR, whole rupees
  mrp: number; // strike-through price
  rating: number; // 1-5, fictional
  reviews: number; // fictional
  emoji: string;
  tint: string;
  short: string;
  description: string;
  details: string[];
};

export const categories: Category[] = [
  { slug: "women", name: "Women", emoji: "👗", blurb: "Kurtas, dresses, sarees and everyday wear for women." },
  { slug: "men", name: "Men", emoji: "👔", blurb: "Shirts, tees, chinos and jackets for men." },
  { slug: "footwear", name: "Footwear", emoji: "👟", blurb: "Sneakers, formals, sandals and sliders." },
  { slug: "electronics", name: "Electronics", emoji: "🎧", blurb: "Earbuds, power banks, smartwatches and accessories." },
  { slug: "kitchen", name: "Kitchen", emoji: "🍳", blurb: "Cookware and everyday kitchen essentials." },
  { slug: "home-decor", name: "Home decor", emoji: "🕯️", blurb: "Small pieces that make a room feel finished." },
  { slug: "accessories", name: "Accessories", emoji: "🎒", blurb: "Bags, bottles, wallets, watches and things you carry daily." },
];

const NOTE: Record<string, string> = {
  women: "Easy to style for work, travel or festive days.",
  men: "A wardrobe staple that works with most outfits.",
  footwear: "Built for all-day comfort on Indian roads.",
  electronics: "Comes with a 1-year demo warranty (fictional).",
  kitchen: "Made for daily use in an Indian kitchen.",
  "home-decor": "Adds warmth to a bedroom, living room or balcony.",
  accessories: "Designed to be carried every day.",
};

// slug, name, brand, category, price, mrp, rating, reviews, emoji, tint, short, details, [description]
type Row = [string, string, string, string, number, number, number, number, string, string, string, string[], string?];

const rows: Row[] = [
  // Women
  ["block-print-cotton-kurta-set", "Block Print Cotton Kurta Set", "Rangreza", "women", 1299, 2599, 4.2, 3120, "👗", "#f3d9e4", "Kurta, palazzo and dupatta in soft cotton.", ["Pure cotton", "3-piece set", "Machine washable"]],
  ["floral-georgette-maxi-dress", "Floral Georgette Maxi Dress", "Veda & Co", "women", 1099, 2199, 4.0, 1840, "👗", "#fbe3d6", "Flowy maxi with a smocked waist.", ["Georgette, lined", "Smocked waist", "Dry clean recommended"]],
  ["high-waist-straight-jeans", "High-Waist Straight Jeans", "Denimora", "women", 1199, 2399, 4.1, 5210, "👖", "#d6e2f0", "Stretch denim with a clean straight leg.", ["98% cotton, 2% elastane", "High rise", "Machine washable"]],
  ["handloom-cotton-saree", "Handloom Cotton Saree", "Weavers Nest", "women", 1799, 3499, 4.4, 980, "🥻", "#f5dcc0", "Handloom cotton with a woven zari border.", ["Handloom cotton", "Blouse piece included", "6.3 m length"]],
  ["oversized-cotton-tee-women", "Oversized Cotton Tee", "Loomline", "women", 449, 999, 4.0, 7600, "👚", "#e4efe0", "Drop-shoulder tee in 180 GSM cotton.", ["180 GSM cotton", "Relaxed fit", "Pre-shrunk"]],
  ["embroidered-dupatta", "Embroidered Chanderi Dupatta", "Rangreza", "women", 399, 899, 3.9, 640, "🧣", "#efdcf0", "Lightweight dupatta with thread embroidery.", ["Chanderi blend", "2.4 m length", "Hand wash cold"]],
  // Men
  ["slim-fit-oxford-shirt", "Slim Fit Oxford Shirt", "Northbay", "men", 899, 1799, 4.2, 4300, "👔", "#d9e4f2", "Cotton oxford, button-down collar.", ["100% cotton", "Slim fit", "Machine washable"]],
  ["regular-fit-chinos", "Regular Fit Stretch Chinos", "Northbay", "men", 1099, 2199, 4.1, 2750, "👖", "#e6dcc8", "Comfort-stretch chinos for office and weekends.", ["Cotton stretch twill", "Regular fit", "Mid rise"]],
  ["graphic-cotton-tee-men", "Graphic Print Cotton Tee", "Loomline", "men", 399, 899, 4.0, 9100, "👕", "#dfe8dc", "Round neck tee with a soft-touch print.", ["180 GSM cotton", "Regular fit", "Pre-shrunk"]],
  ["zip-up-fleece-hoodie", "Zip-Up Fleece Hoodie", "Trailkind", "men", 1399, 2799, 4.3, 3300, "🧥", "#d8d4e8", "Brushed fleece with kangaroo pockets.", ["Fleece, 320 GSM", "Two zip pockets", "Machine washable"]],
  ["cotton-kurta-pyjama-set", "Cotton Kurta Pyjama Set", "Rangreza", "men", 1199, 2399, 4.2, 1500, "👘", "#f1e6d0", "Festive-ready set in breathable cotton.", ["Cotton blend", "Straight kurta", "Drawstring pyjama"]],
  ["quilted-puffer-jacket", "Quilted Puffer Jacket", "Trailkind", "men", 2199, 4499, 4.2, 1210, "🧥", "#cfd8e0", "Light puffer for Delhi winters and hill trips.", ["Water-resistant shell", "Polyfill insulation", "Packs into its pocket"]],
  // Footwear
  ["lightweight-running-shoes", "Lightweight Running Shoes", "Stridex", "footwear", 1599, 3199, 4.2, 6400, "👟", "#e0e8f0", "Breathable mesh with a cushioned sole.", ["Mesh upper", "EVA midsole", "Non-slip outsole"]],
  ["canvas-low-top-sneakers", "Canvas Low-Top Sneakers", "Stridex", "footwear", 899, 1799, 4.0, 8800, "👟", "#f0e4d8", "Classic canvas sneakers in everyday colours.", ["Canvas upper", "Rubber sole", "Lace-up"]],
  ["leather-formal-derby-shoes", "Leather Formal Derby Shoes", "Northbay", "footwear", 2299, 4599, 4.3, 1900, "👞", "#e3d3c3", "Genuine leather derbies with a padded insole.", ["Genuine leather", "Padded insole", "Resoleable"]],
  ["kolhapuri-leather-sandals", "Kolhapuri Leather Sandals", "Chappal Co.", "footwear", 799, 1599, 4.1, 2300, "🩴", "#ecd9bd", "Hand-stitched sandals in vegetable-tanned leather.", ["Vegetable-tanned leather", "Hand stitched", "Flat sole"]],
  ["cushioned-slide-sliders", "Cushioned Slide Sliders", "Stridex", "footwear", 399, 899, 3.9, 12000, "🩴", "#dde6e0", "Soft EVA sliders for home and beach.", ["EVA foam", "Anti-skid sole", "Water friendly"]],
  ["block-heel-sandals", "Block Heel Sandals", "Veda & Co", "footwear", 999, 1999, 4.0, 1700, "👡", "#f3dbe0", "2-inch block heel that stays comfortable all evening.", ["Faux leather", "2-inch heel", "Buckle closure"]],
  // Electronics
  ["bluetooth-neckband-earphones", "Bluetooth Neckband Earphones", "Boomtone", "electronics", 799, 1999, 4.0, 18500, "🎧", "#dfe1ee", "Up to 30 hours of playtime with fast charge.", ["Bluetooth 5.3", "30 h playtime", "IPX5 sweat proof"]],
  ["true-wireless-earbuds", "True Wireless Earbuds", "Boomtone", "electronics", 1499, 3999, 4.1, 9400, "🎧", "#e3e3e3", "Low-latency earbuds with a charging case.", ["Bluetooth 5.3", "40 h with case", "Touch controls"]],
  ["power-bank-10000", "10000 mAh Power Bank", "Voltix", "electronics", 999, 1999, 4.2, 7600, "🔋", "#e4ecd9", "Slim power bank with two outputs and 22.5W charging.", ["10000 mAh", "22.5W fast charge", "USB-C and USB-A"]],
  ["amoled-smartwatch", "Smartwatch with AMOLED Display", "Pulsefit", "electronics", 2499, 6999, 4.1, 5300, "⌚", "#d6dce8", "Bright AMOLED screen with heart-rate and sleep tracking.", ["1.8-inch AMOLED", "7-day battery", "100+ sport modes"]],
  ["portable-bluetooth-speaker", "Portable Bluetooth Speaker", "Boomtone", "electronics", 1299, 2999, 4.2, 4100, "🔊", "#ecdfd6", "Splash-proof speaker with 12 hours of music.", ["10W output", "12 h playtime", "IPX6 rated"]],
  ["fast-charger-65w", "65W GaN Fast Charger", "Voltix", "electronics", 799, 1499, 4.3, 2900, "🔌", "#e8e8d8", "Charges a laptop and phone together.", ["65W total", "2 x USB-C, 1 x USB-A", "Compact GaN design"]],
  ["mechanical-keyboard", "Mechanical Keyboard (Blue Switch)", "Keyforge", "electronics", 2799, 4999, 4.4, 1500, "⌨️", "#d9d9e6", "Compact 87-key board with backlighting.", ["Hot-swappable switches", "White backlight", "USB-C cable"]],
  // Kitchen
  ["cast-iron-tawa", "Pre-seasoned Cast Iron Tawa", "Hearthwell", "kitchen", 1499, 1899, 4.5, 2210, "🍳", "#e8dccb", "28 cm, pre-seasoned, works on gas and induction.", ["28 cm diameter", "Pre-seasoned, no coating", "Gas, induction, and oven safe"], "A heavy 28 cm tawa that holds heat evenly for rotis, dosas, and searing. Arrives pre-seasoned and gets better with use."],
  ["stoneware-mug-set", "Stoneware Mug Set of 4", "Claywork", "kitchen", 999, 1499, 4.3, 860, "☕", "#dfe6e0", "Hand-glazed, 300 ml each, dishwasher safe.", ["Set of 4, 300 ml each", "Microwave and dishwasher safe", "Lead-free glaze"], "Four sturdy mugs in a speckled glaze. Comfortable handle, microwave and dishwasher safe."],
  ["bamboo-chopping-board", "Bamboo Chopping Board", "Bambu", "kitchen", 649, 799, 4.2, 1430, "🪵", "#efe3c8", "Large, reversible, with a juice groove.", ["40 x 28 cm", "Reversible with juice groove", "Hand wash only"], "A large reversible board with a juice groove, gentle on knife edges and easy to clean."],
  ["steel-pressure-cooker-3l", "Stainless Steel Pressure Cooker 3L", "Hearthwell", "kitchen", 1599, 2399, 4.3, 3900, "🍲", "#e2e4e8", "Induction-base cooker with a safety release valve.", ["3 litre", "Induction base", "5-year demo warranty"]],
  ["glass-airtight-container-set", "Glass Airtight Container Set of 6", "Claywork", "kitchen", 899, 1699, 4.2, 2600, "🫙", "#e0ecee", "Borosilicate glass with snap-lock lids.", ["Set of 6", "Oven and freezer safe", "Leak-proof lids"]],
  ["nonstick-cookware-set-5pc", "Non-stick Cookware Set (5 pcs)", "Hearthwell", "kitchen", 2499, 4999, 4.1, 2100, "🍳", "#e6e0da", "Kadhai, fry pan, tawa and two lids.", ["5-piece set", "PFOA-free coating", "Gas and induction"]],
  // Home decor
  ["ceramic-vase", "Matte Ceramic Vase", "Claywork", "home-decor", 1199, 1599, 4.4, 520, "🏺", "#e5dde8", "Matte finish, 24 cm tall, waterproof inside.", ["24 cm tall", "Glazed inside, holds water", "Available in sand and sage"], "A tall matte vase that looks good with flowers or on its own. Glazed inside, so it holds water."],
  ["woven-wall-basket", "Woven Wall Basket", "Bambu", "home-decor", 799, 1199, 4.2, 410, "🧺", "#ecdcc4", "Hand-woven seagrass, 35 cm, ready to hang.", ["35 cm diameter", "Natural seagrass", "Hanging loop included"], "A hand-woven seagrass basket that works as wall decor or as storage. Comes with a hanging loop."],
  ["soy-candle-trio", "Soy Wax Candle Trio", "Lumio", "home-decor", 1099, 1399, 4.5, 1330, "🕯️", "#f1e2d3", "Three 120 g candles, about 25 hours each.", ["3 x 120 g", "About 25 hours burn time each", "Cotton wicks, recyclable tins"], "Three soy wax candles in cotton-wick tins, with light cedar, jasmine, and vanilla scents."],
  ["cotton-double-bedsheet", "Cotton Double Bedsheet, 300 TC", "Dreamweave", "home-decor", 799, 1799, 4.1, 6100, "🛏️", "#dfe6ee", "Double bedsheet with two pillow covers.", ["300 thread count cotton", "Fits double bed", "Fade resistant"]],
  ["led-fairy-lights-10m", "LED Fairy String Lights 10 m", "Lumio", "home-decor", 349, 799, 4.2, 11000, "✨", "#f6ecc8", "Warm-white lights for Diwali and everyday corners.", ["10 m, 100 LEDs", "Plug-in, 8 modes", "Indoor and outdoor"]],
  // Accessories
  ["steel-water-bottle", "Insulated Steel Bottle", "Hearthwell", "accessories", 899, 1299, 4.4, 2750, "🧴", "#dbe5ee", "750 ml, keeps cold 24 hours and hot 12 hours.", ["750 ml", "Cold 24 h, hot 12 h", "BPA-free, leak proof"], "Double-walled stainless steel bottle with a leak-proof lid and a powder-coated grip."],
  ["canvas-tote", "Heavy Canvas Tote", "Bambu", "accessories", 549, 899, 4.1, 970, "👜", "#e6e1d6", "Thick cotton canvas with an inner zip pocket.", ["Cotton canvas, 12 oz", "Inner zip pocket", "Machine washable"], "A roomy tote in thick cotton canvas with reinforced straps and a zip pocket inside."],
  ["laptop-backpack-antitheft", "Anti-Theft Laptop Backpack", "Trailkind", "accessories", 1199, 2499, 4.3, 5200, "🎒", "#d9dfe6", "Fits a 15.6-inch laptop, with a USB charging port.", ["30 litre", "Hidden back pocket", "Rain cover included"]],
  ["polarized-sunglasses", "Polarized Sunglasses", "Northbay", "accessories", 699, 1799, 4.0, 2400, "🕶️", "#e4e4e4", "UV400 polarized lenses in a lightweight frame.", ["UV400 protection", "Polarized lenses", "Hard case included"]],
  ["leather-bifold-wallet", "Leather Bifold Wallet", "Northbay", "accessories", 599, 1299, 4.2, 3300, "👛", "#e6d6c6", "Six card slots and a coin pocket.", ["Genuine leather", "6 card slots", "RFID blocking"]],
  ["analog-quartz-watch", "Analog Quartz Watch", "Pulsefit", "accessories", 1299, 2999, 4.1, 1900, "⌚", "#e0e0d4", "Minimal dial with a stainless steel strap.", ["Japanese quartz movement", "30 m water resistant", "40 mm case"]],
];

export const products: Product[] = rows.map(
  ([slug, name, brand, category, price, mrp, rating, reviews, emoji, tint, short, details, description]) => ({
    slug,
    name,
    brand,
    category,
    price,
    mrp,
    rating,
    reviews,
    emoji,
    tint,
    short,
    description: description ?? `${short} ${NOTE[category]}`,
    details,
  }),
);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (category: string) => products.filter((p) => p.category === category);
export const discountPct = (p: Pick<Product, "price" | "mrp">) => Math.round((1 - p.price / p.mrp) * 100);
export const brands = [...new Set(products.map((p) => p.brand))].sort();

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products.filter((p) => {
    const hay = `${p.name} ${p.brand} ${p.category} ${p.short}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
