import PageImage from "@/components/layout/PageImage";
import Poster from "@/components/poster/Poster";
import { fetchPirateById } from "@/features/characterContent";

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
      <PageImage
        name={pirate.name}
        charId={pirate.id}
        imageUrl={pirate.img_url}
        type="pirate"
      />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-zinc-300 to-zinc-200">
        <Poster pirate={pirate} />
      </div>
    </div>
  );
};

export default PiratePage;
