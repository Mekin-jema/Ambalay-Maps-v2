
"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "../../ui/sidebar";

// Define types for category and handleCategoryClick function
interface category {
  name: string;
  tag: string;
  icon: string;
  IconComponent: React.ComponentType;
  iconColor: string;
  textColor: string;
}
interface CategoryScrollProps {
  categories: category[];
  activeCategory: string | null;
  handleCategoryClick: (category: category) => void;
  // loading: boolean;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, activeCategory, handleCategoryClick }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const { state } = useSidebar(); // Get sidebar state (expanded or collapsed)

  // Function to calculate visible items in the scrollable area
  const calculateVisibleItems = () => {
    if (containerRef.current && scrollRef.current?.firstChild) {
      const containerWidth = containerRef.current.clientWidth;
      const itemWidth = (scrollRef.current.firstChild as HTMLElement).clientWidth + 8; // add padding
      const count = Math.floor(containerWidth / itemWidth);
      setVisibleCount(Math.max(3, count)); // Ensure at least 3 items are visible
    }
  };

  // Function to check whether to show left or right scroll buttons
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Set up event listeners on window resize and scroll
  useEffect(() => {
    calculateVisibleItems();
    setTimeout(checkScroll, 100);

    window.addEventListener("resize", calculateVisibleItems);
    return () => window.removeEventListener("resize", calculateVisibleItems);
  }, [categories]);

  useEffect(() => {
    if (!scrollRef.current) return;
    checkScroll();

    const ref = scrollRef.current;
    ref.addEventListener("scroll", checkScroll);
    return () => ref.removeEventListener("scroll", checkScroll);
  }, [categories, visibleCount]);

  // Function to scroll the categories horizontally
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`fixed ${state === "collapsed" ? "md:w-[900px]" : "md:w-[680px]"} right-3 lg:top-5 top-5 w-full`} ref={containerRef}>
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg p-2 rounded-full z-20 flex items-center justify-center h-10 w-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 p-2 border-b border-gray-300 bg-transparent overflow-x-auto no-scrollbar scroll-smooth relative"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`flex-shrink-0 flex items-center px-3 py-1 border border-[#00432F] space-x-2 rounded-full ${activeCategory === category.name ? "bg-[#00432F] text-white" : "bg-white text-black"
              }`}
          // disabled={loading}
          >
            <category.IconComponent />
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black shadow-lg p-2 rounded-full z-20 flex items-center justify-center h-10 w-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoryScroll;
