import CharCol from "./CharCol";

const CardTable: React.FC = () => {
  return (
    <div className="max-w-[75vw] w-full rounded-t-sm border border-beige-dark bg-beige/70 flex-1 min-h-0 flex gap-1 divide-x divide-beige-dark">
      <CharCol />
      <CharCol />
      <CharCol />
    </div>
  );
};

export default CardTable;
