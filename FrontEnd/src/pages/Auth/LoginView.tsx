// Own
import { loginAccount } from "../../api/AuthAPI";
import { UserLoginForm } from "../../types/index";
import { title, subtitle} from "@/components/primitives";

// Libraries
import { toast } from "react-toastify";
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
      toast.error(error.message || "Error en el login");
    },
    onSuccess: () => {
      toast.success("Iniciando Sesion");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  const handleRegister = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
      <Form
        validationBehavior="native"
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col items-center w-full gap-5"
      >
        <div className="flex flex-col justify-center items-center w-full ml-5 gap-5">
          <h1 className={title()}>Ingrese sus datos</h1>
          <h2 className={subtitle()}>Template, contiene login y dashboard.</h2>
        </div>
        <Input
          isRequired
          size="lg"
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
          size="lg"
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
          className="w-full text-lg font-semibold"
        >
          Login
        </Button>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/accountRegister"}
            className="text-center text-gray-400 font-normal"
          >
            Crear Cuenta
          </Link>

          <Link
            to={"/auth/accountNewToken"}
            className="text-center text-gray-400 font-normal"
          >
            ¿Necesita un nuevo token? Solicitar
          </Link>

          <Link
            to={"/auth/accountChangePassword"}
            className="text-center text-gray-400 font-normal"
          >
            ¿Olvidaste tu contraseña? Reestablecer
          </Link>

        </nav>
      </Form>

  );
}
