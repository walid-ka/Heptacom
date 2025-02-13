"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ListFilter } from "lucide-react";

type FilterDropdownProps = {
  filterName: string;
  options: { label: string; value: string }[];
};

const FilterDropdown = ({ filterName, options }: FilterDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get the current filter from the URL or default to the first option
  const currentFilter = searchParams.get(filterName) || options[0].value;

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(filterName, value);
    params.set("page", "1"); // Reset to page 1 if paginated
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false); 
  };

  return (
    <div className="relative">
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-100"
      >
        <ListFilter className="h-4 w-4" />
        <span>Filter</span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-300 shadow-md rounded-md">
          <div className="p-2 text-sm font-semibold border-b">Filter by</div>
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentFilter === option.value
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
              onClick={() => handleClick(option.value)}
              disabled={currentFilter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
