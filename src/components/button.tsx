"use client";

import { ButtonProps } from "@/types/buttonTypes";
import { Plus } from "lucide-react";




export default function Button({ openForm, type, isCreating, isUpdating, buttonText }: ButtonProps) {
  return (
    <button
      disabled={isCreating || isUpdating}
      type={type}
      onClick={() => openForm(true)}
      className={`px-4 py-[6px] rounded-md flex justify-center items-center gap-4 transition-all duration-150 ease-in-out ${isCreating || isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500/40 hover:bg-blue-600 border border-blue-500 text-white"
        }`}
    >
      <Plus size={20} /> {buttonText}
    </button>
  );
}
