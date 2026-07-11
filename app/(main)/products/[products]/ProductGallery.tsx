"use client";

// Client island — the image gallery. Clicking a thumbnail swaps the main
// image. When there are no images yet (admin panel hasn't added any), it
// shows a single Coming Soon placeholder and the strip has one thumb.

import { useState } from "react";

const COMING_SOON = "/patterns/ComingSoon.png";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  // No images yet → single Coming Soon placeholder.
  const gallery = images.length > 0 ? images : [COMING_SOON];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="relative w-full aspect-square rounded border border-[var(--white)]/10 bg-[var(--dark-gray)] overflow-hidden">
        <img
          src={gallery[activeIdx]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain p-8"
        />
      </div>

      {/* Thumbnail strip — one per image (grows as admin adds more) */}
      <div className="flex gap-3 mt-4">
        {gallery.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setActiveIdx(i)}
            className={[
              "relative w-[90px] h-[90px] rounded border overflow-hidden bg-[var(--dark-gray)] cursor-pointer transition-colors duration-200",
              i === activeIdx
                ? "border-[var(--light-gold)]"
                : "border-[var(--white)]/10 hover:border-[var(--white)]/30",
            ].join(" ")}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
