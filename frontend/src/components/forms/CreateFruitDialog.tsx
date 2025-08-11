"use client";

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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import ImageLoader from "../ui/ImageLoader";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { z } from "zod";
import { DevilfruitSchema } from "@/lib/schemas/DevilfruitSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { uploadImage } from "@/features/imageContent";
import { toast } from "sonner";
import { verifyLogin } from "@/features/auth";
import ToLoginDialog from "./toLoginDialog";
import { useAuthStore } from "@/store/auth";

type FruitData = z.infer<typeof DevilfruitSchema>;

interface Props {
  children?: React.ReactNode;
}

const CreateFruitDialog: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FruitData>({
    resolver: zodResolver(DevilfruitSchema),
    defaultValues: {
      name: "",
      description: null,
      img_url: null,
      type: "P",
    },
  });

  const onSubmit = async (data: FruitData) => {
    await verifyLogin();
    const payload = { ...data };

    if (image) {
      await uploadImage(image, "fruit", data.name + "-image")
        .then((response) => {
          payload.img_url = response.image;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
    console.log("posting", payload);
    api
      .post("api/content/devilfruits/", payload)
      .then((response) => {
        console.log("Fruta adicionada com sucesso:", response.data);
        setImage(null); // Reset image after submission
        setOpen(false);
        toast.success("Fruta adicionada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar fruta:", error);
      });
  };
  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
    if (errors.type) {
      toast.error(errors.type.message);
    }
    if (errors.img_url) {
      toast.error(errors.img_url.message);
    }
  }, [errors]);

  if (!isAuthenticated) {
    return <ToLoginDialog />;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            className="w-10 p-0 h-10 bg-zinc-300 rounded-sm text-zinc-800 hover:text-purple-800 hover:bg-zinc-800"
            variant="blue"
          >
            <Plus></Plus>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-purple-200">
        <form
          onSubmit={handleSubmit(onSubmit, () => {
            console.log(errors);
          })}
        >
          <DialogHeader>
            <DialogTitle className="font-pirate text-purple-900 flex justify-between">
              Adicionar Fruta
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex flex-col gap-2 py-4">
            <div className="w-full flex gap-4 justify-between">
              <div className="flex-1 gap-2 flex flex-col">
                <div className="flex flex-col justify-between w-full">
                  <span className="text-xs ml-3 font-semibold text-zinc-700">
                    Nome
                  </span>
                  <Input
                    placeholder="Hito Hito No M..."
                    variant="insertform"
                    {...register("name")}
                  />
                </div>
                <div className="flex flex-col w-full h-full">
                  <RadioGroup
                    defaultValue="P"
                    className="w-full h-full flex items-center justify-between"
                    {...register("type")}
                  >
                    <div className="flex flex-col gap items-center">
                      <label className="text-zinc-800 text-sm">Paramecia</label>
                      <RadioGroupItem value="P" />
                    </div>
                    <div className="flex flex-col gap items-center">
                      <label className="text-zinc-800 text-sm">Zoan</label>
                      <RadioGroupItem value="Z" />
                    </div>
                    <div className="flex flex-col gap items-center">
                      <label className="text-zinc-800 text-sm">Logia</label>
                      <RadioGroupItem value="L" />
                    </div>
                  </RadioGroup>
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
            <div className="w-full">
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
              className="bg-purple-900 text-purple-200 hover:bg-purple-800"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFruitDialog;
