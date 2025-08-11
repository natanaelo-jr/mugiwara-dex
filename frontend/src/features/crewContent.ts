import api from "@/lib/api";
import { CrewPage } from "@/lib/types/crews";

export async function fetchCrewPage(
  page: number,
  pagesize: number,
  filter?: string,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("page_size", pagesize.toString());
  if (filter) {
    params.append("search", filter);
  }
  const url = `api/content/crews/?${params.toString()}`;
  return api
    .get<CrewPage>(url, { signal })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
