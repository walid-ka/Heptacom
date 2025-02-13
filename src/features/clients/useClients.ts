"use client";

import { getClients } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";

export default function useClients(search: string) {
    const { data: allClients, error, isPending } = useQuery({
        queryKey: ["clients", search],
        queryFn: () => getClients({ search }),
    });

    return { allClients, error, isPending };
}


