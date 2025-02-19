//! Project Type

export type Client = {
    id: string;
    name: string;
};

export type NewProjectProps = {
    id?: string;
    name: string;
    external_id: string;
    api_key: string;
    api_key_valid: number;
    customer_id: string;
    archived_at?:  string;
}

export type ProjectType = {
    id?: string;
    name: string;
    external_id: string;
    api_key: string;
    api_key_valid: number;
    customer_id: string;
    archived_at?:  string;
}

export type CreateProjectFormProps = {
    formOpen: (value: boolean) => void;
    projectToEdit?: NewProjectProps | null;
    title: string;
    buttonText: string;
    clients?: Client[]
};

export type ProjectTableProps = {
    allProjects: ProjectType[];
    clients: Client[];
};