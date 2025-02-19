import { deleteProject as deleteProjectApi } from "@/api/apiProjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteProject() {

    const queryClient = useQueryClient()

    const { isPending: isDeleting, mutate: deleteProject } = useMutation({
        mutationFn: deleteProjectApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: (error) => {
            toast.error("An error occurred while deleting client");
            console.error(error)
        }
    })

    return { isDeleting, deleteProject }

}