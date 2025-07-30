import Animation from "../Anims";
import { Character } from "@/lib/types/characters";
import Image from "next/image";
import Link from "next/link";
import { Skull, Anchor, Eye, Sword, Crown } from "lucide-react";

interface Props {
  character: Character;
}
const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <Animation animation="grow">
      <Link href={`/${character.type}s/${character.id}`}>
        <div className="bg-zinc-200 border-zinc-400 flex flex-col items-center border rounded p-4 hover:cursor-pointer hover:bg-zinc-100 transition duration-300">
          <div className="w-40 h-40 relative">
            <span className="absolute right-0 top-0 z-10">
              {character.type == "pirate" ? (
                <Skull strokeWidth={1.5} size={30} className="fill-zinc-300" />
              ) : (
                <Anchor strokeWidth={1.5} size={30} className="" />
              )}
            </span>
            <Image
              src={character.portrait_url}
              alt={`${character.name} portrait`}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <span className="font-pirate text-zinc-900">{character.name}</span>
          <div className="w-full px-4 flex justify-between">
            <span>
              <Eye
                className={`w-5 h-5 text-zinc-${character.observation_haki ? "900" : "400"}`}
              />
            </span>
            <span>
              <Crown
                className={`w-5 h-5 text-zinc-${character.observation_haki ? "900" : "400"}`}
              />
            </span>
            <span>
              <Sword
                className={`w-5 h-5 text-zinc-${character.observation_haki ? "900" : "400"}`}
              />
            </span>
          </div>
        </div>
      </Link>
    </Animation>
  );
};

export default CharacterCard;
