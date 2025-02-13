import { projects } from "@/lib/data";
import { EllipsisVertical } from "lucide-react";

export default function ProjectTable() {
    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border border-gray-600/50 bg-[#161616]">

                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Kunde</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Name</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Hetzner Projekt ID</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Hetzner API Key</th>

                    </tr>
                </thead>


                <tbody>
                    {projects.map((project, index) => (
                        <tr
                            key={index}
                        >
                            <td className="border border-gray-600/50  px-4 py-2 text-sm font-semibold">{project.client}</td>
                            <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.name}</td>
                            <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.hetznerProjektID}</td>
                            <td className="border border-gray-600/50  px-4 py-2 text-sm">{project.hetznerAPIKey}</td>
                            <td className="border border-gray-600/50  px-4 py-2 text-sm"><EllipsisVertical className="text-slate-500" /></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
