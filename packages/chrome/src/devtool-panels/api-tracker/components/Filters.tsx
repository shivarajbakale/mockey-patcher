import React from "react";
import { Input } from "@/components/atoms/input/input";
import { Typography } from "@/components/atoms/typography/typography";

export type FilterCriteria = "all" | "success" | "error" | "pending";

interface FiltersProps {
  searchQuery: string;
  filterCriteria: FilterCriteria;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: FilterCriteria) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <Typography variant="small">Search API</Typography>
        <Input
          type="text"
          placeholder="Search by URL..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Typography variant="small">Filter by Status</Typography>
      </div>
    </div>
  );
};
