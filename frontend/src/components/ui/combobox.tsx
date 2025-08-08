"use client";
import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, LoaderCircle } from "lucide-react";
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

interface BaseOption {
  id: number;
  name: string;
}

interface GenericComboboxProps<T extends BaseOption> {
  value: number | null;
  onSelect: (value: number | null) => void;
  fetchFunction: (
    page: number,
    pageSize: number,
    search: string,
  ) => Promise<{ results: T[] }>;
  placeholder?: string;
  emptyMessage?: string;
  noneLabel?: string;
}

export function GenericCombobox<T extends BaseOption>({
  value,
  onSelect,
  fetchFunction,
  placeholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado.",
  noneLabel = "Nenhum selecionado",
}: GenericComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [selection, setSelection] = useState<T | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selectedOption = options.find((option) => option.id === value);
    setSelection(selectedOption || null);
  }, [value, options]);

  useEffect(() => {
    setLoading(true);
    fetchFunction(1, 10, search)
      .then((response) => {
        setOptions(response.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [search, fetchFunction]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combo"
          role="combobox"
          aria-expanded={open}
          className="justify-between py-3 font-regular text-sm font-sans w-full"
        >
          {selection ? selection.name : noneLabel}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="bg-zinc-300 border-none">
          <CommandInput
            onValueChange={setSearch}
            placeholder={placeholder}
            className="border-none"
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <span className="w-full text-zinc-700 flex justify-center items-center animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                emptyMessage
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  className="hover:bg-zinc-400 text-zinc-700 hover:text-zinc-900 transition-all duration-300"
                  onSelect={(currentValue) => {
                    const selected = options.find(
                      (o) => o.name === currentValue,
                    );
                    if (selected) {
                      if (selected.id === value) {
                        setSelection(null);
                        onSelect(null);
                      } else {
                        setSelection(selected);
                        onSelect(selected.id);
                      }
                      setOpen(false);
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selection?.id === option.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
