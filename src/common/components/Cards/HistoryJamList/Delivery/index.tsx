"use client";
import { useEffect, useState } from "react";
import { Jam, User } from "@/common/types/utility";
import { Typography } from "antd";
import HistoryJamCard from "../../HistoryJamCard/Delivery";

const { Title } = Typography;

const HistoryJamList = () => {
	const [user, setUser] = useState<User | null>(null);
	const [jams, setJams] = useState<Jam[]>([]);

	useEffect(() => {
		const fetchUserAndJams = async () => {
			try {
				const userRes = await fetch("http://localhost:8080/auth/me", {
					credentials: "include",
				});
				if (!userRes.ok) throw new Error("Error al obtener usuario");
				const userData = await userRes.json();
				setUser(userData);

				const res = await fetch(
					"http://localhost:8080/jams/getByState/finished"
				);
				if (!res.ok) throw new Error("Error al obtener jams");

				const allJams: Jam[] = await res.json();
				const mappedJams = allJams.map((jam) => ({
					...jam,
					currentPlayers: jam.players,
				}));

				const filtered = mappedJams.filter(
					(jam) =>
						Array.isArray(jam.currentPlayers) &&
						jam.currentPlayers.some((p) => p.steamId === userData.steamId)
				);

				setJams(filtered);
			} catch (err) {
				console.error("Error al cargar jams:", err);
			}
		};

		fetchUserAndJams();
	}, []);

	if (!user) return null;

	return (
		<div className="flex flex-col items-center gap-6 mt-4 py-10">
			{jams.map((jam) => (
				<HistoryJamCard key={jam.id} jam={jam} />
			))}
		</div>
	);
};

export default HistoryJamList;
