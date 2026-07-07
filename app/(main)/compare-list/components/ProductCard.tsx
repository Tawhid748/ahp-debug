import {
  IcRoundClose,
  MaterialSymbolsAddCircleOutline,
} from "@/Components/Icons";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  volume: string;
  longevity: string;
  sillage: string;
  season: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
}

// ── Attribute row ─────────────────────────────────────────────────────────────
function AttributeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="uppercase text-[1.4rem] text-[var(--light-gray)] tracking-[0.15em]">
        {label}
      </span>
      <span className="font-bold text-[var(--white)] text-[1.6rem]">
        {value}
      </span>
    </div>
  );
}

// ── Filled product card (was .compare-card) ───────────────────────────────────
export function ProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  return (
    <div className="group relative flex flex-col p-6 min-h-[400px] bg-[var(--dark-gray)] border border-[var(--light-gold)]/20">
      {/* Remove button (was .compare-card__remove) */}
      <button
        className="absolute top-3 right-3 z-2 flex items-center justify-center w-8 h-8 bg-transparent border-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
        onClick={onRemove}
        aria-label="Remove product"
      >
        <IcRoundClose style={{ fontSize: 20, color: "var(--light-gold)" }} />
      </button>

      <div className="flex flex-col gap-5 flex-1">
        {/* Image */}
        <div className="w-full h-[250px] flex items-center justify-center rounded-lg overflow-hidden mb-[10px] bg-[var(--darker-black)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Name & category */}
        <h3 className="text-center text-[var(--white)] mb-[5px] font-normal leading-[1.2] [font-family:var(--font-big)] text-[2.2rem]">
          {product.name}
        </h3>
        <p className="text-center uppercase mb-[15px] text-[1.2rem] font-bold tracking-[0.4em] text-[var(--light-gold)]">
          {product.category}
        </p>

        {/* Attributes */}
        <div className="py-5 border-t border-b border-[var(--white)]/10">
          <AttributeRow label="Volume" value={product.volume} />
          <AttributeRow label="Longevity" value={product.longevity} />
          <AttributeRow label="Sillage" value={product.sillage} />
          <AttributeRow label="Season" value={product.season} />
        </div>

        {/* Fragrance notes */}
        <div className="mt-[10px]">
          <h4 className="text-center mb-[15px] font-normal text-[var(--light-gold)] [font-family:var(--font-big)] text-[1.8rem]">
            Fragrance Notes
          </h4>
          {[
            { label: "Top Notes", value: product.notes.top },
            { label: "Heart Notes", value: product.notes.heart },
            { label: "Base Notes", value: product.notes.base },
          ].map(({ label, value }) => (
            <div key={label} className="mb-3">
              <p className="uppercase font-bold text-[1.2rem] mb-1 tracking-[0.4em] text-[var(--light-gold)]">
                {label}
              </p>
              <p className="text-[1.6rem] leading-[1.6] text-[var(--light-gray)]">
                {value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty slot placeholder (was .compare-placeholder) ─────────────────────────
export function AddPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="group/inner flex flex-col items-center justify-center min-h-[400px] w-full rounded-lg border-2 border-dashed border-[var(--white)]/20 transition-all duration-[250ms] hover:bg-[var(--white)]/10">
        <MaterialSymbolsAddCircleOutline
          className="mb-4 text-[var(--light-gold)] transition-transform duration-[250ms] group-hover/inner:scale-110"
          style={{ fontSize: 60 }}
        />
        <p className="uppercase text-[1.4rem] tracking-[0.4em] text-[var(--light-gray)]">
          Add Product
        </p>
      </div>
    </div>
  );
}
