import api from "@/lib/api";
import { CharacterPage, PiratePage } from "@/lib/types/characters";

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

export async function fetchPiratePage(
  page: number = 1,
  pagesize: number = 10,
  filter?: string,
): Promise<PiratePage> {
  let url = `api/content/pirates/?page=${page}&page_size=${pagesize}`;
  if (filter) {
    url += `&search=${filter}`;
  }
  return api
    .get<PiratePage>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
