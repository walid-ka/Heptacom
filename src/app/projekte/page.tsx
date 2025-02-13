"use client"


import { useState } from "react";
import Button from "@/components/button";
import ProjectTable from "@/features/projects/projectsTable";
import { projects } from "@/lib/data";

export default function Page() {

  const [formOpen, setFormOpen] = useState(false)
  const [projectsList, setProjectsList] = useState(projects);
  const projuctsNum = projectsList.length



  return (
    <div className="flex flex-col gap-8">

      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">Projekte <span className="text-sm">({projuctsNum})</span></h2>
        <Button openForm={setFormOpen} />
      </div>

      <ProjectTable />
    </div>
  );
}