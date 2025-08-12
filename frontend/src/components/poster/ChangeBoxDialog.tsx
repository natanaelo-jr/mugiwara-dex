import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GenericCombobox } from "../ui/combobox";
import { fetchDevilFruitPage } from "@/features/devilFruitContent";
import { fetchCrewPage } from "@/features/crewContent";

interface Props {
  fieldName: string;
  fieldValue: number | null;
  onSave: (newValue: string) => void;
  children: React.ReactNode;
  type: "fruit" | "crew";
}

const ChangeBoxDialog: React.FC<Props> = ({
  fieldName,
  onSave,
  children,
  type,
  fieldValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(fieldValue);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-300">
        <DialogTitle className="font-pirate text-zinc-800">
          Mudar {fieldName}
        </DialogTitle>
        <div className="py-4 w-full">
          {type === "fruit" && (
            <GenericCombobox
              fetchFunction={fetchDevilFruitPage}
              placeholder="Selecione uma fruta"
              noneLabel="Sem Fruta"
              emptyMessage="Nenhuma fruta encontrada"
              onSelect={(value) => {
                setValue(value);
              }}
              value={value}
            />
          )}
          {type === "crew" && (
            <GenericCombobox
              fetchFunction={fetchCrewPage}
              placeholder="Selecione uma tripulação"
              noneLabel="Sem Tripulação"
              emptyMessage="Nenhuma tripulação encontrada"
              onSelect={(value) => {
                setValue(value);
              }}
              value={value}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="inv" className="text-zinc-800">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="blue"
            onClick={() => {
              if (value) {
                onSave(value.toString());
                setValue(null);
                setIsOpen(false);
              }
            }}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeBoxDialog;
