"use client"


import { useEffect, useState } from "react";
import Button from "@/components/button";
import ProjectTable from "@/features/projects/projectsTable";
import useProjects from "@/features/projects/useProjects";
import useClients from "@/features/clients/useClients";
import Spinner from "@/components/spinner";

export default function Page() {
  const [query, setQuery] = useState("");
  const { allProjects, error, isPending } = useProjects(query);
  const { allClients } = useClients();
  const projectsNumber = allProjects?.length

  const [formOpen, setFormOpen] = useState(false)

  //! Filter Projects Based on Search Query
  const searchedProjects = (allProjects ?? []).filter(project => project.name.toLowerCase().includes(query.toLowerCase()));

  //! fetch only id and clients name
  const [clients, setClients] = useState([]);
  useEffect(() => {
    if (allClients) {
      setClients(allClients.map((client) => ({ id: client.id, name: client.name })));
    }
  }
    , [allClients]);


  if (isPending) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="flex flex-col gap-8">

      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">Projekte <span className="text-sm">({projectsNumber})</span></h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Projekt suchen"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="max-w-sm w-[200px] bg-[#161616] placeholder:text-gray-500 px-2 py-[6px] border border-gray-600/50 rounded-md text-sm focus:outline-none" />
          <Button openForm={setFormOpen} />
        </div>
      </div>



      {allProjects?.length === 0 ? (
        <div className="text-center mt-40 h-full text-gray-400">Keine Projekte gefunden</div>
      ) : (

        <ProjectTable allProjects={searchedProjects} clients={clients} />
      )}
    </div>
  );
}