import React from "react";
import { SearchInput } from "./SearchInput";
import { CatComp } from "./CatComp";
import { CustomCategory } from "@/types/types";

interface SearchFiltersProps {
  data: CustomCategory[];
}
export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      {/* //* search input */}
      <SearchInput data = {data} />
      {/* //* categories */}
     <div className="hidden lg:block">
     <CatComp data={data} />
     </div>
    </div>
  );
};
