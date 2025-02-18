// Own
import { createAccount } from "../../api/AuthAPI";
import { UserRegistrationForm } from "../../types/index";
import { title, subtitle } from "@/components/primitives";

// Libraries
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function AccountRegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const { handleSubmit, register, watch } = useForm<UserRegistrationForm>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <Form
        validationBehavior="native"
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col items-center w-full gap-5"
      >
        <div className="flex flex-col justify-center items-center w-full ml-10 gap-5">
          <h1 className={title()}>Ingrese sus datos</h1>
          <h2 className={subtitle()}>Template, contiene login y dashboard.</h2>
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

        <Input
          isRequired
          size="md"
          variant="underlined"
          id="name"
          type="text"
          label="Nombre"
          labelPlacement="inside"
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

        <Button
          type="submit"
          variant="ghost"
          color="primary"
          className="w-full text-lg font-bold"
        >
          Login
        </Button>

        <Link to={"/login"} className="text-center text-gray-400 font-normal">
          ¿Ya tienes una cuenta?
        </Link>
      </Form>
  );
}
