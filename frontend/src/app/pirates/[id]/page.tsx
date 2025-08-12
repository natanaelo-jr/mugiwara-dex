import Poster from "@/components/poster/Poster";
import { Button } from "@/components/ui/button";
import { fetchPirateById } from "@/features/characterContent";
import { ArrowLeft, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PiratePageProps {
  params: {
    id: string;
  };
}

const PiratePage: React.FC<PiratePageProps> = async ({ params }) => {
  const { id } = await params;
  const pirate = await fetchPirateById(parseInt(id)).catch(() => null);

  if (!pirate) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl font-pirate text-blue-950 bg-linear-to-b from-blue-300 to-blue-500">
        Pirata não encontrado
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-blue-300 flex">
      <div className="absolute top-4 left-4 z-30">
        <Link href={"/personagens"}>
          <Button
            variant="inv"
            className="text-zinc-800 hover:bg-zinc-400 rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft />
          </Button>
        </Link>
      </div>
      <div className="relative h-screen w-[40vw] group bg-linear-to-r from-violet-600 to-zinc-300">
        <div className="absolute z-30 top-4 right-8">
          <Button
            variant="inv"
            className="text-zinc-700 group-hover:opacity-100 opacity-0 hover:bg-zinc-200 rounded-full w-10 h-10 p-0"
          >
            <Pencil />
          </Button>
        </div>
        {pirate && (
          <Image
            src={pirate.img_url}
            alt={`${pirate.name} image`}
            fill
            className="z-20 object-contain p-10"
          />
        )}
      </div>
      <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-zinc-300 to-zinc-200">
        <Poster pirate={pirate} />
      </div>
    </div>
  );
};

export default PiratePage;
