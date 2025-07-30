import api from "@/lib/api";
import { DevilFruitPage, DevilFruit } from "@/lib/types/devilfruits";

export async function fetchDevilFruitPage(page: number, pagesize: number) {
  return api
    .get<DevilFruitPage>(
      `api/content/devilfruits/?page=${page}&page_size=${pagesize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
