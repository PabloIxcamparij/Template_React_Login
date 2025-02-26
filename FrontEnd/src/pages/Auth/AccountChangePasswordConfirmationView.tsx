// Own
import { confirmChangePassword } from "../../api/AuthAPI";
import { ChangePasswordConfirmation } from "../../types/index";
import { title, subtitle } from "@/components/primitives";

// Libraries
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button, InputOtp } from "@heroui/react";
import { Link } from "react-router-dom";

export default function AccountChangePasswordConfirmationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<ChangePasswordConfirmation>();

  const { mutate } = useMutation({
    mutationFn: confirmChangePassword,
    onError: (error: any) => {
      toast.error(error.message);
      setIsSubmitting(false);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsSubmitting(false);
    },
  });

  const onSubmit = (formData: ChangePasswordConfirmation) => {
    setIsSubmitting(true);
    mutate(formData);
  };

  const password = watch("password");

  return (
    <Form
      validationBehavior="native"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-full gap-5"
    >
      <div className="flex flex-col justify-center items-center w-full ml-10 gap-5">
        <h1 className={title()}>Cambio de contraseña</h1>
        <h2 className={subtitle()}>
          Ingresa una nueva contraseña y el código que recibio por e-mail
        </h2>
      </div>

      <Input
        isRequired
        size="md"
        variant="underlined"
        id="password"
        label="Contraseña"
        labelPlacement="inside"
        placeholder="Ingrese su contraseña"
        type="password"
        {...register("password")}
        validate={(value) => {
          if (value.length < 8) {
            return "La contraseña debe ser mayor a 8 characteres";
          }
        }}
      />

      <Input
        isRequired
        size="md"
        variant="underlined"
        id="passwordConfirm"
        label="Confirmar Contraseña"
        labelPlacement="inside"
        placeholder="Repita su contraseña"
        type="password"
        {...register("passwordConfirm")}
        validate={(value) => {
          if (value.length < 8) {
            return "La contraseña debe ser mayor a 8 characteres";
          }
          if (value != password) {
            return "La contraseña debe ser iguales";
          }
        }}
      />

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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cambiando contraseña..." : "Confirmar"}
      </Button>

      <Link to="/login" className="text-center text-gray-300 font-normal">
        ¿Ya tienes cuenta? Iniciar Sesión
      </Link>
    </Form>
  );
}
