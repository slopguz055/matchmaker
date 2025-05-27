"use client";

import { useEffect, useState } from "react";
import BigCardAntd from "@/common/components/Cards/BigCardAntd";
import { Jam } from "@/common/types/utility";

const JamList = () => {
	const [jams, setJams] = useState<Jam[]>([]);

	useEffect(() => {
		const fetchJams = async () => {
			try {
				const userRes = await fetch("http://localhost:8080/auth/me", {
					credentials: "include",
				});
				if (!userRes.ok) throw new Error("No se pudo obtener el usuario");

				const user = await userRes.json();
				const steamId = user.steamId;

				const jamsRes = await fetch(
					`http://localhost:8080/jams/byCreator/${steamId}`
				);
				if (!jamsRes.ok) throw new Error("No se pudieron obtener las jams");

				const jamsData = await jamsRes.json();
				setJams(jamsData);
			} catch (err) {
				console.error("Error al cargar las jams:", err);
				setJams([]);
			}
		};

		fetchJams();
	}, []);

	const handleUpdateJam = (updatedJam: Jam) => {
		setJams((prev) =>
			prev.map((jam) => (jam.id === updatedJam.id ? updatedJam : jam))
		);
	};

	return (
		<div className="flex flex-wrap justify-center gap-8 mt-10">
			{jams.map((jam) => (
				<BigCardAntd
					key={jam.id}
					jam={jam}
					onUpdateJam={handleUpdateJam}
					onDeleteJam={(id) =>
						setJams((prev) => prev.filter((j) => j.id !== id))
					}
				/>
			))}
		</div>
	);
};

export default JamList;
