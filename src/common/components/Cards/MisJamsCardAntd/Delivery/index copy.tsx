"use client";

import React, { FC, useState } from "react";
import { Avatar, Image, Modal, List, Button, Tag } from "antd";
import {
	DeleteOutlined,
	SettingOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import { UserGroupIcon } from "@/common/components/CustomIcons";
import ModalJam from "../../../Modals/ModalJamSettings/Delivery";
import ConfirmModalAntd from "../../../Modals/ConfirmModalAntd/Delivery";
import { User } from "@/common/types/utility";
import { useAuth } from "@/common/hooks/useAuth";
import { MisJamCardAntdProps } from "./interface";
import { useJamActions } from "../Infrastructure/useJamActions";

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

	return (
		<>
			{contextHolder}

			<div className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] max-w-xl mx-auto my-8">
				{/* Imagen + Tags + Título */}
				<div className="relative">
					<Image
						alt={game?.name || "Juego"}
						src={game?.headerImage}
						preview={false}
						className="object-cover h-60 w-full"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
					<div className="absolute top-3 left-3 z-20 flex gap-2">
						{gameMode && (
							<span className="px-2 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 shadow">
								{gameMode}
							</span>
						)}
						{voiceMode && (
							<span className="px-2 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow">
								{voiceMode}
							</span>
						)}
						{language && (
							<span className="px-2 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 shadow">
								{language}
							</span>
						)}
					</div>
					<h3 className="absolute bottom-3 left-4 z-20 text-white text-2xl font-bold drop-shadow-md">
						{game?.name}
					</h3>
				</div>

				{/* Descripción y detalles */}
				<div className="bg-white p-4 space-y-2">
					<div className="flex items-center gap-3">
						<Avatar src={createdBy.avatar} />
						<p className="font-medium text-gray-800">
							{createdBy.name || "Creador"}
						</p>
					</div>
					<p className="text-gray-600">{description}</p>
					{jamDate && jamTime && (
						<div className="flex items-center gap-2 text-gray-500 text-sm">
							<CalendarOutlined />
							<span>{`${jamDate} a las ${jamTime}`}</span>
						</div>
					)}
					{maxPlayers && (
						<div className="text-sm text-gray-500">
							<span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
								{players?.length || 0}/{maxPlayers} jugadores
							</span>
						</div>
					)}

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
								/>
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
