"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";



type PaginationProps = {
    totalItems: number;
    pageSize: number
};

const Pagination = ({ totalItems, pageSize }: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(totalItems / pageSize);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (totalPages <= 1) return null; // No pagination needed if only one page

    return (
        <div className="flex items-center justify-center gap-4 mt-6  z-10">
            {/* Previous Button */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md hover:bg-slate-50/50 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft />
            </button>

            {/* Page Numbers */}
            <span className="text-sm font-medium">
                {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md hover:bg-slate-50/50 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default Pagination;