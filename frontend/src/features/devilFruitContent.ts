import api from "@/lib/api";
import { DevilFruitPage, DevilFruit } from "@/lib/types/devilfruits";

export async function fetchDevilFruitPage(
  page: number,
  pagesize: number,
  filter?: string,
) {
  let url = `api/content/devilfruits/?page=${page}&page_size=${pagesize}`;
  if (filter) {
    url = `api/content/devilfruits/?search=${filter}&page=${page}&page_size=${pagesize}`;
  }
  return api
    .get<DevilFruitPage>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
