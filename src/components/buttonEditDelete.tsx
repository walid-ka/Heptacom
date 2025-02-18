import React from 'react'


type ButtonEditDeleteProps = {
    icon: React.ReactNode;
    onClick: () => void;
    type?: "pencil" | "trash";
    text?: string;
}

const ButtonEditDelete = ({ icon, onClick, type, text }: ButtonEditDeleteProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center rounded-md gap-2 py-1  ${type === "pencil" ? "mb-1 hover:bg-yellow-500  text-yellow-500 " : "hover:bg-red-500 text-red-500 mt-1"}`}
        >

            {icon} {text}
        </button>
    )
}

export default ButtonEditDelete
