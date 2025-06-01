"use client";

import { FC } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
	CalendarOutlined,
	ClockCircleOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { GeneralJamCardProps } from "./interface";

const GeneralJamCard: FC<GeneralJamCardProps> = ({
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

	console.log(jam);

	return (
		<div className="flex flex-col md:flex-row md:max-h-70  bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full max-w-6xl">
			<div className="w-full md:w-[530px] md:min-w-[300px]  relative overflow-hidden">
				<img
					src={jam.game?.headerImage}
					alt={jam.game?.name}
					className="object-cover w-full h-full rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl"
					style={{ height: "100%" }}
				/>

				{/* Gradiente inferior oscuro */}
				<div className="absolute bottom-0 left-0 font-bold w-full bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-wrap gap-2 rounded-b-2xl md:rounded-bl-2xl">
					<Tag color="red">{gameModeMap[jam.gameMode]}</Tag>
					<Tag color="blue">{voiceModeMap[jam.voiceMode]}</Tag>
					<Tag color="orange">{languageMap[jam.language]}</Tag>
					<Tag color="green">{durationMap[jam.duration]}</Tag>
				</div>

				{/* Etiqueta con el nombre del juego */}
				<div className="absolute top-3 left-3 bg-gray-900/60 border border-white/20 text-white text-sm font-semibold px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm">
					{jam.game?.name}
				</div>
			</div>

			<div className="flex-1 p-5 flex flex-col justify-between">
				<div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						{jam.title}
					</h2>

					<hr className="border-t border-gray-300 my-1" />
					<div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-3 font-bold">
						<div className="flex items-center gap-2">
							<CalendarOutlined />
							<span>{dayjs(jam.jamDate).format("DD/MM/YYYY")}</span>
						</div>
						<div className="flex items-center gap-2">
							<ClockCircleOutlined />
							<span>{jam.jamTime}</span>
						</div>
						<div className="flex items-center gap-2">
							<UsergroupAddOutlined />
							<span>
								{jam.players.length} / {jam.maxPlayers} jugadores
							</span>
						</div>
					</div>
					<hr className="border-t border-gray-300 my-3" />

					<p className="text-gray-700 text-sm mb-4 line-clamp-3">
						{jam.description}
					</p>

					<p className="text-sm text-gray-500">
						<span className="font-medium">Creador/a:</span>{" "}
						<Link
							href={
								jam.createdBy.steamId
									? `/perfil?id=${jam.createdBy.steamId}`
									: "#"
							}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-600 hover:underline"
						>
							{jam.createdBy.name}
						</Link>
					</p>
				</div>

				<div className="mt-4">
					{userIsCreator ? (
						<button
							className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md cursor-not-allowed"
							disabled
						>
							Eres el/la creador/a de esta Jam
						</button>
					) : (
						<button
							onClick={() => onJoinLeaveJam(jam)}
							disabled={!jwtValid}
							className={`w-full py-2 px-4 rounded-md font-semibold transition ${
								jwtValid
									? userIsInJam
										? "bg-gray-950 text-white hover:bg-gray-700 cursor-pointer"
										: "bg-red-700 text-white hover:bg-red-500 cursor-pointer"
									: "bg-gray-300 text-gray-600 cursor-not-allowed"
							}`}
						>
							{jwtValid
								? userIsInJam
									? "Salir de la Jam"
									: "Unirse a la Jam"
								: "Inicia sesión para unirte"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default GeneralJamCard;
