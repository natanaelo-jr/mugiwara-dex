import api from "@/lib/api";
import { CharacterPage } from "@/lib/types/characters";

export async function fetchCharPage(
  page: number = 1,
  pagesize: number = 10,
  filter?: string,
): Promise<CharacterPage> {
  let url = `api/content/characters/?page=${page}&page_size=${pagesize}`;
  if (filter) {
    url = `api/content/characters/?search=${filter}&page=${page}&page_size=${pagesize}`;
  }
  return api
    .get<CharacterPage>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
