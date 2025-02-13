import { X } from "lucide-react";
import React from "react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting: boolean;
};

export default function DeleteConfirmationModal({
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
  title,
  message,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-[#161616] p-6 rounded-lg shadow-md w-96 border border-gray-600/50 ">
        <div className="flex w-full justify-between ">
          <h2 className="text-xl font-semibold">{title} </h2>
          <button onClick={onCancel} type="button" className="text-gray-500 hover:text-white transition-all duration-150 ease-in-out">
            <X size={20} />
          </button>
        </div>
        <p className="mt-2 text-sm ">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded-md flex items-center justify-center  hover:bg-gray-300/90 h-8  gap-3  transition-all duration-150 ease-in-out"
          >
            Abbrechen
          </button>
          <button
            disabled={isDeleting}
            onClick={onConfirm}
            className="bg-red-500 flex items-center justify-center rounded-md hover:bg-red-600/90 h-8 px-4 py-2 text-sm gap-3 text-white transition-all duration-150 ease-in-out"
          >
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
}
