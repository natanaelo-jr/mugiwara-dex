"use client";
import { Pirate } from "@/lib/types/characters";
import Beries from "@/svg/Beries";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import CrewCard from "../cards/CrewCard";
import { useEffect, useState } from "react";
import { DevilFruit } from "@/lib/types/devilfruits";
import { Crew } from "@/lib/types/crews";
import api from "@/lib/api";
import FruitCard from "../cards/FruitCard";

interface Props {
  pirate: Pirate;
}

const Poster: React.FC<Props> = ({ pirate }) => {
  const [crew, setCrew] = useState<Crew>();
  const [fruit, setFruit] = useState<DevilFruit>();

  useEffect(() => {
    if (pirate.crew) {
      api
        .get(`api/content/crews/${pirate.crew}`)
        .then((res) => setCrew(res.data))
        .catch((err) => console.error(err));
    }
    if (pirate.devilfruit) {
      api
        .get(`api/content/devilfruits/${pirate.devilfruit}`)
        .then((res) => setFruit(res.data))
        .catch((err) => console.error(err));
    }
  }, [pirate.crew, pirate.devilfruit]);

  return (
    <div className="w-full h-screen overflow-auto flex py-8 justify-center">
      <div className="px-2 py-4 text-zinc-800 gap-2 flex flex-col items-center w-full">
        <span className="text-6xl font-tnr scale-y-150">WANTED</span>
        <p className="text-4xl pt-2 font-century origin-bottom scale-y-110">
          DEAD OR ALIVE
        </p>
        <h1 className="text-6xl font-century text-center max-w-[40vw] uppercase scale-y-110">
          {pirate.name}
        </h1>
        <div className="flex items-center">
          <Beries size={40} />
          <span className="text-5xl -ml-2 font-thin font-century px-2">
            {pirate.bounty.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </span>
        </div>
        <div className="flex flex-col pt-8 w-full px-40">
          <div className="flex items-center gap-1">
            <label className="font-semibold text-zinc-600">Descrição</label>
            <Button
              className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
              variant="inv"
            >
              <Pencil />
            </Button>
          </div>
          <p className="h-24 overflow-auto text-sm text-zinc-700">
            {pirate.description}
          </p>
        </div>
        <div className="flex flex-col w-full px-40">
          <div className="flex items-center gap-1">
            <label className="font-semibold text-zinc-600">História</label>
            <Button
              className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
              variant="inv"
            >
              <Pencil />
            </Button>
          </div>
          <p className="h-24 overflow-auto text-sm text-zinc-700">
            {pirate.history}
          </p>
        </div>
        <div className="w-full pb-4 px-40 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <label className="font-semibold text-zinc-600">Tripulação</label>
              <Button
                className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                variant="inv"
              >
                <Pencil />
              </Button>
            </div>

            {crew ? (
              <CrewCard crew={crew} />
            ) : (
              <span className="text-sm text-zinc-700">Sem tripulação</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <label className="font-semibold text-zinc-600">Fruta</label>
              <Button
                className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                variant="inv"
              >
                <Pencil />
              </Button>
            </div>

            {fruit ? (
              <FruitCard devilFruit={fruit} />
            ) : (
              <span className="text-sm text-zinc-700">Sem fruta</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
