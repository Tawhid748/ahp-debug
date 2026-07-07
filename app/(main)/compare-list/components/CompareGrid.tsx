"use client";

// Client Component — owns all the compare interactivity (slots, modal, search,
// add/remove/clear). Data now comes from the hardcoded PRODUCTS array instead
// of Convex; no auth, so the "My Saved" tab shows the signed-out empty state.

import { useState, useMemo } from "react";
import { ProductCard, AddPlaceholder } from "./ProductCard";
import type { Product } from "./ProductCard";
import {
  IcRoundClose,
  MaterialSymbolsAddBoxOutlineRounded,
} from "@/Components/Icons";
import { PRODUCTS } from "../../products/utils";
import type { Product as SourceProduct } from "../../products/utils";

// ── Map a hardcoded product → compare Product type ────────────────────────────
function mapToProduct(p: SourceProduct): Product {
  const parseNotes = (str: string) =>
    str
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .join(", ");

  return {
    id: p._id ?? p.sku,
    name: p.itemName,
    category: p.brand,
    image:
      p.imageUrl ??
      `https://placehold.co/200x300/1a1a1a/c9ab81?text=${encodeURIComponent(
        p.itemName,
      )}`,
    volume: `${p.packageWeight ?? "—"}${p.weightUnit ?? ""}`,
    longevity: "—",
    sillage: p.stockOnHand > 0 ? "In Stock" : "Out of Stock",
    season: p.gender || "—",
    notes: {
      top: parseNotes(p.topNotes ?? ""),
      heart: parseNotes(p.middleNotes ?? ""),
      base: parseNotes(p.baseNotes ?? ""),
    },
  };
}

// Precompute the mapped catalogue once.
const ALL_PRODUCTS: Product[] = PRODUCTS.map(mapToProduct);

// ── Gold button (was .gold-btn) — exact original with dual-label slide ────────
function GoldButton({
  onClick,
  children,
  secondary = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "gold-btn group/gb relative overflow-hidden z-1 inline-block cursor-pointer",
        "px-[45px] py-3 border-2 border-[var(--light-gold)]",
        "font-bold uppercase tracking-[3px] text-[1.2rem] [font-family:var(--font-small)]",
        "transition-colors duration-250",
        secondary
          ? "bg-[var(--light-gold)] text-black"
          : "bg-transparent text-[var(--light-gold)]",
      ].join(" ")}
    >
      {/* fill circle — rises from below on hover */}
      <span
        className={[
          "absolute bottom-full left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full -z-1",
          "transition-[bottom] duration-500 group-hover/gb:bottom-[-50%]",
          secondary ? "bg-[var(--black)]" : "bg-[var(--light-gold)]",
        ].join(" ")}
        aria-hidden="true"
      />
      {/* primary label — slides up and out on hover */}
      <span className="block transition-transform duration-250 group-hover/gb:-translate-y-10">
        {children}
      </span>
      {/* duplicate label — slides in from below to center on hover */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap",
          "transition-[top,transform] duration-250",
          "group-hover/gb:top-1/2 group-hover/gb:-translate-y-1/2",
          secondary ? "text-[var(--white)]" : "text-[var(--black)]",
        ].join(" ")}
      >
        {children}
      </span>
    </button>
  );
}

// ── Product selection modal (was .compare-modal-*) ────────────────────────────
function ProductModal({
  isOpen,
  onClose,
  onSelect,
  alreadyAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (p: Product) => void;
  alreadyAdded: string[];
}) {
  const [tab, setTab] = useState<"all" | "saved">("all");
  const [search, setSearch] = useState("");

  // No auth yet — there are no saved products.
  const savedIds: string[] = [];

  const source = tab === "all" ? ALL_PRODUCTS : [];

  const available = useMemo(
    () =>
      source
        .filter((p) => !alreadyAdded.includes(p.id))
        .filter(
          (p) =>
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()),
        ),
    [source, alreadyAdded, search],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5 bg-black/80 backdrop-blur-[8px]"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-[700px] max-h-[80vh] rounded-xl overflow-hidden bg-[var(--black)] border border-[var(--light-gold)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-[30px] py-[25px] border-b border-[var(--white)]/10">
          <h2 className="text-[var(--white)] font-normal [font-family:var(--font-big)] text-[calc(1.3rem+2.4vw)]">
            Select a Fragrance
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 bg-transparent border-none cursor-pointer"
            aria-label="Close modal"
          >
            <IcRoundClose style={{ fontSize: 30, color: "var(--light-gold)" }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--white)]/10">
          {(["all", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 py-4 uppercase font-bold tracking-[0.2em] text-[1.1rem] transition-colors duration-200 bg-transparent border-none"
              style={{
                color: tab === t ? "var(--light-gold)" : "var(--light-gray)",
              }}
            >
              {t === "all" ? "All Products" : "My Saved"}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--light-gold)]" />
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-[30px] pt-5">
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-[var(--white)] text-[1.3rem] outline-none border border-[var(--white)]/10 focus:border-[var(--light-gold)] transition-colors duration-200 bg-[var(--darker-black)] [font-family:var(--font-small)]"
          />
        </div>

        {/* Product list */}
        <div className="overflow-y-auto px-[30px] py-5 flex flex-col gap-4">
          {/* Saved tab — no auth */}
          {tab === "saved" && savedIds.length === 0 && (
            <p className="text-center py-10 text-[var(--light-gray)] text-[1.4rem]">
              You have no saved fragrances yet.{" "}
              <a
                href="/products"
                className="underline text-[var(--light-gold)]"
              >
                Browse the collection
              </a>{" "}
              and save your favourites.
            </p>
          )}

          {/* Empty results */}
          {available.length === 0 &&
            !(tab === "saved" && savedIds.length === 0) && (
              <p className="text-center py-10 text-[var(--light-gray)] text-[1.4rem]">
                {search
                  ? "No products match your search."
                  : "All products are already added to the compare list."}
              </p>
            )}

          {/* Product rows (was .compare-modal-row) */}
          {available.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-5 p-[15px] rounded-lg cursor-pointer bg-[var(--dark-gray)] border border-[var(--white)]/10 hover:border-[var(--light-gold)] hover:translate-x-[5px] transition-all duration-250"
              onClick={() => {
                onSelect(product);
                onClose();
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[80px] h-[80px] object-contain rounded-md p-[10px] bg-[var(--darker-black)]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[var(--white)] mb-1 font-normal [font-family:var(--font-big)] text-[1.6rem] truncate">
                  {product.name}
                </p>
                <p className="uppercase text-[1.2rem] tracking-[0.15em] text-[var(--light-gold)]">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main compare grid ─────────────────────────────────────────────────────────
export default function CompareGrid() {
  const [compareItems, setCompareItems] = useState<(Product | null)[]>([
    null,
    null,
    null,
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  const filledCount = compareItems.filter(Boolean).length;
  const alreadyAdded = compareItems
    .filter(Boolean)
    .map((p) => (p as Product).id);

  const openModal = (slot: number) => {
    setTargetSlot(slot);
    setModalOpen(true);
  };

  const handleSelect = (product: Product) => {
    if (targetSlot === null) return;
    setCompareItems((prev) => {
      const n = [...prev];
      n[targetSlot] = product;
      return n;
    });
  };

  const handleRemove = (index: number) => {
    setCompareItems((prev) => {
      const n = [...prev];
      n[index] = null;
      return n;
    });
  };

  return (
    <>
      <section className="py-[80px] min-h-[600px]">
        <div className="px-4 max-w-[1200px] mx-auto">
          {/* Empty state */}
          {filledCount === 0 && (
            <div className="text-center py-[80px] px-5 max-w-[600px] mx-auto">
              <MaterialSymbolsAddBoxOutlineRounded
                className="mx-auto mb-[30px] text-[var(--light-gold)] opacity-60"
                style={{ fontSize: 80 }}
              />
              <h2 className="text-[var(--white)] mb-[15px] font-normal leading-[1.4] [font-family:var(--font-big)] text-[calc(1.3rem+2.4vw)]">
                No Products to Compare
              </h2>
              <p className="mb-[30px] text-[1.6rem] leading-[1.6] text-[var(--light-gray)]">
                Add up to 3 fragrances to compare them side by side
              </p>
              <GoldButton onClick={() => openModal(0)}>
                Add Fragrance
              </GoldButton>
            </div>
          )}

          {/* Compare grid */}
          {filledCount > 0 && (
            <>
              <div className="grid gap-[30px] mb-[40px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {compareItems.map((product, i) =>
                  product ? (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRemove={() => handleRemove(i)}
                    />
                  ) : (
                    <AddPlaceholder
                      key={`slot-${i}`}
                      onClick={() => openModal(i)}
                    />
                  ),
                )}
              </div>
              <div className="text-center pt-5">
                <GoldButton
                  secondary
                  onClick={() => setCompareItems([null, null, null])}
                >
                  Clear All
                </GoldButton>
              </div>
            </>
          )}
        </div>
      </section>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        alreadyAdded={alreadyAdded}
      />
    </>
  );
}