"use client";

import { ClientsTableProps, NewClientProps } from "@/types/clientTypes";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/deleteConfirm";
import useDeleteClient from "./useDeleteClient";
import { formatCurrency } from "@/utils/helpers";
import ClientForm from "./clientForm";
import ButtonEditDelete from "@/components/buttonEditDelete";

export default function ClientTable({ allClients }: ClientsTableProps) {
    const { isDeleting, deleteClient } = useDeleteClient();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<NewClientProps | null>(null);
    const [clientToEdit, setClientToEdit] = useState<NewClientProps | null>(null);
    const [formOpen, setFormOpen] = useState(false);

    // Open confirmation modal
    const confirmDeleteClient = (client: NewClientProps) => {
        setClientToDelete(client);
        setDeleteModalOpen(true);
    };

    // Handle actual deletion
    const handleDeleteClient = () => {
        if (clientToDelete?.id) {
            deleteClient(clientToDelete.id);
            setDeleteModalOpen(false);
            setClientToDelete(null);
        } else {
            console.error("Client ID is undefined, cannot delete.");
        }
    };

    // Handle edit client
    const onUpdateClient = (client: NewClientProps) => {
        setClientToEdit(client);
        setFormOpen(true);
    };

    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border bg-[#161616] border-gray-600/50">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">Name</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">E-Mail</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">Telefonnummer</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">Pauschal Betrag</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">Warn-Grenze</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-left text-sm">Kommentar</th>
                        <th className="border border-gray-600/50 px-4 py-2 text-center text-sm">Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {allClients.map((client) => (
                        <tr key={client.id || client.name}>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm font-semibold">{client.name}</td>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm">{client.email || "—"}</td>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm">{client.phone_number || "—"}</td>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm">{client.blanket_amount ? formatCurrency(client.blanket_amount) : "—"}</td>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm">{client.blanket_amount_warning ? formatCurrency(client.blanket_amount_warning) : "—"}</td>
                            <td className="border border-gray-600/50 px-4 py-2 text-sm">{client.billing_comment || "—"}</td>
                            <td className="flex justify-center border-b border-gray-600/50 px-4 py-2">
                                <ButtonEditDelete onClick={() => onUpdateClient(client)} icon={<Pencil size={15} />} type={"pencil"} />
                                <ButtonEditDelete onClick={() => confirmDeleteClient(client)} icon={<Trash size={15} />} type={"trash"} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {clientToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalOpen}
                    isDeleting={isDeleting}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteClient}
                    title={`Kunde "${clientToDelete.name}" löschen`}
                    message={`Sind Sie sicher, dass Sie "${clientToDelete.name}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`}
                />
            )}

            {/* Create and Edit Client Form */}
            {formOpen && (
                <ClientForm
                    title="Kunde bearbeiten"
                    formOpen={setFormOpen}
                    clientToEdit={clientToEdit}
                    buttonText="Speichern"
                />
            )}
        </div>
    );
}
