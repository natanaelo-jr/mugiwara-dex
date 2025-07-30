import api from "@/lib/api";
import { CharacterPage } from "@/lib/types/characters";

export async function fetchCharPage(
  page: number,
  pagesize: number,
): Promise<CharacterPage> {
  return api
    .get<CharacterPage>(
      `api/content/characters/?page=${page}&page_size=${pagesize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
