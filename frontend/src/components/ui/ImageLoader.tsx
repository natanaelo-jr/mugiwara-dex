import { cn } from "@/lib/utils";
import { ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import Image from "next/image";
import { uploadImage } from "@/features/imageContent";

interface Props {
  onFileP: (f: File) => void;
  onFileI: (f: File) => void;
  className?: string;
  onlyPortrait?: boolean;
}

const ImageLoader: React.FC<Props> = ({
  onFileP,
  onFileI,
  className,
  onlyPortrait = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errored, setErrored] = useState(false);
  const [previewP, setPreviewP] = useState<string | null>(null);
  const [previewI, setPreviewI] = useState<string | null>(null);

  const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileP(file);
      setPreviewP(URL.createObjectURL(file));
    }
  };
  const handleIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyPortrait) return;
    const file = e.target.files?.[0];
    if (file) {
      onFileI(file);
      setPreviewI(URL.createObjectURL(file));
    }
  };

  return (
    <Popover>
      <div className={cn("w-full h-full relative group", className)}>
        {!onlyPortrait && (
          <div className="z-[-1] w-30 h-50 absolute top-0 right-[-120px] group-hover:z-10 group-hover:opacity-90 opacity-0 transition">
            {previewI && !errored && (
              <img
                src={previewI}
                alt="Preview"
                className="object-cover w-full h-full rounded-sm"
                onLoad={() => setErrored(false)}
              />
            )}
          </div>
        )}
        <PopoverTrigger>
          <div
            className={cn(
              "relative w-40 hover:cursor-pointer aspect-square rounded-md border border-dashed flex items-center justify-center overflow-hidden",
              isFocused ? "border-zinc-600" : "border-zinc-400",
            )}
          >
            {previewP && !errored ? (
              <img
                src={previewP}
                alt="Preview"
                className="object-cover"
                onError={() => setErrored(true)}
                onLoad={() => setErrored(false)}
              />
            ) : (
              <div className="flex flex-col items-center text-zinc-500">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="text-xs">Inserir imagem</span>
              </div>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="bg-zinc-300 w-min gap-2 flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center shadow-md gap-3 w-min px-3 rounded-sm">
              <span className="ml-3 text-xs text-zinc-700">
                {onlyPortrait ? "Foto" : "Retrato"}
              </span>
              <label>
                <span className="text-sm px-2 hover:cursor-pointer text-zinc-700 font-medium">
                  <Upload className="w-4 h-4" />{" "}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden w-full h-full"
                  onChange={handlePChange}
                />
              </label>
              {/* <Input */}
              {/*     variant="inv" */}
              {/*     placeholder="https://exemplo.com/retrato.jpg" */}
              {/*     value={pvalue} */}
              {/*     onChange={(e) => { */}
              {/*         setErrored(false); */}
              {/*         onChangePortrait(e.target.value); */}
              {/*     }} */}
              {/*     onFocus={() => setIsFocused(true)} */}
              {/*     onBlur={() => setIsFocused(false)} */}
              {/* /> */}
            </div>
          </div>
          {!onlyPortrait && (
            <div className="flex flex-col">
              <div className="flex items-center shadow-md gap-3 w-min px-3 rounded-sm">
                <span className="ml-3 text-xs text-zinc-700">Imagem</span>
                <label>
                  <span className="text-sm px-2 text-zinc-700 hover:cursor-pointer font-medium">
                    <Upload className="w-4 h-4" />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden w-full h-full"
                    onChange={handleIChange}
                  />
                </label>
              </div>
            </div>
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
};
export default ImageLoader;
