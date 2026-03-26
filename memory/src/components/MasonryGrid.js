"use client";

import { useEffect, useRef, useState } from "react";
import MasonryNewsCard from "./MasonryNewsCard";

export default function MasonryGrid({ items }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    // Create Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleCards((prev) => new Set([...prev, index]));
            // Unobserve after becoming visible (animate once)
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px",
      }
    );

    // Observe all card refs
    cardRefs.current.forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          data-index={index}
        >
          <MasonryNewsCard
            item={item}
            index={index}
            isVisible={visibleCards.has(index)}
          />
        </div>
      ))}
    </div>
  );
}
