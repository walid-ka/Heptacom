"use client"

import { useRef, useState } from "react";
import Button from "@/components/button";
import ClientTable from "@/features/clients/clientsTable";
import Spinner from "@/components/spinner";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import SearchModal from "@/components/searchModal";
import SortBy from "@/components/sortBy";
import { NewClientProps } from "@/types/clientTypes";
import useClients from "@/features/clients/useClients";
import ClientForm from "@/features/clients/clientForm";
import { Command, Search } from "lucide-react";
import { useEnterSearch } from "@/hooks/useEnterSearch";
import { useOpenSearch } from "@/hooks/useOpenSearch";


const PAGE_SIZE = 12;


export default function Page() {
  const [query, setQuery] = useState("");
  const { isPending, error, allClients } = useClients(query); //! All Clients
  const clientsNumber = allClients?.length;
  const callSearch = useRef<HTMLInputElement | null>(null)



  const [formOpen, setFormOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [clientToEdit, setClientToEdit] = useState<NewClientProps | null>(null);


  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "";

  const closeSearchModal = () => {
    setSearchModalOpen(false)
  }


  //! when u click on "Enter" it focus on the search input
  useEnterSearch(callSearch)

  //! when u click on "Command + S" it opens the Search Modal
  useOpenSearch(setSearchModalOpen)


  //! Filter Clients Based on Search Query
  const searchedClients = (allClients ?? []).filter((client: NewClientProps) =>
    client.name.toLowerCase().startsWith(query.toLowerCase())
  );



  //! Sorting services
  const [field, direction] = sortBy.includes("-") ? sortBy.split("-") : ["name", "asc"];
  const modifier = direction === "asc" || direction === "niedrig" ? 1 : -1;

  const sortFieldMap: Record<string, keyof NewClientProps> = {
    name: "name",
    PauschalBetrag: "blanket_amount",
  };

  const mappedField = sortFieldMap[field] || "name";

  const sortedClients = [...searchedClients].sort((a, b) => {
    if (!mappedField || sortBy === "all") return 0;
    const aValue = a[mappedField] ?? 0;
    const bValue = b[mappedField] ?? 0;
    return typeof aValue === "string" ? aValue.localeCompare(bValue) * modifier : (bValue - aValue) * modifier;
  });

  //! Paginate Sorted Results
  const paginatedClientList = sortedClients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (isPending) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error.message}</div>;


  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Kunden <span className="text-sm">({clientsNumber})</span>
        </h2>

        <div className="rounded-lg border flex items-center bg-[#161616] border-gray-600/50 p-1">
          <div>
            <input
              ref={callSearch}
              placeholder="Kunde suchen"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-sm w-[200px] bg-[#161616] mx-2 placeholder:text-gray-500 px-2 py-[6px] text-sm focus:outline-none"
            />
          </div>

          <div>
            <button
              className="flex items-center gap-2 px-2 text-white/50 hover:text-white transition-all duration-150 ease-in-out"
              onClick={() => setSearchModalOpen(!searchModalOpen)}
            >
              <Search size={20} />
              <span className="flex items-center"><Command size={13} />s</span>
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-600/50 mx-2"></div>

          <div>
            <SortBy
              options={[
                { label: "All", value: "all" },
                { value: "name-asc", label: "Name (A-Z)" },
                { value: "name-desc", label: "Name (Z-A)" },
                { value: "PauschalBetrag-asc", label: "niedrig (Pauschal Betrag)" },
                { value: "PauschalBetrag-desc", label: "hoch (Pauschal Betrag)" },
              ]}
            />
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-600/50 mx-2"></div>

          <div>
            <Button openForm={() => {
              setClientToEdit(null);
              setFormOpen(true);
            }} />
          </div>
        </div>

      </div>

      {allClients?.length === 0 ? (
        <div className="text-center mt-40 h-full text-gray-400">Kein Kunde gefunden</div>
      ) : (

        <ClientTable allClients={paginatedClientList} />
      )}

      {formOpen && (
        <ClientForm
          formOpen={setFormOpen}
          clientToEdit={clientToEdit}
          title={clientToEdit ? "Kunde bearbeiten" : "Neuen Kunden hinzufügen"}
          buttonText={clientToEdit ? "Speichern" : "Hinzufügen"}
        />
      )}
      <Pagination totalItems={sortedClients.length} pageSize={PAGE_SIZE} />

      {searchModalOpen && (
        <SearchModal closeSearchModal={closeSearchModal} />
      )}


    </div>
  );
}
