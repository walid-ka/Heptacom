export type NewClientProps = {
    id?: string;
    name: string;
    email: string;
    phone_number: string;
    blanket_amount?: number;
    blanket_amount_warning?: number;
    billing_comment?: string;
};

export type Client = {
    id?: string;
    name: string;
    email: string;
    phone_number: string;
    blanket_amount: number;
    blanket_amount_warning: number;
    billing_comment?: string;
};

export type ClientsTableProps = {
    allClients: NewClientProps[];
    clients: NewClientProps[];
    onDeleteClient: (id: string) => void;
};

export type CreateClientFormProps = {
    formOpen: (value: boolean) => void;
    addOrUpdateClient: (client: NewClientProps) => void;
    clientToEdit?: NewClientProps | null;
    title: string;
    buttonText: string;
};
