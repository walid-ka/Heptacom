"use client";

import { ClientsTableProps, NewClientProps } from "@/types/clientTypes";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/deleteConfirm";
import useDeleteClient from "./useDeleteClient";
import { formatCurrency } from "@/utils/helpers";
import ClientForm from "./clientForm";;
import ButtonParams from "@/components/buttonParams";
import ParamsModal from "@/components/paramsModal";

export default function ClientTable({ allClients }: ClientsTableProps) {
    const { isDeleting, deleteClient } = useDeleteClient();
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
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

    const openParamsModal = (clientId: string) => {
        setSelectedClient(clientId);
    }

    const closeParamsModal = () => {
        setSelectedClient(null);
    }

    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border bg-[#161616] border-gray-600/50">
                <thead>
                    <tr>
                        <th className="border-b border-gray-600/50 px-4 py-5 text-left text-md">Name</th>
                        <th className="border-b border-gray-600/50 px-4 py-5 text-left text-md">Pauschal Betrag</th>
                        <th className="border-b border-gray-600/50 px-4 py-5 text-left text-md">Warn-Grenze</th>
                        <th className="border-b border-gray-600/50 px-4 py-5 text-left text-md">Kommentar</th>
                        <th className="border-b border-gray-600/50 px-4 py-2 text-center text-sm"></th>
                    </tr>
                </thead>
                <tbody>
                    {allClients.map((client) => (
                        <tr key={client.id || client.name} >
                            <td className="border-b border-gray-600/50 px-4 py-2 text-sm font-semibold">{client.name}</td>
                            <td className="border-b border-gray-600/50 px-4 py-2 text-sm">{client.blanket_amount ? formatCurrency(client.blanket_amount) : "—"}</td>
                            <td className="border-b border-gray-600/50 px-4 py-2 text-sm">{client.blanket_amount_warning ? formatCurrency(client.blanket_amount_warning) : "—"}</td>
                            <td className="border-b border-gray-600/50 px-4 py-2 text-sm">{client.billing_comment || "—"}</td>

                            <td className="relative flex justify-center border-b border-gray-600/50 px-4 py-2">
                                <ButtonParams onClick={() => client.id && openParamsModal(client.id)} />

                                {/*  Why Do We Use () => Instead of openParamsModal(client.id) Directly?
                                    If we used onClick={openParamsModal(client.id)}, it would execute immediately when the component renders.
                                    Wrapping it in () => openParamsModal(client.id) ensures it only runs when clicked. 

                                    solution 1 : <ButtonParams onClick={() => client.id && openParamsModal(client.id)} /> client.id && this ensures openParamsModal only runs if client.id is defined.
                                    solution 2 : <ButtonParams onClick={() => openParamsModal(client.id ?? "")} />  If it's valid for client.id to default to an empty string, we can use client.id ?? "".
                                    solution 3 : go to id: string; instead of id?: string; in the NewClientProps type.
                                */}

                                {/* Params Modal */}
                                {selectedClient === client.id && (
                                    <ParamsModal
                                        isOpen={true}
                                        onUpdateClient={() => onUpdateClient(client)}
                                        confirmDeleteClient={() => confirmDeleteClient(client)}
                                        closeModal={closeParamsModal}
                                    />

                                )}
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
