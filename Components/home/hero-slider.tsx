"use client";

import {
  TablerChevronDownLeft,
  TablerChevronUpRight,
} from "@/Components/Icons";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/patterns/index-page/hero-banners/1.png",
    subtitle: "Timeless Elegance",
    title: ["Discover Your", "Signature Scent"],
    text: "Timeless fragrances crafted to match every mood and moment.",
  },
  {
    image: "/patterns/index-page/hero-banners/2.png",
    subtitle: "Lasting Impressions",
    title: ["More Than", "a Fragrance"],
    text: "Each scent is designed to leave a lasting impression wherever you go.",
  },
  {
    image: "/patterns/index-page/hero-banners/3.png",
    subtitle: "Bold Identity",
    title: ["Unforgettable", "Starts Here"],
    text: "Bold, refined perfumes made for those who stand out.",
  },
  {
    image: "/patterns/index-page/hero-banners/4.jpeg",
    subtitle: "Scent Reverie",
    title: ["Flavors For", "All Seasons"],
    text: "Embrace a collection of fragrances crafted to delight every moment of the year.",
  },
];

// Shared class strings (kept local to avoid cluttering globals.css)
const revealBase =
  "opacity-0 translate-y-6 [.active_&]:opacity-100 [.active_&]:translate-y-0 [transition:opacity_800ms_ease,transform_800ms_ease]";
const navBtn =
  "absolute top-1/2 z-2 grid place-items-center w-16 h-16 border border-[var(--light-gold)] text-[var(--light-gold)] bg-transparent cursor-pointer hover:bg-[var(--light-gold)] hover:text-[var(--darker-black)] [transition:transform_500ms_ease,opacity_500ms_ease,background-color_250ms,color_250ms]";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(((index % slides.length) + slides.length) % slides.length);
        setAnimating(false);
      }, 100);
    },
    [animating],
  );

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  return (
    <section
      id="home"
      aria-label="home"
      className="relative min-h-screen overflow-hidden py-30"
    >
      {slides.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={i}
            className={`${isActive ? "active " : ""}absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-content-center pt-25 text-center z-1 transition-[opacity,visibility] duration-1000`}
            style={{
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            {/* Ken Burns background */}
            <div
              className="absolute inset-0 -z-1 pointer-events-none select-none brightness-[0.4]"
              style={{
                animation: isActive ? "heroScale 7s linear forwards" : "none",
                transform: isActive ? undefined : "scale(1.15)",
              }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>

            {/* Subtitle */}
            <p
              className={`relative font-[family-name:var(--font-small)] font-bold uppercase tracking-[0.4em] text-[length:var(--text-small)] text-[var(--light-gold)] mb-3 ${revealBase}`}
            >
              {slide.subtitle}
            </p>

            {/* Separator */}
            <span className={`block mt-3.5 mb-5 ${revealBase}`}>
              <span className="flex justify-center">
                <Image
                  src="/pattern/separator.svg"
                  width={100}
                  height={10}
                  alt=""
                  aria-hidden="true"
                />
              </span>
            </span>

            {/* Title */}
            <h1
              className={`font-[family-name:var(--font-big)] font-normal leading-[1em] text-[var(--white)] text-[calc(1.3rem+6.7vw)] mb-0 ${revealBase}`}
            >
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            {/* Body */}
            <p
              className={`font-[family-name:var(--font-small)] text-[var(--white)] leading-[1.6] text-[length:var(--text-medium)] mt-2.5 mb-10 max-w-130 mx-auto sm:text-[2rem] ${revealBase}`}
            >
              {slide.text}
            </p>

            {/* CTA */}
            <Link href="/products" className={`btn-gold mx-auto ${revealBase}`}>
              View Our Products
            </Link>
          </div>
        );
      })}

      {/* Prev */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Slide to previous"
        className={`${navBtn} left-7.5`}
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(-80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <TablerChevronDownLeft className="text-[25px]" />
      </button>

      {/* Next */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Slide to next"
        className={`${navBtn} right-7.5`}
        style={{
          transform: mounted
            ? "translateY(-50%) rotate(45deg)"
            : "translateY(-50%) translateX(80px) rotate(45deg)",
          opacity: mounted ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <TablerChevronUpRight className="text-[25px]" />
      </button>

      {/* Ken Burns keyframe — scoped here so globals stays minimal */}
      <style>{`@keyframes heroScale { from { transform: scale(1); } to { transform: scale(1.15); } }`}</style>
    </section>
  );
}