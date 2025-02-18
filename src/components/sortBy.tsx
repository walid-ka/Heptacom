"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";

type SortByProps = {
  options: { label: string; value: string }[];
};

const SortBy = ({ options }: SortByProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  // Get the current sorting from the URL or default to all
  const currentSort = searchParams.get("sortBy") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    params.set("page", "1"); // Reset to page 1 if paginated
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-[150px] border border-gray-600/50 bg-[#161616] h-9 px-4 py-2 rounded-md text-sm "
      >
        <span>Sortieren</span>
        <ChevronDown size={20} />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute mt-2 w-[210px] bg-[#161616] border border-gray-600/50 shadow-md rounded-md z-20">
          <div className="p-2 text-sm font-semibold border-b">Sortieren nach</div>
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 text-sm transition-all duration-150 ease-in-out hover:bg-[#282828] ${currentSort === option.value ? "bg-[#282828] font-semibold" : ""
                }`}
              onClick={() => handleChange(option.value)}
              disabled={currentSort === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
