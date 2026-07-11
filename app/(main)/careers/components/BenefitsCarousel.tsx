"use client";

// Client island — the one-card-at-a-time benefits carousel.
// The reveal that used to be on :hover (corner accents, expanding gold line,
// gold title, quote fading up) now plays automatically on the ACTIVE card.
// It holds ~4s, then advances. Gold arrows and dots let you navigate manually.
// Hovering the card pauses the timer.

import { useState, useEffect, useRef } from "react";

export interface Benefit {
  title: string;
  text: string;
  stat: string;
  statLabel: string;
  quote: string;
}

const HOLD_MS = 4000;

// Gold arrow buttons, flanking the card.
const arrowClass =
  "absolute top-1/2 -translate-y-1/2 z-20 grid place-items-center w-12 h-12 border border-[var(--light-gold)] text-[var(--light-gold)] bg-[var(--black)]/70 cursor-pointer hover:bg-[var(--light-gold)] hover:text-[var(--darker-black)] transition-colors duration-200";

export default function BenefitsCarousel({
  benefits,
}: {
  benefits: Benefit[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Advance after the hold, unless paused.
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % benefits.length);
    }, HOLD_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, benefits.length]);

  const b = benefits[active];

  const goPrev = () =>
    setActive((prev) => (prev - 1 + benefits.length) % benefits.length);
  const goNext = () => setActive((prev) => (prev + 1) % benefits.length);

  return (
    <div>
      {/* ── Card + arrows ── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous benefit"
          className={`${arrowClass} left-0 -translate-x-1/2`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={goNext}
          aria-label="Next benefit"
          className={`${arrowClass} right-0 translate-x-1/2`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* The card */}
        <div className="relative overflow-hidden p-10 sm:p-12 flex flex-col justify-between min-h-[340px] border border-[var(--light-gold)]/60 bg-[var(--dark-gray)] transition-all duration-500">
          {/* Corner accents — revealed automatically */}
          <span className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none border-t border-r border-[var(--light-gold)]" />
          <span className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none border-b border-l border-[var(--light-gold)]" />

          {/* Keyed so the reveal replays on every card change */}
          <div key={active} className="flex flex-col justify-between h-full">
            {/* Top */}
            <div className="benefit-in flex items-start justify-between gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <div className="w-14 h-px bg-[var(--light-gold)]" />
                <h3 className="text-[var(--light-gold)] text-[2.6rem] sm:text-[3rem] font-normal leading-tight [font-family:var(--font-big)]">
                  {b.title}
                </h3>
              </div>
              <div className="shrink-0 text-right border border-[var(--light-gold)]/30 px-4 py-3">
                <p className="text-[var(--light-gold)] text-[2.4rem] font-normal leading-none [font-family:var(--font-big)]">
                  {b.stat}
                </p>
                <p className="text-[var(--white)]/25 text-[1rem] uppercase tracking-[2px] font-bold mt-1">
                  {b.statLabel}
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="benefit-in benefit-in-delay relative z-10 flex flex-col gap-4 mt-10">
              <p className="text-[var(--white)] text-[1.6rem] leading-[1.7] max-w-[640px]">
                {b.text}
              </p>
              <p className="text-[var(--light-gold)]/60 text-[1.4rem] italic [font-family:var(--font-big)]">
                &ldquo;{b.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {benefits.map((item, i) => (
          <button
            key={item.title}
            onClick={() => setActive(i)}
            aria-label={`Show ${item.title}`}
            aria-current={i === active}
            className={[
              "w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300",
              i === active
                ? "bg-[var(--light-gold)]"
                : "bg-[var(--white)]/20 hover:bg-[var(--white)]/40",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Entrance animation — replays whenever the active card changes */}
      <style>{`
        @keyframes benefitIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .benefit-in {
          animation: benefitIn 600ms ease forwards;
        }
        .benefit-in-delay {
          opacity: 0;
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
}