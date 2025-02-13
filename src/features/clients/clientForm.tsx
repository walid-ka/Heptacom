import { useEffect, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useForm } from "react-hook-form";
import useCreateClient from "./useCreateClient";
import useUpdateClient from "./useUpdateClient";
import toast from "react-hot-toast";
import { NewClientProps } from "@/types/clientTypes";
import Button from "@/components/button";
import InputField from "@/components/inputField";
import HeaderCreateForm from "@/components/headerCreateForm";

type ClientFormProps = {
    title: string;
    formOpen: (open: boolean) => void;
    clientToEdit?: NewClientProps | null;
    buttonText?: string;
};

const ClientForm = ({ formOpen, title, clientToEdit, buttonText }: ClientFormProps) => {
    const { isCreating, createClient } = useCreateClient();
    const { isUpdating, updateClient } = useUpdateClient();
    const [isVisible, setIsVisible] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewClientProps>({
        defaultValues: clientToEdit || {
            name: "",
            email: "",
            phone_number: "",
            blanket_amount: 0,
            blanket_amount_warning: 0,
            billing_comment: "",
        }
    });

    useEffect(() => {
        if (clientToEdit) {
            setValue("name", clientToEdit.name);
            setValue("email", clientToEdit.email);
            setValue("phone_number", clientToEdit.phone_number);
            setValue("blanket_amount", clientToEdit.blanket_amount);
            setValue("blanket_amount_warning", clientToEdit.blanket_amount_warning);
            setValue("billing_comment", clientToEdit.billing_comment || "");
        }
    }, [clientToEdit, setValue]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => formOpen(false), 300); // Delay to match animation
    };

    const onSubmit = async (data: NewClientProps) => {
        try {
            if (clientToEdit) {
                if (!clientToEdit.id) {
                    throw new Error("Missing client ID for update.");
                }
                await updateClient({ id: clientToEdit.id, ...data });
            } else {
                await createClient(data);
            }
            handleClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten!");
            console.error(error);
        }
    };

    const formRef = useClickOutside(handleClose);

    return (
        <div className="fixed inset-0 flex justify-end">
            <div
                ref={formRef}
                className={`w-96 h-full bg-[#161616] border-l border-gray-500 shadow-md px-6 flex flex-col gap-4 
                    ${isVisible ? "animate-slide-in" : "animate-slide-out"}`}
            >
                <HeaderCreateForm formOpen={handleClose} title={title} />

                <form className="flex flex-col h-full gap-14 pt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <InputField type="text" placeholder="Name" registration={register("name", { required: "Name ist erforderlich" })} error={errors.name} />
                        <InputField type="email" placeholder="E-Mail" registration={register("email", { required: "E-Mail ist erforderlich" })} error={errors.email} />
                        <InputField type="text" placeholder="Telefonnummer" registration={register("phone_number", { required: "Telefonnummer ist erforderlich" })} error={errors.phone_number} />
                        <InputField type="number" placeholder="Pauschal Betrag" registration={register("blanket_amount", { required: "Pauschal Betrag ist erforderlich", min: { value: 1, message: "Muss mindestens 1 sein" } })} error={errors.blanket_amount} />
                        <InputField type="number" placeholder="Warn-Grenze" registration={register("blanket_amount_warning", { required: "Warn-Grenze ist erforderlich", min: { value: 1, message: "Muss mindestens 1 sein" } })} error={errors.blanket_amount_warning} />
                        <InputField type="text" placeholder="Kommentar" registration={register("billing_comment")} error={errors.billing_comment} />
                    </div>
                    <Button type="submit" isCreating={isCreating} isUpdating={isUpdating} buttonText={buttonText} openForm={formOpen} />
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
