"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Space, message, Spin, Image } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

interface User {
	steamId: string;
	name: string;
	profileUrl: string;
	avatar: string;
	timeCreated: string;
}

interface Game {
	appid: number;
	name: string;
	shortDescription: string;
	categories: string[];
	headerImage: string;
	lastUpdated: string;
}

interface Jam {
	id: string;
	title: string;
	description: string;
	game: Game;
	jamDate: string;
	jamTime: string;
	state: string;
	createdBy: User;
	createdAt: string;
	maxPlayers: number;
	players: User[];
	gameMode: string;
	voiceMode: string;
	language: string;
}

interface JamCardProps {
	jam: Jam;
	currentUser: User | null;
	jwtValid: boolean;
	onJoinLeaveJam: (jam: Jam) => Promise<void>;
}

const GeneralJamCard: React.FC<JamCardProps> = ({
	jam,
	currentUser,
	jwtValid,
	onJoinLeaveJam,
}) => {
	const userIsInJam = currentUser
		? jam.players.some((p) => p.steamId === currentUser.steamId)
		: false;

	const userIsCreator =
		currentUser && currentUser.steamId === jam.createdBy.steamId;

	return (
		<Card
			style={{ width: "70vw" }}
			hoverable
			styles={{
				body: { padding: 0 },
			}}
		>
			<div className="flex">
				<div className="flex-shrink-0 w-[250px] h-full mr-6">
					<Image
						src={jam.game.headerImage}
						alt={jam.game.name}
						width={250}
						height={160}
						style={{ objectFit: "cover", height: "100%" }}
						preview={false}
					/>
				</div>
				<div className="flex-1 p-4 flex flex-col justify-between">
					<Space direction="vertical" size="small" className="w-full">
						<Title level={4} className="mb-0">
							{jam.title}
						</Title>
						<Text className="text-gray-700 font-medium flex items-center gap-2">
							<CalendarOutlined />
							{dayjs(jam.jamDate).format("DD/MM/YYYY")}
							<span className="mx-2">-</span>
							<ClockCircleOutlined />
							{jam.jamTime}
						</Text>

						<Paragraph ellipsis={{ rows: 3, expandable: false }}>
							{jam.description}
						</Paragraph>

						<Text>
							<strong>Creador: </strong>
							<Link
								href={jam.createdBy.profileUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								{jam.createdBy.name}
							</Link>
						</Text>

						{userIsCreator ? (
							<Button type="default" disabled>
								Eres el/la creador/a de esta Jam
							</Button>
						) : (
							<Button
								type="primary"
								onClick={() => onJoinLeaveJam(jam)}
								disabled={!jwtValid || !currentUser}
							>
								{jwtValid
									? userIsInJam
										? "Salir de la Jam"
										: "Unirse a la Jam"
									: "Inicia sesión para unirte"}
							</Button>
						)}
					</Space>
				</div>
			</div>
		</Card>
	);
};

const GeneralJamList: React.FC = () => {
	const [jams, setJams] = useState<Jam[]>([]);
	const [loading, setLoading] = useState(true);
	const [jwtValid, setJwtValid] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		// Comprobamos sesión via cookie en /auth/me
		fetch("http://localhost:8080/auth/me", {
			credentials: "include",
		})
			.then((res) => {
				if (res.ok) return res.json();
				throw new Error("No autenticado");
			})
			.then((user) => {
				setJwtValid(!!user);
				setCurrentUser(user);
			})
			.catch(() => {
				setJwtValid(false);
				setCurrentUser(null);
			})
			.finally(() => {
				// Cargamos jams en todo caso
				fetch("http://localhost:8080/jams/")
					.then((res) => {
						if (!res.ok) throw new Error("Error cargando jams");
						return res.json();
					})
					.then((data) => {
						setJams(data);
					})
					.catch((err) => {
						messageApi.error("Error al cargar las jams.");
						console.error(err);
					})
					.finally(() => setLoading(false));
			});
	}, []);

	const updateJamInList = (updatedJam: Jam) => {
		setJams((prevJams) =>
			prevJams.map((j) => (j.id === updatedJam.id ? updatedJam : j))
		);
	};

	const onJoinLeaveJam = async (jam: Jam) => {
		if (!jwtValid || !currentUser) {
			messageApi.info("Debes iniciar sesión para unirte a la Jam.");
			return;
		}

		const userIsInJam = jam.players.some(
			(p) => p.steamId === currentUser.steamId
		);

		try {
			if (userIsInJam) {
				// Salir de la jam - DELETE
				const res = await fetch(
					`http://localhost:8080/jams/${jam.id}/removePlayer/${currentUser.steamId}`,
					{
						method: "DELETE",
						credentials: "include",
					}
				);
				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText || "Error al salir de la jam");
				}
				const updatedJam: Jam = await res.json();
				updateJamInList(updatedJam);
				messageApi.success(`Has salido de la Jam "${jam.title}" con éxito`);
			} else {
				// Unirse a la jam - POST
				const body = {
					steamId: currentUser.steamId,
					name: currentUser.name,
					profileUrl: currentUser.profileUrl,
					avatar: currentUser.avatar,
					timeCreated: currentUser.timeCreated,
				};
				const res = await fetch(
					`http://localhost:8080/jams/${jam.id}/addPlayer`,
					{
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(body),
					}
				);
				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText || "Error al unirse a la jam");
				}
				const updatedJam: Jam = await res.json();
				updateJamInList(updatedJam);
				messageApi.success(`Te has unido a la Jam "${jam.title}" con éxito`);
			}
		} catch (error: any) {
			messageApi.error(error.message || "Error en la operación");
		}
	};

	if (loading)
		return (
			<>
				{contextHolder}
				<Spin tip="Cargando jams..." className="block mx-auto my-8" />
			</>
		);

	if (jams.length === 0)
		return (
			<>
				{contextHolder}
				<Text className="block text-center">No hay jams disponibles.</Text>
			</>
		);

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
