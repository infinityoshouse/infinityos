import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),

  email: z.string().email("E-mail inválido"),

  phone: z.string().min(10, "Telefone inválido"),

  whatsapp: z.string().min(10, "WhatsApp inválido"),
});
