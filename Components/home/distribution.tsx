
import Link from "next/link";
import Image from "next/image";
import { SectionHeader, Shimmer } from "@/Components/ui";
import { Suspense } from "react";
 
const brands = [
  {
    name: "Fragrance World",
    image: "/patterns/index-page/brands/FW.png",
    href: "/products?brand=Fragrance+World&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "French Avenue",
    image: "/patterns/index-page/brands/FA.png",
    href: "/products?brand=French+Avenue&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "Maison de l'Avenir",
    image: "/patterns/index-page/brands/Maison.png",
    href: "/products?brand=Maison&available=true",
    badge: "Exclusive Distributor",
  },
  {
    name: "Lattafa",
    image: "/patterns/index-page/brands/Lattafa.png",
    href: "/products?brand=Lattafa&available=true",
    badge: "Largest Authorized Distributor",
  },
];
 
export default function Distribution() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <section
        aria-label="service"
        className="relative overflow-hidden z-1 text-center py-[7rem] lg:py-[10rem]"
      >
        {/* Floating decorative background shapes */}
        <Image
          src="/patterns/index-page/bg-images/bg-left-v1.png"
          width={350}
          height={412}
          loading="lazy"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute bottom-0 left-0 -z-1 pointer-events-none max-w-max [animation:var(--anim-float)]"
        />
        <Image
          src="/patterns/index-page/bg-images/bg-right-v1.png"
          width={343}
          height={345}
          loading="lazy"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute top-0 right-0 -z-1 pointer-events-none max-w-max [animation:var(--anim-float)]"
        />
 
        <div className="relative px-[1rem] max-w-[120rem] mx-auto">
          {/* Eyebrow */}
          <p className="font-[family-name:var(--font-small)] font-bold uppercase tracking-[0.4em] text-[length:var(--text-small)] text-[var(--light-gold)] mb-2">
            Distribution
          </p>
          <SectionHeader label={""} title={""}         
          />
          {/* Title */}
          <h2 className="font-[family-name:var(--font-big)] font-normal leading-[1.2] text-[length:var(--text-big)] text-[var(--white)] mb-4">
            Our Brands
          </h2>
 
          {/* Body */}
          <p className="font-[family-name:var(--font-small)] leading-[1.6] text-[length:var(--text-medium)] text-[var(--white)] mb-10 max-w-[56rem] mx-auto">
            We bring the world's most prestigious fragrances directly to you,
            ensuring authenticity, quality, and a luxurious experience with
            every scent.
          </p>
 
          {/* Brand cards */}
          <ul className="grid gap-10 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <li
                key={brand.name}
                className={
                  index === 0 || index === 3
                    ? "lg:-translate-y-7.5"
                    : "lg:translate-y-7.5"
                }
              >
                <div className="group overflow-hidden">
                  <Link
                    href={brand.href}
                    className="relative z-1 block py-7.5 mb-6.5 no-underline overflow-hidden perspective-[600px]"
                  >
                    {/* SVG pattern strip */}
                    <span
                      className="
                        absolute top-0 left-1/2 w-35 h-full -z-1
                        bg-[url('/pattern/img-pattern.svg')] bg-center bg-cover bg-repeat
                        transform-[translateX(-50%)]
                        [transition:transform_500ms_ease_0ms]
                        group-hover:transform-[rotateY(180deg)_translateX(50%)]
                        group-hover:delay-300
                      "
                      aria-hidden="true"
                    />
 
                    <figure
                      className="relative overflow-hidden m-0 transition-transform duration-500 ease-in-out group-hover:scale-105 bg-[var(--black)]"
                      style={{ aspectRatio: "285 / 336" }}
                    >
                      <Shimmer />
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={285}
                        height={336}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
 
                      {/* Hover badge */}
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent to-[var(--darker-black)] flex items-center justify-center px-3 opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                        <p className="text-center uppercase font-semibold tracking-[1.5px] text-[length:var(--text-small)] text-[var(--light-gold)] line-clamp-2">
                          {brand.badge}
                        </p>
                      </div>
                    </figure>
                  </Link>
 
                  <div className="pt-1">
                    <h3 className="font-[family-name:var(--font-big)] font-normal leading-[1.2] text-[length:var(--text-title)] text-[var(--white)] mb-3">
                      <Link
                        href={brand.href}
                        className="no-underline text-inherit"
                      >
                        {brand.name}
                      </Link>
                    </h3>
 
                    {/* Standardized gold link */}
                    <Link href={brand.href} className="link-gold">
                      View Brand Products
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Suspense>
  );
}
 