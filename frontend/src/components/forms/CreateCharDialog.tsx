"use client";

import { Eye, Sword, Crown } from "lucide-react";
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
import { useEffect, useState } from "react";
import { motion, spring } from "framer-motion";
import Pirate from "@/svg/Pirate";
import Anchor from "@/svg/Anchor";
import Selector from "../buttons/rewrites/Selector";
import { CrewCombobox, FruitCombobox } from "../ui/combobox";
import ImageLoader from "../ui/ImageLoader";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Controller, useForm } from "react-hook-form";
import { PirateSchema, MarineSchema } from "@/lib/schemas/CharacterSchema";
import { uploadImage } from "@/features/imageContent";
import { verifyLogin } from "@/features/auth";
import api from "@/lib/api";


type pirateData = z.infer<typeof PirateSchema>
type marineData = z.infer<typeof MarineSchema>

const CreateCharDialog: React.FC = () => {
    const [typePirate, toggleTypePirate] = useState(true);
    const toggleType = () => toggleTypePirate(!typePirate);
    const [portraitFile, setPortraitFile] = useState<File | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null);

    const positionsMap = new Map(
        [["Almirante", "Admiral"],
        ["Vice Almirante", "Vice Admiral"],
        ["Contra Almirante", "Rear Admiral"],
        ["Capitão", "Captain"],
        ["Tenente", "Lieutenant"],
        ["Marinheiro", "Marine"]]
    )

    const inversePositionsMap = new Map(
        [["Admiral", "Almirante"],
        ["Vice Admiral", "Vice Almirante"],
        ["Rear Admiral", "Contra Almirante"],
        ["Captain", "Capitão"],
        ["Lieutenant", "Tenente"],
        ["Marine", "Marinheiro"]])

    const marineForm = useForm<marineData>({
        resolver: zodResolver(MarineSchema),
        defaultValues: {
            name: "",
            age: 0,
            description: "",
            history: "",
            observation_haki: false,
            armament_haki: false,
            conqueror_haki: false,
            img_url: null,
            portrait_url: null,
            devilfruit: null,
            position: "Admiral",
        },
    })

    const pirateForm = useForm<pirateData>({
        resolver: zodResolver(PirateSchema),
        defaultValues: {
            name: "",
            age: 0,
            bounty: 0,
            description: "",
            history: "",
            observation_haki: false,
            armament_haki: false,
            conqueror_haki: false,
            img_url: null,
            portrait_url: null,
            devilfruit: null,
            crew: null,
        },
    })
    const { register: registerPirate, handleSubmit: handleSubmitPirate, formState: { errors: errorsPirate } } = pirateForm;
    const { register: registerMarine, handleSubmit: handleSubmitMarine, formState: { errors: errorsMarine } } = marineForm;

    const onInvalid = (errors: any) => {
        console.error("Erros de validação do formulário:", errors);
    };
    useEffect(() => {
        verifyLogin()
    }, [])

    useEffect(() => {
        console.log("Errors in Pirate Form:", errorsPirate);
        console.log("Errors in Marine Form:", errorsMarine);
    }, [errorsPirate, errorsMarine]);

    const onSubmit = async (data: pirateData | marineData) => {


        const payload = { ...data }
        if (portraitFile) {
            const portraitResponse = await uploadImage(portraitFile, "portrait", data.name + "-portrait");
            payload.portrait_url = portraitResponse.image;
        }
        if (imageFile) {
            const imageResponse = await uploadImage(imageFile, "character", data.name + "-image");
            payload.img_url = imageResponse.image;
        }
        payload.description = payload.description || "";
        payload.history = payload.history || "";

        const endpoint = typePirate ? "api/content/pirates/" : "api/content/marines/";

        console.log("Submitting character data:", payload);

        api.post(endpoint, payload).then(res => {
            console.log("Character created successfully:", res.data);
            if (typePirate) {
                pirateForm.reset();
            } else {
                marineForm.reset();
            }
        }).catch(error => { console.error(error) })

    }

    const renderHakiCheckbox = (field: any, label: string, icon: React.ReactNode) => (
        <div className="relative flex flex-col group items-center gap-2">
            <span className="group-hover:opacity-100 text-zinc-700 opacity-0 text-xs absolute text-nowrap bottom-[-24px] transition">
                {label}
            </span>
            {icon}
            <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="rounded-xs border-zinc-600 hover:cursor-pointer"
            />
        </div>
    );
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="w-10 p-0 h-10 bg-zinc-300 rounded-sm text-zinc-800 hover:text-purple-800 hover:bg-zinc-800"
                        variant="blue"
                    >
                        <LucidePlus />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[40vw] bg-zinc-300">
                    <form onSubmit={typePirate ? handleSubmitPirate(onSubmit, onInvalid) : handleSubmitMarine(onSubmit, onInvalid)}>
                        <DialogHeader>
                            <DialogTitle className="font-pirate flex justify-between text-zinc-800">
                                Adicionar {typePirate ? "Pirata" : "Marinheiro"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex w-full items-end gap-2 flex-col">
                            <div className="w-full gap-4 items-center flex justify-between">
                                <div className="relative flex flex-col">
                                    <span className="text-xs ml-3 font-semibold text-zinc-600">
                                        Nome
                                    </span>
                                    <Input
                                        className="w-full placeholder:font-normal"
                                        placeholder={"Roronoa Z..."}
                                        variant="insertform"
                                        {...(typePirate ? registerPirate("name") : registerMarine("name"))}
                                    />
                                </div>
                                <div
                                    onClick={toggleType}
                                    className={`flex h-10 w-18 cursor-pointer rounded-full p-1 transition-colors duration-300 ${typePirate
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
                            <div className="w-full flex justify-between">
                                <div className="flex flex-col w-full justify-between">
                                    <div className="flex items-center gap-2 pr-2">
                                        <div className="w-20 flex-col">
                                            <span className="text-xs w-full font-bold text-zinc-700 ml-3">Idade</span>
                                            <Input variant="insertform" type="number" className="w-full" placeholder="19" min={0}
                                                {...(typePirate ? registerPirate("age", { valueAsNumber: true }) : registerMarine("age", { valueAsNumber: true }))} />
                                        </div>
                                        <div className="w-full">
                                            {typePirate ?
                                                <div><span className="text-xs font-bold text-zinc-700 ml-3 w-40">Recompensa</span>
                                                    <Input variant="insertform" type="number" min={0} placeholder="0"
                                                        {...registerPirate("bounty", { valueAsNumber: true })} />
                                                </div> :
                                                <div><span className="text-xs font-bold text-zinc-700 ml-3 w-40">Posição</span>
                                                    <Controller
                                                        control={marineForm.control}
                                                        name="position"
                                                        render={({ field }) => (
                                                            <Selector
                                                                values={Array.from(positionsMap.keys())}
                                                                value={inversePositionsMap.get(field.value) || "Marinheiro"}
                                                                onSelect={(v) => field.onChange(positionsMap.get(v) || "Marine")}
                                                            />)}
                                                    />
                                                </div>
                                            }

                                        </div>
                                    </div>
                                    <div className="w-full h-full flex flex-col justify-center py-2">
                                        <span className="text-xs font-semibold text-zinc-700 ml-3">Haki</span>
                                        <div className="w-full flex flex-1 items-center pr-8 pl-3 justify-between">
                                            {typePirate ? (
                                                <Controller control={pirateForm.control} name="observation_haki" render={({ field }) => renderHakiCheckbox(field, "Observação", <Eye className="text-zinc-700 w-5 h-5" />)} />
                                            ) : (
                                                <Controller control={marineForm.control} name="observation_haki" render={({ field }) => renderHakiCheckbox(field, "Observação", <Eye className="text-zinc-700 w-5 h-5" />)} />
                                            )}

                                            {/* Haki do Armamento */}
                                            {typePirate ? (
                                                <Controller control={pirateForm.control} name="armament_haki" render={({ field }) => renderHakiCheckbox(field, "Armamento", <Sword className="text-zinc-700 w-5 h-5" />)} />
                                            ) : (
                                                <Controller control={marineForm.control} name="armament_haki" render={({ field }) => renderHakiCheckbox(field, "Armamento", <Sword className="text-zinc-700 w-5 h-5" />)} />
                                            )}

                                            {/* Haki do Conquistador */}
                                            {typePirate ? (
                                                <Controller control={pirateForm.control} name="conqueror_haki" render={({ field }) => renderHakiCheckbox(field, "Conquistador", <Crown className="text-zinc-700 w-5 h-5" />)} />
                                            ) : (
                                                <Controller control={marineForm.control} name="conqueror_haki" render={({ field }) => renderHakiCheckbox(field, "Conquistador", <Crown className="text-zinc-700 w-5 h-5" />)} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <ImageLoader
                                        onFileP={(f) => { setPortraitFile(f) }}
                                        onFileI={(f) => { setImageFile(f) }}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-4 justify-between">
                                <div className="flex w-full flex-col">
                                    <span className="text-xs ml-3 text-zinc-700 font-semibold">Fruta</span>
                                    {typePirate ?
                                        <Controller
                                            control={pirateForm.control}
                                            name={"devilfruit"}
                                            render={({ field }) => (
                                                <FruitCombobox
                                                    onSelect={field.onChange}
                                                    value={field.value}
                                                />
                                            )} />
                                        :
                                        <Controller
                                            control={marineForm.control}
                                            name={"devilfruit"}
                                            render={({ field }) => (
                                                <FruitCombobox
                                                    onSelect={field.onChange}
                                                    value={field.value}
                                                />
                                            )} />
                                    }
                                </div>
                                {typePirate && <div className="w-full flex flex-col">
                                    <span className="text-xs ml-3 text-zinc-700 font-semibold">Tripulação</span>
                                    <Controller
                                        control={pirateForm.control}
                                        name="crew"
                                        render={({ field }) => <CrewCombobox onSelect={field.onChange} value={field.value} />}
                                    />
                                </div>}
                            </div>
                            <div className="w-full flex justify-between gap-2">
                                <div className="flex flex-col w-full">
                                    <span className="text-xs text-zinc-700 font-semibold pl-3">Descrição</span>
                                    <Input className="h-20 text-xs text-wrap w-full" variant="insertform" max="500"
                                        {...(typePirate ? registerPirate("description") : registerMarine("description"))} />
                                </div>
                                <div className="flex flex-col w-full">
                                    <span className="text-xs text-zinc-700 font-semibold pl-3">História</span>
                                    <Input className="h-20 text-xs text-wrap w-full" variant="insertform" max="500"
                                        {...(typePirate ? registerPirate("history") : registerMarine("history"))} />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button variant="cancel">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" variant="submit">
                                Adicionar
                            </Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default CreateCharDialog;
