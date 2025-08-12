import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface Props {
  fieldName: string;
  fieldValue?: string;
  onSave: (newValue: string) => void;
  children: React.ReactNode;
  type?: "input" | "textarea" | "number";
}

const ChangeFieldDialog: React.FC<Props> = ({
  fieldName,
  onSave,
  fieldValue,
  children,
  type = "input",
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
        <div className="w-full py-4">
          {(type === "input" || type === "number") && (
            <Input
              value={value ? value : ""}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Digite o novo texto para ${fieldName.toLowerCase()}...`}
              className="w-full"
              variant="insertform"
              type={type === "number" ? "number" : "text"}
            />
          )}
          {type === "textarea" && (
            <Textarea
              value={value ? value : ""}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Digite o novo texto para ${fieldName.toLowerCase()}...`}
              className="w-full h-32 p-2"
              maxLength={500}
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
                onSave(value);
                setValue(undefined);
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

export default ChangeFieldDialog;
