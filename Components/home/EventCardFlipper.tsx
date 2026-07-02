"use client";


import { useState } from "react";

export default function EventCardFlipper({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li className="perspective-[1000px]" style={{ aspectRatio: "350 / 450" }}>
      <div
        className="relative w-full h-full transform-3d transition-transform duration-700 ease-in-out cursor-pointer"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onClick={() => !flipped && setFlipped(true)}
      >
        {/* ── Front (server-rendered) ── */}
        <div className="group absolute inset-0 backface-hidden overflow-hidden">
          {front}
        </div>

        {/* ── Back (server-rendered) ── */}
        <div
          className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] flex flex-col bg-[var(--black)] border border-[var(--light-gold)]/40"
        >
          {/* Close button — flip logic, so it lives in the client island */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="absolute top-3 right-3 z-2 w-8 h-8 grid place-items-center opacity-50 hover:opacity-100 transition-opacity duration-200"
            aria-label="Flip back"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--light-gold)"
              strokeWidth="2.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {back}
        </div>
      </div>
    </li>
  );
}