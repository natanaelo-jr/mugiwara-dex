import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Upload } from "lucide-react";

interface Props {
  fieldName: string;
  onSave: (newValue: File) => void;
  children: React.ReactNode;
}

const ChangeImageDialog: React.FC<Props> = ({
  fieldName,
  onSave,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<File | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-300">
        <DialogTitle className="font-pirate text-zinc-800">
          Mudar {fieldName}
        </DialogTitle>
        <div className="py-2 w-full flex justify-center">
          <label>
            <span className="text-sm px-2 text-zinc-700 hover:cursor-pointer font-medium">
              <Upload className="w-10 h-10" />
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden w-full h-full"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue(e.target.files[0]);
                }
              }}
            />
          </label>
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

export default ChangeImageDialog;
