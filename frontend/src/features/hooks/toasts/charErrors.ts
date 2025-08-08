import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PirateSchema, MarineSchema } from "@/lib/schemas/CharacterSchema";

type PirateFormData = z.infer<typeof PirateSchema>;
type MarineFormData = z.infer<typeof MarineSchema>;

export function processPirateErrors(errorsPirate: FieldErrors<PirateFormData>) {
  const showErrors = (errors: FieldErrors<any>) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (value?.message) {
        toast.error(`${value.message}`);
      }
    });
  };

  showErrors(errorsPirate);
}

export function processMarineErrors(errorsMarine: FieldErrors<MarineFormData>) {
  const showErrors = (errors: FieldErrors<any>) => {
    Object.entries(errors).forEach(([key, value]) => {
      if (value?.message) {
        toast.error(`${value.message}`);
      }
    });
  };

  showErrors(errorsMarine);
}
