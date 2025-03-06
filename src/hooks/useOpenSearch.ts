import { useEffect } from "react";

export function useOpenSearch(setSearchModalOpen: (open: boolean) => void) {
    useEffect(() => {

        const callBack = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault(); // Prevents the default browser "Save Page" action
                setSearchModalOpen(true);
            }
        }

        document.addEventListener("keydown", callBack)
        return () => document.removeEventListener("keydown", callBack)
    }, [setSearchModalOpen])
}
