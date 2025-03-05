import { useEffect } from "react";

export function useOpenSearch(setSearchModalOpen) {
    useEffect(function () {

        const callBack = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault(); // Prevents the default browser "Save Page" action
                setSearchModalOpen(true)
            }
        }

        document.addEventListener("keydown", callBack)
        return () => document.removeEventListener("keydown", callBack)
    }, [setSearchModalOpen])
}