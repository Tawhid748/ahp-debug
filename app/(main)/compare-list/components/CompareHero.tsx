// Server Component — static markup only.

export default function CompareHero() {
  return (
    <div className="pt-[150px] px-5 sm:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block w-2 h-2 rotate-45 border border-[var(--light-gold)] shrink-0" />
        <span className="text-[var(--light-gold)] font-bold uppercase tracking-[4px] text-[1.1rem]">
          Find Your Perfect Scent
        </span>
        <span className="inline-block w-2 h-2 rotate-45 border border-[var(--light-gold)] shrink-0" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1
            className="text-[4rem] sm:text-[5.5rem] font-normal text-[var(--white)] leading-none tracking-tight mb-3 [font-family:var(--font-big)]"
          >
            Compare Fragrances
          </h1>
          <p className="text-[var(--white)]/50 text-[1.4rem] max-w-xl">
            Compare up to 3 fragrances side by side to find your ideal signature
            scent.
          </p>
        </div>
      </div>
    </div>
  );
}
