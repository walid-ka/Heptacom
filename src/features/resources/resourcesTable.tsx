import { resources } from "@/lib/data";
import { EllipsisVertical } from "lucide-react";

export default function ResourceTable() {
    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border border-gray-600/50 bg-[#161616]">

                <thead>
                    <tr className="bg-gray-200 border text-gray-700">
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Kunde</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Projekt</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Typ</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Name</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Beschreibung</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Status</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Löschen am</th>
                        <th className="border border-gray-600/50  px-4 py-2 text-left text-sm">Snapshot</th>
                    </tr>
                </thead>

                <tbody>
                    {resources.map((resource, index) => {
                        let statusColor = "bg-gray-100";
                        if (resource.status === "Staging") statusColor = "text-yellow-500";
                        if (resource.status === "Temporary") statusColor = "text-blue-500";
                        if (resource.status === "Production") statusColor = "text-green-500";

                        return (
                            <tr key={index}>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm font-semibold">{resource.client}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{resource.projekt}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{resource.Typ}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{resource.name}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{resource.beschreibung}</td>
                                <td className={`border border-gray-600/50  px-4 py-2 text-sm font-semibold ${statusColor}`}>
                                    {resource.status}
                                </td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">{resource.LöschenAm}</td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm">
                                    {resource.snapshot ? "✅" : "❌"}
                                </td>
                                <td className="border border-gray-600/50  px-4 py-2 text-sm"><EllipsisVertical className="text-slate-500" /></td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
