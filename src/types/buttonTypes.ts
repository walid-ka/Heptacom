export type ButtonProps = {
    type?: "button" | "submit" | "reset";
    buttonText?: string;
    isCreating?: boolean;
    isUpdating?: boolean;
    openForm: (value: boolean) => void;
};

export type ButtonEditDeleteProps = {
    icon: React.ReactNode;
    onClick: () => void;
    type?: "pencil" | "trash";
    text?: string;
}

export type ButtonParamsProps = {
    onClick: () => void; // Function type: It must be a function that takes no arguments and returns nothing (void)
}
