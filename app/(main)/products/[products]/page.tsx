// Server Component — the product detail page.
// All three tab panels (Description / Details / Notes) are rendered here on
// the server and passed into the small ProductTabs client island, which only
// handles which panel is visible. The gallery is a second small island (thumb
// click switches the main image). Everything else is server-rendered.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, normalizeBrand } from "../utils";
import ProductTabs from "./ProductTabs";
import ProductGallery from "./ProductGallery";

// ── Details row ───────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 py-4 border-b border-[var(--white)]/10 last:border-b-0">
      <span className="font-bold text-[var(--white)] text-[1.5rem]">
        {label}
      </span>
      <span className="text-[var(--light-gray)] text-[1.5rem]">{value}</span>
    </div>
  );
}

// ── Notes row ─────────────────────────────────────────────────────────────────
function NoteRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p className="text-[1.6rem] leading-[1.8] mb-5 last:mb-0">
      <span className="font-bold text-[var(--white)]">{label}: </span>
      <span className="text-[var(--light-gray)]">{value}</span>
    </p>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ products: string }>;
}) {
  // NOTE: the dynamic folder is named [products], so the param key is
  // `products` (not `id`). If you rename the folder to [id], change this
  // to `const { id } = await params` and pass `id` to getProductById.
  const { products: id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const isAvailable = product.stockOnHand > 0;
  const brand = normalizeBrand(product.brand);

  // Item dimensions (L × W × H) from the package fields.
  const dims =
    product.packageLength || product.packageWidth || product.packageHeight
      ? `${product.packageLength ?? 0} X ${product.packageWidth ?? 0} X ${
          product.packageHeight ?? 0
        } (${(product.dimensionUnit ?? "in").toUpperCase()})`
      : "—";

  // ── Tab panels (rendered on the server) ──
  const descriptionPanel = (
    <p className="text-[1.6rem] leading-[1.9] text-[var(--light-gray)] whitespace-pre-line">
      {product.salesDescription || "No description available."}
    </p>
  );

  const detailsPanel = (
    <div>
      <DetailRow label="SKU" value={product.sku || "—"} />
      <DetailRow label="Product Name" value={product.itemName} />
      <DetailRow label="Brand" value={brand} />
      <DetailRow label="Gender" value={product.gender || "—"} />
      <DetailRow label="Fragrance" value={product.fragrance ?? "—"} />
      <DetailRow label="Type" value={product.type ?? "—"} />
      <DetailRow label="Liquid Volume" value={product.volume ?? "—"} />
      <DetailRow label="Item Dimension (L x W x H)" value={dims} />
    </div>
  );

  const hasNotes =
    product.topNotes || product.middleNotes || product.baseNotes;

  const notesPanel = hasNotes ? (
    <div>
      <NoteRow label="Top Note" value={product.topNotes} />
      <NoteRow label="Middle Note" value={product.middleNotes} />
      <NoteRow label="Base Note" value={product.baseNotes} />
    </div>
  ) : (
    <p className="text-[1.6rem] text-[var(--light-gray)]">
      Fragrance notes are not available for this product.
    </p>
  );

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-[140px] pb-[100px]">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-block mb-10 uppercase tracking-[3px] text-[1.3rem] text-[var(--light-gold)] hover:opacity-70 transition-opacity duration-200"
        >
          ← All Fragrances
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Left: gallery ── */}
          <ProductGallery
            images={product.images ?? []}
            alt={product.itemName}
          />

          {/* ── Right: info ── */}
          <div>
            {/* Title */}
            <h1 className="[font-family:var(--font-big)] font-bold text-[clamp(2.6rem,3.2vw,3.6rem)] leading-[1.25] text-[var(--white)] mb-2">
              {product.itemName}
            </h1>

            {/* Price */}
            {product.price != null && (
              <p className="[font-family:var(--font-big)] font-bold text-[2.8rem] text-[var(--white)] mb-8">
                ${product.price.toFixed(2)}
              </p>
            )}

            {/* Availability */}
            <p className="uppercase text-[1.4rem] tracking-[1px] text-[var(--light-gray)] mb-4">
              Availability:{" "}
              <span
                className={`font-bold ${isAvailable ? "text-emerald-400" : "text-[var(--white)]"}`}
              >
                {isAvailable ? "In Stock" : "Sold Out"}
              </span>
            </p>

            {/* SKU */}
            <div className="mb-10">
              <span className="text-[1.4rem] text-[var(--light-gray)]">
                SKU:{" "}
                <span className="text-[var(--white)]">
                  {product.sku || "—"}
                </span>
              </span>
            </div>

            {/* Tabs (client island — panels rendered above on the server) */}
            <ProductTabs
              description={descriptionPanel}
              details={detailsPanel}
              notes={notesPanel}
            />
          </div>
        </div>
      </div>
    </main>
  );
}