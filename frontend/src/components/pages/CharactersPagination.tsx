"use client";
import PaginationComponent from "./Pagination";
import CardListBar from "../cards/CardListBar";
import { Character } from "@/lib/types/characters";
import CharacterCard from "../cards/CharacterCard";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCharPage } from "@/features/characterContent";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CreateCharDialog from "../forms/CreateCharDialog";

const CharactersPagination: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    fetchCharPage(page, 10, filter, signal)
      .then((response) => {
        setCharacters(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((error) => {
        if (error.code === "ERR_CANCELED") {
          console.log("Request was cancelled");
          return undefined;
        }
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page, filter]);

  const createFilter = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!newFilter) {
      params.delete("filter");
      params.delete("page");
      return `${pathname}?${params.toString()}`;
    }

    params.set("filter", newFilter);
    params.set("page", "1");
    return `${pathname}?${params.toString()}`;
  };

  const handleFilterChange = (newFilter: string) => {
    router.push(createFilter(newFilter));
  };

  return (
    <div className="flex px-4 w-full h-full bg-zinc-400/60 rounded-sm gap-4 flex-col">
      <CardListBar
        addDialog={<CreateCharDialog />}
        onFilterChange={(filter) => {
          handleFilterChange(filter);
        }}
      />
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <span>
            <LoaderCircle className="animate-spin text-zinc-800 w-10 h-10" />{" "}
          </span>
        </div>
      )}
      {characters && !loading && (
        <div className="gap-2 w-full grid-cols-5 grid-rows-2 grid h-full">
          {characters.map(
            (
              c, // <--- Mude de chaves {} para parênteses () aqui
            ) => (
              <CharacterCard character={c} key={c.type + c.id} />
            ),
          )}
        </div>
      )}
      {totalPages != 0 && <PaginationComponent total={totalPages} />}
    </div>
  );
};

export default CharactersPagination;
