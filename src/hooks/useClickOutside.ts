import { useEffect, useRef } from "react";

/**
 * Custom hook to detect clicks outside a given component and trigger a callback.
 * @param callback - Function to call when a click outside is detected.
 */
export default function useClickOutside(callback: () => void) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback]);

    return ref;
}
