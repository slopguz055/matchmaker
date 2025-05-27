"use client";

import React, { useState } from "react";
import { Avatar, Card, Image, Tag, Modal, List, Button } from "antd";
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
import { MessageInstance } from "antd/es/message/interface";

interface BigCardAntdProps {
	jam: Jam;
	onUpdate: (updatedJam: Jam) => void;
	onDelete?: (id: string) => void;
	messageApi: MessageInstance;
}

const BigCardAntd: React.FC<BigCardAntdProps> = ({
	jam,
	onUpdate,
	onDelete,
	messageApi,
}) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const [isPlayersModalVisible, setIsPlayersModalVisible] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);

	// Estado para expulsar jugador: guarda steamId del jugador a expulsar o null si ninguno
	const [playerToExpel, setPlayerToExpel] = useState<string | null>(null);
	const [loadingExpel, setLoadingExpel] = useState(false);

	const {
		game,
		description,
		jamDate,
		jamTime,
		maxPlayers,
		players,
		createdBy,
	} = jam;

	const handleDelete = async () => {
		if (!onDelete) return;

		setLoadingDelete(true);
		try {
			const res = await fetch(`http://localhost:8080/jams/delete/${jam.id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!res.ok) {
				const errorMsg = await res.text();
				throw new Error(errorMsg || "Error al eliminar la jam");
			}

			messageApi.success("Jam eliminada correctamente");

			await new Promise((resolve) => setTimeout(resolve, 500));

			onDelete(jam.id);
			setIsConfirmVisible(false);
		} catch (error: any) {
			console.error(error);
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
				{
					method: "DELETE",
					credentials: "include",
				}
			);

			if (!res.ok) {
				const errorMsg = await res.text();
				throw new Error(errorMsg || "Error al expulsar al jugador");
			}

			const updatedJam = await res.json();
			messageApi.success("Jugador expulsado correctamente");
			onUpdate(updatedJam);
			setPlayerToExpel(null);
		} catch (error: any) {
			console.error(error);
			messageApi.error("No se pudo expulsar al jugador. Inténtalo más tarde.");
		} finally {
			setLoadingExpel(false);
		}
	};

	return (
		<>
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
				actions={[
					<SettingOutlined
						key="settings"
						style={{ fontSize: "20px" }}
						onClick={() => setIsEditModalVisible(true)}
					/>,
					<DeleteOutlined
						key="delete"
						style={{ fontSize: "20px" }}
						onClick={() => setIsConfirmVisible(true)}
					/>,
					<UserGroupIcon
						key="group"
						style={{ fontSize: "20px" }}
						onClick={() => setIsPlayersModalVisible(true)}
					/>,
				]}
			>
				<Meta
					avatar={<Avatar src={createdBy.avatar} />}
					title={<span className="text-2xl font-semibold">{game?.name}</span>}
					description={
						<div className="text-base mt-2 space-y-1">
							<div>{description}</div>
							{jamDate && jamTime && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<CalendarOutlined />
									<span>{`${jamDate} a las ${jamTime}`}</span>
								</div>
							)}
							{maxPlayers && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<Tag color="blue">
										{`${players?.length || 0}/${maxPlayers} jugadores`}
									</Tag>
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
			/>

			<ConfirmModalAntd
				title="¿Eliminar Jam?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="Vas a eliminar la jam seleccionada y no se va a poder deshacer. ¿Estás seguro/a?"
				open={isConfirmVisible}
				confirmLoading={loadingDelete}
				onCancel={() => setIsConfirmVisible(false)}
				onConfirm={handleDelete}
			/>

			{/* Modal confirmación expulsar jugador */}
			<ConfirmModalAntd
				title="¿Expulsar jugador/a?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="¿Estás seguro/a de que quieres expulsar a este jugador/a?"
				open={playerToExpel !== null}
				confirmLoading={loadingExpel}
				onCancel={() => setPlayerToExpel(null)}
				onConfirm={handleConfirmExpel}
			/>

			<Modal
				title="Jugadores actuales"
				open={isPlayersModalVisible}
				onCancel={() => setIsPlayersModalVisible(false)}
				footer={null}
			>
				<List
					dataSource={players}
					renderItem={(player: User) => (
						<List.Item
							actions={
								player.steamId !== createdBy.steamId
									? [
											<Button
												key={`expel-btn-${player.steamId}`}
												danger
												size="small"
												onClick={() => setPlayerToExpel(player.steamId)}
											>
												Expulsar jugador/a
											</Button>,
									  ]
									: []
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={player.avatar} />}
								title={player.name}
							/>
						</List.Item>
					)}
				/>
			</Modal>
		</>
	);
};

export default BigCardAntd;
