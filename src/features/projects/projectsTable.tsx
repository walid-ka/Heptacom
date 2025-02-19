

import ButtonParams from "@/components/buttonParams";
import ParamsModal from "@/components/paramsModal";
import TableHeader from "@/components/tableHeader";
import { NewProjectProps, ProjectTableProps } from "@/types/projectTypes";
import useDeleteProject from "./useDeleteProject";
import DeleteConfirmationModal from "@/components/deleteConfirm";
import { useGlobalState } from "@/utils/contextProvider";



export default function ProjectTable({ allProjects, clients }: ProjectTableProps) {
    const { selectedItem, setSelectedItem, deleteModalOpen, setDeleteModalOpen, itemToDelete, setItemToDelete, itemToEdit, setItemToEdit, formOpen, setFormOpen } = useGlobalState()
    const { isDeleting, deleteProject } = useDeleteProject();



    // Open confirmation modal
    const confirmDeleteProject = (project: NewProjectProps) => {
        setItemToDelete(project);
        setDeleteModalOpen(true);
    };

    // Handle actual deletion
    const handleDeleteProject = () => {
        if (itemToDelete?.id) {
            deleteProject(itemToDelete.id);
            setDeleteModalOpen(false);
            setItemToDelete(null);
        } else {
            console.error("Project ID is undefined, cannot delete.");
        }
    };

    // Handle edit project
    const onUpdateProject = (project: NewProjectProps) => {
        setItemToEdit(project);
        setFormOpen(true);
    };

    const openParamsModal = (projectId: string) => {
        setSelectedItem(projectId);
    }

    const closeParamsModal = () => {
        setSelectedItem(null);
    }


    return (
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse border border-gray-600/50 bg-[#161616]">

                <thead>
                    <tr>
                        <TableHeader>Projekt Name</TableHeader>
                        <TableHeader>Kunde</TableHeader>
                        <TableHeader>Hetzner Projekt ID</TableHeader>
                        <TableHeader>Hetzner API Key</TableHeader>
                        <TableHeader>api_key_valid</TableHeader>
                        <TableHeader>archived_at</TableHeader>
                        <th className="border-b border-gray-600/50 px-4 py-2 text-center text-sm"></th>
                    </tr>
                </thead>


                <tbody>
                    {allProjects?.map((project) => {

                        const client = clients.find(client => client.id === project.customer_id);

                        return (

                            <tr key={project.id} >
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{project.name}</td>
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm font-semibold">{client ? client.name : "Unknown Client"}</td>
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{project.external_id}</td>
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{project.api_key}</td>
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{project.api_key_valid}</td>
                                <td className="border-b border-gray-600/50 px-4 py-4 text-sm">{project.archived_at ? project.archived_at : "_"}</td>
                                <td className="border-b border-gray-600/50 px-4 py-22">
                                    <div className="relative inline-block">
                                        <ButtonParams onClick={() => project.id && openParamsModal(project.id)} />


                                        {/* Params Modal */}
                                        {selectedItem === project.id && (
                                            <ParamsModal
                                                isOpen={true}
                                                onUpdateItem={() => onUpdateProject(project)}
                                                confirmDeleteItem={() => confirmDeleteProject(project)}
                                                closeModal={closeParamsModal}
                                            />

                                        )}


                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <DeleteConfirmationModal
                    isOpen={deleteModalOpen}
                    isDeleting={isDeleting}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteProject}
                    title={`Projekt "${itemToDelete.name}" löschen`}
                    itemName={itemToDelete.name}
                    deletedItem="Project"
                />
            )}
        </div>
    );
}
