"use client"

import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinner() {
    const [loading] = useState(true);

    return (
        <div className="sweet-loading h-[60vh] w-full flex justify-center items-center">
            <BeatLoader
                color={"#486ebe"}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner;