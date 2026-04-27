'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LightboxProps {
  src: string;
  alt: string;
}

export default function Lightbox({ src, alt }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Clickable image */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        aria-label={`Enlarge ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={300}
          height={424}
          className="w-full h-auto rounded-lg"
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTdlNWU0Ii8+PC9zdmc+"
        />
      </button>

      {/* Lightbox modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full m-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
