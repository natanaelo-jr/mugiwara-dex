import api from "@/lib/api";
import {
  CharacterPage,
  PiratePage,
  Pirate,
  Marine,
} from "@/lib/types/characters";

export async function fetchCharPage(
  page: number = 1,
  pagesize: number = 10,
  filter?: string,
  signal?: AbortSignal,
): Promise<CharacterPage> {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("page_size", pagesize.toString());
  if (filter) {
    params.set("search", filter);
  }

  const url = `api/content/characters/?${params.toString()}`;

  return api
    .get<CharacterPage>(url, { signal })
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

export async function deleteCharacter(
  id: number,
  type: "pirate" | "marine",
): Promise<void> {
  const apiUrl =
    type === "pirate" ? "api/content/pirates/" : "api/content/marines/";
  return api
    .delete(apiUrl + id)
    .then(() => {
      return;
    })
    .catch((error) => {
      throw error;
    });
}

export async function fetchPirateById(id: number): Promise<Pirate> {
  const apiUrl = "api/content/pirates/";
  return api
    .get<Pirate>(apiUrl + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function fetchMarineById(id: number): Promise<Marine> {
  const apiUrl = "api/content/marines/";
  return api
    .get<Marine>(apiUrl + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
