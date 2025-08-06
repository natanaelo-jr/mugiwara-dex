import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  values: string[];
  onSelect: (value: string) => void;
}

const Selector: React.FC<Props> = ({ values, onSelect }) => {
  return (
    <Select
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder="Selecionar Posição..."
          className="placeholder:text-zinc-600"
        />
      </SelectTrigger>
      <SelectContent>
        {values.map((selection) => (
          <SelectItem key={selection} value={selection}>
            {selection}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selector;
