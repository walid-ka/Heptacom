"use client"

import useClickOutside from "@/hooks/useClickOutside"
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react"


type SearchModalProps = {
    closeSearchModal: () => void
}

const SearchModal = ({ closeSearchModal }: SearchModalProps) => {

    //! closing by "clicking outside the search"
    const dropdownRef = useClickOutside(closeSearchModal);

    //! Custom Hook to close by "Esc"
    useEscapeKey("Escape", closeSearchModal)


    //! the cursor will be focused once the searchModal is open
    const searchRef = useRef<HTMLInputElement | null>(null)

    useEffect(function () {
        searchRef.current?.focus();
    }, [])

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-start z-50">
            <div ref={dropdownRef} className="relative flex flex-col gap-5 bg-[#161616] p-6 rounded-lg shadow-md w-[50%] border border-gray-600/50 mt-40">

                <div className="flex  flex-col gap-5 items-center w-full">
                    <h3 className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
                        <Search size={20} className="text-white" /> Kunde suchen
                    </h3>

                    <span onClick={closeSearchModal} className="absolute top-4 right-4 py-1 px-2 text-sm text-white/50 rounded-lg border border-gray-600/50 hover:cursor-pointer hover:text-white transition-all ease-in-out duration-150">esc</span>
                    <input
                        placeholder="Kunde suchen"
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        // onClick={() => setSearchModalOpen(!searchModalOpen)}
                        ref={searchRef}
                        className="max-w-sm w-full bg-[#161616] placeholder:text-gray-500 px-2 py-[6px] border border-gray-600/50 rounded-md text-sm focus:outline-none"
                    /></div>

                <div>List of Searched client</div>
            </div>
        </div>
    )
}

export default SearchModal
