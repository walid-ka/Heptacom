import { Pencil, Trash2 } from "lucide-react"
import ButtonEditDelete from "./buttonEditDelete"
import useClickOutside from "@/hooks/useClickOutside";


const ParamsModal = ({ isOpen, onUpdateItem, confirmDeleteItem, closeModal }) => {
    const dropdownRef = useClickOutside(closeModal);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-full top-0 mr-4 w-[130px] bg-[#2E2E2E] border border-gray-600/50 rounded-md z-20"
        >
            <div className="flex w-full flex-col items-center py-1 px-1">
                <ButtonEditDelete onClick={onUpdateItem} icon={<Pencil size={15} />} type="pencil" text="Bearbeiten" />
                <div className="w-full border-t border-gray-400"></div>
                <ButtonEditDelete onClick={confirmDeleteItem} icon={<Trash2 size={15} />} type="trash" text="Löschen" />
            </div>
        </div>
    );
};



export default ParamsModal
