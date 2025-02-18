import ButtonEditDelete from "@/components/buttonEditDelete";
import { Pencil, Trash } from "lucide-react";


export default function ProjectTable({ allProjects, clients }) {

    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border border-gray-600/50 bg-[#161616]">

                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Projekt Name</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Kunde</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Hetzner Projekt ID</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Hetzner API Key</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">api_key_valid</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">archived_at</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-center text-sm">Aktionen</th>
                    </tr>
                </thead>


                <tbody>
                    {allProjects?.map((project) => {

                        const client = clients.find(client => client.id === project.customer_id);

                        return (

                            <tr
                                key={project.id}
                            >
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.name}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm font-semibold">{client ? client.name : "Unknown Client"}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.external_id}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.api_key}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.api_key_valid}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.archived_at ? project.archived_at : "_"}</td>
                                <td className="flex justify-center border-b border-gray-600/50 px-4 py-2">
                                    <ButtonEditDelete onClick={() => onUpdateClient(client)} icon={<Pencil size={15} />} type={"pencil"} />
                                    <ButtonEditDelete onClick={() => confirmDeleteClient(client)} icon={<Trash size={15} />} type={"trash"} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
