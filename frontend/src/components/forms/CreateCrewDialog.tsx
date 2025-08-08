import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import ImageLoader from "../ui/ImageLoader";
import { GenericCombobox } from "../ui/combobox";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrewSchema } from "@/lib/schemas/CrewSchema";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { uploadImage } from "@/features/imageContent";
import { toast } from "sonner";
import { verifyLogin } from "@/features/auth";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { fetchPiratePage } from "@/features/characterContent";

type CrewData = z.infer<typeof CrewSchema>;

interface Props {
  children?: React.ReactNode;
}

const CreateCrewDialog: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CrewData>({
    resolver: zodResolver(CrewSchema),
    defaultValues: {
      name: "",
      description: null,
      img_url: null,
      captain: null,
    },
  });
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstError = errors[firstErrorKey as keyof CrewData];
      if (firstError && firstError.message) {
        toast.error(firstError.message.toString());
      }
    }
  }, [errors]);

  const onSubmit = async (data: CrewData) => {
    await verifyLogin();
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para criar uma tripulação.");
      return;
    }
    const payload = { ...data };
    if (image) {
      const response = await uploadImage(image, "crew", data.name + "_image");
      payload.img_url = response.image;
    }
    toast.promise(
      api
        .post("/api/content/crews/", payload)
        .then((response) => {
          setOpen(false);
          return response;
        })
        .catch((error) => {
          if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail);
          } else {
            throw new Error("Ocorreu um erro ao criar a tripulação.");
          }
        }),
      {
        loading: "Criando tripulação...",
        success: "Tripulação criada com sucesso!",
        error: (err) => err.message,
      },
    );
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children ? (
            children
          ) : (
            <Button>
              <Plus></Plus>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="bg-zinc-300 outline-none">
          <form
            onSubmit={handleSubmit(onSubmit, () => {
              console.log(errors);
            })}
          >
            <DialogHeader>
              <DialogTitle className="font-pirate text-zinc-950 flex justify-between">
                Adicionar Tripulação
              </DialogTitle>
            </DialogHeader>

            <div className="w-full flex flex-col gap-2 py-4">
              <div className="w-full flex gap-4 justify-between">
                <div className="flex-1 gap-2 flex flex-col justify-between">
                  <div className="flex flex-col justify-between w-full">
                    <span className="text-xs ml-3 font-semibold text-zinc-700">
                      Nome
                    </span>
                    <Input
                      placeholder="Os Piratas do Car..."
                      variant="insertform"
                      {...register("name")}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="text-xs text-zinc-700 font-semibold ml-3">
                      Capitão
                    </span>
                    <Controller
                      control={control}
                      name={"captain"}
                      render={({ field }) => (
                        <GenericCombobox
                          fetchFunction={fetchPiratePage}
                          value={field.value}
                          onSelect={field.onChange}
                          placeholder="Selecione o Capitão"
                          emptyMessage="Nenhum Capitão encontrado"
                        />
                      )}
                    />
                  </div>
                </div>
                <div>
                  <ImageLoader
                    onFileP={(f) => {
                      setImage(f);
                    }}
                    onFileI={() => {}}
                    onlyPortrait={true}
                  />
                </div>
              </div>
              <div className="w-full pt-8">
                <div className="flex flex-col">
                  <span className="text-xs ml-3 font-semibold text-zinc-700">
                    Descrição
                  </span>
                </div>
                <Textarea
                  className="h-30"
                  placeholder="Escreva uma descrição..."
                  {...register("description")}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="cancel" className="">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-zinc-950 text-yellow-200 hover:bg-zinc-900 hover:text-zinc-50"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCrewDialog;
