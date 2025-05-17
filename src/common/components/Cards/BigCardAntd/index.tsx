"use client";

import React, { useState } from "react";
import { Avatar, Card, Image, Tag } from "antd";
import {
	DeleteOutlined,
	SettingOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { UserGroupIcon } from "../../CustomIconsAntd";
import ModalJam from "../../Modals/ModalJamSettings/Delivery";
import ConfirmModalAntd from "../../Modals/ConfirmModalAntd/Delivery";

interface User {
	id: string;
	username: string;
	avatar: string;
}

interface BigCardAntdProps {
	game: string;
	alt: string;
	src: string;
	user: string;
	desc: string;
	date?: string;
	time?: string;
	maxPlayers?: number;
	currentPlayers?: User[];
	jamData: any;
	onUpdateJam: (newJamData: any) => void;
	onDeleteJam?: (id: string) => void;
}

const BigCardAntd: React.FC<BigCardAntdProps> = ({
	game,
	alt,
	src,
	user,
	desc,
	date,
	time,
	maxPlayers,
	currentPlayers = [],
	jamData,
	onUpdateJam,
	onDeleteJam,
}) => {
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const handleUpdateJam = (newJamData: any) => {
		onUpdateJam(newJamData);
	};

	return (
		<>
			<Card
				className="transition-transform duration-200 hover:scale-105 my-8 mx-12"
				style={{ width: 600 }}
				cover={<Image alt={alt} src={src} preview={false} />}
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
					<UserGroupIcon key="group" />,
				]}
			>
				<Meta
					avatar={<Avatar src={user} />}
					title={<span className="text-2xl font-semibold">{game}</span>}
					description={
						<div className="text-base mt-2 space-y-1">
							<div>{desc}</div>
							{date && time && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<CalendarOutlined />
									<span>{`${date} a las ${time}`}</span>
								</div>
							)}
							{maxPlayers && (
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<Tag color="blue">{`${currentPlayers.length}/${maxPlayers} jugadores`}</Tag>
								</div>
							)}
							{/*
              {maxPlayers && currentPlayers && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Tooltip
                    title={
                      <div className="flex space-x-2">
                        {currentPlayers.map((player: any) => (
                          <Avatar
                            key={player.id}
                            src={player.avatar}
                            alt={player.username}
                            size="small"
                          />
                        ))}
                      </div>
                    }
                  >
                    <Tag color="blue">
                      {`${currentPlayers.length}/${maxPlayers} jugadores`}
                    </Tag>
                  </Tooltip>
                </div>
              )}
              */}
						</div>
					}
				/>
			</Card>

			<ModalJam
				isVisible={isEditModalVisible}
				onCancel={() => setIsEditModalVisible(false)}
				onUpdate={handleUpdateJam}
				currentPlayers={currentPlayers.length}
				jamData={jamData}
			/>

			<ConfirmModalAntd
				title="¿Eliminar Jam?"
				icon={<DeleteOutlined className="text-4xl" />}
				message="Vas a eliminar la jam seleccionada y no se va a poder deshacer. ¿Estás seguro/a?"
				open={isConfirmVisible}
				onCancel={() => setIsConfirmVisible(false)}
				onConfirm={() => {
					onDeleteJam?.(jamData.id);
					setIsConfirmVisible(false);
				}}
			/>
		</>
	);
};

export default BigCardAntd;
