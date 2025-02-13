import { API_URL } from "@/lib/data";
import { NewClientProps } from "@/types/clientTypes";
import toast from "react-hot-toast";

//! Fetch all clients with optional search
export async function getClients({ search = "" }: { search?: string } = {}) {
    try {
        const response = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`);
        if (!response.ok) throw new Error("Failed to fetch clients");

        const data = await response.json();
        console.log(data.data);
        return data.data;
    } catch (error) {
        toast.error("Failed to load clients!");
        console.error(error);
        return [];
    }
}

//! Delete client
export async function deleteClient(clientId: string) {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: clientId }),
        });

        const result = await response.json();
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        toast.error("Failed to delete client");
        console.error(error);
    }
};

//! Create client
export async function createClient(newClient: NewClientProps) {
    const clientList = await getClients();
    try {
        // Check if updating or creating
        const isUpdate = !!newClient.id;

        // Ensure name is unique (only when creating a new client)
        if (!isUpdate) {
            const nameExists = clientList.some(
                (client) => client.name.toLowerCase() === newClient.name.toLowerCase()
            );
            if (nameExists) {
                toast.error("Der Name muss eindeutig sein.");
                return;
            }
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newClient,
                email: newClient.email,
                phone_number: newClient.phone_number,
            }),
        });

        const result = await response.json();
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        toast.error("Failed to create client");
        console.error(error);
    }
}

//! Update client
export async function updateClient(updatedClient: NewClientProps) {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...updatedClient,
                email: updatedClient.email,
                phone_number: updatedClient.phone_number,
            }),
        });

        const result = await response.json();
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        toast.error("Failed to update client");
        console.error(error);
    }
}