// Server Component — static section header + ornamental separator. The filter
// and expandable job cards (interactive) live in OpenPositionsClient. Data is
// hardcoded (was Convex api.careers.getActiveCareers).

import { CAREERS } from "../careers-data";
import OpenPositionsClient from "./OpenPositionsClient";

export default function OpenPositions() {
  return (
    <section className="py-24 px-5 bg-[var(--black)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--light-gold)] uppercase font-bold tracking-[0.4em] text-[1.2rem] [font-family:var(--font-big)]">
            Current Opportunities
          </span>
          <h2 className="font-normal text-[var(--white)] mt-3 text-[clamp(3rem,4vw,4.5rem)] leading-[1.1] [font-family:var(--font-big)]">
            Open Positions
          </h2>
          <div className="flex justify-center mt-5">
            <svg viewBox="0 0 100 12" width="100" height="12">
              <line
                x1="0"
                y1="6"
                x2="38"
                y2="6"
                stroke="var(--light-gold)"
                strokeWidth="1"
              />
              <rect
                x="44"
                y="2"
                width="8"
                height="8"
                transform="rotate(45 48 6)"
                fill="none"
                stroke="var(--light-gold)"
                strokeWidth="1"
              />
              <line
                x1="58"
                y1="6"
                x2="100"
                y2="6"
                stroke="var(--light-gold)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Filter + cards (interactive) */}
        <OpenPositionsClient careers={CAREERS} />
      </div>
    </section>
  );
}
