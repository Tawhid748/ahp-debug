"use client";

// Client island — the interactive part of Open Positions: the department
// filter and the expandable job cards (with line-clamp detection). Receives
// the hardcoded careers list as a prop from the server shell.

import { useState, useRef, useEffect } from "react";
import type { Career } from "../careers-data";

const DEPARTMENTS = [
  "All Departments",
  "Marketing",
  "Sales",
  "Operations",
  "Technology",
  "Corporate",
] as const;

const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
  internship: "Internship",
};

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

function JobCard({ job, salary }: { job: Career; salary: string | null }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, []);

  return (
    <div className="group relative border border-[var(--white)]/10 hover:border-[var(--light-gold)] transition-all duration-300 overflow-hidden bg-[var(--dark-gray)]">
      {/* Left gold accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--light-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[var(--light-gold)] text-[1.1rem] font-bold uppercase tracking-[2px]">
                {job.department}
              </span>
              <span className="w-1.5 h-1.5 bg-[var(--light-gold)]/40 rotate-45" />
              <span className="text-[var(--white)]/40 text-[1.2rem]">
                {job.location}
              </span>
              <span className="w-1.5 h-1.5 bg-[var(--light-gold)]/40 rotate-45" />
              <span className="text-[var(--white)]/40 text-[1.2rem]">
                {TYPE_LABELS[job.type] ?? job.type}
              </span>
              {salary && (
                <>
                  <span className="w-1.5 h-1.5 bg-[var(--light-gold)]/40 rotate-45" />
                  <span className="text-[var(--white)]/40 text-[1.2rem]">
                    {salary}
                  </span>
                </>
              )}
            </div>

            <h3 className="text-[var(--white)] text-[2.4rem] font-normal group-hover:text-[var(--light-gold)] transition-colors duration-300 [font-family:var(--font-big)]">
              {job.title}
            </h3>
          </div>

          <a
            href="mailto:careers@alhusseinperfumes.com"
            className="group/btn relative inline-flex items-center gap-2 px-6 py-3 border border-[var(--light-gold)] text-[var(--light-gold)] font-bold uppercase tracking-[2px] text-[1.1rem] overflow-hidden transition-colors duration-300 hover:text-[var(--darker-black)] shrink-0"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--light-gold)] transition-transform duration-300 group-hover/btn:translate-x-0 -z-10" />
            <span className="relative z-10">Apply Now →</span>
          </a>
        </div>

        {/* Collapsible body */}
        <div
          ref={contentRef}
          className={[
            "overflow-hidden transition-all duration-300",
            expanded ? "" : "line-clamp-5",
          ].join(" ")}
        >
          <p className="text-[var(--light-gray)] text-[1.4rem] leading-[1.7] mb-5">
            {job.description}
          </p>

          {job.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req: string) => (
                <span
                  key={req}
                  className="px-3 py-1 border border-[var(--white)]/10 text-[var(--white)]/40 text-[1.1rem] uppercase tracking-wider font-bold"
                >
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Toggle — only if content is actually clamped */}
        {isClamped && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 flex items-center gap-2 text-[var(--light-gold)] text-[1.1rem] font-bold uppercase tracking-[2px] transition-opacity duration-200 hover:opacity-70"
          >
            <span>{expanded ? "Show Less" : "Read More"}</span>
            <span
              className="inline-block transition-transform duration-300"
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ↓
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function OpenPositionsClient({
  careers,
}: {
  careers: Career[];
}) {
  const [activeFilter, setActiveFilter] = useState("All Departments");

  const filtered =
    activeFilter === "All Departments"
      ? careers
      : careers.filter((c) => c.department === activeFilter);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-14 py-6 border-y border-[var(--white)]/10">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveFilter(dept)}
            className={[
              "px-5 py-2 text-[1.1rem] font-bold uppercase tracking-[2px] border transition-all duration-200",
              activeFilter === dept
                ? "bg-[var(--light-gold)] border-[var(--light-gold)] text-[var(--darker-black)]"
                : "border-[var(--white)]/15 text-[var(--white)]/50 hover:border-[var(--light-gold)] hover:text-[var(--light-gold)]",
            ].join(" ")}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Job cards */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--white)]/30 text-[1.6rem]">
              No positions available in this department.
            </p>
          </div>
        )}

        {filtered.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            salary={formatSalary(job.salaryMin, job.salaryMax)}
          />
        ))}
      </div>
    </>
  );
}
