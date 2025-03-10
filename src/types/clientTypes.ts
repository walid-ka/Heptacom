

export type NewClientProps = {
    id?: string;
    name: string;
    blanket_amount?: number;
    blanket_amount_warning?: number;
    billing_comment?: string;
};

export type Client = {
    id?: string;
    name: string;
    blanket_amount?: number;
    blanket_amount_warning: number;
    billing_comment?: string;
};

export type ClientsTableProps = {
    allClients: NewClientProps[];
    clients?: NewClientProps[];
    onDeleteClient?: (id: string) => void;
};

export type CreateClientFormProps = {
    formOpen: (value: boolean) => void;
    clientToEdit?: NewClientProps | null;
    title: string;
    buttonText: string;
};