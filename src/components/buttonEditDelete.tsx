import React from 'react'


type ButtonEditDeleteProps = {
    icon: React.ReactNode;
    onClick: () => void;
    type?: "pencil" | "trash";
}

const ButtonEditDelete = ({ icon, onClick, type }: ButtonEditDeleteProps) => {
    return (
        <button
            onClick={onClick}
            className={` hover:text-white border transition-all duration-150 ease-in-out rounded-md mr-2 px-2 py-1 ${type === "pencil" ? "border-yellow-500/50  bg-yellow-500/30  hover:bg-yellow-500 " : "border-red-500 border bg-red-500/30  hover:bg-red-500"}`}
        >

            {icon}
        </button>
    )
}

export default ButtonEditDelete
