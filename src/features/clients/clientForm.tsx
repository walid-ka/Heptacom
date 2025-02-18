"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useForm } from "react-hook-form";
import useCreateClient from "./useCreateClient";
import useUpdateClient from "./useUpdateClient";
import toast from "react-hot-toast";
import { NewClientProps } from "@/types/clientTypes";
import { useEffect } from "react";
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewClientProps>({
        defaultValues: clientToEdit || {
            name: "",
            blanket_amount: 0,
            blanket_amount_warning: 0,
            billing_comment: "",
        }
    });

    // Pre-fill form fields if editing an existing client
    useEffect(() => {
        if (clientToEdit) {
            setValue("blanket_amount", clientToEdit.blanket_amount);
            setValue("blanket_amount_warning", clientToEdit.blanket_amount_warning);
            setValue("billing_comment", clientToEdit.billing_comment || "");
        }
    }, [clientToEdit, setValue]);

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
            formOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Fehler beim Speichern des Kunden!");
                console.error(error);
            } else {
                toast.error("Ein unbekannter Fehler ist aufgetreten!");
                console.error("Unknown error:", error);
            }
        }
    };


    // Close form when clicking outside
    const formRef = useClickOutside(() => formOpen(false));

    return (
        <div className="fixed inset-0 flex justify-end z-50">
            <div ref={formRef} className={`w-96 h-full bg-[#161616] border-l border-gray-500 shadow-md px-6 flex flex-col gap-4 `}>
                <HeaderCreateForm formOpen={formOpen} title={title} />

                <form className="flex flex-col h-full gap-14 pt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <InputField

                            type="text"
                            placeholder="Name"
                            registration={register("name", { required: "Name ist erforderlich" })}
                            error={errors.name}
                        />
                        <InputField

                            type="number"
                            placeholder="Pauschal Betrag"
                            registration={register("blanket_amount", {
                                required: "Pauschal Betrag ist erforderlich",
                                min: { value: 1, message: "Muss mindestens 1 sein" }
                            })}
                            error={errors.blanket_amount}
                        />
                        <InputField

                            type="number"
                            placeholder="Warn-Grenze"
                            registration={register("blanket_amount_warning", {
                                required: "Warn-Grenze ist erforderlich",
                                min: { value: 1, message: "Muss mindestens 1 sein" }
                            })}
                            error={errors.blanket_amount_warning}
                        />
                        <InputField

                            type="text"
                            placeholder="Kommentar"
                            registration={register("billing_comment")}
                            error={errors.billing_comment}
                        />
                    </div>

                    {/* Save Button */}
                    <Button
                        type="submit"
                        isCreating={isCreating}
                        isUpdating={isUpdating}
                        buttonText={buttonText}
                        openForm={formOpen}
                    />
                </form>
            </div>
        </div >
    );
};

export default ClientForm;
