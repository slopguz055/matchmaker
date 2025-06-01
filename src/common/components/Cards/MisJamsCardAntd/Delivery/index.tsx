"use client";

import React, { FC, useState } from "react";
import { Avatar, Image, Modal, List, Button, Tag } from "antd";
import {
	DeleteOutlined,
	SettingOutlined,
	CalendarOutlined,
	UsergroupAddOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";
import { UserGroupIcon } from "@/common/components/CustomIcons";
import ModalJam from "../../../Modals/ModalJamSettings/Delivery";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { User } from "@/common/types/utility";
import { useAuth } from "@/common/hooks/useAuth";
import { MisJamCardAntdProps } from "./interface";
import { useJamActions } from "../Infrastructure/useJamActions";
import dayjs from "dayjs";

const MisJamCardAntd: FC<MisJamCardAntdProps> = ({
	jam,
	onUpdate,
	onDelete,
}) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const [isPlayersModalVisible, setIsPlayersModalVisible] = useState(false);
	const [isConfirmLeaveVisible, setIsConfirmLeaveVisible] = useState(false);
	const [playerToExpel, setPlayerToExpel] = useState<string | null>(null);

	const { user: currentUser } = useAuth();
	const {
		game,
		description,
		jamDate,
		jamTime,
		maxPlayers,
		players,
		createdBy,
		gameMode,
		language,
		voiceMode,
		duration,
	} = jam;

	const isOwner = currentUser?.steamId === createdBy.steamId;

	const {
		contextHolder,
		messageApi,
		loadingDelete,
		loadingExpel,
		handleDelete,
		handleConfirmExpel,
		handleConfirmLeave,
	} = useJamActions({
		jam,
		onUpdate,
		onDelete,
		currentUserId: currentUser?.steamId,
	});

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
		<>
			{contextHolder}

			<div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] max-w-xl mx-auto my-1">
				{/* Imagen + Tags + Título */}
				<div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
					<img
						src={game?.headerImage}
						alt={game?.name}
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
					{/* Nombre del juego superpuesto 
					<div className="absolute top-3 left-3 bg-gray-900/60 border border-white/20 text-white text-sm font-semibold px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm z-20">
						{game?.name}
					</div>

					{/* Tags en la parte inferior con fondo degradado 
					<div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 flex flex-wrap gap-1 z-20">
						{gameMode && (
							<Tag color="red" className="font-bold uppercase">
								{gameMode}
							</Tag>
						)}
						{voiceMode && (
							<Tag color="blue" className="font-bold uppercase">
								{voiceMode}
							</Tag>
						)}
						{language && (
							<Tag color="orange" className="font-bold uppercase">
								{language}
							</Tag>
						)}
					</div>}*/}

					{/* Contenedor general */}
					<div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] max-w-xl mx-auto my-8 bg-white">
						{/* imagen y tags arriba */}
					</div>

					{/* Descripción */}
					<p className="text-gray-700 mb-4">{description}</p>
				</div>

				{/* Descripción y detalles */}
				<div className="bg-white p-4 space-y-2">
					<div className="flex items-center justify-start gap-4 text-sm text-gray-600 font-medium mb-1">
						{!isOwner && (
							<div className="flex items-center gap-3">
								<Avatar src={createdBy.avatar} />
								<p className="font-medium text-gray-800">
									{createdBy.name || "Creador"}
								</p>
							</div>
						)}
						<div className="flex items-center gap-1 font-bold">
							<CalendarOutlined className="text-[14px]" />
							<span>{dayjs(jam.jamDate).format("DD/MM/YYYY")}</span>
						</div>
						<div className="flex items-center gap-1 font-bold">
							<ClockCircleOutlined className="text-[14px]" />
							<span>{jam.jamTime}</span>
						</div>
					</div>
					<div className="border-b border-gray-300 my-2" />

					<h3 className="font-bold">
						{isOwner ? "Tu descripción" : "Descripción"}
					</h3>
					<p className="text-gray-600">{description}</p>
					<div className="border-b border-gray-300 my-2" />

					{/* Acciones */}
					<div className="flex justify-end gap-3 mt-4">
						{isOwner ? (
							<>
								<Button
									icon={<SettingOutlined />}
									onClick={() => setIsEditModalVisible(true)}
								/>
								<Button
									danger
									icon={<DeleteOutlined />}
									onClick={() => setIsConfirmDeleteVisible(true)}
								/>
								<Button
									icon={<UserGroupIcon className="text-xl" />}
									onClick={() => setIsPlayersModalVisible(true)}
								>
									<span className="ml-1">
										{players?.length || 0}/{maxPlayers}
									</span>
								</Button>
							</>
						) : (
							<Button
								danger
								type="primary"
								onClick={() => setIsConfirmLeaveVisible(true)}
							>
								Salir de la Jam
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Modales */}
			<ModalJam
				isVisible={isEditModalVisible}
				onCancel={() => setIsEditModalVisible(false)}
				onUpdate={onUpdate}
				players={players?.length || 0}
				jamData={jam}
				messageApi={messageApi}
			/>

			<ConfirmModalAntd
				title="¿Eliminar Jam?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="Vas a eliminar la jam seleccionada y no se va a poder deshacer. ¿Estás seguro/a?"
				open={isConfirmDeleteVisible}
				confirmLoading={loadingDelete}
				onCancel={() => setIsConfirmDeleteVisible(false)}
				onConfirm={() => {
					handleDelete().then(() => setIsConfirmDeleteVisible(false));
				}}
			/>

			<ConfirmModalAntd
				title="¿Expulsar jugador/a?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
				open={playerToExpel !== null}
				confirmLoading={loadingExpel}
				onCancel={() => setPlayerToExpel(null)}
				onConfirm={() => {
					if (playerToExpel) {
						handleConfirmExpel(playerToExpel).then(() =>
							setPlayerToExpel(null)
						);
					}
				}}
			/>

			<ConfirmModalAntd
				title="¿Salir de la Jam?"
				icon={<UserGroupIcon className="text-4xl" />}
				message="¿Seguro/a que quieres salir? Si te quieres unir de nuevo, tendrás que volver a solicitarlo y puede ser que te quedes sin sitio."
				open={isConfirmLeaveVisible}
				confirmLoading={loadingDelete}
				onCancel={() => setIsConfirmLeaveVisible(false)}
				onConfirm={() => {
					handleConfirmLeave().then(() => setIsConfirmLeaveVisible(false));
				}}
			/>

			<Modal
				title="Jugadores"
				open={isPlayersModalVisible}
				onCancel={() => setIsPlayersModalVisible(false)}
				footer={null}
			>
				<List
					dataSource={players}
					renderItem={(player: User) => {
						const isCurrentUser = currentUser?.steamId === player.steamId;
						return (
							<List.Item
								key={player.steamId}
								actions={
									isOwner && !isCurrentUser
										? [
												<Button
													key={player.steamId}
													danger
													onClick={() => setPlayerToExpel(player.steamId)}
												>
													Expulsar
												</Button>,
										  ]
										: []
								}
							>
								<List.Item.Meta
									avatar={<Avatar src={player.avatar} />}
									title={isCurrentUser ? "Tú" : player.name}
								/>
							</List.Item>
						);
					}}
				/>
			</Modal>
		</>
	);
};

export default MisJamCardAntd;
