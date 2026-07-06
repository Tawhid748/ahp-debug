// PRODUCTS is a pre-parsed, validated array — no runtime JSON parsing needed.
import { PRODUCTS as RAW } from "./ProductData";

export const PAGE_SIZE = 12;

export const DISPLAY_BRANDS = [
  "Fragrance World",
  "French Avenue",
  "Lattafa",
  "Maison",
];

export const normalizeGender = (g: string | undefined): string => {
  if (!g) return "";
  const t = g.trim();
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
};

export const normalizeBrand = (brand: string): string => {
  const b = brand.toLowerCase().trim();
  if (b.includes("lattafa") || b.includes("maison alhambra")) return "Lattafa";
  if (b.includes("french avenue")) return "French Avenue";
  if (b.includes("fragrance world") || b === "fw") return "Fragrance World";
  if (b.includes("maison")) return "Maison";
  return brand;
};

// ── Product shape ──
// Matches the raw JSONL you paste. The UI only reads a handful of these
// (itemName, brand, gender, sku, salesDescription, stockOnHand, notes,
// imageUrl), but the rest are declared as optional so you can paste your
// full data objects verbatim without TypeScript complaining.
export type Product = {
  // Fields the UI uses:
  _id?: string;
  itemName: string;
  brand: string;
  gender: string;
  sku: string;
  salesDescription: string;
  stockOnHand: number;
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  imageUrl?: string | null;

  // Extra fields present in the raw data (ignored by the UI):
  manufacturer?: string;
  upc?: string;
  aliasName?: string;
  status?: string;
  pcsPerCarton?: number;
  packageWeight?: number;
  packageLength?: number;
  packageWidth?: number;
  packageHeight?: number;
  dimensionUnit?: string;
  weightUnit?: string;
};

// Stable id for a product — falls back to sku when _id isn't present.
export const productId = (p: Product): string => p._id ?? p.sku;

export const parseNotes = (p: Product): string[] =>
  [
    ...new Set(
      [p.topNotes, p.middleNotes, p.baseNotes]
        .join(",")
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean),
    ),
  ].slice(0, 6);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// PRODUCTS lives in ./products.data.ts as a plain, dependency-free array
// (no imports there). We attach the Product type here on re-export.
// No runtime parsing, so malformed-line errors are impossible.
// ─────────────────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = RAW as Product[];