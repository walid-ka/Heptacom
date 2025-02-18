import { API_CUSTOMER } from "@/lib/data";
import { NewClientProps } from "@/types/clientTypes";
import toast from "react-hot-toast";

//! Fetch all clients with optional search
export async function getClients({ search = "" }: { search?: string } = {}) {
    try {
        const response = await fetch(`${API_CUSTOMER}?search=${encodeURIComponent(search)}`);
        if (!response.ok) throw new Error("Failed to fetch clients");

        const data = await response.json();

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
        const response = await fetch(API_CUSTOMER, {
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

        const response = await fetch(API_CUSTOMER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newClient
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
        const response = await fetch(API_CUSTOMER, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...updatedClient,
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

//! Get single client