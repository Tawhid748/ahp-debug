import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnData {
  heading: string;
  links: FooterLink[];
}

const columns: FooterColumnData[] = [
  {
    heading: "Al Hussein Perfumes\nCorporate",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Blogs", href: "/blogs" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Fragrances", href: "/fragrances" },
      { label: "My Posts", href: "/my-posts" },
      { label: "My Compare List", href: "/compare-list" },
    ],
  },
  {
    heading: "For Business",
    links: [
      { label: "Request Fragrance", href: "/request-fragrance" },
      { label: "Influencer Collaboration", href: "/influencer-collaboration" },
      {
        label: "Bulk/Wholesaler Inquiry",
        href: "/bulk-wholesale-inquiry",
      },
      {
        label: "Blogger Inquiry",
        href: "blogger-inquiry",
      },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Terms and Conditions", href: "/terms-condition" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Counterfeit Awareness", href: "/counterfeit-awareness" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/alhusseinperfume/",
    imgSrc: "social-icons/facebook.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/alhusseinperfumes/",
    imgSrc: "social-icons/instagram.png",
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@alhusseinperfumes",
    imgSrc: "social-icons/tik-tok.png",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@AlHusseinPerfumes",
    imgSrc: "social-icons/youtube.png",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/al-hussein-471a63393/",
    imgSrc: "social-icons/linkedin.png",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/ahusseinperfumes",
    imgSrc: "social-icons/pinterest.png",
  },
];

const Footer: React.FC = () => {
  return (
  <footer className="bg-[var(--black)] text-[var(--white)] pt-[70px] px-[40px] font-[var(--font-small)]">

    {/* ── Main grid ── */}
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[40px]">

      {/* Nav columns */}
      {columns.map((col) => (
        <div key={col.heading}>
          <h4 className="text-[16px] font-bold mb-[20px] uppercase whitespace-pre-line leading-[1.4] font-[var(--font-big)]">
            {col.heading}
          </h4>

          <ul className="list-none m-0 p-0">
            {col.links.map((link) => (
              <li key={link.label} className="mb-[12px]">
                <Link
                  href={link.href}
                  className="
                    text-[15px]
                    text-[var(--light-gray)]
                    no-underline
                    transition-colors duration-300
                    hover:text-[var(--white)]
                    font-[var(--font-small)]
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Social column */}
      <div className="sm:col-span-2 lg:col-span-1">
        <h4 className="text-[16px] font-bold mb-[20px] uppercase font-[var(--font-big)]">
          LET&apos;S CONNECT
        </h4>

        <div className="flex flex-col gap-[18px] mt-[10px]">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[10px] no-underline"
            >
              <img
                src={social.imgSrc}
                alt={social.name}
                className="w-[18px] h-[18px] object-contain"
              />

              <span className="text-[14px] text-[var(--light-gray)] transition-colors duration-300 hover:text-[var(--white)] font-[var(--font-small)]">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>

    {/* ── Bottom bar ── */}
    <div className="mt-[60px] py-[25px] text-center text-[14px] text-[var(--light-gray)] border-t border-[var(--dark-gray)] font-[var(--font-small)]">
      © 2026 Al Hussein Perfumes Corporate.
    </div>

  </footer>
);
};

export default Footer;
