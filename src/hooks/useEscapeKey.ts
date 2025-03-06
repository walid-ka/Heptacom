"use client"
import { useEffect } from "react"

export function useEscapeKey(key: string, action: () => void) {

    useEffect(() => {

        const callBack = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()) action()
        }

        document.addEventListener("keydown", callBack)

        return function () {
            document.removeEventListener("keydown", callBack)
        }

    }, [action, key])
}