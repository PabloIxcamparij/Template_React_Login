import { useForm } from "react-hook-form";
import { loginAccount } from "../../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "../../types/index";
import { title, subtitle } from "@/components/primitives";

import { Form, Input, Button } from "@heroui/react";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const { handleSubmit, register } = useForm<UserLoginForm>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: loginAccount,
    onError: (error: any) => {
      console.error("Error al logiarse: ", error.message);
    },
    onSuccess: () => {
      console.log("Login hecho");
    },
  });

  const handleRegister = (formData: UserLoginForm) => {
    console.log("A");
    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen p-2">

      <div className="text-center justify-center items-center">
        <span className={title()}>Ingrese sus datos para &nbsp;</span>
        <span className={title({ color: "violet" })}>loguearse&nbsp;</span>
        <br />

        <div className={subtitle({ class: "mt-4" })}>
          Template, contiene login y dashboard.
        </div>
      </div>

      <Form
        validationBehavior="native"
        onSubmit={handleSubmit(handleRegister)}
        className="w-3/4 bg-black/10 p-3 gap-5 rounded-lg"
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

        <Button type="submit" variant="bordered">
          Registrarse
        </Button>
      </Form>
    </div>
  );
}
