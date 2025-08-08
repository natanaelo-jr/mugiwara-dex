"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Animation from "../Anims";
import Card from "./Card";
import { useEffect, useRef } from "react";
import { LoaderCircle, LucidePlus } from "lucide-react";
import { useCrewInfiniteScroll } from "@/features/hooks/infiniteScrolls";
import { useAuthStore } from "@/store/auth";
import CreateCrewDialog from "../forms/CreateCrewDialog";

const CrewCol: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetched,
  } = useCrewInfiniteScroll({ limit: 1 });

  const crews = data?.pages || [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Esta é a condição CRÍTICA
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="h-full relative gap-4 w-full flex flex-col pt-2 items-center">
      <Animation animation="shake">
        <Link href="/tripulacoes/">
          <Button variant="inv" className="text-2xl">
            Tripulações
          </Button>
        </Link>
      </Animation>
      {isAuthenticated && (
        <div className="absolute right-2">
          <Animation animation="grow">
            <CreateCrewDialog>
              <Button variant="inv">
                <LucidePlus />
              </Button>
            </CreateCrewDialog>
          </Animation>
        </div>
      )}

      {/* Fazer o pesquisa aqui */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 w-full flex-col py-4 flex-1 min-h-0 overflow-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-beige-dark
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {isLoading && crews.length === 0 && (
          <div className="h-full flex-col flex justify-center items-center">
            <span className="text-brown">
              <LoaderCircle className="animate-spin" />
            </span>
          </div>
        )}
        {crews &&
          crews.map((c) => (
            <Card
              key={c.id}
              imgurl={c.img_url}
              text={c.name}
              destination={`tripulacoes/${c.id}/`}
            />
          ))}
        {hasNextPage && ( // Mostra o loader apenas se houver mais para carregar
          <div ref={observerRef} style={{ height: "20px" }}>
            {isFetchingNextPage && (
              <div className="flex justify-center items-center py-2">
                <span className="text-brown">
                  <LoaderCircle className="animate-spin" />
                </span>
                <p className="text-sm text-brown/70 ml-2">Carregando mais...</p>
              </div>
            )}
          </div>
        )}
        {!hasNextPage && crews.length > 0 && !isFetchingNextPage && (
          <p className="text-sm text-brown/70 text-center py-2">
            Você chegou ao fim da lista!
          </p>
        )}
      </div>
    </div>
  );
};

export default CrewCol;
