"use client";
import { Pirate } from "@/lib/types/characters";
import Beries from "@/svg/Beries";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import CrewCard from "../cards/CrewCard";
import { useEffect, useState } from "react";
import { DevilFruit } from "@/lib/types/devilfruits";
import { Crew } from "@/lib/types/crews";
import api from "@/lib/api";
import FruitCard from "../cards/FruitCard";
import ChangeFieldDialog from "./ChangeFieldDialog";
import ChangeBoxDialog from "./ChangeBoxDialog";
import { patchPirate } from "@/features/patches";
import { verifyLogin } from "@/features/auth";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

interface Props {
  pirate: Pirate;
}

const Poster: React.FC<Props> = ({ pirate }) => {
  const [crew, setCrew] = useState<Crew>();
  const [fruit, setFruit] = useState<DevilFruit>();

  const [devilFruitId, setDevilFruitId] = useState<number | undefined>(
    pirate.devilfruit,
  );
  const [crewId, setCrewId] = useState<number | undefined>(pirate.crew);

  const [name, setName] = useState<string>(pirate.name);
  const [bounty, setBounty] = useState<number>(pirate.bounty);
  const [description, setDescription] = useState<string | undefined>(
    pirate.description,
  );
  const [history, setHistory] = useState<string | undefined>(pirate.history);

  useEffect(() => {
    if (crewId) {
      api
        .get(`api/content/crews/${crewId}`)
        .then((res) => setCrew(res.data))
        .catch((err) => console.error(err));
    }
    if (devilFruitId) {
      api
        .get(`api/content/devilfruits/${devilFruitId}`)
        .then((res) => setFruit(res.data))
        .catch((err) => console.error(err));
    }
  }, [devilFruitId, crewId]);

  const handleNameChange = async (newName: string) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }

    patchPirate(pirate.id, "name", newName)
      .then(() => {
        toast.success("Nome atualizado com sucesso!");
        setName(newName);
      })
      .catch(() => {
        toast.error("Erro ao atualizar o nome!");
      });
  };

  const handleBountyChange = async (newBounty: number) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }

    patchPirate(pirate.id, "bounty", newBounty)
      .then(() => {
        toast.success("Recompensa atualizada com sucesso!");
        setBounty(newBounty);
      })
      .catch(() => {
        toast.error("Erro ao atualizar a recompensa!");
      });
  };

  const handleDescriptionChange = async (newDescription: string) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }
    patchPirate(pirate.id, "description", newDescription)
      .then(() => {
        toast.success("Descrição atualizada com sucesso!");
        setDescription(newDescription);
      })
      .catch(() => {
        toast.error("Erro ao atualizar a descrição!");
      });
  };

  const handleHistoryChange = async (newHistory: string) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }
    patchPirate(pirate.id, "history", newHistory)
      .then(() => {
        toast.success("História atualizada com sucesso!");
        setHistory(newHistory);
      })
      .catch(() => {
        toast.error("Erro ao atualizar a história!");
      });
  };

  const handleCrewChange = async (newCrewId: number | null) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }
    patchPirate(pirate.id, "crew", newCrewId)
      .then(() => {
        toast.success("Tripulação atualizada com sucesso!");
        setCrewId(newCrewId ? newCrewId : undefined);
      })
      .catch(() => {
        toast.error("Erro ao atualizar a tripulação!");
      });
  };

  const handleFruitChange = async (newFruitId: number | null) => {
    await verifyLogin();
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para editar!");
    }
    patchPirate(pirate.id, "devilfruit", newFruitId)
      .then(() => {
        toast.success("Fruta do diabo atualizada com sucesso!");
        setDevilFruitId(newFruitId ? newFruitId : undefined);
      })
      .catch(() => {
        toast.error("Erro ao atualizar a fruta do diabo!");
      });
  };

  return (
    <div className="w-full h-screen overflow-auto flex py-8 justify-center">
      <div className="px-2 py-4 text-zinc-800 gap-2 flex flex-col items-center w-full">
        <span className="text-6xl font-tnr scale-y-150">WANTED</span>
        <p className="text-4xl pt-2 font-century origin-bottom scale-y-110">
          DEAD OR ALIVE
        </p>
        <div className="relative">
          <ChangeFieldDialog
            fieldName="Nome"
            onSave={handleNameChange}
            fieldValue={name}
          >
            <Button
              className="absolute z-30 top-0 right-0 p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
              variant="inv"
            >
              <Pencil />
            </Button>
          </ChangeFieldDialog>
          <h1 className="text-6xl font-century p-3 text-center max-w-[40vw] uppercase scale-y-110">
            {name}
          </h1>
        </div>
        <div className="relative">
          <ChangeFieldDialog
            fieldName="Recompensa"
            onSave={(v) => handleBountyChange(Number(v))}
            fieldValue={bounty.toString()}
            type="number"
          >
            <Button
              className="absolute z-30 top-0 right-0 p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
              variant="inv"
            >
              <Pencil />
            </Button>
          </ChangeFieldDialog>
          <div className="p-3 flex items-center">
            <Beries size={40} />
            <span className="text-5xl -ml-2 font-thin font-century px-2">
              {bounty.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </span>
          </div>
        </div>
        <div className="flex flex-col pt-8 w-full px-40">
          <div className="flex items-center gap-1">
            <label className="font-semibold text-zinc-600">Descrição</label>
            <ChangeFieldDialog
              fieldName="Descrição"
              onSave={handleDescriptionChange}
              fieldValue={description}
              type="textarea"
            >
              <Button
                className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                variant="inv"
              >
                <Pencil />
              </Button>
            </ChangeFieldDialog>
          </div>
          <p className="h-24 overflow-auto text-sm text-zinc-700">
            {description}
          </p>
        </div>
        <div className="flex flex-col w-full px-40">
          <div className="flex items-center gap-1">
            <label className="font-semibold text-zinc-600">História</label>
            <ChangeFieldDialog
              onSave={handleHistoryChange}
              fieldName="História"
              fieldValue={history}
              type="textarea"
            >
              <Button
                className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                variant="inv"
              >
                <Pencil />
              </Button>
            </ChangeFieldDialog>
          </div>
          <p className="h-24 overflow-auto text-sm text-zinc-700">{history}</p>
        </div>
        <div className="w-full pb-4 px-40 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <label className="font-semibold text-zinc-600">Tripulação</label>
              <ChangeBoxDialog
                fieldName="Tripulação"
                onSave={(v) => handleCrewChange(v ? Number(v) : null)}
                fieldValue={crew ? crew.id : null}
                type="crew"
              >
                <Button
                  className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                  variant="inv"
                >
                  <Pencil />
                </Button>
              </ChangeBoxDialog>
            </div>

            {crew ? (
              <CrewCard crew={crew} />
            ) : (
              <span className="text-sm text-zinc-700">Sem tripulação</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <label className="font-semibold text-zinc-600">Fruta</label>
              <ChangeBoxDialog
                onSave={(v) => handleFruitChange(v ? Number(v) : null)}
                fieldName="Fruta"
                type="fruit"
                fieldValue={pirate.devilfruit ? pirate.devilfruit : null}
              >
                <Button
                  className="p-0 h-4 w-4 text-zinc-700/30 hover:text-zinc-700/100"
                  variant="inv"
                >
                  <Pencil />
                </Button>
              </ChangeBoxDialog>
            </div>

            {fruit ? (
              <FruitCard devilFruit={fruit} />
            ) : (
              <span className="text-sm text-zinc-700">Sem fruta</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
