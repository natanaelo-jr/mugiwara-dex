import { fetchMarineById } from "@/features/characterContent";
import PageImage from "@/components/layout/PageImage";

interface MarinePageProps {
  params: {
    id: string;
  };
}

const MarinePage: React.FC<MarinePageProps> = async ({ params }) => {
  const { id } = await params;
  const marine = await fetchMarineById(parseInt(id)).catch(() => null);

  if (!marine) {
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl font-marine text-blue-950 bg-linear-to-b from-blue-300 to-blue-500">
        Marine não encontrado
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-blue-300 flex">
      <PageImage
        name={marine.name}
        charId={marine.id}
        imageUrl={marine.img_url}
        type="marine"
      />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-zinc-300 to-zinc-200">
        {/* Poster component can be added here */}
      </div>
    </div>
  );
};

export default MarinePage;
