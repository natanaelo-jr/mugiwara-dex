import { z } from "zod";

export const PirateSchema = z.object({
  name: z.string().min(1, "Nome não pode ser vazio."),
  age: z.number(),
  bounty: z.number(),
  description: z.string().nullable().default(null),
  history: z.string().nullable().default(null),
  observationHaki: z.boolean(),
  armamentHaki: z.boolean(),
  conquerorHaki: z.boolean(),
  imgUrl: z.url().nullable().default(null),
  portraitUrl: z.url().nullable().default(null),
  devilFruitID: z.number().nullable().default(null),
  crewID: z.number().nullable().default(null),
});

export const MarineSchema = z.object({
  name: z.string().min(1, "Nome não pode ser vazio."),
  age: z.number(),
  description: z.string().nullable().default(null),
  history: z.string().nullable().default(null),
  observationHaki: z.boolean(),
  armamentHaki: z.boolean(),
  conquerorHaki: z.boolean(),
  imgUrl: z.url().nullable().default(null),
  portraitUrl: z.url().nullable().default(null),
  devilFruitID: z.number().nullable().default(null),
  position: z.literal([
    "Admiral",
    "Vice Admiral",
    "Rear Admiral",
    "Captain",
    "Lieutenant",
    "Marine",
  ]),
});
