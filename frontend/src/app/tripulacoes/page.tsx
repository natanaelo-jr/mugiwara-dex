import CrewsPagination from "@/components/pages/CrewsPagination";

const FruitsPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-[url('/images/tripulacoes-background.png')] bg-cover bg-no-repeat bg-fixed flex items-center justify-center">
      <div className="flex h-full gap-4 flex-col py-4 items-center w-full px-40">
        <div className="flex w-full justify-center items-center relative">
          <h1 className="text-4xl font-pirate text-indigo-300">Tripulações</h1>
        </div>
        <CrewsPagination />
      </div>
    </div>
  );
};

export default FruitsPage;
