import api from "@/lib/api";
import { Crew, CrewPage } from "@/lib/types/crews";

export async function fetchCrewPage(page: number, pagesize: number) {
  return api
    .get<CrewPage>(`api/content/crews/?page=${page}&page_size=${pagesize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
