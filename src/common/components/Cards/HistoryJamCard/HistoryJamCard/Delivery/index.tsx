"use client";

import { FC } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
	CalendarOutlined,
	ClockCircleOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Tag, Avatar, Tooltip } from "antd";
import { HistoryJamCardProps } from "./interface";

const HistoryJamCard: FC<HistoryJamCardProps> = ({ jam }) => {
	const gameModeMap: Record<string, string> = {
		CASUAL: "🎮 Casual",
		COMPETITIVE: "⚔️ Competitivo",
		COMPLETIST: "🏆 Completista",
	};

	const voiceModeMap: Record<string, string> = {
		TEXT: "🔇 Texto",
		HEAR: "👂 Escuchar",
		TALK: "💬 Hablar",
	};

	const languageMap: Record<string, string> = {
		INDEF: "🌐 Indefinido",
		ES: "🇪🇸 Español",
		EN: "🇬🇧 Inglés",
		FR: "🇫🇷 Francés",
		PT: "🇵🇹 Portugués",
		IT: "🇮🇹 Italiano",
	};

	const durationMap: Record<string, string> = {
		"15-30": "⏱️ 15–30 min",
		"30-60": "⏱️ 30–60 min",
		"60-120": "⏱️ 1–2 h",
		"120-180": "⏱️ 2–3 h",
		"180-240": "⏱️ 3–4 h",
		"240+": "⏱️ +4 h",
	};

	return (
		<div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
			{/* Imagen del juego */}
			<div className="relative w-full h-48 overflow-hidden">
				<img
					src={jam.game?.headerImage}
					alt={jam.game?.name}
					className="object-cover w-full h-full"
				/>

				{/* Nombre del juego */}
				<div className="absolute top-3 left-3 bg-gray-900/60 border border-white/20 text-white text-sm font-semibold px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm">
					{jam.game?.name}
				</div>

				{/* Tags */}
				<div className="absolute bottom-0 left-0 font-bold w-full bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-wrap gap-1">
					<Tag color="red">{gameModeMap[jam.gameMode]}</Tag>
					<Tag color="blue">{voiceModeMap[jam.voiceMode]}</Tag>
					<Tag color="orange">{languageMap[jam.language]}</Tag>
					<Tag color="green">{durationMap[jam.duration]}</Tag>
				</div>
			</div>

			{/* Contenido */}
			<div className="p-4 flex flex-col justify-between h-full">
				<h2 className="text-lg font-semibold text-gray-900 mb-2">
					{jam.title}
				</h2>

				{/* Separador arriba */}
				<div className="border-t border-gray-300 my-2" />

				{/* Fecha, hora y jugadores en fila */}
				<div className="flex items-center justify-between text-sm text-gray-600 font-medium space-x-4 mb-2">
					<div className="flex items-center gap-1 font-bold">
						<CalendarOutlined />
						<span>{dayjs(jam.jamDate).format("DD/MM/YYYY")}</span>
					</div>
					<div className="flex items-center gap-1 font-bold">
						<ClockCircleOutlined />
						<span>{jam.jamTime}</span>
					</div>
					<div className="flex items-center gap-1 font-bold">
						<UsergroupAddOutlined />
						<span>
							{jam.players.length} / {jam.maxPlayers} jugadores
						</span>
					</div>
				</div>

				{/* Separador abajo */}
				<div className="border-b border-gray-300 my-2" />

				{/* Descripción con texto delante */}
				<div className="mb-4">
					<span className="font-semibold text-gray-700">Descripción</span>
					<p className="text-sm text-gray-500 line-clamp-3 mt-1">
						{jam.description}
					</p>
				</div>

				{/* Participantes con énfasis igual que Descripción */}
				<div className="mb-3">
					<span className="font-semibold text-gray-700">Participantes</span>
					<div className="mt-1">
						<Avatar.Group maxCount={5}>
							{jam.players.map((player) => {
								const isCreator = player.steamId === jam.createdBy.steamId;
								return (
									<Tooltip
										key={player.steamId}
										placement="top"
										title={
											player.steamId === jam.createdBy.steamId ? (
												<div className="text-center">
													<div className="font-bold text-red-400">
														Creador/a
													</div>
													<div>{player.name}</div>
												</div>
											) : (
												player.name
											)
										}
									>
										<Link href={`/perfil?id=${player.steamId}`}>
											<Avatar
												src={player.avatar}
												size={36}
												className={`cursor-pointer ${
													player.steamId === jam.createdBy.steamId
														? "ring-2 ring-red-600 rounded-full"
														: ""
												}`}
											/>
										</Link>
									</Tooltip>
								);
							})}
						</Avatar.Group>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryJamCard;
