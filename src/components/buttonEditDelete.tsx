import { ButtonEditDeleteProps } from '@/types/buttonTypes'
import React from 'react'




const ButtonEditDelete = ({ icon, onClick, type, text }: ButtonEditDeleteProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full hover:text-white text-sm transition-all duration-150 ease-in-out flex items-center justify-center rounded-md gap-2 py-1  ${type === "pencil" ? "mb-1 hover:bg-yellow-500  text-yellow-500 " : "hover:bg-red-500 text-red-500 mt-1"}`}
        >

            {icon} {text}
        </button>
    )
}

export default ButtonEditDelete
