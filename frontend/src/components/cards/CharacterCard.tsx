import Animation from "../Anims";
import { Character } from "@/lib/types/characters";
import Image from "next/image";
import Link from "next/link";
import { Eye, Sword, Crown, Trash } from "lucide-react";
import Anchor from "@/svg/Anchor";
import Pirate from "@/svg/Pirate";
import { useAuthStore } from "@/store/auth";
import { Button } from "../ui/button";
import { deleteCharacter } from "@/features/characterContent";

interface Props {
  character: Character;
}
const CharacterCard: React.FC<Props> = ({ character }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <Animation animation="grow">
      <Link href={`/${character.type}s/${character.id}`}>
        <div className="flex relative justify-center">
          {/* {isAuthenticated && ( */}
          {/*   <div className="absolute z-20 top-1 right-1"> */}
          {/*     <Animation animation="grow"> */}
          {/*       <Button */}
          {/*         onClick={() => { */}
          {/*           deleteCharacter(character.id, character.type); */}
          {/*         }} */}
          {/*         variant="inv" */}
          {/*         className="text-zinc-600 hover:text-zinc-800" */}
          {/*       > */}
          {/*         <Trash className="w-5 h-5" /> */}
          {/*       </Button> */}
          {/*     </Animation> */}
          {/*   </div> */}
          {/* )} */}
          <div className="bg-zinc-200 w-fit border-zinc-400 flex flex-col items-center border rounded p-4 hover:cursor-pointer hover:bg-zinc-100 transition duration-300">
            <div className="w-32 h-32 relative">
              <span className="absolute right-0 bottom-0 bg-zinc-200 p-[2px] rounded-full z-10">
                {character.type == "pirate" ? (
                  <Pirate className="text-zinc-900" />
                ) : (
                  <Anchor className="text-zinc-900" />
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
                  className={`w-5 h-5 stroke-zinc-${character.observation_haki ? "900" : "400"}`}
                  opacity={character.observation_haki ? 1 : 0.3}
                  color={"oklch(21% 0.006 285.885)"}
                />
              </span>
              <span>
                <Crown
                  className={`w-5 h-5 stroke-zinc-${character.conqueror_haki ? "900" : "400"}`}
                  opacity={character.conqueror_haki ? 1 : 0.3}
                  color={"oklch(21% 0.006 285.885)"}
                />
              </span>
              <span>
                <Sword
                  className={`w-5 h-5 stroke-zinc-${character.armament_haki ? "900" : "400"}`}
                  opacity={character.armament_haki ? 1 : 0.3}
                  color={"oklch(21% 0.006 285.885)"}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Animation>
  );
};

export default CharacterCard;
