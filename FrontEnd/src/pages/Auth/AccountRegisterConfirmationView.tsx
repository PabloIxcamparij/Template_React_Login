// Own
import { confirmAccount } from "../../api/AuthAPI";
import { ConfirmToken } from "../../types/index";
import { title, subtitle } from "@/components/primitives";

// Libraries
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, InputOtp } from "@heroui/react";
import { Link } from "react-router-dom";

export default function AccountRegisterConfirmationView() {
  const { handleSubmit, setValue } = useForm<ConfirmToken>();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const onSubmit = (formData: ConfirmToken) => {
    mutate(formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-[#87c1ff] to-[#0072F5]">
      <div className=" flex p-5 h-1/5 md:w-1/4" />
      <Form
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full h-full bg-white rounded-tl-[120px] p-10 gap-5"
      >
        <div className="flex flex-col justify-center items-center w-full ml-10 gap-5">
          <h1 className={title()}>Confirma tu Cuenta</h1>
          <h2 className={subtitle()}>
            Ingresa el código que recibio por e-mail
          </h2>
        </div>

        <InputOtp
          variant="bordered"
          color="primary"
          length={6}
          onValueChange={(value) => setValue("token", value)}
          validate={(value) => {
            if (value.length < 6) {
              return "Debe ser mayor a 6 characteres";
            }
          }}
        />

        <Button
          type="submit"
          variant="ghost"
          color="primary"
          className="w-full text-lg font-bold"
        >
          Confirmar
        </Button>

        <Link to="/login" className="text-center text-gray-300 font-normal">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
      </Form>
    </div>
  );
}
