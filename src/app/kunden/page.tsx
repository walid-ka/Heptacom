"use client"

import { useState } from "react";
import Button from "@/components/button";
import ClientTable from "@/features/clients/clientsTable";
import Spinner from "@/components/spinner";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import SortBy from "@/components/sortBy";
import { NewClientProps } from "@/types/clientTypes";
import useClients from "@/features/clients/useClients";
import ClientForm from "@/features/clients/clientForm";


const PAGE_SIZE = 10;

export default function Page() {
  const [query, setQuery] = useState("");
  const { isPending, error, allClients } = useClients(query);

  const [formOpen, setFormOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<NewClientProps | null>(null);


  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "";



  //! Filter Clients Based on Search Query
  const searchedClients = (allClients ?? []).filter((client: NewClientProps) =>
    client.name.toLowerCase().includes(query.toLowerCase())
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
    <div className="flex flex-col gap-8">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
          Kunden <span className="text-sm">({allClients.length})</span>
        </h2>

        <div className="flex items-center gap-8">
          <input
            placeholder="Kunde suchen"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm w-[200px] bg-[#161616] placeholder:text-gray-500 px-2 py-[6px] border border-gray-600/50 rounded-md text-sm focus:outline-none"
          />

          <SortBy
            options={[
              { label: "All", value: "all" },
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "PauschalBetrag-asc", label: "niedrig (Pauschal Betrag)" },
              { value: "PauschalBetrag-desc", label: "hoch (Pauschal Betrag)" },
            ]}
          />

          <Button openForm={() => {
            setClientToEdit(null);
            setFormOpen(true);
          }} />

        </div>
      </div>

      {allClients.length === 0 ? (
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


    </div>
  );
}
