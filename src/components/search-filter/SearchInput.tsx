"use client";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";

import { CategoriesSideBar } from "./CategoriesSideBar";
import { Button } from "../ui/button";

interface SearchInputProps {
  disabled?: boolean; // be disabled while searching
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSideBar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
      </div>
      {/*
        //* add view all categories button
        
        //* add library button
        
        */}
      <Button
        variant={"elevated"}
        onClick={() => setIsSidebarOpen(true)}
        className="size-12 shrink-0 flex lg:hidden"
      >
        <ListFilterIcon className="size-4" />
      </Button>
    </div>
  );
};
