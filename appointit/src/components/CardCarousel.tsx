import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

interface CardCarouselProps<T> {
  items: [];
  renderCard: (item: T) => React.ReactNode;
  uniqueId: string;
  itemWidth?: number;
  className?: string;
  cardClassName?: string;
}

export function CardCarousel<T>({
  items,
  renderCard,
  uniqueId,
  itemWidth = 320,
  className = "",
  cardClassName = "",
}: CardCarouselProps<T>) {
  const handleScroll = (direction: "left" | "right") => {
    const el = document.getElementById(uniqueId);
    if (el) {
      const scrollDistance = direction === "left" ? -itemWidth : itemWidth;
      el.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-muted py-8">No items to display</div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <button
        type="button"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 active:bg-slate-100 hidden md:block cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>
      <div
        id={uniqueId}
        className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, index) => (
          <div key={index} className={`${cardClassName}`}>
            {renderCard(item)}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 active:bg-slate-100 hidden md:block cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
