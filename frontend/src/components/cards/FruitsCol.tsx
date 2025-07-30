"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Animation from "../Anims";
import Card from "./Card";
import { useRef, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useDevilFruitInfiniteScroll } from "@/features/hooks/infiniteScrolls";

const CharCol: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetched,
  } = useDevilFruitInfiniteScroll({ limit: 2 });

  const fruits = data?.pages || [];
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
    <div className="h-full gap-4 w-full flex flex-col pt-2 items-center">
      <Animation animation="shake">
        <Link href="/frutas/">
          <Button variant="inv" className="text-2xl">
            Frutas
          </Button>
        </Link>
      </Animation>
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
        {isLoading && fruits.length === 0 && (
          <div className="h-full flex-col flex justify-center items-center">
            <span className="text-brown">
              <LoaderCircle className="animate-spin" />
            </span>
          </div>
        )}
        {fruits &&
          fruits.map((c) => (
            <Card
              key={c.id}
              imgurl={c.img_url}
              text={c.name}
              destination={`frutas/${c.id}`}
            />
          ))}

        {hasNextPage && ( // Mostra o loader apenas se houver mais para carregar
          <div ref={observerRef} style={{ height: "20px" }}>
            {isLoading && (
              <div className="flex justify-center items-center py-2">
                <span className="text-brown">
                  <LoaderCircle className="animate-spin" />
                </span>
                <p className="text-sm text-brown/70 ml-2">Carregando mais...</p>
              </div>
            )}
          </div>
        )}
        {!hasNextPage && fruits.length > 0 && !isFetchingNextPage && (
          <p className="text-sm text-brown/70 text-center py-2">
            Você chegou ao fim da lista!
          </p>
        )}
      </div>
    </div>
  );
};

export default CharCol;
