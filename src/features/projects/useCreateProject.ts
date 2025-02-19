import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject as createProjectApi } from "@/api/apiProjects"
import toast from "react-hot-toast";


export default function useCreateProject() {

    const queryClient = useQueryClient();


    const { isPending: isCreating, mutate: createProject } = useMutation({
        mutationFn: createProjectApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] }); // to refetch the projects list
        },
        onError: (error) => {
            toast.error("An error occurred while creating project");
            console.error(error);
        }
    })

    return { isCreating, createProject }
}