import { X } from 'lucide-react'
import React from 'react'

type HeaderCreateFormProps = {
    title: string;
    formOpen: (open: boolean) => void;
}

const HeaderCreateForm = ({ title, formOpen }: HeaderCreateFormProps) => {
    return (
        <div className="flex w-full justify-between pt-16 pb-8 px-5">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
                onClick={() => formOpen(false)}
                type="reset"
                className="text-gray-500 hover:text-white transition-all duration-150"
            >
                <X size={20} />
            </button>
        </div>
    )
}

export default HeaderCreateForm
