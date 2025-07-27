"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { login } from "@/features/auth";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth";

type loginFormData = z.infer<typeof LoginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const [serverError, setServerError] = useState<string>("");
  const isLoading = useAuthStore((state) => state.isLoading);

  const onSubmit = async (data: loginFormData) => {
    try {
      setServerError("");
      const res = await login(data);
      console.log("from", res);
      if (res && res.status == 200) {
        console.log("oii");
        router.push("/");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setServerError("Login ou senha inválidos.");
      } else {
        setServerError("Erro interno. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="px-8 py-6 bg-blue-900/70 min-md:max-w-[25vw] w-full gap-8 placeholder:italic rounded-lg shadow-md shadow-blue-600 flex flex-col items-center">
      <div>
        <h2 className="font-pirate text-2xl text-shadow text-zinc-50">
          Fazer login
        </h2>
      </div>
      <form
        className="flex w-full items-center flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full pb-8 relative">
          <Input
            placeholder="Nome de usuário"
            variant="blue"
            type="text"
            className="bg-blue-950"
            {...register("username")}
          ></Input>
          <p className="text-xs absolute bottom-0 text-wrap text-red-700">
            {errors.username?.message}
          </p>
        </div>
        <div className="w-full pb-5 relative">
          <Input
            placeholder="Senha"
            variant="blue"
            type="password"
            className="bg-blue-950"
            {...register("password")}
          ></Input>
          <p className="text-xs absolute bottom-0 text-wrap text-red-700">
            {errors.password?.message}
          </p>
          <p className="text-sm w-full text-center bottom-[-4px] absolute text-red-700">
            {serverError}
          </p>
        </div>
        <Button
          variant="blue"
          className="bg-blue-950 h-10 w-20"
          type="submit"
          disabled={isSubmitting}
        >
          {isLoading ? (
            <span className="animate-spin">
              <LoaderCircle />
            </span>
          ) : (
            "ENTRAR"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
