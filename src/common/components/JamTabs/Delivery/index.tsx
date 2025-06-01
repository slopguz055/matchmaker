"use client";

import { useEffect, useState } from "react";
import { Tabs, Spin } from "antd"; // <--- Importa Spin
import { Jam } from "@/common/types/utility";
import JamList from "@/common/components/JamList";
import { useAuth } from "@/common/hooks/useAuth";

const JamTabs = () => {
	const { user, loading: authLoading, error: authError } = useAuth();

	const [createdJams, setCreatedJams] = useState<Jam[]>([]);
	const [joinedJams, setJoinedJams] = useState<Jam[]>([]);
	const [loading, setLoading] = useState(true); // <--- Estado de carga

	useEffect(() => {
		if (authLoading || !user) return;

		const fetchJams = async () => {
			setLoading(true); // <--- Inicia el spinner
			try {
				const [createdRes, joinedRes] = await Promise.all([
					fetch(`http://localhost:8080/jams/byCreator/${user.steamId}`),
					fetch(`http://localhost:8080/jams/byUser/${user.steamId}`),
				]);

				const created = createdRes.ok ? await createdRes.json() : [];
				const joined = joinedRes.ok ? await joinedRes.json() : [];

				const createdIds = new Set(created.map((jam: Jam) => jam.id));

				const filteredCreated = created.filter(
					(jam: Jam) => jam.state !== "FINISHED"
				);

				const filteredJoined = joined.filter(
					(jam: Jam) => !createdIds.has(jam.id) && jam.state !== "FINISHED"
				);

				setCreatedJams(filteredCreated);
				setJoinedJams(filteredJoined);
			} catch (err) {
				console.error("Error al cargar datos de las jams", err);
			} finally {
				setLoading(false); // <--- Detiene el spinner
			}
		};

		fetchJams();
	}, [authLoading, user]);

	if (authLoading) return null;
	if (authError) return <p className="text-red-500">{authError}</p>;

	return (
		<Spin spinning={loading} tip="Cargando Jams...">
			<Tabs
				className="misjams-tabs"
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
						label: "Participaciones",
						children: (
							<JamList jams={joinedJams} setJams={setJoinedJams} editable />
						),
					},
				]}
			/>
		</Spin>
	);
};

export default JamTabs;
