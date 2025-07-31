import { ListFilter, LucidePlus, Search } from "lucide-react";
import { Button } from "../ui/button";
import BackButton from "../buttons/BackButton";
import { Input } from "../ui/input";
const CardListBar: React.FC = () => {
  return (
    <div className="w-full pt-1 border-zinc-500/60 px-2 flex justify-between items-center">
      <BackButton />
      <div className="flex gap-2">
        <Button className="w-10 p-0 h-10 bg-zinc-300 text-zinc-800 rounded-sm hover:bg-zinc-800 hover:text-purple-800">
          <ListFilter />
        </Button>
        <div className="h-10 flex items-center rounded-sm bg-zinc-300">
          <Search className="pl-2" />
          <Input variant="inv" placeholder="Filtrar" />
        </div>
        <Button
          className="w-10 p-0 h-10 bg-zinc-300 rounded-sm text-zinc-800 hover:text-purple-800 hover:bg-zinc-800"
          variant="inv"
        >
          <LucidePlus />
        </Button>
      </div>
    </div>
  );
};

export default CardListBar;
