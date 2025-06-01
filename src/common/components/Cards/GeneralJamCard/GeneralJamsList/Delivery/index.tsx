"use client";

import React, { FC } from "react";
import { message, Spin, Typography } from "antd";
import { useAuth } from "@/common/hooks/useAuth";
import { useOpenJams } from "@/common/hooks/useOpenJams";
import GeneralJamCard from "../../GeneralJamCardAntd/Delivery";
import { Jam, User } from "@/common/types/utility";

const { Text } = Typography;

const GeneralJamList: FC = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const { jams, loading: jamsLoading, error, setJams } = useOpenJams();
  const [messageApi, contextHolder] = message.useMessage();

  const jwtValid = !!currentUser;

  const updateJamInList = (updatedJam: Jam) => {
    setJams((prev) =>
      prev.map((j) => (j.id === updatedJam.id ? updatedJam : j))
    );
  };

  const onJoinLeaveJam = async (jam: Jam) => {
    if (!jwtValid || !currentUser) {
      messageApi.info("Debes iniciar sesión para unirte a la Jam.");
      return;
    }

    const userIsInJam = jam.players.some(
      (p: User) => p.steamId === currentUser.steamId
    );

    try {
      const endpoint = userIsInJam
        ? `removePlayer/${currentUser.steamId}`
        : "addPlayer";

      const method = userIsInJam ? "DELETE" : "POST";
      const url = `http://localhost:8080/jams/${jam.id}/${endpoint}`;

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: !userIsInJam ? JSON.stringify(currentUser) : undefined,
      });

      if (!res.ok) throw new Error(await res.text());

      const updatedJam = await res.json();
      updateJamInList(updatedJam);

      messageApi.success(
        userIsInJam
          ? `Has salido de la Jam "${jam.title}" con éxito`
          : `Te has unido a la Jam "${jam.title}" con éxito`
      );
    } catch (error: any) {
      messageApi.error(error.message || "Error en la operación");
    }
  };

  if (authLoading || jamsLoading) {
    return (
      <>
        {contextHolder}
        <Spin tip="Cargando jams abiertas..." className="block mx-auto my-8" />
      </>
    );
  }

  if (error || jams.length === 0) {
    return (
      <>
        {contextHolder}
        <Text className="block text-center">
          {error || "No hay jams abiertas disponibles."}
        </Text>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center gap-6 my-8">
        {jams.map((jam) => (
          <GeneralJamCard
            key={jam.id}
            jam={jam}
            jwtValid={jwtValid}
            currentUser={currentUser}
            onJoinLeaveJam={onJoinLeaveJam}
          />
        ))}
      </div>
    </>
  );
};

export default GeneralJamList;
