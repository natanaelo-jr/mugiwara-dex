import { fetchPirateById } from "@/features/characterContent";
import Image from "next/image";

interface PiratePageProps {
  params: {
    id: string;
  };
}

const PiratePage: React.FC<PiratePageProps> = async ({ params }) => {
  const pirate = await fetchPirateById(parseInt(params.id)).catch(() => null);

  if (!pirate) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl font-pirate text-blue-950 bg-linear-to-b from-blue-300 to-blue-500">
        Pirata não encontrado
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-blue-300 flex">
      <div className="relative h-screen w-[40vw] bg-linear-to-r from-blue-300 to-blue-500">
        {pirate && (
          <Image
            src={pirate.img_url}
            alt={`${pirate.name} image`}
            fill
            className="z-20 object-contain p-10"
          />
        )}
      </div>
      <div className="flex-1 flex justify-center items-center bg-blue-500">
        <label className="text-4xl font-pirate text-blue-900">
          {pirate.name}
        </label>
      </div>
    </div>
  );
};

export default PiratePage;
