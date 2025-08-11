import api from "@/lib/api";
import { DevilFruitPage } from "@/lib/types/devilfruits";

export async function fetchDevilFruitPage(
  page: number,
  pagesize: number,
  filter?: string,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("pagesize", pagesize.toString());
  if (filter) {
    params.set("filter", filter);
  }
  const url = `api/content/devilfruits/?${params.toString()}`;
  return api
    .get<DevilFruitPage>(url, { signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
