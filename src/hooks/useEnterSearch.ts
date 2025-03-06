import { useEffect, RefObject } from "react";

export function useEnterSearch(callSearch: RefObject<HTMLInputElement | null>) {
    useEffect(() => {
        const callBack = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                callSearch.current?.focus();
            }
        };

        document.addEventListener("keydown", callBack);
        return () => document.removeEventListener("keydown", callBack);
    }, [callSearch]);
}
