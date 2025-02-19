import HeaderCreateForm from "@/components/headerCreateForm";
import InputField from "@/components/inputField";
import Select from "@/components/selectField";
import useClickOutside from "@/hooks/useClickOutside";
import { useForm } from "react-hook-form";
import Button from "@/components/button";
import toast from "react-hot-toast";
import useCreateProject from "./useCreateProject";
import { CreateProjectFormProps, NewProjectProps } from "@/types/projectTypes";

const ProjectForm = ({ formOpen, title, clients }: CreateProjectFormProps) => {

    const { isCreating, createProject } = useCreateProject();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewProjectProps>();

    // Close form when clicking outside
    const formRef = useClickOutside(() => formOpen(false));

    // Handle form submission
    const onSubmit = async (data: NewProjectProps) => {
        try {

            await createProject(data);
            // console.log(data);

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

    return (
        <div className="fixed inset-0 flex justify-end z-50">
            <div ref={formRef} className="w-96 h-full bg-[#161616] border-l border-gray-500 flex flex-col gap-4">
                <HeaderCreateForm formOpen={formOpen} title={title} />

                <form className="flex flex-col h-full gap-6 pt-10 px-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <InputField
                            type="text"
                            placeholder="Projekt Name"
                            registration={register("name", { required: "Name ist erforderlich" })}
                            error={errors.name}
                        />

                        <Select
                            placeholder="Kunde"
                            options={clients.map((client) => ({ label: client.name, value: client.id }))}
                            onChange={(selectedOption) => setValue("customer_id", selectedOption.value, { shouldValidate: true })}
                            error={errors.customer_id}
                        />

                        <InputField
                            type="text"
                            placeholder="Hetzner Projekt ID"
                            registration={register("external_id", { required: "external_id ist erforderlich" })}
                            error={errors.external_id}
                        />
                        <InputField
                            type="text"
                            placeholder="Hetzner API Key"
                            registration={register("api_key", { required: "api_key ist erforderlich" })}
                            error={errors.api_key}
                        />
                        <InputField
                            type="text"
                            placeholder="API Key Valid (1 or 0)"
                            registration={register("api_key_valid", { required: "api_key_valid ist erforderlich" })}
                            error={errors.api_key_valid}
                        />
                    </div>

                    {/* Save Button */}
                    <Button type="submit" isCreating={isCreating} openForm={formOpen} />


                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
