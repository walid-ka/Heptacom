import { Pencil, Trash2 } from "lucide-react"
import ButtonEditDelete from "./buttonEditDelete"
import useClickOutside from "@/hooks/useClickOutside";


const ParamsModal = ({ isOpen, onUpdateClient, confirmDeleteClient, closeModal }) => {

    if (!isOpen) return null;
    const dropdownRef = useClickOutside(closeModal);


    return (
        <div ref={dropdownRef} className="absolute w-[130px] top-2 right-28 bg-[#2E2E2E] border border-gray-600/50 rounded-md z-20">
            <div className="flex w-full flex-col items-center py-1 px-1">
                <ButtonEditDelete onClick={onUpdateClient} icon={<Pencil size={15} />} type={"pencil"} text="Update" />
                <div className="w-[130px] border-t"></div>
                <ButtonEditDelete onClick={confirmDeleteClient} icon={<Trash2 size={15} />} type={"trash"} text="Delete" />
            </div>
        </div>
    );
};


export default ParamsModal
