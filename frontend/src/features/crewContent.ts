import api from "@/lib/api";
import { Crew, CrewPage } from "@/lib/types/crews";

export async function fetchCrewPage(
  page: number,
  pagesize: number,
  filter?: string,
) {
  let url = `api/content/crews/?page=${page}&page_size=${pagesize}`;
  if (filter) {
    `api/content/crews/?search=${filter}&page=${page}&page_size=${pagesize}`;
  }
  return api
    .get<CrewPage>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
