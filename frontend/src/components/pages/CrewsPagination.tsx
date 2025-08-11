"use client";
import { LoaderCircle } from "lucide-react";
import CardListBar from "../cards/CardListBar";
import CrewCard from "../cards/CrewCard";
import PaginationComponent from "./Pagination";
import { useEffect, useState } from "react";
import { Crew } from "@/lib/types/crews";
import { fetchCrewPage } from "@/features/crewContent";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CreateCrewDialog from "../forms/CreateCrewDialog";

const CrewsPagination: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const page = Number(searchParams.get("page")) || 1;
  const filter = searchParams.get("filter") || "";

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    fetchCrewPage(page, 10, filter, signal)
      .then((response) => {
        setCrews(response.results);
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
        addDialog={<CreateCrewDialog />}
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
      {crews && !loading && (
        <div className="gap-2 w-full grid-cols-5 grid-rows-2 grid h-full">
          {crews.map((c) => (
            <CrewCard crew={c} key={c.id} />
          ))}
        </div>
      )}
      {totalPages != 0 && <PaginationComponent total={totalPages} />}
    </div>
  );
};

export default CrewsPagination;
