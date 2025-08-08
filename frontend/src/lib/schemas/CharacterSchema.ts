import { z } from "zod";
export const PirateSchema = z.object({
    name: z.string().min(1, "Nome não pode ser vazio."),
    age: z.number().min(0, "Idade não pode ser negativa."),
    bounty: z.number().min(0, "Recompensa não pode ser negativa."),
    description: z.string().nullable(),
    history: z.string().nullable(),
    observation_haki: z.boolean(),
    armament_haki: z.boolean(),
    conqueror_haki: z.boolean(),
    img_url: z.url().nullable(),
    portrait_url: z.url().nullable(),
    devilfruit: z.number().nullable(),
    crew: z.number().nullable(),
});

export const MarineSchema = z.object({
    name: z.string().min(1, "Nome não pode ser vazio."),
    age: z.number().min(0, "Idade não pode ser negativa."),
    description: z.string().nullable(),
    history: z.string().nullable(),
    observation_haki: z.boolean(),
    armament_haki: z.boolean(),
    conqueror_haki: z.boolean(),
    img_url: z.url().nullable(),
    portrait_url: z.url().nullable(),
    devilfruit: z.number().nullable(),
    position: z.enum([
        "Admiral",
        "Vice Admiral",
        "Rear Admiral",
        "Captain",
        "Lieutenant",
        "Marine",
    ]),
});
