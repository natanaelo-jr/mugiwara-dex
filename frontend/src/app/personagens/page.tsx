import CharactersPagination from "@/components/pages/CharactersPagination";

const CharactersPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-[url('/images/paper-background.png')] bg-cover bg-no-repeat bg-fixed flex items-center justify-center">
      <div className="flex h-full gap-4 flex-col py-4 items-center w-full px-40">
        <div className="flex w-full justify-center items-center relative">
          <h1 className="text-4xl font-pirate text-zinc-800">Personagens</h1>
        </div>
        <CharactersPagination />
      </div>
    </div>
  );
};

export default CharactersPage;
