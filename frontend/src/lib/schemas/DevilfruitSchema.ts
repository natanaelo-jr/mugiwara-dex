import { z } from "zod";

export const DevilfruitSchema = z.object({
  name: z.string().min(1, "Nome não pode ser vazio."),
  description: z.string().nullable(),
  img_url: z.url().nullable(),
  type: z.enum(["P", "Z", "L"]),
});
