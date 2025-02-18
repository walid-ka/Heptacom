"use client"

import { getProjects } from "@/api/apiProjects";
import { useQuery } from "@tanstack/react-query"




export default function useProjects(search?: string) {
    const { data: allProjects, error, isPending } = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects({ search }),
    });

    return { allProjects, error, isPending };
}