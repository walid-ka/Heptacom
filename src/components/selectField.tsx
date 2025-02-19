import { FieldError } from "react-hook-form";

type SelectProps = {
    placeholder: string;
    options: { label: string; value: string }[];
    error?: FieldError;
    onChange: (selectedOption: { label: string; value: string }) => void;
};

const Select = ({ placeholder, options, error, onChange }: SelectProps) => {
    return (
        <div className="flex flex-col gap-1">
            <select
                onChange={(e) => {
                    const selected = options.find(option => option.value === e.target.value);
                    if (selected) onChange(selected);
                }}
                className={`border text-sm px-3 py-2 rounded-md bg-transparent focus:outline-none 
                ${error ? "border-red-600/50" : "border-gray-600/50"}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-600 text-sm">{error.message}</span>}
        </div>
    );
};

export default Select;
