import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
    type: string;
    placeholder: string;
    error?: FieldError;
    registration: UseFormRegisterReturn;
};

const InputField = ({ type, placeholder, error, registration }: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-1 ">
            <input
                type={type}
                placeholder={placeholder}
                {...registration}
                className={`border text-sm  px-3 py-2 rounded-md bg-transparent focus:outline-none  ${error ? "border-red-600/50" : "border-gray-600/50"
                    }`}
            />
            {error && <span className="text-red-600 text-sm">{error.message}</span>}
        </div>
    );
};

export default InputField;
