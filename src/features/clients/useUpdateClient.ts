import { updateClient as updateClientApi } from "@/api/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateClient() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateClient } = useMutation({
        mutationFn: updateClientApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error) => {
            toast.error("An error occurred while updating client");
            console.error(error);
        },
    });

    return { isUpdating, updateClient };
}

export default useUpdateClient;
