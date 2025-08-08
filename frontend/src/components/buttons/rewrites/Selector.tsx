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
    value: string
}

const Selector: React.FC<Props> = ({ values, onSelect, value }) => {
    return (
        <Select
            value={value}
            onValueChange={onSelect}
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
