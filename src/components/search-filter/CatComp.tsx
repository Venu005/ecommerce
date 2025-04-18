import { Category } from "@/payload-types";
import React from "react";
import { CategoryDropdown } from "./CategoryDropdown";

interface CatProps {
  data: any;
}
export const CatComp = ({ data }: CatProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationForward={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
