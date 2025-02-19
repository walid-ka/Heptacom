import { createClient as createClientApi } from "@/api/apiClients"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export default function useCreateClient() {

    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createClient } = useMutation({
        mutationFn: createClientApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] }); // to refetch the clients list
        },
        onError: (error) => {
            toast.error("An error occurred while creating client");
            console.error(error);
        }
    })

    return { isCreating, createClient }

}