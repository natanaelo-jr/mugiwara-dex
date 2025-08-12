"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import ChangeImageDialog from "../poster/ChangeImageDialog";
import Image from "next/image";
import { uploadImage } from "@/features/imageContent";
import { patchMarine, patchPirate } from "@/features/patches";
import { toast } from "sonner";
import { useState } from "react";
import { verifyLogin } from "@/features/auth";
import { useAuthStore } from "@/store/auth";

interface Props {
  type: "pirate" | "marine";
  imageUrl?: string;
  name: string;
  charId: number;
}

const PageImage: React.FC<Props> = ({ type, imageUrl, name, charId }) => {
  const [img, setImageUrl] = useState(imageUrl);

  const handleImageChange = async (newImage: File) => {
    await verifyLogin();

    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para fazer alterações.");
      return;
    }

    if (newImage) {
      uploadImage(newImage, "character", name + " image")
        .then((response) => {
          if (type === "marine") {
            return patchMarine(charId, "img_url", response.image);
          }
          return patchPirate(charId, "img_url", response.image);
        })
        .then((response) => {
          setImageUrl(response.img_url);
          toast.success("Imagem atualizada com sucesso!");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Erro ao atualizar a imagem.");
        });
    }
  };

  return (
    <div>
      <div className="absolute top-4 left-4 z-30">
        <Link href={"/personagens"}>
          <Button
            variant="inv"
            className="text-zinc-800 hover:bg-zinc-400 rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft />
          </Button>
        </Link>
      </div>
      <div className="relative h-screen w-[40vw] group bg-linear-to-r from-violet-600 to-zinc-300">
        <div className="absolute z-30 top-4 right-8">
          <ChangeImageDialog
            onSave={handleImageChange}
            fieldName="Imagem do Personagem"
          >
            <Button
              variant="inv"
              className="text-zinc-700 group-hover:opacity-100 opacity-0 hover:bg-zinc-200 rounded-full w-10 h-10 p-0"
            >
              <Pencil />
            </Button>
          </ChangeImageDialog>
        </div>
        {img && (
          <Image
            src={img}
            alt={`${name} image`}
            fill
            className="z-20 object-contain p-10"
          />
        )}
      </div>
    </div>
  );
};

export default PageImage;
