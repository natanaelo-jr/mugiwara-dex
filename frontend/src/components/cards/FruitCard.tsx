import { DevilFruit } from "@/lib/types/devilfruits";
import Link from "next/link";
import Animation from "../Anims";
import Image from "next/image";

interface Props {
  devilFruit: DevilFruit;
}

const FruitCard: React.FC<Props> = ({ devilFruit }) => {
  return (
    <Animation animation="grow">
      <Link href={`/frutas/${devilFruit.id}`}>
        <div className="flex relative group justify-center">
          <div className="bg-gradient-to-br from-fuchsia-600 to-emerald-600 hover:border-fuchsia-900 hover:from-emerald-900 hover:to-fuchsia-900 w-fit gap-1 border-fuchsia-900 flex flex-col items-center border rounded p-4 hover:cursor-pointer transition duration-300">
            <div className="w-32 h-32 relative">
              <Image
                src={devilFruit.img_url}
                alt={`${devilFruit.name} portrait`}
                fill
                className="object-cover border border-fuchsia-900 group-hover:border-zinc-500 transition rounded-sm"
              />
            </div>
            <span className="font-pirate group-hover:text-zinc-50 transition text-zinc-200">
              {devilFruit.name}
            </span>
            <div className="w-full px-4 flex justify-between"></div>
          </div>
        </div>
      </Link>
    </Animation>
  );
};

export default FruitCard;
