"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Animation from "../Anims";
import Card from "./Card";
import { Character } from "@/lib/types/characters";

interface Props {
  characters: Character[];
}

const CharCol: React.FC<Props> = ({ characters }) => {
  return (
    <div className="h-full gap-4 w-full flex flex-col pt-2 items-center">
      <Animation animation="shake">
        <Link href="/personagens/">
          <Button variant="inv" className="text-2xl">
            Personagens
          </Button>
        </Link>
      </Animation>
      {/* Fazer o pesquisa aqui */}
      <div
        className="flex items-center gap-4 w-full flex-col py-4 flex-1 min-h-0 overflow-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-beige-dark
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {characters.map((c) => (
          <Card
            imgurl={c.portrait_url}
            text={c.name}
            destination={`${c.type}/${c.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CharCol;
