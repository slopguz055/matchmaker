// useJamActions.ts
import { useState } from "react";
import { message } from "antd";
import { deleteJam, expelPlayer, leaveJam } from "./handleActions";
import { Jam } from "@/common/types/utility";

export const useJamActions = ({
  jam,
  onUpdate,
  onDelete,
  currentUserId,
}: {
  jam: Jam;
  onUpdate: (updatedJam: Jam) => void;
  onDelete?: (id: string) => void;
  currentUserId?: string;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingExpel, setLoadingExpel] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setLoadingDelete(true);
    try {
      await deleteJam(jam.id);
      messageApi.success("Jam eliminada correctamente");
      await new Promise((r) => setTimeout(r, 500));
      onDelete(jam.id);
    } catch (e) {
      console.error(e);
      messageApi.error("No se pudo eliminar la jam. Inténtalo más tarde.");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleConfirmExpel = async (playerId: string) => {
    setLoadingExpel(true);
    try {
      const updatedJam = await expelPlayer(jam.id, playerId);
      messageApi.success("Jugador expulsado correctamente");
      onUpdate(updatedJam);
    } catch (e) {
      console.error(e);
      messageApi.error("No se pudo expulsar al jugador. Inténtalo más tarde.");
    } finally {
      setLoadingExpel(false);
    }
  };

  const handleConfirmLeave = async () => {
    if (!currentUserId) return;
    setLoadingDelete(true);
    try {
      const result = await leaveJam(jam.id, currentUserId);
      messageApi.success("Has salido de la jam.");

      if (result?.players?.length > 0) {
        onUpdate(result);
      } else if (onDelete) {
        onDelete(jam.id);
      }
    } catch (e) {
      console.error(e);
      messageApi.error("No se pudo salir de la jam. Inténtalo más tarde.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    messageApi,
    contextHolder,
    loadingDelete,
    loadingExpel,
    handleDelete,
    handleConfirmExpel,
    handleConfirmLeave,
  };
};
