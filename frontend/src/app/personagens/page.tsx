import PaginationComponent from "@/components/pages/Pagination";
import CharacterCard from "@/components/cards/CharacterCard";
import { testChar } from "@/lib/types/tests/characters";

const CharactersPage: React.FC = () => {
  return (
    <div className="w-full h-full bg-[url('/images/paper-background.png')] bg-cover bg-no-repeat bg-fixed flex items-center justify-center">
      <div className="flex h-full flex-col py-12 items-center w-full px-40">
        <div className="flex flex-1 h-min-0 justify-center items-center border w-full">
          <CharacterCard character={testChar} />
        </div>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default CharactersPage;
