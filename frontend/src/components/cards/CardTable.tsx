import CharCol from "./CharCol";
import CrewCol from "./CrewCol";
import FruitsCol from "./FruitsCol";

const CardTable: React.FC = () => {
  return (
    <div className="max-w-[75vw] w-full rounded-t-sm border border-beige-dark bg-beige/70 flex-1 min-h-0 flex gap-1 divide-x divide-beige-dark">
      <CharCol />
      <FruitsCol />
      <CrewCol />
    </div>
  );
};

export default CardTable;
