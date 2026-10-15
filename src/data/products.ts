
import Fixedpro1 from "../assets/ovens/Fixed-pro1.jpg";
import Fixedpro2 from "../assets/ovens/fixed-pro-2.jpg";
import Ppfullfome from "../assets/ovens/pp-fulldome.jpg";
import Pphalfdome from "../assets/ovens/pp-halfdome2.jpg";
import MetalPro from "../assets/ovens/NM-111.jpg";
import MetalGrand from "../assets/ovens/NM-411.jpg";

import Roma from "../assets/Roma.jpeg";
import Milano from "../assets/Milano.png";
import Napoli from "../assets/Napoli.png";
import Compact from "../assets/Compact.jpg";


export interface Product {
  id: number;
  name: string;
  slug: string;
  modelCode: string;
  category: string;
  fuelType: "Wood" | "Gas" | "Wood & Gas" | "Electric";
  fuelOptions: string[];
  size: "Small" | "Medium" | "Large" | "Extra Large";
  sizeOptions: string[];
  price: string;
  image: string;
  gallery: string[];
  description: string;
  specifications: {
    dimensions: string;
    weight: string;
    capacity: string;
    temperature: string;
    material: string;
    shape?: string;
    insulation?: string;
    finishOptions?: string;
    mouthWidth?: string;
    internalDiameter?: string;
    externalDiameter?: string;
  };
  // features: string[];
  rating?: number;
  reviewsCount?: number;
  badges?: Array<
    "New" | "Bestseller" | "Limited" | "Pro" | "Chef Choice"
  >;
  stock?: "In Stock" | "Limited" | "Preorder" | "Out of Stock";
  shipping?: "Fast" | "Standard";
  compareCode?: string;
}

const commonFinishes = [
  "Slate Tile",
  "Mosaic Tile",
  "Fire Brick Tile",
  "Red Brick Tile",
  "Normal Brick Tile",
];

const commonFuelOptions = ["Wood", "Gas", "LPG", "PNG"];

export const products: Product[] = [
  {
    id: 1,
    name: "Fixed Pro-1 Brick Oven",
    slug: "fixed-pro-1-brick-oven",
    modelCode: "FP1BO 411",
    category: "Fixed Brick Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: commonFuelOptions,
    size: "Large",
    sizeOptions: ["Standard", "Large", "Extra Large"],
    price: "Enquire for price",
    image: Fixedpro1,
    gallery: [],
    description:
      "Commercial fixed brick dome oven designed for demanding culinary environments, with customizable finishes and fuel options.",
    specifications: {
      dimensions: "External width: 65 in; internal diameter: 39 in",
      weight: "Approx. 2,000–2,500 kg",
      capacity: "3–4 pizzas; approximately 60 pizzas per hour",
      temperature: "450–750°F within 60 minutes",
      material: "Brick oven construction",
      shape: "Dome",
      insulation: "Ceramic blankets and insulating concrete",
      finishOptions: commonFinishes.join(", "),
      mouthWidth: "20 in",
      internalDiameter: "39 in",
      externalDiameter: "65 in",
    },

    compareCode: "FP1BO 411",
  },
  {
    id: 2,
    name: "Fixed Pro-2 Brick Oven",
    slug: "fixed-pro-2-brick-oven",
    modelCode: "FP2BO 411",
    category: "Fixed Brick Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: commonFuelOptions,
    size: "Large",
    sizeOptions: ["Standard", "Large", "Extra Large"],
    price: "Enquire for price",
    image: Fixedpro2,
    gallery: [],
    description:
      "A fixed commercial brick dome oven with customizable finishes and three available size variants.",
    specifications: {
      dimensions: "External width: 55 in; internal diameter: 39 in",
      weight: "Approx. 1,800–2,200 kg",
      capacity: "3–4 pizzas; approximately 60 pizzas per hour",
      temperature: "450–750°F within 60 minutes",
      material: "Brick oven construction",
      shape: "Dome",
      insulation: "Ceramic blankets and insulating concrete",
      finishOptions: commonFinishes.join(", "),
      mouthWidth: "20 in",
      internalDiameter: "39 in",
      externalDiameter: "55 in",
    },
    compareCode: "FP2BO 411",
  },
  {
    id: 3,
    name: "Portable Pro Full Dome Oven",
    slug: "portable-pro-full-dome-oven",
    modelCode: undefined,
    category: "Portable Brick Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: commonFuelOptions,
    size: "Large",
    sizeOptions: ["Standard", "Large", "Extra Large"],
    price: "Enquire for price",
    image: Ppfullfome,
    gallery: [],
    description:
      "A round fixed brick oven with a dome cooking chamber and configurable exterior finish.",
    specifications: {
      dimensions: "External width: 55 in; internal diameter: 39 in",
      weight: "Approx. 1,500–1,800 kg",
      capacity: "3–4 pizzas; approximately 60 pizzas per hour",
      temperature: "450–750°F within 60 minutes",
      material: "Brick oven construction",
      shape: "Dome",
      insulation: "Ceramic blankets and insulating concrete",
      finishOptions: commonFinishes.join(", "),
      mouthWidth: "20 in",
      internalDiameter: "39 in",
      externalDiameter: "55 in",
    },

    compareCode: "",
  },
  {
    id: 4,
    name: "Portable Pro Half Dome Oven",
    slug: "portable-pro-half-dome-oven",
    modelCode: "FB 411",
    category: "Portable Brick Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: commonFuelOptions,
    size: "Large",
    sizeOptions: ["Standard", "Large", "Extra Large"],
    price: "Enquire for price",
    image: Pphalfdome,
    gallery: [],
    description:
      "A customizable fixed brick oven for commercial cooking installations.",
    specifications: {
      dimensions: "External width: 55 in; internal diameter: 39 in",
      weight: "Approx. 1,500–2,000 kg",
      capacity: "3–4 pizzas; approximately 60 pizzas per hour",
      temperature: "450–750°F within 60 minutes",
      material: "Brick oven construction",
      shape: "Dome",
      insulation: "Ceramic blankets and insulating concrete",
      finishOptions: commonFinishes.join(", "),
      mouthWidth: "20 in",
      internalDiameter: "39 in",
      externalDiameter: "55 in",
    },

    compareCode: "FB 411",
  },

  {
    id: 5,
    name: "Metal Pro Compact",
    slug: "metal-pro-compact",
    modelCode: "",
    category: "Portable Metal Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: ["Wood", "Gas", "LPG", "PNG"],
    size: "Medium",
    sizeOptions: ["Standard", "Compact"],
    price: "Enquire for price",
    image: MetalPro,
    gallery: [],
    description:
      "The Metal Pro Compact is a space-efficient Italian Concept metal portable pizza oven designed for cafes, restaurants, live kitchens and outdoor cooking spaces. Its compact design, insulated metal body, premium pizza cooking surface and imported high-pressure Venturi and long-flame burner system are intended to provide convenient installation and professional pizza baking performance.",
    specifications: {
      dimensions: "Not specified clearly in the provided screenshot",
      weight: "Approximately 150–200 kg",
      capacity: '2 pizzas (11") at a time',
      temperature: "Up to 450°C within approximately 50 minutes",
      material: "Insulated metal body with pizza cooking surface",
      shape: "Half-cylinder",
      insulation: "Not specified clearly in the provided screenshot",
      finishOptions: "Custom finishes; exact options not specified",
      mouthWidth: "Not specified clearly in the provided screenshot",
    },
    compareCode: "METAL-PRO-COMPACT",
  },

  {
    id: 6,
    name: "Metal Pro Grand",
    slug: "metal-pro-grand",
    modelCode: "",
    category: "Portable Metal Ovens",
    fuelType: "Wood & Gas",
    fuelOptions: ["Wood", "Gas", "LPG", "PNG"],
    size: "Large",
    sizeOptions: ["Standard", "Large"],
    price: "Enquire for price",
    image: MetalGrand,
    gallery: [],
    description:
      "The Metal Pro Grand is a professional Italian Concept metal portable wood-fired pizza oven designed for commercial kitchens, restaurants, cafes and outdoor cooking spaces. Its insulated metal body, imported high-pressure Venturi and long-flame burner system, and push-button fire ignition support convenient operation and consistent pizza baking. It is designed for installations where permanent brick construction is not practical.",
    specifications: {
      dimensions:
        'Cooking base: 40" x 30"; external size: approximately 60" x 40"; overall height: approximately 68"',
      weight: "Approximately 200–250 kg",
      capacity: '3–4 pizzas (11") at a time',
      temperature: "Up to 450°C within approximately 50 minutes",
      material: "Heavy-duty insulated metal body with fire-brick cooking chamber",
      shape: "Half-cylinder",
      insulation: "Ceramic blankets and insulating concrete",
      finishOptions:
        "Tiles, bricks, mosaic, slate tile, paint and stone",
      mouthWidth: '20"',
    },
    compareCode: "METAL-PRO-GRAND",
  },

  // {
  //   id: 14,
  //   name: "Dual Fixed Brick Oven",
  //   slug: "dual-fixed-brick-oven",
  //   modelCode: "FBX2 411",
  //   category: "Fixed Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Extra Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Roma,
  //   gallery: [],
  //   description:
  //     "A dual-chamber fixed brick oven designed for larger commercial cooking setups.",
  //   specifications: {
  //     dimensions: "Overall external width: 120 in; internal diameter: 39 in per chamber",
  //     weight: "Approx. 3,000–3,500 kg",
  //     capacity: "6–8 pizzas; approximately 120 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Dual dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in per chamber",
  //     internalDiameter: "39 in per chamber",
  //     externalDiameter: "55 in per chamber",
  //   },
  //   compareCode: "FBX2 411",
  // },
  // {
  //   id: 11,
  //   name: "Fixed Large Brick Oven",
  //   slug: "fixed-large-brick-oven",
  //   modelCode: "FB 611",
  //   category: "Fixed Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Milano,
  //   gallery: [],
  //   description:
  //     "A larger fixed brick dome oven intended for higher-volume pizza production.",
  //   specifications: {
  //     dimensions: "External width: 65 in; internal diameter: 47 in",
  //     weight: "Approx. 2,000–2,500 kg",
  //     capacity: "5–6 pizzas; approximately 100 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //     internalDiameter: "47 in",
  //     externalDiameter: "65 in",
  //   },

  //   compareCode: "FB 611",
  // },
  // {
  //   id: 7,
  //   name: "Fixed Extra Large Brick Oven with Griller",
  //   slug: "fixed-extra-large-brick-oven-griller",
  //   modelCode: "FB 811",
  //   category: "Fixed Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Extra Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Napoli,
  //   gallery: [],
  //   description:
  //     "An extra-large fixed brick oven with a griller arrangement for commercial cooking.",
  //   specifications: {
  //     dimensions: "External width: 73 in; internal diameter: 55 in",
  //     weight: "Approx. 2,500–3,000 kg",
  //     capacity: "7–8 pizzas; approximately 140 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //     internalDiameter: "55 in",
  //     externalDiameter: "73 in",
  //   },
  //   compareCode: "FB 811",
  // },
  // {
  //   id: 8,
  //   name: "Imperial Signature Series Brick Oven",
  //   slug: "imperial-signature-series-brick-oven",
  //   modelCode: "",
  //   category: "Fixed Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: ["Wood", "Gas", "LPG", "PNG"],
  //   size: "Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Roma,
  //   gallery: [],
  //   description:
  //     "The Imperial Signature Series is a premium Italian-inspired fixed brick wood-fired pizza oven, crafted for luxury live kitchens, fine dining establishments, restaurants, hotels and resorts. Built with high-quality firebricks, a reinforced steel-layer insulation system, and a low-emission burning system, it is designed for heat retention, fuel efficiency and consistent baking results. It features an imported high-pressure Venturi and long-flame burner system, push-button ignition and a traditional cooking chamber.",
  //   specifications: {
  //     dimensions:
  //       'External width: 55"; external height: approximately 55"; internal diameter: 39"; mouth width: 21"',
  //     weight: "Approximately 2,000–2,500 kg",
  //     capacity: '3–4 pizzas at a time (11")',
  //     temperature: "Within 60 minutes: 450°C",
  //     material: "Fixed brick construction with firebricks and reinforced steel layer",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions:
  //       "Tiles, bricks, mosaic, slate tile, paint and stone",
  //     mouthWidth: '21"',
  //     internalDiameter: '39"',
  //     externalDiameter: '55"',
  //   },
  //   compareCode: "IMPERIAL-SIGNATURE",
  // },
  // {
  //   id: 16,
  //   name: "Elite Signature Series Brick Oven",
  //   slug: "elite-signature-series-brick-oven",
  //   modelCode: "",
  //   category: "Fixed Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: ["Wood", "Gas", "LPG", "PNG"],
  //   size: "Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Milano,
  //   gallery: [],
  //   description:
  //     "The Elite Signature Series is a premium Italian-inspired fixed brick wood-fired pizza oven, handcrafted with high-quality firebricks and designed for commercial cooking establishments. Its advanced heat-lock technology and multi-layer insulation are intended to support heat retention, consistent baking performance and fuel efficiency. Equipped with an imported high-pressure Venturi and long-flame burner system, it is designed for professional pizza baking in cafes, restaurants, hotels and commercial kitchens.",
  //   specifications: {
  //     dimensions:
  //       'External width: 55"; external height: approximately 55"; internal diameter: 39"; mouth width: 21"',
  //     weight: "Approximately 1,500–2,000 kg",
  //     capacity: '3–4 pizzas at a time (11")',
  //     temperature: "Within 60 minutes: 450°C",
  //     material: "Fixed brick construction with firebricks",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions:
  //       "Tiles, bricks, mosaic, slate tile, paint and stone",
  //     mouthWidth: '21"',
  //     internalDiameter: '39"',
  //     externalDiameter: '55"',
  //   },
  //   compareCode: "ELITE-SIGNATURE",
  // },
  // {
  //   id: 10,
  //   name: "Large Portable Oven",
  //   slug: "large-portable-oven",
  //   modelCode: "PB 611",
  //   category: "Semi-Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Roma,
  //   gallery: [],
  //   description:
  //     "A large semi-portable brick oven with a wider cooking chamber.",
  //   specifications: {
  //     dimensions: "External width: 64 in; internal diameter: 47 in",
  //     weight: "Approx. 2,000–2,200 kg",
  //     capacity: "5–6 pizzas; approximately 100 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction with metal frame",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //     internalDiameter: "47 in",
  //     externalDiameter: "64 in",
  //   },

  //   compareCode: "PB 611",
  // },
  // {
  //   id: 11,
  //   name: "Extra Large Portable Oven",
  //   slug: "extra-large-portable-oven",
  //   modelCode: "PB 811",
  //   category: "Semi-Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Extra Large",
  //   sizeOptions: ["Standard", "Large", "Extra Large"],
  //   price: "Enquire for price",
  //   image: Compact,
  //   gallery: [],
  //   description:
  //     "An extra-large semi-portable brick oven for high-volume cooking.",
  //   specifications: {
  //     dimensions: "External width: 73 in; internal diameter: 55 in",
  //     weight: "Approx. 2,200–2,500 kg",
  //     capacity: "7–8 pizzas; approximately 140 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction with metal frame",
  //     shape: "Dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //     internalDiameter: "55 in",
  //     externalDiameter: "73 in",
  //   },

  //   compareCode: "PB 811",
  // },
  // {
  //   id: 12,
  //   name: "Large Metal Oven",
  //   slug: "large-metal-oven",
  //   modelCode: "NM 411",
  //   category: "Portable Metal Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Large",
  //   sizeOptions: ["Large", "Small Table Top"],
  //   price: "Enquire for price",
  //   image: Napoli,
  //   gallery: [],
  //   description:
  //     "A portable metal oven with a half-cylinder cooking chamber and metal exterior.",
  //   specifications: {
  //     dimensions: "Width: approximately 60–65 in; depth: 40 in",
  //     weight: "Approx. 200–250 kg",
  //     capacity: "3–4 pizzas; approximately 60 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Metal body with cooking base",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //   },

  //   compareCode: "NM 411",
  // },
  // {
  //   id: 13,
  //   name: "Standard Metal Oven",
  //   slug: "standard-metal-oven",
  //   modelCode: "M 411",
  //   category: "Portable Metal Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Large",
  //   sizeOptions: ["Standard", "Large"],
  //   price: "Enquire for price",
  //   image: Milano,
  //   gallery: [],
  //   description:
  //     "A portable metal oven with a half-cylinder shape and supporting stand.",
  //   specifications: {
  //     dimensions: "Width: approximately 45 in; depth: 36 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "2–3 pizzas; approximately 40 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Metal body with cooking base",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //   },

  //   compareCode: "M 411",
  // },
  // {
  //   id: 14,
  //   name: "Small Table Top Oven",
  //   slug: "small-table-top-oven",
  //   modelCode: "PBT111",
  //   category: "Small Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Small",
  //   sizeOptions: ["Small"],
  //   price: "Enquire for price",
  //   image: Compact,
  //   gallery: [],
  //   description:
  //     "A compact tabletop brick oven for smaller installations and limited spaces.",
  //   specifications: {
  //     dimensions: "External diameter: 34 in; internal diameter: 23.4 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "1 pizza; approximately 20 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "14 in",
  //     internalDiameter: "23.4 in",
  //     externalDiameter: "34 in",
  //   },

  //   compareCode: "PBT111",
  // },
  // {
  //   id: 15,
  //   name: "Small Table Top Oven",
  //   slug: "small-table-top-oven-pb111",
  //   modelCode: "PB111",
  //   category: "Small Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Small",
  //   sizeOptions: ["Small"],
  //   price: "Enquire for price",
  //   image: Roma,
  //   gallery: [],
  //   description:
  //     "A compact portable brick oven with a small cooking chamber.",
  //   specifications: {
  //     dimensions: "External diameter: 34 in; internal diameter: 23.4 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "1 pizza; approximately 20 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "14 in",
  //     internalDiameter: "23.4 in",
  //     externalDiameter: "34 in",
  //   },

  //   compareCode: "PB111",
  // },
  // {
  //   id: 16,
  //   name: "Small Full Dome Oven",
  //   slug: "small-full-dome-oven",
  //   modelCode: "PBFD211",
  //   category: "Small Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Small",
  //   sizeOptions: ["Small"],
  //   price: "Enquire for price",
  //   image: Napoli,
  //   gallery: [],
  //   description:
  //     "A small full-dome brick oven designed for compact cooking installations.",
  //   specifications: {
  //     dimensions: "External diameter: 44 in; internal diameter: 31.4 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "2 pizzas; approximately 40 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction",
  //     shape: "Full dome",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "17 in",
  //     internalDiameter: "31.4 in",
  //     externalDiameter: "44 in",
  //   },

  //   compareCode: "PBFD211",
  // },
  // {
  //   id: 17,
  //   name: "Small Table Top Metal Oven",
  //   slug: "small-table-top-metal-oven",
  //   modelCode: "MT111",
  //   category: "Small Portable Metal Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Small",
  //   sizeOptions: ["Small"],
  //   price: "Enquire for price",
  //   image: Milano,
  //   gallery: [],
  //   description:
  //     "A compact tabletop metal oven with a half-cylinder cooking chamber.",
  //   specifications: {
  //     dimensions: "External width: 34 in; depth: 24 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "1 pizza; approximately 20 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Metal body with cooking base",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //   },

  //   compareCode: "MT111",
  // },
  // {
  //   id: 18,
  //   name: "Small Table Top Portable Brick Oven",
  //   slug: "small-table-top-portable-brick-oven",
  //   modelCode: "NMT111",
  //   category: "Small Portable Brick Ovens",
  //   fuelType: "Wood & Gas",
  //   fuelOptions: commonFuelOptions,
  //   size: "Small",
  //   sizeOptions: ["Small"],
  //   price: "Enquire for price",
  //   image: Compact,
  //   gallery: [],
  //   description:
  //     "A compact portable brick oven with a metal stand and chimney assembly.",
  //   specifications: {
  //     dimensions: "External width: 34 in; cooking base width: 24 in",
  //     weight: "Approx. 150–200 kg",
  //     capacity: "1 pizza; approximately 20 pizzas per hour",
  //     temperature: "450–750°F within 60 minutes",
  //     material: "Brick oven construction with metal frame",
  //     shape: "Half-cylinder",
  //     insulation: "Ceramic blankets and insulating concrete",
  //     finishOptions: commonFinishes.join(", "),
  //     mouthWidth: "20 in",
  //   },

  //   compareCode: "NMT111",
  // },
];

export const categories = [
  "All Products",
  "Fixed Brick Ovens",
  "Semi-Portable Brick Ovens",
  "Portable Metal Ovens",
  "Small Portable Brick Ovens",
  "Small Portable Metal Ovens",
];
