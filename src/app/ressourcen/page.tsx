import ResourceTable from "@/features/resources/resourcesTable";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">

      <h2 className="text-2xl font-bold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">Ressourcen</h2>
      <ResourceTable />

    </div>
  );
}