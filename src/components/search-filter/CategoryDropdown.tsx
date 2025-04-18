"use client";
import { Category } from "@/payload-types";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubCategoryMenu } from "./SubCategoryMenu";

interface CategoryDropdownProps {
  category: Category;
  isActive?: boolean;
  isNavigationForward?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationForward,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);
  const dropDownPosition = getDropdownPosition();
  const onMouseEnter = () => {
    if (category.subcategories) {
      console.log("category.subcategories", category.subcategories);
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => setIsOpen(false);
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black ",
            isActive && !isNavigationForward && "bg-white border-primary"
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropDownPosition}
      />
    </div>
  );
};
