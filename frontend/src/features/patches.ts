import api from "@/lib/api";
import { Pirate } from "@/lib/types/characters";

export async function patchPirate(
  id: number,
  field: string,
  value: string | boolean | number | null,
) {
  const url = `api/content/pirates/${id}/`;
  const data: Partial<Pirate> = { [field]: value };

  return api
    .patch<Pirate>(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function patchMarine(
  id: number,
  field: string,
  value: string | boolean | number | null,
) {
  const url = `api/content/marines/${id}/`;
  const data: Partial<Pirate> = { [field]: value };

  return api
    .patch<Pirate>(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
