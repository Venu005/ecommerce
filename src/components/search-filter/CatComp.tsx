"use client";
import React, { useEffect, useRef, useState } from "react";
import { CategoryDropdown } from "./CategoryDropdown";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSideBar } from "./CategoriesSideBar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface CatProps {
  data: CategoriesGetManyOutput;
}
export const CatComp = ({ data }: CatProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null); //* for the view all button
  const [visibleCnt, setVisibleCnt] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";
  const activeCatIndex = data.findIndex((cat) => cat.slug === activeCategory);
  const isActiveCatHidden =
    activeCatIndex >= visibleCnt && activeCatIndex !== -1;
  useEffect(() => {
    const calcVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;
      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;
      const items = Array.from(measureRef.current.children);
      // console.log(items.length); //! remove later
      let totalWidth = 0;
      let visible = 0;
      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (width + totalWidth > availableWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCnt(visible);
    };

    const resizeObserver = new ResizeObserver(calcVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSideBar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      {/*
        hidden div to measure the width of the items
        and calculate how many can fit in the container
      */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationForward={false}
            />
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCnt).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationForward={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCatHidden && !isAnyHovered && "bg-white border-primary"
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
