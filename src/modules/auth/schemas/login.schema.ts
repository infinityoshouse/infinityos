import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("E-mail inválido."),

  password: z
    .string()
    .min(6, "A senha deve possuir no mínimo 6 caracteres.")
    .max(100, "Senha inválida."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
