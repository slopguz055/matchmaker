"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Card, Image, Tag, Modal, List, Button, message } from "antd";
import {
	DeleteOutlined,
	SettingOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { UserGroupIcon } from "../../CustomIconsAntd";
import ModalJam from "../../Modals/ModalJamSettings/Delivery";
import ConfirmModalAntd from "../../Modals/ConfirmModalAntd/Delivery";
import { Jam, User } from "@/common/types/utility";

interface BigCardAntdProps {
	jam: Jam;
	onUpdate: (updatedJam: Jam) => void;
	onDelete?: (id: string) => void;
}

const BigCardAntd: React.FC<BigCardAntdProps> = ({
	jam,
	onUpdate,
	onDelete,
}) => {
	const [messageApi, contextHolder] = message.useMessage();

	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const [isPlayersModalVisible, setIsPlayersModalVisible] = useState(false);
	const [isConfirmLeaveVisible, setIsConfirmLeaveVisible] = useState(false);

	const [loadingDelete, setLoadingDelete] = useState(false);
	const [playerToExpel, setPlayerToExpel] = useState<string | null>(null);
	const [loadingExpel, setLoadingExpel] = useState(false);

	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const {
		game,
		description,
		jamDate,
		jamTime,
		maxPlayers,
		players,
		createdBy,
	} = jam;

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const res = await fetch("http://localhost:8080/auth/me", {
					credentials: "include",
				});
				if (res.ok) {
					const user = await res.json();
					setCurrentUser(user);
				}
			} catch (error) {
				console.error("Error obteniendo usuario actual:", error);
			}
		};
		fetchCurrentUser();
	}, []);

	const handleDelete = async () => {
		if (!onDelete) return;
		setLoadingDelete(true);
		try {
			const res = await fetch(`http://localhost:8080/jams/delete/${jam.id}`, {
				method: "DELETE",
				credentials: "include",
			});
			if (!res.ok)
				throw new Error((await res.text()) || "Error al eliminar la jam");
			messageApi.success("Jam eliminada correctamente");
			await new Promise((r) => setTimeout(r, 500));
			onDelete(jam.id);
			setIsConfirmDeleteVisible(false);
		} catch (e) {
			console.error(e);
			messageApi.error("No se pudo eliminar la jam. Inténtalo más tarde.");
		} finally {
			setLoadingDelete(false);
		}
	};

	const handleConfirmExpel = async () => {
		if (!playerToExpel) return;
		setLoadingExpel(true);
		try {
			const res = await fetch(
				`http://localhost:8080/jams/${jam.id}/removePlayer/${playerToExpel}`,
				{ method: "DELETE", credentials: "include" }
			);
			if (!res.ok)
				throw new Error((await res.text()) || "Error al expulsar al jugador");
			const updatedJam = await res.json();
			messageApi.success("Jugador expulsado correctamente");
			onUpdate(updatedJam);
			setPlayerToExpel(null);
		} catch (e) {
			console.error(e);
			messageApi.error("No se pudo expulsar al jugador. Inténtalo más tarde.");
		} finally {
			setLoadingExpel(false);
		}
	};

	const handleConfirmLeave = async () => {
		setLoadingDelete(true);
		try {
			if (!currentUser) throw new Error("Usuario no autenticado");

			const res = await fetch(
				`http://localhost:8080/jams/${jam.id}/removePlayer/${currentUser.steamId}`,
				{ method: "DELETE", credentials: "include" }
			);

			if (res.status === 204) {
				messageApi.success("Has salido de la jam.");
				if (onDelete) onDelete(jam.id);
				setIsConfirmLeaveVisible(false);
				return;
			}
			if (!res.ok)
				throw new Error((await res.text()) || "Error al salir de la jam");

			const updatedJam = await res.json();
			messageApi.success("Has salido de la jam.");
			if (updatedJam.players?.length > 0) {
				onUpdate(updatedJam);
			} else if (onDelete) {
				onDelete(jam.id);
			}
			setIsConfirmLeaveVisible(false);
		} catch (e) {
			console.error(e);
			messageApi.error("No se pudo salir de la jam. Inténtalo más tarde.");
		} finally {
			setLoadingDelete(false);
		}
	};

	const isOwner = currentUser?.steamId === createdBy.steamId;

	return (
		<>
			{contextHolder}
			<Card
				className="transition-transform duration-200 hover:scale-105 my-8 mx-12"
				style={{ width: 600 }}
				cover={
					<Image
						alt={game?.name || "Juego"}
						src={game?.headerImage}
						preview={false}
					/>
				}
				actions={
					isOwner
						? [
								<SettingOutlined
									key="settings"
									style={{ fontSize: 20 }}
									onClick={() => setIsEditModalVisible(true)}
								/>,
								<DeleteOutlined
									key="delete"
									style={{ fontSize: 20 }}
									onClick={() => setIsConfirmDeleteVisible(true)}
								/>,
								<UserGroupIcon
									key="group"
									style={{ fontSize: 20 }}
									onClick={() => setIsPlayersModalVisible(true)}
								/>,
						  ]
						: [
								<Button
									danger
									type="primary"
									onClick={() => setIsConfirmLeaveVisible(true)}
									key="leave-jam"
								>
									Salir de la Jam
								</Button>,
						  ]
				}
			>
				<Meta
					avatar={<Avatar src={createdBy.avatar} />}
					title={<span className="text-2xl font-semibold">{game?.name}</span>}
					description={
						<div className="text-base mt-2 space-y-1">
							<div className="text-black">{description}</div>
							{jamDate && jamTime && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<CalendarOutlined />
									<span>{`${jamDate} a las ${jamTime}`}</span>
								</div>
							)}
							{maxPlayers && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<Tag color="blue">{`${
										players?.length || 0
									}/${maxPlayers} jugadores`}</Tag>
								</div>
							)}
						</div>
					}
				/>
			</Card>

			<ModalJam
				isVisible={isEditModalVisible}
				onCancel={() => setIsEditModalVisible(false)}
				onUpdate={onUpdate}
				currentPlayers={players?.length || 0}
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
				onConfirm={handleDelete}
			/>

			<ConfirmModalAntd
				title="¿Expulsar jugador/a?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
				open={playerToExpel !== null}
				confirmLoading={loadingExpel}
				onCancel={() => setPlayerToExpel(null)}
				onConfirm={handleConfirmExpel}
			/>

			<ConfirmModalAntd
				title="¿Salir de la Jam?"
				icon={<UserGroupIcon className="text-4xl" />}
				message="¿Quieres salir de esta jam?"
				open={isConfirmLeaveVisible}
				confirmLoading={loadingDelete}
				onCancel={() => setIsConfirmLeaveVisible(false)}
				onConfirm={handleConfirmLeave}
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

export default BigCardAntd;
