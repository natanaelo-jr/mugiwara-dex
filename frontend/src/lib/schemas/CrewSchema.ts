import { z } from "zod";

export const CrewSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().nullable(),
  img_url: z.string().url("URL inválida").nullable(),
  captain: z.number().nullable(),
});
