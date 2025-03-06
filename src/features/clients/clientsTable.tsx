
import { ClientsTableProps, NewClientProps } from "@/types/clientTypes";
import DeleteConfirmationModal from "@/components/deleteConfirm";
import useDeleteClient from "./useDeleteClient";
import { formatCurrency } from "@/utils/helpers";
import ClientForm from "./clientForm";;
import ButtonParams from "@/components/buttonParams";
import ParamsModal from "@/components/paramsModal";
import TableHeader from "@/components/tableHeader";
import { useGlobalState } from "@/provider/contextProvider";

export default function ClientTable({ allClients }: ClientsTableProps) {

    const { selectedItem, setSelectedItem, deleteModalOpen, setDeleteModalOpen, itemToDelete, setItemToDelete, itemToEdit, setItemToEdit, formOpen, setFormOpen } = useGlobalState()
    const { isDeleting, deleteClient } = useDeleteClient();



    // Open confirmation modal
    const confirmDeleteClient = (client: NewClientProps) => {
        setItemToDelete(client);
        setDeleteModalOpen(true);
    };

    // Handle actual deletion
    const handleDeleteClient = () => {
        if (itemToDelete?.id) {
            deleteClient(itemToDelete.id);
            setDeleteModalOpen(false);
            setItemToDelete(null);
        } else {
            console.error("Client ID is undefined, cannot delete.");
        }
    };

    // Handle edit client
    const onUpdateClient = (client: NewClientProps) => {
        setItemToEdit(client);
        setFormOpen(true);
    };

    const openParamsModal = (clientId: string) => {
        setSelectedItem(clientId);
    }

    const closeParamsModal = () => {
        setSelectedItem(null);
    }

    return (
        <div className="overflow-x-auto rounded-md ">
            <table className="w-full border-collapse border bg-[#161616] border-gray-600/50 ">
                <thead >
                    <tr >
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Pauschal Betrag</TableHeader>
                        <TableHeader>Warn-Grenze</TableHeader>
                        <TableHeader>Kommentar</TableHeader>
                        <th className="border-b border-gray-600/50 px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {allClients.map((client) => (
                        <tr key={client.id || client.name}>
                            <td className="border-b border-gray-600/50 px-4 py-4 text-sm font-semibold cursor-pointer transition-all ease-in-out duration-150">{client.name}</td>
                            <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{client.blanket_amount ? formatCurrency(client.blanket_amount) : "—"}</td>
                            <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{client.blanket_amount_warning ? formatCurrency(client.blanket_amount_warning) : "—"}</td>
                            <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{client.billing_comment || "—"}</td>

                            <td className="border-b border-gray-600/50 px-4 py-4">
                                <div className="relative inline-block">
                                    <ButtonParams onClick={() => client.id && openParamsModal(client.id)} />

                                    {/*  Why Do We Use () => Instead of openParamsModal(client.id) Directly?
                                    If we used onClick={openParamsModal(client.id)}, it would execute immediately when the component renders.
                                    Wrapping it in () => openParamsModal(client.id) ensures it only runs when clicked. 

                                    solution 1 : <ButtonParams onClick={() => client.id && openParamsModal(client.id)} /> client.id && this ensures openParamsModal only runs if client.id is defined.
                                    solution 2 : <ButtonParams onClick={() => openParamsModal(client.id ?? "")} />  If it's valid for client.id to default to an empty string, we can use client.id ?? "".
                                    solution 3 : go to id: string; instead of id?: string; in the NewClientProps type.
                                */}


                                    {/* Params Modal */}
                                    {selectedItem === client.id && (
                                        <ParamsModal
                                            isOpen={true}
                                            onUpdateItem={() => onUpdateClient(client)}
                                            confirmDeleteItem={() => confirmDeleteClient(client)}
                                            closeModal={closeParamsModal}
                                        />

                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalOpen}
                    isDeleting={isDeleting}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteClient}
                    title={`Kunde "${itemToDelete.name}" löschen`}
                    itemName={itemToDelete.name}
                    deletedItem="Client"
                />
            )}

            {/* Create and Edit Client Form */}
            {formOpen && (
                <ClientForm
                    title="Kunde bearbeiten"
                    formOpen={setFormOpen}
                    clientToEdit={itemToEdit}
                    buttonText="Speichern"
                />
            )}


        </div>
    );
}
