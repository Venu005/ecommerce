import React from "react";
import { SearchInput } from "./SearchInput";
import { CatComp } from "./CatComp";

interface SearchFiltersProps {
  data: any;
}
export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      {/* //* search input */}
      <SearchInput />
      {/* //* categories */}
      <CatComp data={data} />
      
    </div>
  );
};
