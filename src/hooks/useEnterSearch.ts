import { useEffect } from "react";

export function useEnterSearch(callSearch) {
    useEffect(function () {

        const callBack = (e) => {
            if (e.code === "Enter") {
                callSearch.current?.focus();
            }
        }

        document.addEventListener("keydown", callBack)
        return () => document.removeEventListener("keydown", callBack)
    }, [callSearch])

}