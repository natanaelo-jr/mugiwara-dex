"use client";
import { LoaderCircle } from "lucide-react";
import CardListBar from "../cards/CardListBar";
import FruitCard from "../cards/FruitCard";
import PaginationComponent from "./Pagination";
import { useEffect, useState } from "react";
import { DevilFruit } from "@/lib/types/devilfruits";
import { fetchDevilFruitPage } from "@/features/devilFruitContent";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CreateFruitDialog from "../forms/CreateFruitDialog";

const FruitsPagination: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fruits, setFruits] = useState<DevilFruit[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    fetchDevilFruitPage(page, 10, filter, signal)
      .then((response) => {
        setFruits(response.results);
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

  const handleFilterChange = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!newFilter) {
      params.delete("filter");
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    params.set("filter", newFilter);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex px-4 w-full h-full bg-zinc-400/60 rounded-sm gap-4 flex-col">
      <CardListBar
        addDialog={<CreateFruitDialog />}
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
      {fruits && !loading && (
        <div className="gap-2 w-full grid-cols-5 grid-rows-2 grid h-full">
          {fruits.map(
            (
              f, // <--- Mude de chaves {} para parênteses () aqui
            ) => (
              <FruitCard devilFruit={f} key={f.id} />
            ),
          )}
        </div>
      )}
      {totalPages != 0 && <PaginationComponent total={totalPages} />}
    </div>
  );
};

export default FruitsPagination;
