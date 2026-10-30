// Fake clothing catalogue for the demo. Brands, ratings and review counts are fictional.
// Add real photos by setting `image` (a path under /public) on a product; until then
// the card shows a garment illustration (see components/Garment.tsx).

export type Garment = "tee" | "shirt" | "hoodie" | "jacket" | "kurta" | "dress" | "jeans" | "saree" | "stole";

export type Category = { slug: string; name: string; blurb: string; garment: Garment; color: string; tint: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string; // Category.slug
  garment: Garment;
  price: number; // INR, whole rupees
  mrp: number; // strike-through price
  rating: number; // 1-5, fictional
  reviews: number; // fictional
  color: string; // garment colour for the illustration
  colorName: string;
  tint: string; // card background
  short: string;
  description: string;
  details: string[];
  sizes: string[];
  image?: string; // e.g. "/products/slug.jpg" once real photos exist
};

export const categories: Category[] = [
  { slug: "women-ethnic", name: "Women's Ethnic", blurb: "Kurta sets, sarees and dupattas for festivals and everyday.", garment: "kurta", color: "#be185d", tint: "#fde7ef" },
  { slug: "women-western", name: "Women's Western", blurb: "Dresses, tees and jeans for work, brunch and travel.", garment: "dress", color: "#0f766e", tint: "#d9f3ee" },
  { slug: "men-casual", name: "Men's Casual", blurb: "Shirts, tees and denim that work with everything.", garment: "shirt", color: "#1d4ed8", tint: "#e0e9ff" },
  { slug: "men-ethnic", name: "Men's Ethnic", blurb: "Kurta sets and festive layers for men.", garment: "kurta", color: "#b45309", tint: "#fdecd0" },
  { slug: "winterwear", name: "Winterwear", blurb: "Hoodies, puffers and sweatshirts for cold mornings.", garment: "hoodie", color: "#6d28d9", tint: "#ece4fd" },
];

const SML = ["S", "M", "L", "XL", "XXL"];
const WAIST = ["28", "30", "32", "34", "36"];
const FREE = ["Free size"];

// slug, name, brand, category, garment, price, mrp, rating, reviews, color, colorName, tint, short, details, [sizes]
type Row = [string, string, string, string, Garment, number, number, number, number, string, string, string, string, string[], string[]?];

const rows: Row[] = [
  // Women's Ethnic
  ["block-print-cotton-kurta-set", "Block Print Cotton Kurta Set", "Rangreza", "women-ethnic", "kurta", 1299, 2599, 4.2, 3120, "#be185d", "Rani pink", "#fde7ef", "Kurta, palazzo and dupatta in soft cotton.", ["Pure cotton", "3-piece set", "Machine washable"]],
  ["handloom-cotton-saree", "Handloom Cotton Saree with Zari Border", "Weavers Nest", "women-ethnic", "saree", 1799, 3499, 4.4, 980, "#b45309", "Mustard", "#fdecd0", "Handloom cotton with a woven zari border.", ["Handloom cotton", "Blouse piece included", "6.3 m length"], FREE],
  ["anarkali-festive-kurta", "Embroidered Anarkali Kurta", "Veda & Co", "women-ethnic", "dress", 1899, 3799, 4.3, 1260, "#7c3aed", "Royal purple", "#ede4fe", "Flared anarkali with thread embroidery on the yoke.", ["Rayon blend, lined", "Flared hem", "Dry clean recommended"]],
  ["chanderi-dupatta", "Embroidered Chanderi Dupatta", "Rangreza", "women-ethnic", "stole", 399, 899, 3.9, 640, "#db2777", "Fuchsia", "#fde4f1", "Lightweight dupatta with thread embroidery.", ["Chanderi blend", "2.4 m length", "Hand wash cold"], FREE],
  ["straight-cotton-kurta-pant", "Straight Cotton Kurta with Pant", "Veda & Co", "women-ethnic", "kurta", 1099, 2199, 4.1, 2210, "#0f766e", "Teal", "#d9f3ee", "Office-ready kurta and ankle pant set.", ["Cotton blend", "2-piece set", "Machine washable"]],
  ["bandhani-print-saree", "Bandhani Print Georgette Saree", "Weavers Nest", "women-ethnic", "saree", 1499, 2999, 4.2, 870, "#dc2626", "Red", "#fee2e2", "Georgette saree with traditional bandhani print.", ["Georgette", "Blouse piece included", "Dry clean only"], FREE],
  ["lucknowi-chikankari-kurta", "Chikankari Short Kurta", "Rangreza", "women-ethnic", "kurta", 999, 1999, 4.3, 1540, "#e5e7eb", "Ivory", "#f3f4f6", "Hand-style chikankari on soft cotton.", ["Cotton", "Hip length", "Pairs with jeans"]],
  // Women's Western
  ["floral-georgette-maxi-dress", "Floral Georgette Maxi Dress", "Veda & Co", "women-western", "dress", 1099, 2199, 4.0, 1840, "#ea580c", "Coral", "#ffe8d9", "Flowy maxi with a smocked waist.", ["Georgette, lined", "Smocked waist", "Dry clean recommended"]],
  ["high-waist-straight-jeans", "High-Waist Straight Jeans", "Denimora", "women-western", "jeans", 1199, 2399, 4.1, 5210, "#3b5b92", "Mid blue", "#dde7f5", "Stretch denim with a clean straight leg.", ["98% cotton, 2% elastane", "High rise", "Machine washable"], WAIST],
  ["oversized-cotton-tee-women", "Oversized Cotton Tee", "Loomline", "women-western", "tee", 449, 999, 4.0, 7600, "#65a30d", "Lime", "#ecf6d8", "Drop-shoulder tee in 180 GSM cotton.", ["180 GSM cotton", "Relaxed fit", "Pre-shrunk"]],
  ["wrap-midi-dress", "Satin Wrap Midi Dress", "Veda & Co", "women-western", "dress", 1599, 3199, 4.2, 1090, "#0f766e", "Emerald", "#d4f1e8", "Wrap front with a tie waist.", ["Satin finish", "Adjustable tie", "Midi length"]],
  ["linen-blend-shirt-women", "Linen Blend Boyfriend Shirt", "Northbay", "women-western", "shirt", 999, 1999, 4.1, 1380, "#0ea5e9", "Sky blue", "#dff3fc", "Breathable linen blend for hot weather.", ["Linen blend", "Relaxed fit", "Machine washable"]],
  ["ribbed-crop-tee", "Ribbed Crop Tee (Pack of 2)", "Loomline", "women-western", "tee", 599, 1399, 4.0, 4900, "#111827", "Black", "#e5e7eb", "Stretch rib knit that holds its shape.", ["Cotton elastane", "Pack of 2", "Slim fit"]],
  ["wide-leg-denim", "Wide-Leg Denim Jeans", "Denimora", "women-western", "jeans", 1399, 2799, 4.2, 2860, "#1e3a5f", "Dark indigo", "#d8e0ee", "Roomy wide leg with a high rise.", ["100% cotton denim", "High rise", "Full length"], WAIST],
  // Men's Casual
  ["slim-fit-oxford-shirt", "Slim Fit Oxford Shirt", "Northbay", "men-casual", "shirt", 899, 1799, 4.2, 4300, "#1d4ed8", "Royal blue", "#e0e9ff", "Cotton oxford, button-down collar.", ["100% cotton", "Slim fit", "Machine washable"]],
  ["regular-fit-chinos", "Regular Fit Stretch Chinos", "Northbay", "men-casual", "jeans", 1099, 2199, 4.1, 2750, "#a16207", "Khaki", "#f7ecc9", "Comfort-stretch chinos for office and weekends.", ["Cotton stretch twill", "Regular fit", "Mid rise"], WAIST],
  ["graphic-cotton-tee-men", "Graphic Print Cotton Tee", "Loomline", "men-casual", "tee", 399, 899, 4.0, 9100, "#16a34a", "Green", "#dcf5e4", "Round neck tee with a soft-touch print.", ["180 GSM cotton", "Regular fit", "Pre-shrunk"]],
  ["slim-fit-denim-jeans", "Slim Fit Dark Wash Jeans", "Denimora", "men-casual", "jeans", 1299, 2599, 4.2, 6100, "#1e3a5f", "Dark wash", "#d8e0ee", "Everyday slim jeans with a little stretch.", ["98% cotton, 2% elastane", "Slim fit", "Mid rise"], WAIST],
  ["polo-tshirt-pique", "Piqué Polo T-Shirt", "Northbay", "men-casual", "tee", 599, 1299, 4.1, 5400, "#0f766e", "Teal", "#d9f3ee", "Classic polo in breathable piqué knit.", ["Cotton piqué", "Regular fit", "Ribbed collar"]],
  ["checked-flannel-shirt", "Checked Flannel Shirt", "Trailkind", "men-casual", "shirt", 1099, 2199, 4.3, 1960, "#b91c1c", "Red check", "#fde2e2", "Brushed cotton flannel, soft from day one.", ["Brushed cotton", "Regular fit", "Chest pocket"]],
  ["linen-casual-shirt-men", "Linen Casual Shirt", "Northbay", "men-casual", "shirt", 1199, 2399, 4.2, 1420, "#d6c7a1", "Sand", "#f3ecd8", "Light linen blend for summer weekends.", ["Linen blend", "Regular fit", "Machine washable"]],
  // Men's Ethnic
  ["cotton-kurta-pyjama-set", "Cotton Kurta Pyjama Set", "Rangreza", "men-ethnic", "kurta", 1199, 2399, 4.2, 1500, "#e5e7eb", "Off-white", "#f3f4f6", "Festive-ready set in breathable cotton.", ["Cotton blend", "Straight kurta", "Drawstring pyjama"]],
  ["silk-blend-kurta-set", "Silk Blend Kurta with Churidar", "Rangreza", "men-ethnic", "kurta", 1899, 3799, 4.3, 760, "#b45309", "Gold", "#fdecd0", "Subtle sheen for weddings and festive evenings.", ["Silk blend", "Mandarin collar", "2-piece set"]],
  ["nehru-jacket-waistcoat", "Textured Nehru Jacket", "Weavers Nest", "men-ethnic", "jacket", 1699, 3399, 4.2, 940, "#1e293b", "Navy", "#dde3ee", "Layer over a kurta for an instant festive look.", ["Textured blend", "Sleeveless", "Four-button front"]],
  ["short-kurta-jeans-men", "Short Kurta in Cotton Linen", "Rangreza", "men-ethnic", "kurta", 899, 1799, 4.0, 1180, "#0f766e", "Teal", "#d9f3ee", "Pairs with jeans or chinos for a modern ethnic look.", ["Cotton linen", "Hip length", "Straight cut"]],
  // Winterwear
  ["zip-up-fleece-hoodie", "Zip-Up Fleece Hoodie", "Trailkind", "winterwear", "hoodie", 1399, 2799, 4.3, 3300, "#6d28d9", "Violet", "#ece4fd", "Brushed fleece with kangaroo pockets.", ["Fleece, 320 GSM", "Two zip pockets", "Machine washable"]],
  ["quilted-puffer-jacket", "Quilted Puffer Jacket", "Trailkind", "winterwear", "jacket", 2199, 4499, 4.2, 1210, "#0ea5e9", "Ice blue", "#dff3fc", "Light puffer for Delhi winters and hill trips.", ["Water-resistant shell", "Polyfill insulation", "Packs into its pocket"]],
  ["pullover-sweatshirt", "Cotton Fleece Pullover Sweatshirt", "Loomline", "winterwear", "hoodie", 999, 1999, 4.1, 5800, "#be185d", "Berry", "#fde7ef", "Soft pullover for mornings and late nights.", ["Cotton fleece", "Regular fit", "Ribbed cuffs"]],
  ["wool-blend-cardigan", "Wool Blend Button Cardigan", "Veda & Co", "winterwear", "jacket", 1499, 2999, 4.2, 890, "#a16207", "Camel", "#f7ecc9", "Knit cardigan that layers over anything.", ["Wool blend", "Button front", "Hand wash"]],
  ["denim-trucker-jacket", "Denim Trucker Jacket", "Denimora", "winterwear", "jacket", 1999, 3999, 4.3, 1330, "#3b5b92", "Washed blue", "#dde7f5", "Classic trucker cut in rigid denim.", ["100% cotton denim", "Button front", "Chest pockets"]],
  ["thermal-fleece-hoodie", "Heavyweight Hoodie", "Trailkind", "winterwear", "hoodie", 1599, 3199, 4.4, 2640, "#111827", "Charcoal", "#e5e7eb", "380 GSM hoodie that actually keeps you warm.", ["380 GSM fleece", "Double-lined hood", "Kangaroo pocket"]],
];

export const products: Product[] = rows.map(
  ([slug, name, brand, category, garment, price, mrp, rating, reviews, color, colorName, tint, short, details, sizes]) => ({
    slug,
    name,
    brand,
    category,
    garment,
    price,
    mrp,
    rating,
    reviews,
    color,
    colorName,
    tint,
    short,
    description: `${short} Colour: ${colorName}. Easy to style for work, travel or festive days.`,
    details,
    sizes: sizes ?? SML,
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
    const hay = `${p.name} ${p.brand} ${p.category} ${p.colorName} ${p.short}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
