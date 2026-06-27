"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type GalleryGridProps = {
  children: ReactNode;
  className?: string;
};

export function GalleryGrid({ children, className = "" }: GalleryGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`gallery-grid ${visible ? "gallery-grid-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
