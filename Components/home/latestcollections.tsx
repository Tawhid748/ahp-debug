"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "../ui";

const products = [
  { name: "Spectre Collection", image: "/patterns/index-page/collections/1.png" },
  { name: "Sultan Collection", image: "/patterns/index-page/collections/2.png" },
  { name: "Trilogy Collection", image: "/patterns/index-page/collections/3.png" },
  { name: "Veneno Collection", image: "/patterns/index-page/collections/4.png" },
  {
    name: "Signature Collection",
    image: "/patterns/index-page/collections/5.png",
  },
  { name: "Vulcan Collection", image: "/patterns/index-page/collections/6.png" },
  {
    name: "Royal Blend Collection",
    image: "/patterns/index-page/collections/7.png",
  },
  {
    name: "Prive Series Collection",
    image: "/patterns/index-page/collections/8.png",
  },
  { name: "Nudo Collection", image: "/patterns/index-page/collections/9.png" },
  {
    name: "Pinnace Collection",
    image: "/patterns/index-page/collections/10.png",
  },
  { name: "Notes Collection", image: "/patterns/index-page/collections/11.png" },
  {
    name: "Moonstone Collection",
    image: "/patterns/index-page/collections/12.png",
  },
  { name: "Just Collection", image: "/patterns/index-page/collections/13.png" },
  { name: "Expose Collection", image: "/patterns/index-page/collections/14.png" },
  {
    name: "An Equestrian Series Collection",
    image: "/patterns/index-page/collections/15.png",
  },
  { name: "Enigma Collection", image: "/patterns/index-page/collections/16.png" },
  { name: "Coffee Collection", image: "/patterns/index-page/collections/17.png" },
  {
    name: "Champion Collection",
    image: "/patterns/index-page/collections/18.png",
  },
  {
    name: "Bavaria Collection",
    image: "/patterns/index-page/collections/19.png",
  },
  {
    name: "Artisan Collection",
    image: "/patterns/index-page/collections/20.png",
  },
  {
    name: "Riche & Royale Collection",
    image: "/patterns/index-page/collections/21.png",
  },
  {
    name: "After Hours Collection",
    image: "/patterns/index-page/collections/22.png",
  },
  {
    name: "Super Nova Collection",
    image: "/patterns/index-page/collections/23.png",
  },
  {
    name: "Elixir Collection",
    image: "/patterns/index-page/collections/24.png",
  },
  {
    name: "Zenith Collection",
    image: "/patterns/index-page/collections/25.png",
  },
  {
    name: "Aura Collection",
    image: "/patterns/index-page/collections/26.png",
  },
  {
    name: "Jade Collection",
    image: "/patterns/index-page/collections/27.png",
  },
  {
    name: "Zenith Collection",
    image: "/patterns/index-page/collections/28.png",
  },
  {
    name: "FA Paris Collection",
    image: "/patterns/index-page/collections/29.png",
  },
  {
    name: "Mochi Collection",
    image: "/patterns/index-page/collections/30.png",
  },
  {
    name: "Gourmand Trio Collection",
    image: "/patterns/index-page/collections/31.jpeg",
  },
  {
    name: "Day & Night Collection",
    image: "/patterns/index-page/collections/32.png",
  },
  {
    name: "Luxury Trio Collection",
    image: "/patterns/index-page/collections/33.png",
  },
  {
    name: "Power Collection",
    image: "/patterns/index-page/collections/34.png",
  },
  {
    name: "The Card Collection",
    image: "/patterns/index-page/collections/35.png",
  },
  {
    name: "Lumiere Collection",
    image: "/patterns/index-page/collections/36.png",
  },
  {
    name: "Minister of Oud Collection",
    image: "/patterns/index-page/collections/37.png",
  },
  {
    name: "Haya Collection",
    image: "/patterns/index-page/collections/39.png",
  },
  {
    name: "Hayaati Collection",
    image: "/patterns/index-page/collections/40.png",
  },
  {
    name: "Divin Collection",
    image: "/patterns/index-page/collections/41.png",
  },
  {
    name: "Aromatix Collection",
    image: "/patterns/index-page/collections/42.png",
  },
  {
    name: "Fame Collection",
    image: "/patterns/index-page/collections/43.png",
  },
  {
    name: "Asdaaf Collection",
    image: "/patterns/index-page/collections/44.png",
  },
  {
    name: "Unique Collection",
    image: "/patterns/index-page/collections/45.png",
  },
  {
    name: "Teriaq Collection",
    image: "/patterns/index-page/collections/46.png",
  },
  {
    name: "Gracious Collection",
    image: "/patterns/index-page/collections/47.png",
  },
  {
    name: "Hunters Collection",
    image: "/patterns/index-page/collections/48.png",
  },
  {
    name: "Barakkat Collection",
    image: "/patterns/index-page/collections/49.png",
  },
  {
    name: "Spooky Series",
    image: "/patterns/index-page/collections/50.png",
  },
  {
    name: "Genesis Collection",
    image: "/patterns/index-page/collections/51.png",
  },
  {
    name: "External Love Collection",
    image: "/patterns/index-page/collections/53.png",
  },
];

// Original .carousel-arrow: transparent, no border, white → gold on hover, 40px
const navBtn =
  "shrink-0 bg-transparent border-none text-[var(--white)] hover:text-[var(--light-gold)] text-[40px] leading-none cursor-pointer z-2 px-2.5 transition-colors duration-200";

export default function LatestCollections() {
  const trackRef = useRef<HTMLUListElement>(null!);
  const viewportRef = useRef<HTMLDivElement>(null!);
  const nextBtnRef = useRef<HTMLButtonElement>(null!);
  const prevBtnRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const nextBtn = nextBtnRef.current;
    const prevBtn = prevBtnRef.current;

    const originalCount = products.length;
    while (track.children.length > originalCount) {
      track.removeChild(track.lastChild!);
    }

    const originals = Array.from(track.children) as HTMLElement[];
    originals.forEach((item) => track.appendChild(item.cloneNode(true)));

    let itemWidth = originals[0].offsetWidth;
    let setWidth = originals.length * itemWidth;
    const ro = new ResizeObserver(() => {
      itemWidth = originals[0].offsetWidth;
      setWidth = originals.length * itemWidth;
    });
    ro.observe(track);

    let offset = 0;
    const speed = 0.7;
    let paused = false;
    let pauseTimer: ReturnType<typeof setTimeout>;
    let rafId: number;

    function loop() {
      if (!paused) offset -= speed;
      if (offset <= -setWidth) offset += setWidth;
      if (offset >= 0) offset -= setWidth;
      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    const pauseAfterClick = () => {
      paused = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        paused = false;
      }, 500);
    };
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    const onNext = () => {
      offset -= itemWidth;
      pauseAfterClick();
    };
    const onPrev = () => {
      offset += itemWidth;
      pauseAfterClick();
    };
    nextBtn?.addEventListener("click", onNext);
    prevBtn?.addEventListener("click", onPrev);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(pauseTimer);
      ro.disconnect();
      track.style.transform = "";
      while (track.children.length > originalCount) {
        track.removeChild(track.lastChild!);
      }
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      nextBtn?.removeEventListener("click", onNext);
      prevBtn?.removeEventListener("click", onPrev);
    };
  }, []);

  return (
    <div className="relative overflow-hidden z-1 text-center py-[7rem] lg:py-[10rem] bg-[var(--black)]">
      <div className="px-[1rem] max-w-[120rem] mx-auto">
        {/* Section header (label + title) — centered */}
        <div className="text-center">
          <p className="font-[family-name:var(--font-small)] font-bold uppercase tracking-[0.4em] text-[length:var(--text-small)] text-[var(--light-gold)] mb-3">
            Collections
          </p>
           <SectionHeader label={""} title={""}         
                              />
          <h2 className="font-[family-name:var(--font-big)] font-normal leading-[1.2] text-[length:var(--text-big)] text-[var(--white)] mb-10">
            Our Latest Collections
          </h2>
        </div>
      </div>

      <div className="relative w-full flex items-center px-4">
        <button ref={prevBtnRef} aria-label="Previous products" className={navBtn}>
          &#10094;
        </button>

        <div ref={viewportRef} className="overflow-hidden w-full">
          {/* track: flex row, no wrap, no CSS transition (JS drives translateX) */}
          <ul ref={trackRef} className="flex flex-nowrap list-none p-0 m-0 will-change-transform">
            {products.map((product, index) => (
              <li
                key={`${product.name}-${index}`}
                className="box-border shrink-0 grow-0 basis-full min-[601px]:basis-1/2 min-[1025px]:basis-1/4 p-[15px]"
              >
                <div className="group relative text-center rounded-xl p-5 bg-[var(--darker-black)] border-0 outline-0 ring-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={285}
                    height={285}
                    loading="lazy"
                    sizes="285px"
                    className="w-full h-auto border-0 outline-0 ring-0 block"
                  />
                  <h3 className="mt-3.75 text-[var(--white)] text-[length:var(--text-medium)] font-[family-name:var(--font-small)]">
                    {product.name}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button ref={nextBtnRef} aria-label="Next products" className={navBtn}>
          &#10095;
        </button>
      </div>
    </div>
  );
}