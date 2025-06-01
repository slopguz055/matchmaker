"use client";

import { FC } from "react";
import { message } from "antd";
import { Jam } from "@/common/types/utility";
import MisJamCardAntd from "@/common/components/Cards/MisJamsCardAntd/Delivery";

interface JamListProps {
  jams: Jam[];
  setJams?: React.Dispatch<React.SetStateAction<Jam[]>>;
  editable?: boolean;
}

const JamList: FC<JamListProps> = ({ jams, setJams, editable = true }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdateJam = (updatedJam: Jam) => {
    if (!setJams) return;

    setJams((prev) =>
      prev.map((jam) => (jam.id === updatedJam.id ? updatedJam : jam))
    );
  };

  const handleDeleteJam = (id: string) => {
    if (!setJams) return;

    setJams((prev) => prev.filter((jam) => jam.id !== id));
  };

  if (jams.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No hay jams en esta sección todavía
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {jams.map((jam) => (
          <MisJamCardAntd
            key={jam.id}
            jam={jam}
            onUpdate={handleUpdateJam}
            onDelete={editable ? handleDeleteJam : undefined}
            messageApi={messageApi}
          />
        ))}
      </div>
    </>
  );
};

export default JamList;
