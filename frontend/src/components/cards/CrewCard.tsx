import { Crew } from "@/lib/types/crews";
import Link from "next/link";
import Animation from "../Anims";
import Image from "next/image";

interface Props {
  crew: Crew;
}

const CrewCard: React.FC<Props> = ({ crew }) => {
  return (
    <Animation animation="grow">
      <Link href={`/frutas/${crew.id}`}>
        <div className="flex relative group justify-center">
          <div
            className="w-fit gap-1 border-indigo-700 flex flex-col
            items-center border rounded p-4 hover:cursor-pointer hover:bg-indigo-600 transition duration-300
            bg-gradient-to-b from-sky-950 to-indigo-700 hover:from-indigo-950 hover:to-indigo-500"
          >
            <div className="w-32 h-32 relative">
              <Image
                src={crew.img_url}
                alt={`${crew.name} portrait`}
                fill
                className="object-cover border border-zinc-500 rounded-sm"
              />
            </div>
            <span className="font-pirate group-hover:text-zinc-50 transition text-zinc-300">
              {crew.name}
            </span>
            <div className="w-full px-4 flex justify-between"></div>
          </div>
        </div>
      </Link>
    </Animation>
  );
};

export default CrewCard;
