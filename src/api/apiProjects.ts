//! Fetch all Projects

import { API_PROJECT } from "@/lib/data";
import { NewProjectProps, ProjectType } from "@/types/projectTypes";
import toast from "react-hot-toast";

//! Fetch all Projects with optional search

export async function getProjects({ search = "" }: { search?: string } = {}) {
    try {
        const response = await fetch(`${API_PROJECT}?search=${encodeURIComponent(search)}`);
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json()

        return data.data;
    } catch (error) {
        toast.error("Fieled to load projects!");
        console.error(error);
        return [];
    }
}

//! Create Project
export async function createProject(newProject: NewProjectProps) {

    const projects = await getProjects();

    try {
        // Ensure name is unique (only when creating a new client)

        const nameExists = projects.some(
            (project: ProjectType) => project.name.toLowerCase() === newProject.name.toLowerCase()
        );
        if (nameExists) {
            toast.error("Der Name muss eindeutig sein.");
            return;
        }


        const response = await fetch(API_PROJECT,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newProject })
            })

        const result = await response.json();


        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }

    } catch (error) {
        toast.error("Failed to create project");
        console.error(error);
    }

}

//! Update Project
export async function updateProject() {



}

//! Delete Project
export async function deleteProject(projectId: string) {
    try {
        const response = await fetch(API_PROJECT, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: projectId })

        })

        const result = await response.json()

        if (result.status === "success") {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }


    } catch (error) {
        toast.error("Failed to delete client")
        console.error(error)
    }
};