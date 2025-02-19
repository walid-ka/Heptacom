import { DeleteConfirmationModalProps } from "@/types/deleteConfirmationTypes";
import { X } from "lucide-react";
import React, { useState } from "react";



export default function DeleteConfirmationModal({
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
  title,
  itemName,
  deletedItem
}: DeleteConfirmationModalProps) {

  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="flex flex-col gap-5 bg-[#161616] p-6 rounded-lg shadow-md w-96 border border-gray-600/50 ">
        <div className="flex w-full justify-between ">
          <h2 className="text-xl font-semibold">{title} </h2>
          <button onClick={onCancel} type="button" className="text-gray-500 hover:text-white transition-all duration-150 ease-in-out">
            <X size={20} />
          </button>
        </div>
        <p className="mt-2 text-sm">
          Sind Sie sicher, dass Sie <span className="text-red-500 font-bold">**{itemName}**</span> löschen möchten?
          <br />
          Diese Aktion kann nicht rückgängig gemacht werden.
          <br /> 
          <br /> 
          {deletedItem === "Client" ? (<>Alle zugehörigen <span className="text-red-500 font-bold">Projekte</span> werden ebenfalls gelöscht.</>) : ("")}
        </p>

        {/* Checkbox Confirmation */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
            className="w-4 h-4 accent-red-500 cursor-pointer"
          />

          <label htmlFor="confirmDelete" className="text-sm text-gray-300">
            Ich habe gelesen und stimme zu
          </label>
        </div>


        {/* Action Buttons */}
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded-md flex items-center justify-center  hover:bg-gray-300/90 h-8  gap-3  transition-all duration-150 ease-in-out"
          >
            Abbrechen
          </button>
          <button
            disabled={!isChecked || isDeleting}
            onClick={onConfirm}
            className={`flex items-center justify-center rounded-md h-8 px-4 py-2 text-sm gap-3 text-white transition-all duration-150 ease-in-out ${isChecked ? "bg-red-500 hover:bg-red-600/90" : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
}
