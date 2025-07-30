import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharPage } from "../characterContent";
import { fetchCrewPage } from "../crewContent";
import { fetchDevilFruitPage } from "../devilFruitContent";
import { Character, CharacterPage } from "@/lib/types/characters";
import { DevilFruit, DevilFruitPage } from "@/lib/types/devilfruits";
import { Crew, CrewPage } from "@/lib/types/crews";

interface ScrollOptions {
  limit?: number;
}

interface CharactersData {
  pages: Character[];
  pageParams: number[];
}

interface CrewsData {
  pages: Crew[];
  pageParams: number[];
}

interface DevilFruitsData {
  pages: DevilFruit[];
  pageParams: number[];
}

export const useCharactersInfiniteScroll = (options?: ScrollOptions) => {
  const { limit = 10 } = options || {};
  return useInfiniteQuery<
    CharacterPage,
    Error,
    CharactersData,
    string[],
    number
  >({
    queryKey: ["homeCharacters"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchCharPage(pageParam, limit);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.results),
      pageParams: data.pageParams,
    }),
  });
};

export const useCrewInfiniteScroll = (options?: ScrollOptions) => {
  const { limit = 10 } = options || {};
  return useInfiniteQuery<CrewPage, Error, CrewsData, string[], number>({
    queryKey: ["homeCrews"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchCrewPage(pageParam, limit);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.results),
      pageParams: data.pageParams,
    }),
  });
};

export const useDevilFruitInfiniteScroll = (options?: ScrollOptions) => {
  const { limit = 10 } = options || {};
  return useInfiniteQuery<
    DevilFruitPage,
    Error,
    DevilFruitsData,
    string[],
    number
  >({
    queryKey: ["homeDevilFruits"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchDevilFruitPage(pageParam, limit);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.results),
      pageParams: data.pageParams,
    }),
  });
};
