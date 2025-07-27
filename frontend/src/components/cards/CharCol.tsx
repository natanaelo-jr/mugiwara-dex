"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Animation from "../Anims";
import Card from "./Card";

const imgurl =
  "https://static.wikia.nocookie.net/onepiece/images/a/a9/Monkey_D._Luffy_Portrait.png/revision/latest/";
const name = "Monkey D. Luffy";

const CharCol: React.FC = () => {
  return (
    <div className="h-full gap-4 w-full flex flex-col pt-2 items-center">
      <Animation animation="shake">
        <Link href="/login/">
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
        <Card imgurl={imgurl} text={name} destination="" />
        <Card imgurl={imgurl} text={name} destination="" />
        <Card imgurl={imgurl} text={name} destination="" />
        <Card imgurl={imgurl} text={name} destination="" />
        <Card imgurl={imgurl} text={name} destination="" />
        <Card imgurl={imgurl} text={name} destination="" />
      </div>
    </div>
  );
};

export default CharCol;
