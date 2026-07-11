"use client";

// Client island — the ONLY interactive part of the product page: the
// Description / Details / Notes tab switcher. The panels themselves are
// rendered on the server and passed in as props, so their markup stays
// server-rendered.

import { useState } from "react";

const TABS = ["Description", "Details", "Notes"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({
  description,
  details,
  notes,
}: {
  description: React.ReactNode;
  details: React.ReactNode;
  notes: React.ReactNode;
}) {
  const [active, setActive] = useState<Tab>("Description");

  const panels: Record<Tab, React.ReactNode> = {
    Description: description,
    Details: details,
    Notes: notes,
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-8 border-b border-[var(--white)]/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={[
              "relative pb-3 uppercase font-bold tracking-[2px] text-[1.3rem] bg-transparent border-none cursor-pointer transition-colors duration-200",
              active === t
                ? "text-[var(--white)]"
                : "text-[var(--light-gray)] hover:text-[var(--white)]",
            ].join(" ")}
          >
            {t}
            {active === t && (
              <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--light-gold)]" />
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="mt-6 border border-[var(--white)]/10 rounded bg-[var(--dark-gray)] p-8">
        {panels[active]}
      </div>
    </div>
  );
}
