// Server Component — the section header and the benefits data. Only the
// carousel (autoplay + dots + pause-on-hover) is a client island.

import BenefitsCarousel, { type Benefit } from "./BenefitsCarousel";

const benefits: Benefit[] = [
  {
    title: "Industry Leadership",
    text: "Work with one of the leading names in luxury fragrances, where innovation meets tradition.",
    stat: "#1",
    statLabel: "in luxury",
    quote: "Setting the standard since day one.",
  },
  {
    title: "Career Growth",
    text: "We invest in our people with continuous training, mentorship, and clear advancement pathways.",
    stat: "100%",
    statLabel: "internal promotions",
    quote: "Every role is a stepping stone.",
  },
  {
    title: "Collaborative Culture",
    text: "Join a diverse team of passionate professionals who support and inspire each other daily.",
    stat: "50+",
    statLabel: "team members",
    quote: "Stronger together, always.",
  },
  {
    title: "Comprehensive Benefits",
    text: "Competitive compensation, full health coverage, retirement plans, and generous PTO.",
    stat: "Day 1",
    statLabel: "full benefits",
    quote: "We take care of our own.",
  },
  {
    title: "Creative Environment",
    text: "Work in an atmosphere that celebrates creativity, encourages bold ideas, and rewards innovation.",
    stat: "∞",
    statLabel: "possibilities",
    quote: "No idea is too ambitious.",
  },
  {
    title: "Global Impact",
    text: "Your work ships to customers across 30+ countries — a real mark left on the world.",
    stat: "30+",
    statLabel: "countries",
    quote: "Reach that spans the globe.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-24 px-5 bg-[var(--black)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="text-[var(--light-gold)] uppercase font-bold tracking-[0.4em] text-[1.2rem] [font-family:var(--font-big)]">
              Why Al Hussein Perfumes
            </span>
            <h2 className="font-normal text-[var(--white)] mt-3 text-[clamp(3rem,4vw,4.5rem)] leading-[1.1] [font-family:var(--font-big)]">
              Why Work
              <br />
              With Us
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[var(--light-gray)] text-[1.6rem] leading-[1.7]">
              We don&apos;t just offer jobs — we offer a place where your talent
              is recognized, your voice is heard, and your career is shaped
              around you.
            </p>
          </div>
        </div>

        {/* One-card carousel with dots (client) */}
        <BenefitsCarousel benefits={benefits} />
      </div>
    </section>
  );
}