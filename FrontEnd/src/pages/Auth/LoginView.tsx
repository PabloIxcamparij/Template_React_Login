// Own
import { loginAccount } from "../../api/AuthAPI";
import { UserLoginForm } from "../../types/index";
import { title, subtitle } from "@/components/primitives";

// Libraries
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Button } from "@heroui/react";

export default function LoginView() {
  const navigate = useNavigate();

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
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  const handleRegister = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-[#87c1ff] to-[#0072F5]">
      <div className=" flex p-5 h-1/5 md:w-1/4">
      </div>

      <Form
        validationBehavior="native"
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col items-center w-full h-full bg-white rounded-tl-[140px] p-10 gap-5"
      >
        <h1 className={title()}>Ingrese sus datos</h1>
        <h2 className={subtitle()}>Template, contiene login y dashboard.</h2>

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

        <Button
          type="submit"
          variant="ghost"
          color="primary"
          className="w-full text-lg font-bold"
        >
          Login
        </Button>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/user/register"}
            className="text-center text-gray-400 font-normal"
          >
            Crear Cuenta
          </Link>

          <Link
            to={"/user/requestChangePassword"}
            className="text-center text-gray-400 font-normal"
          >
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>
        </nav>
      </Form>
    </div>
  );
}
