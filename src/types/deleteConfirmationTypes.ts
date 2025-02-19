export type DeleteConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    itemName: string;
    isDeleting: boolean;
    deletedItem: "Client" | "Project" | "Resource"
};