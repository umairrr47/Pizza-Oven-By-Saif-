// data/products.ts
import Roma from "../assets/Roma.jpeg";
import Milano from "../assets/Milano.png";
import Napoli from "../assets/Napoli.png";
import Compact from "../assets/Compact.jpg";

// OPTIONAL: add your own webp/avif for LCP images
// import ProDeck from "../assets/ProDeck.webp";
// import Stone from "../assets/Stone.webp";

export interface Product {
  id: number;
  name: string;
  slug?: string;
  category: string;
  fuelType: 'Wood' | 'Gas' | 'Wood & Gas' | 'Electric';
  size: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  price: string;                // human-readable
  mrp?: string;                 // crossed MRP if on sale
  image: string;
  gallery: string[];
  description: string;
  specifications: {
    dimensions: string;
    weight: string;
    capacity: string;
    temperature: string;
    material: string;
  };
  features: string[];
  rating?: number;              // 0–5
  reviewsCount?: number;
  badges?: Array<'New' | 'Bestseller' | 'Limited' | 'Pro' | 'Chef Choice'>;
  stock?: 'In Stock' | 'Limited' | 'Preorder' | 'Out of Stock';
  shipping?: 'Fast' | 'Standard';
  compareCode?: string;         // for future compare-tray
}

export const products: Product[] = [
  {
    id: 1,
    name: "Napoli Wood Fired Oven",
    slug: "napoli-wood-fired",
    category: "Wood Ovens",
    fuelType: "Wood",
    size: "Medium",
    price: "₹85,000",
    mrp: "₹98,000",
    image: Napoli,
    gallery: [
      "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Traditional Italian dome with refractory core for Neapolitan char and leopard spotting.",
    specifications: {
      dimensions: "120 × 120 × 180 cm",
      weight: "850 kg",
      capacity: "6–8 pizzas",
      temperature: "Up to 450°C",
      material: "Refractory bricks, Stainless steel"
    },
    features: ["Authentic wood flavour", "Superior heat retention", "Weather-sealed exterior", "Serviceable parts"],
    rating: 4.7,
    reviewsCount: 23,
    badges: ["Bestseller", "Chef Choice"],
    stock: "In Stock",
    shipping: "Fast",
    compareCode: "NAP-MED-WOOD"
  },
  {
    id: 2,
    name: "Milano Gas Oven Pro",
    slug: "milano-gas-pro",
    category: "Gas Ovens",
    fuelType: "Gas",
    size: "Large",
    price: "₹1,25,000",
    image: Milano,
    gallery: [
      "https://images.pexels.com/photos/4087367/pexels-photo-4087367.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Commercial-grade burner array with PID control—repeatable bakes during rush hours.",
    specifications: {
      dimensions: "150 × 150 × 200 cm",
      weight: "1200 kg",
      capacity: "12–15 pizzas",
      temperature: "Up to 400°C",
      material: "Stainless steel, Ceramic fiber insulation"
    },
    features: ["Digital temp control", "Rapid heat-up", "Low emissions", "Front service hatch"],
    rating: 4.6,
    reviewsCount: 15,
    badges: ["Pro"],
    stock: "Limited",
    shipping: "Fast",
    compareCode: "MIL-LRG-GAS"
  },
  {
    id: 3,
    name: "Roma Hybrid Oven",
    slug: "roma-hybrid",
    category: "Hybrid Ovens",
    fuelType: "Wood & Gas",
    size: "Extra Large",
    price: "₹1,85,000",
    image: Roma,
    gallery: [
      "https://images.pexels.com/photos/5175654/pexels-photo-5175654.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4087367/pexels-photo-4087367.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Dual-fuel flagship—wood flavour on demand, gas convenience on schedule.",
    specifications: {
      dimensions: "180 × 180 × 220 cm",
      weight: "1500 kg",
      capacity: "18–20 pizzas",
      temperature: "Up to 480°C",
      material: "Refractory bricks, SS, Advanced insulation"
    },
    features: ["Dual fuel switch-over", "Pressure fail-safe", "Chef-calibrated deck", "Service network ready"],
    rating: 4.9,
    reviewsCount: 41,
    badges: ["Bestseller", "Pro"],
    stock: "In Stock",
    shipping: "Standard",
    compareCode: "ROM-XL-HYB"
  },
  {
    id: 4,
    name: "Compact Home Oven",
    slug: "compact-home",
    category: "Home Ovens",
    fuelType: "Wood",
    size: "Small",
    price: "₹45,000",
    image: Compact,
    gallery: [
      "https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Backyard-friendly performance with real wood-fired character.",
    specifications: {
      dimensions: "90 × 90 × 150 cm",
      weight: "400 kg",
      capacity: "3–4 pizzas",
      temperature: "Up to 400°C",
      material: "Refractory bricks, Steel frame"
    },
    features: ["Compact footprint", "Tool-less assembly", "Affordable fuel", "Family safe door"],
    rating: 4.5,
    reviewsCount: 12,
    badges: ["New"],
    stock: "In Stock",
    shipping: "Fast",
    compareCode: "COM-SML-WOOD"
  },
  // A few extra SKUs so your grid looks rich
  {
    id: 5,
    name: "StoneDeck Chef 16",
    slug: "stonedeck-chef-16",
    category: "Gas Ovens",
    fuelType: "Gas",
    size: "Medium",
    price: "₹99,990",
    image: Milano,
    gallery: [],
    description: "16-inch deck with even flame rails, perfect for NY-style pies.",
    specifications: { dimensions: "110 × 98 × 62 cm", weight: "68 kg", capacity: "1 × 16\" pizza", temperature: "510°C peak", material: "SS 304, cordierite stone" },
    features: ["Flip-up door", "Dual rail burners", "Cast feet", "Removable stone"],
    rating: 4.4,
    reviewsCount: 9,
    badges: ["Chef Choice"],
    stock: "Preorder",
    shipping: "Standard",
    compareCode: "SDF-16-GAS"
  },
  {
    id: 6,
    name: "NeoChef Electric Deck",
    slug: "neochef-electric-deck",
    category: "Electric Ovens",
    fuelType: "Electric",
    size: "Large",
    price: "₹1,35,000",
    image: Roma,
    gallery: [],
    description: "Clean indoor installs with PID zones and steam assist.",
    specifications: { dimensions: "140 × 120 × 80 cm", weight: "120 kg", capacity: "2 × 14\" pizzas", temperature: "0–420°C", material: "SS, mineral wool" },
    features: ["PID multi-zone", "Steam bake", "Programmable presets", "Low maintenance"],
    rating: 4.2,
    reviewsCount: 7,
    badges: ["New"],
    stock: "Limited",
    shipping: "Standard",
    compareCode: "NCD-LRG-ELC"
  }
];

export const categories = [
  "All Products",
  "Wood Ovens",
  "Gas Ovens",
  "Hybrid Ovens",
  "Home Ovens",
  "Electric Ovens"
];

export const fuelTypes = ["All", "Wood", "Gas", "Wood & Gas", "Electric"];
export const sizes = ["All", "Small", "Medium", "Large", "Extra Large"];
