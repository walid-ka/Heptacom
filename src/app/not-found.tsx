import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-6 h-[50vh]">
            <h1 className="text-3xl font-semibold">Seite nicht gefunden!</h1>
            <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md  disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground  border border-[#51AEE5] hover:bg-[#51AEE5]  px-2 py-2 sm:h-10 sm:px-4 sm:py-2"
                href="/"
            >
                Zurück zur Homeseite
            </Link>
        </div>
    );
};

export default NotFound;