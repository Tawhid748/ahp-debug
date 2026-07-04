"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="max-w-[1200px] w-full mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-10">
      {faqs.map((item, i) => (
        <div key={i} className="border-b border-[var(--light-gold)]/35">
          <button
            onClick={() => toggle(i)}
            className="w-full flex justify-between items-center px-3 sm:px-[15px] py-4 sm:py-5 border-none outline-none bg-transparent text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] text-[var(--light-gold)] font-bold cursor-pointer text-left tracking-[0.5px] sm:tracking-[1px] [font-family:var(--font-big)]"
          >
            <span className="pr-2">{item.q}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="ml-2 sm:ml-4 flex-shrink-0 text-[var(--light-gold)] transition-transform duration-500 ease-in"
              style={{
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div
            className="overflow-hidden transition-all duration-[600ms] ease-[ease]"
            style={{
              maxHeight: openIndex === i ? "400px" : "0",
              opacity: openIndex === i ? 1 : 0,
              padding: openIndex === i ? "0 12px 24px" : "0 12px",
            }}
          >
            {/* .body-muted */}
            <p className="font-[family-name:var(--font-small)] text-[var(--light-gray)] leading-[1.6] sm:leading-[1.5] text-[1.4rem] sm:text-[1.6rem] md:text-[1.8rem]">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}