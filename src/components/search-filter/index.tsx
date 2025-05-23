"use client";
import React from "react";
import { SearchInput } from "./SearchInput";
import { CatComp } from "./CatComp";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* //* search input */}
      <SearchInput />
      {/* //* categories */}
      <div className="hidden lg:block">
        <CatComp data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* //* search input */}
      <SearchInput disabled />
      {/* //* categories */}
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
