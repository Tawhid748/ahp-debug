// Server Component — composes the careers sections. Background left as-is.

import CareersHero from "./components/CareersHero";
import WhyWorkWithUs from "./components/WhyWorkWithUs";
import OpenPositions from "./components/OpenPositions";
import ApplicationProcess from "./components/ApplicationProcess";
import CareersCTA from "./components/CareersCTA";

export default function CareersPage() {
  return (
    <main
      className="min-h-screen text-[var(--white)]"
      style={{
        backgroundColor: "hsla(210,4%,9%,1)",
        backgroundImage: "url('/images/potential-pink-bg.png')",
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
    >
      <CareersHero />
      <WhyWorkWithUs />
      <OpenPositions />
      <ApplicationProcess />
      <CareersCTA />
    </main>
  );
}