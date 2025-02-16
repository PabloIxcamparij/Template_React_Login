import { useForm } from "react-hook-form";
import { createAccount } from "../../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "../../types/index";

import { Form, Input, Button } from "@heroui/react";

export default function AccountRegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const {
    handleSubmit,
    register,
    watch,
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error: any) => {
      console.error("Error al registrar: ", error.message);
    },
    onSuccess: () => {
      console.log("Registro exitoso");
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    console.log("A");
    mutate(formData);
  };

  return (
    <Form
      validationBehavior="native"
      onSubmit={handleSubmit(handleRegister)}
      className="w-full bg-black/10 p-3 gap-5 rounded-lg"
    >
      <Input
        isRequired
        id="email"
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        errorMessage={"El Email es necesario"}
        {...register("email")}
      />

      <Input
        isRequired
        id="name"
        type="text"
        label="Nombre"
        labelPlacement="outside"
        placeholder="Ingrese un Nombre"
        {...register("name")}
        validate={(value) => {
          if (value.length < 3) {
            return "El Nombre debe ser mayor a 3 characteres";
          }
        }}
      />

      <Input
        isRequired
        id="password"
        label="Contraseña"
        labelPlacement="outside"
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
        id="passwordConfirm"
        label="Confirmar Contraseña"
        labelPlacement="outside"
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

      <Button type="submit" variant="bordered">
        Registrarse
      </Button>
    </Form>
  );
}
