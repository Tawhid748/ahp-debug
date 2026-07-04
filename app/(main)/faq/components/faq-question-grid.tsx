
import FaqAccordion from "./faqaccordion";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Who do you sell to?",
    a: "We exclusively serve wholesale clients, distributors, retailers, and e-commerce businesses. We do not sell directly to consumers. If you are interested in becoming a partner, please contact our sales team to begin the onboarding process.",
  },
  {
    q: "Do you have a minimum order quantity (MOQ)?",
    a: "Yes, we maintain minimum order quantities based on product category and brand. MOQs ensure efficient production and logistics. Please contact us for a customized quote based on your needs.",
  },
  {
    q: "Are your products authentic?",
    a: "All products supplied are 100% authentic and sourced directly from authorized manufacturers or brand partners. We maintain strict quality control procedures to ensure product integrity.",
  },
  {
    q: "Which markets do you ship to?",
    a: "We ship globally and work with distributors across North America, Europe, the Middle East, and other international markets. Shipping terms and lead times vary depending on destination.",
  },
  {
    q: "What payment terms do you offer?",
    a: "We only accept ACH deposits, Zelle, or wire transfers. No cash or credit card payments allowed. We do not offer any payment plans.",
  },
  {
    q: "How long does order fulfillment take?",
    a: "Lead times depend on product availability and order volume. In-stock wholesale orders are typically processed within a few business days. Larger or custom orders may require additional production time.",
  },
  {
    q: "Do you support Amazon or other marketplace sellers?",
    a: "Yes, we work with qualified e-commerce sellers and marketplace distributors. Compliance with brand policies and marketplace regulations is required.",
  },
  {
    q: "Can you provide compliance documentation?",
    a: "We can provide required documentation such as MSDS, IFRA certificates, ingredient disclosures, and other regulatory documents upon request.",
  },
  {
    q: "What is your return or damage policy?",
    a: "Any damaged or defective products must be reported within a specified timeframe after delivery. Claims are reviewed promptly, and resolutions may include replacement or credit.",
  },
];

function OrnamentalSep() {
  return (
    <svg
      viewBox="0 0 100 12"
      width="100"
      height="12"
      className="block mx-auto mt-[5px]"
    >
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
  );
}

export default function FaqSection() {
  return (
    <section className="py-10 sm:py-14 md:py-[70px] bg-[var(--dark-gray)]">
      {/* Section title — .page-section-header */}
      <div className="text-center mb-3 mt-20">
        {/* .page-section-title */}
        <span className="font-[family-name:var(--font-big)] font-bold uppercase tracking-[0.4em] leading-[1.2em] text-[var(--light-gold)] text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem]">
          FAQs
        </span>
        <OrnamentalSep />
      </div>

      {/* Interactive accordion */}
      <FaqAccordion faqs={faqs} />
    </section>
  );
}