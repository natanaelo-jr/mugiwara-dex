import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: React.ReactNode;
}
const ToLoginDialog: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {children ? (
            children
          ) : (
            <Button
              className="w-10 p-0 h-10 bg-zinc-300 rounded-sm text-zinc-800 hover:text-purple-800 hover:bg-zinc-800"
              variant="blue"
            >
              <LucidePlus />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="bg-zinc-300 border-none">
          <DialogTitle className="font-pirate">Sem autenticação!</DialogTitle>
          <div className="flex flex-col justify-center items-center gap-4 py-4">
            <span className="font-semibold text-zinc-800">
              Esta função é apenas para usuários autenticados.
            </span>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="text-zinc-700" variant="inv">
                  Voltar
                </Button>
              </DialogClose>
              <Link href="/login">
                <Button variant="blue">Fazer Login</Button>
              </Link>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToLoginDialog;
