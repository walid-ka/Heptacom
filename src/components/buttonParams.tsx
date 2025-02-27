import { ButtonParamsProps } from "@/types/buttonTypes"
import { EllipsisVertical } from "lucide-react"



const ButtonParams = ({ onClick }: ButtonParamsProps) => {
    return (
        <button
            onClick={onClick} // Calls the function passed as a prop
            className="cursor-pointer hover:text-white border transition-all duration-150 ease-in-out rounded-md mr-2 px-2 py-1 border-gray-500/30 bg-gray-500/30 hover:bg-gray-500">
            <EllipsisVertical size={15} />
        </button>
    )
}

export default ButtonParams
