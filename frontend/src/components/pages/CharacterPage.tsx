import PaginationComponent from "./Pagination";
import CardListBar from "../cards/CardListBar";
import { Character } from "@/lib/types/characters";
import CharacterCard from "../cards/CharacterCard";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCharPage } from "@/features/characterContent";

const CharacterPage: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCharPage(page, 10)
      .then((response) => {
        setCharacters(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="flex  px-4 w-full h-full bg-zinc-400/60 rounded-sm gap-4 flex-col">
      <CardListBar />
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
      {totalPages != 0 && (
        <PaginationComponent
          current={page}
          total={totalPages}
          onChange={(page) => {
            console.log(page);
          }}
        />
      )}
    </div>
  );
};

export default CharacterPage;
