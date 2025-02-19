"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { NewClientProps } from "@/types/clientTypes";
import { NewProjectProps } from "@/types/projectTypes";

// Define the shape of our context state
interface GlobalStateContextProps {
    selectedItem: string | null;
    setSelectedItem: (itemId: string | null) => void;
    deleteModalOpen: boolean;
    setDeleteModalOpen: (open: boolean) => void;
    itemToDelete: NewClientProps | NewProjectProps | null;
    setItemToDelete: (item: NewClientProps | NewProjectProps | null) => void;
    itemToEdit: NewClientProps | NewProjectProps | null;
    setItemToEdit: (item: NewClientProps | NewProjectProps | null) => void;
    formOpen: boolean;
    setFormOpen: (open: boolean) => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<NewClientProps | NewProjectProps | null>(null);
    const [itemToEdit, setItemToEdit] = useState<NewClientProps | NewProjectProps | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    
    return (
        <GlobalStateContext.Provider value={{
            selectedItem, setSelectedItem,
            deleteModalOpen, setDeleteModalOpen,
            itemToDelete, setItemToDelete,
            itemToEdit, setItemToEdit,
            formOpen, setFormOpen
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
}
