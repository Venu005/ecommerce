import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

interface SearchInputProps {
  disabled?: boolean; // be disabled while searching
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
      </div>
      {
        /*
        //* add view all categories button
        //* add library button
        
        */
      }
    </div>
  );
};
