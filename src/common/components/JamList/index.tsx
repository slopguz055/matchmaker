"use client";
import { useEffect, useState } from "react";
import BigCardAntd from "../Cards/BigCardAntd";
import { getJamsByUser } from "../MockBackend/db";

type Game = {
  id: string;
  title: string;
  image: string;
};

type User = {
  id: string;
  username: string;
  avatar: string;
};

type Jam = {
  id: string;
  userId: string;
  gameId: string;
  maxPlayers: number;
  currentPlayers: User[];
  description: string;
  status: string;
  date: string;
  time: string;
  user?: User;
  game?: Game;
};

const JamList = () => {
  const [jams, setJams] = useState<Jam[]>([]);

  useEffect(() => {
    getJamsByUser("user1").then(setJams);
  }, []);

  const handleUpdateJam = (updatedJam: Jam) => {
    setJams((prevJams) =>
      prevJams.map((jam) =>
        jam.id === updatedJam.id ? { ...jam, ...updatedJam } : jam
      )
    );
  };

  return (
    <>
      {jams.map((jam) => (
        <BigCardAntd
          key={jam.id}
          game={jam.game?.title || ""}
          alt={jam.game?.title || ""}
          src={jam.game?.image || ""}
          user={jam.user?.avatar || ""}
          desc={jam.description}
          date={jam.date}
          time={jam.time}
          maxPlayers={jam.maxPlayers}
          currentPlayers={jam.currentPlayers}
          jamData={jam}
          onUpdateJam={handleUpdateJam}
        />
      ))}
    </>
  );
};

export default JamList;
