//! Fetch all Projects

import { API_PROJECT } from "@/lib/data";
import toast from "react-hot-toast";

//! Fetch all Projects with optional search

export async function getProjects({ search = "" }: { search?: string } = {}) {
    try {
        const response = await fetch(`${API_PROJECT}?search=${encodeURIComponent(search)}`);
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json()
        console.log(data.data)

        return data.data;
    } catch (error) {
        toast.error("Fieled to load projects!");
        console.error(error);
        return [];
    }
}

//! Delete Project
export async function deleteProject() {

};

//! Create Project
export async function createProject() {

}

//! Update Project
export async function updateProject() {

}