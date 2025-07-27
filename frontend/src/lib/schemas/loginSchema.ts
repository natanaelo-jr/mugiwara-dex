import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(5, "Nome de usuário deve ter pelo menos 5 caracteres."),
  password: z.string().min(1, "Senha não pode ser vazia."),
});
