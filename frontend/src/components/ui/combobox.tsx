"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, LoaderCircle } from "lucide-react";
import { DevilFruit } from "@/lib/types/devilfruits";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchDevilFruitPage } from "@/features/devilFruitContent";
import { Crew } from "@/lib/types/crews";
import { fetchCrewPage } from "@/features/crewContent";

export const FruitCombobox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DevilFruit[]>([]);
  const [selection, setSelection] = useState<DevilFruit | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDevilFruitPage(1, 10, search)
      .then((response) => {
        setOptions(response.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combo"
          role="combobox"
          aria-expanded={open}
          className="justify-between py-3 font-regular text-sm font-sans w-full"
        >
          {selection ? selection.name : "Sem Fruta"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command className="bg-zinc-300 border-none">
          <CommandInput
            onValueChange={(v) => setSearch(v)}
            className="border-none"
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <span className=" w-full text-zinc-700 flex justify-center items-center animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                "Sem fruta encontrada."
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((v) => (
                <CommandItem
                  className="hover:bg-zinc-400 text-zinc-700 hover:text-zinc-900 transition-all duration-300"
                  key={v.id}
                  value={v.name}
                  onSelect={(currentValue) => {
                    const selected = options.find(
                      (v) => v.name === currentValue,
                    );
                    if (selected) {
                      selected == selection
                        ? setSelection(null)
                        : setSelection(selected);
                    }
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selection?.id === v.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {v.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CrewCombobox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Crew[]>([]);
  const [selection, setSelection] = useState<Crew | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCrewPage(1, 10, search)
      .then((response) => {
        setOptions(response.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combo"
          role="combobox"
          aria-expanded={open}
          className="justify-between py-3 font-regular text-sm font-sans w-full"
        >
          {selection ? selection.name : "Sem Tripulação"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="bg-zinc-300 border-none">
          <CommandInput
            onValueChange={(v) => setSearch(v)}
            placeholder="Selecionar fruta..."
            className="border-none"
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <span className=" w-full text-zinc-700 flex justify-center items-center animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                "Sem fruta encontrada."
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((v) => (
                <CommandItem
                  className="hover:bg-zinc-400 text-zinc-700 hover:text-zinc-900 transition-all duration-300"
                  key={v.id}
                  value={v.name}
                  onSelect={(currentValue) => {
                    const selected = options.find(
                      (v) => v.name === currentValue,
                    );
                    if (selected) {
                      selected == selection
                        ? setSelection(null)
                        : setSelection(selected);
                    }
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selection?.id === v.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {v.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
