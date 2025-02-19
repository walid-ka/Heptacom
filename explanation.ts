// @ts-nocheck

//! src/spi/apiClient.ts

//! Fetch all clients, optionally filtering by search term
export async function getClients({ search = "" }: { search?: string } = {}) {
    // 👉 When a function is declared with the `async` keyword, it automatically returns a `Promise`.
    // 👉 We use `await` to pause execution until the `Promise` resolves.
    // 👉 If `await` receives a rejected `Promise`, it throws an error, which we handle with `try...catch`.

    try {
        // Send a GET request to the API with an optional search query
        // (?search=) This is a query parameter, meaning we are sending additional data (the search term) to the API.
        // ${encodeURIComponent(search)} This ensures that the search term is safely encoded for a URL. URLs cannot contain special characters like spaces, &, ?, #, etc. If we pass a raw search term into a URL, it could break the request. so encodeURIComponent() converts special characters into a safe format.
        const response = await fetch(`${API_CUSTOMER}?search=${encodeURIComponent(search)}`);

        // Check if response is unsuccessful, then throw an error
        if (!response.ok) throw new Error("Failed to fetch clients");

        // Parse response data as JSON. When we make an API request using fetch(), the response we get is not automatically in a format we can use. Instead, it’s a Response object. To access the actual data, we need to extract the JSON content from the response. response.json() Converts Text into a JavaScript Object
        const data = await response.json();

        // Return the 'data' field from the API response
        return data.data;
    } catch (error) {
        // Show error notification and log error to console
        toast.error("Failed to load clients!");
        console.error(error);

        // Return an empty array to avoid crashes in case of an error
        return [];
    }
}

//! Delete a client by ID
export async function deleteClient(clientId: string) {

    try {
        // Send a DELETE request to the API with the client ID in the request body
        const response = await fetch(API_CUSTOMER, {
            method: "DELETE", // HTTP method for deleting data
            headers: { "Content-Type": "application/json" }, // Specifying JSON format
            body: JSON.stringify({ id: clientId }), // Sending the client ID to be deleted
        });

        // Parse response as JSON
        const result = await response.json();

        // If the API responds with success, show a success notification
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            // Otherwise, show an error notification
            toast.error(result.message);
        }
    } catch (error) {
        // Handle network or other errors
        toast.error("Failed to delete client");
        console.error(error);
    }
}

//! Create a new client
export async function createClient(newClient: NewClientProps) {

    // First, we fetch the existing client list to check for duplicates.
    const clientList = await getClients();

    try {
        // Check if we are updating an existing client or creating a new one
        const isUpdate = !!newClient.id; // If `newClient.id` exists, we're updating

        // Ensure client name is unique (only when creating a new client)
        if (!isUpdate) {
            const nameExists = clientList.some(
                (client: Client) => client.name.toLowerCase() === newClient.name.toLowerCase()
            );

            // If a client with the same name exists, show an error and stop execution
            if (nameExists) {
                toast.error("Der Name muss eindeutig sein."); // "The name must be unique."
                return;
            }
        }

        // Send a POST request to create the client
        const response = await fetch(API_CUSTOMER, {
            method: "POST", // HTTP method for creating data
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newClient, // Spread operator to include all client properties
            }),
        });

        // Parse response as JSON
        const result = await response.json();

        // Show success or error notification based on API response
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        // Handle errors during client creation
        toast.error("Failed to create client");
        console.error(error);
    }
}

//! Update an existing client
export async function updateClient(updatedClient: NewClientProps) {

    try {
        // Send a PUT request to update the client
        const response = await fetch(API_CUSTOMER, {
            method: "PUT", // HTTP method for updating data
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...updatedClient, // Include all updated client properties
            }),
        });

        // Parse response as JSON
        const result = await response.json();

        // Show success or error notification based on API response
        if (result.status === "success") {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        // Handle errors during client update
        toast.error("Failed to update client");
        console.error(error);
    }
}

//! (Potential Future Function) Get a single client by ID
// 👉 This function is not yet implemented but can be added to fetch details of a specific client.



// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------


//! REACT QUEY

//! src/features/clients/ useClients - useCreateClient - useUpdateClient - useDeleteClient - useSingleClient

// React Query helps manage data fetching, caching, synchronization, and updating in your React application. 
// Instead of handling API requests manually with useEffect and state, React Query simplifies data fetching and caching

// Automatic Caching: Data is stored and reused to reduce API calls.
// Optimistic Updates : Makes the UI feel instant by assuming the request succeeds, then rolls back if it fails.
// Background Refetching : Data automatically updates when needed without manual intervention.
// Error Handling : Built-in error states make it easy to handle failures.
// Global Data Management : Removes the need for useState and useEffect for API requests.

//! Custom hook to fetch all clients with React Query
export default function useClients(search?: string) {
    // 👉 `useQuery` is used for fetching data it takes (queryKey, queryFn). It automatically caches and synchronizes the data.
    const { data: allClients, error, isPending } = useQuery({
        queryKey: ["clients"], // 🔑 Unique identifier for caching this query. When data for "clients" is fetched, it's stored in the cache. If another part of the app requests "clients", React Query serves the cached data instead of making another request.
        queryFn: () => getClients({ search }), // 📡 Function that fetches the clients from the API. If search is provided, it fetches filtered results.
    });

    return { allClients, error, isPending };

} // to use it call it in your page :  const { isPending, error, allClients } = useClients();



//! Custom hook to delete a client
export function useDeleteClient() {
    const queryClient = useQueryClient(); // 🔄 Provides access to the global query cache

    // useMutation Used for modifying data (POST, PUT, DELETE requests).
    // Unlike useQuery, which fetches data, useMutation is designed for performing actions.

    const { isPending: isDeleting, mutate: deleteClient } = useMutation({
        mutationFn: deleteClientApi, // 🚀 Calls the API function, which sends a DELETE request to delete a client
        onSuccess: () => {
            // ✅ After a successful delete, invalidate the query to refetch the clients list. This keeps the UI up-to-date.
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error) => {
            // ❌ Show an error message if deletion fails
            toast.error("An error occurred while deleting client");
            console.error(error);
        },
    });

    // isDeleting → Boolean to indicate if the delete operation is in progress.
    // deleteClient → Function that triggers the deletion. it will be used later in our app

    return { isDeleting, deleteClient };
}

//! Custom hook to create a new client
export function useCreateClient() {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createClient } = useMutation({
        mutationFn: createClientApi, // 📡 Calls the API function, which sends a POST request to create a client
        onSuccess: () => {
            // ✅ Invalidate the query to refresh the clients list
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error) => {
            // ❌ Show an error message if creation fails
            toast.error("An error occurred while creating client");
            console.error(error);
        },
    });

    // isCreating → Boolean to indicate if the create operation is in progress.
    // createClient → Function that triggers the creation. it will be used later in our app
    return { isCreating, createClient };
}

//! Custom hook to update an existing client
export function useUpdateClient() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateClient } = useMutation({
        mutationFn: updateClientApi, // 📡 Calls the API function, which sends a PUT request to update a client
        onSuccess: () => {
            // ✅ Invalidate the query to refresh the clients list
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error) => {
            // ❌ Show an error message if update fails
            toast.error("An error occurred while updating client");
            console.error(error);
        },
    });

    // isUpdating → Boolean to indicate if the create operation is in progress.
    // updateClient → Function that triggers the updating. it will be used later in our app
    return { isUpdating, updateClient };
}


// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------
// ---------------------------------- ---------------------------------- ---------------------------------- ---------------------------------- ----------------------------------

//! Delete Functionality + Confirmation Modal
//  we need ID


function ClientTable () {
const { isDeleting, deleteClient } = useDeleteClient();
const [selectedClient, setSelectedClient] = useState<string | null>(null);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [clientToDelete, setClientToDelete] = useState<NewClientProps | null>(null);


return (<div>Content</div>)

}
