"use client";
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Jam } from "@/common/types/utility";
import JamList from "@/common/components/JamList";

const JamTabs = () => {
	const [createdJams, setCreatedJams] = useState<Jam[]>([]);
	const [joinedJams, setJoinedJams] = useState<Jam[]>([]);

	useEffect(() => {
		async function fetchJams() {
			try {
				const userRes = await fetch("http://localhost:8080/auth/me", {
					credentials: "include",
				});
				if (!userRes.ok) throw new Error("Error al obtener usuario");

				const { steamId } = await userRes.json();

				const [createdRes, joinedRes] = await Promise.all([
					fetch(`http://localhost:8080/jams/byCreator/${steamId}`),
					fetch(`http://localhost:8080/jams/byUser/${steamId}`),
				]);

				if (createdRes.ok) {
					const created = await createdRes.json();
					setCreatedJams(created);

					if (joinedRes.ok) {
						const joined = await joinedRes.json();

						// Filtrar joined para excluir jams que ya estén en created
						const createdIds = new Set(created.map((jam: Jam) => jam.id));
						const filteredJoined = joined.filter(
							(jam: Jam) => !createdIds.has(jam.id)
						);

						setJoinedJams(filteredJoined);
					}
				} else if (joinedRes.ok) {
					// Si no hay jams creadas pero sí joined
					setJoinedJams(await joinedRes.json());
				}
			} catch (error) {
				console.error("Error al cargar datos:", error);
			}
		}
		fetchJams();
	}, []);

	return (
		<Tabs
			defaultActiveKey="created"
			centered
			size="large"
			items={[
				{
					key: "created",
					label: "Jams creadas",
					children: (
						<JamList jams={createdJams} setJams={setCreatedJams} editable />
					),
				},
				{
					key: "joined",
					label: "Mis Jams",
					children: (
						<JamList jams={joinedJams} setJams={setJoinedJams} editable />
					),
				},
			]}
		/>
	);
};

export default JamTabs;
