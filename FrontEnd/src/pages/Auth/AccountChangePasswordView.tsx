// Own
import { RequestConfirmationCodeForm } from "../../types/index";
import { requestChangeToken } from "../../api/AuthAPI";
import { title, subtitle } from "@/components/primitives";

// Libraries
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "@heroui/react";

export default function AccountChangePasswordView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestChangeToken,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  return (
    <Form
      validationBehavior="native"
      onSubmit={handleSubmit(handleRequestCode)}
      className="flex flex-col items-center w-full gap-5"
    >
      <div className="flex flex-col justify-center items-center w-full ml-10 gap-5">
        <h1 className={title()}>Solicitar un Cambio de Contraseña</h1>
        <h2 className={subtitle()}>
          Coloca tu e-mail para comenzar el proceso
        </h2>
      </div>

      <Input
        isRequired
        size="md"
        variant="underlined"
        id="email"
        type="email"
        label="Email"
        labelPlacement="inside"
        placeholder="Enter your email"
        errorMessage={"El Email es necesario"}
        {...register("email")}
      />

      <Button
        type="submit"
        variant="ghost"
        color="primary"
        className="w-full text-lg font-bold"
      >
        Solicitar cambio
      </Button>

      <Link to="/login" className="text-center text-gray-300 font-normal">
        ¿Ya tienes cuenta? Iniciar Sesión
      </Link>
    </Form>
  );
}
