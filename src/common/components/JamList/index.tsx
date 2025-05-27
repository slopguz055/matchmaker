"use client";

import { message } from "antd";
import BigCardAntd from "@/common/components/Cards/BigCardAntd";
import { Jam } from "@/common/types/utility";

interface JamListProps {
	jams: Jam[];
	setJams?: React.Dispatch<React.SetStateAction<Jam[]>>;
	editable?: boolean;
}

const JamList: React.FC<JamListProps> = ({
	jams,
	setJams,
	editable = true,
}) => {
	const [messageApi, contextHolder] = message.useMessage();

	if (jams.length === 0) {
		return (
			<div className="text-center mt-10 text-gray-500">
				No hay jams en esta sección todavía
			</div>
		);
	}

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

	return (
		<>
			{contextHolder}
			<div className="flex flex-wrap justify-center gap-8 mt-10">
				{jams.map((jam) => (
					<BigCardAntd
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
