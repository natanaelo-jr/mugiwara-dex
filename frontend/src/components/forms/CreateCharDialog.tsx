"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LucidePlus } from "lucide-react";
import { useState } from "react";
import { motion, spring } from "framer-motion";
import Pirate from "@/svg/Pirate";
import Anchor from "@/svg/Anchor";
import Selector from "../buttons/rewrites/Selector";
import { CrewCombobox, FruitCombobox } from "../ui/combobox";

const CreateCharDialog: React.FC = () => {
  const [typePirate, toggleTypePirate] = useState(true);
  const toggleType = () => toggleTypePirate(!typePirate);
  const positions = ["Almirante", "Vice Almirante"];

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              className="w-10 p-0 h-10 bg-zinc-300 rounded-sm text-zinc-800 hover:text-purple-800 hover:bg-zinc-800"
              variant="blue"
            >
              <LucidePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[40vw] bg-zinc-300">
            <DialogHeader>
              <DialogTitle className="font-pirate flex justify-between text-zinc-800">
                Adicionar {typePirate ? "Pirata" : "Marinheiro"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex w-full items-end gap-2 flex-col">
              <div className="w-full items-center flex justify-between">
                <Input
                  className="w-fit"
                  placeholder={"Nome"}
                  variant="insertform"
                />
                <div
                  onClick={toggleType}
                  className={`flex h-10 w-18 cursor-pointer rounded-full p-1 transition-colors duration-300 ${
                    typePirate
                      ? "justify-end bg-red-900"
                      : "justify-start bg-blue-900"
                  }`}
                >
                  <motion.div
                    className="h-8 w-8 rounded-full bg-white shadow-md"
                    layout
                    transition={{ type: spring, stiffness: 300, damping: 30 }}
                  >
                    <span>
                      {typePirate ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 100 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center text-zinc-800 w-full h-full"
                        >
                          <Pirate />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 100 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center text-zinc-800 w-full h-full"
                        >
                          <Anchor />{" "}
                        </motion.div>
                      )}
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between gap-4">
                  <Input
                    placeholder="23"
                    type="number"
                    min="0"
                    variant="insertform"
                    className="w-min"
                  />
                  {typePirate ? (
                    <CrewCombobox />
                  ) : (
                    <Selector
                      values={positions}
                      onSelect={(v) => {
                        console.log(v);
                      }}
                    />
                  )}
                </div>
              </div>
              <FruitCombobox />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="cancel">Cancelar</Button>
              </DialogClose>
              <Button type="submit" variant="submit">
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateCharDialog;
