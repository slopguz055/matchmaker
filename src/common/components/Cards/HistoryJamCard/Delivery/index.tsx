"use client";

import { Card, Avatar, Image, Tooltip, Typography } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Jam } from "@/common/types/utility";

const { Text, Title, Paragraph } = Typography;

type Props = {
	jam: Jam;
};

const HistoryJamCard = ({ jam }: Props) => {
	const {
		title,
		description,
		date,
		time,
		game,
		createdBy,
		players,
		jamDate,
		jamTime,
	} = jam;

	const formattedDate = jamDate ? dayjs(jamDate).format("DD/MM/YYYY") : date;
	const formattedTime = jamTime || time;

	return (
		<div className="w-4/5 max-w-xl mx-auto">
			<Card
				hoverable
				title={
					game?.name ? (
						<span className="font-semibold text-lg">{game.name}</span>
					) : null
				}
				className="shadow-md rounded-lg"
				cover={
					game?.headerImage && (
						<Image
							alt={game.name}
							src={game.headerImage}
							height={160}
							style={{ objectFit: "cover" }}
							preview={false}
							className="h-40 w-full object-cover"
						/>
					)
				}
				bodyStyle={{ padding: "16px" }}
			>
				{/* Título de la Jam */}
				<Title level={4} className="mb-2">
					{title}
				</Title>

				{/* Descripción de la Jam */}
				{description && (
					<Paragraph className="mb-4 text-gray-700">{description}</Paragraph>
				)}

				{/* Información: fecha, hora, creador */}
				<div className="mb-4 text-sm text-gray-600 space-y-1">
					<p className="flex items-center gap-2">
						<CalendarOutlined /> {formattedDate}
					</p>
					<p className="flex items-center gap-2">
						<ClockCircleOutlined /> {formattedTime}
					</p>
					<p className="flex items-center gap-2">
						<UserOutlined /> {createdBy.name}
					</p>
				</div>

				{/* Lista de jugadores */}
				<div>
					<h4 className="text-sm font-semibold mb-2">
						Usuarios que participaron:
					</h4>
					<div className="flex flex-wrap gap-3">
						{players.map((player) => (
							<Tooltip key={player.steamId} title={player.name}>
								<a
									href={`http://localhost:3000/perfil?id=${player.steamId}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Avatar
										size="small"
										src={player.avatar}
										icon={<UserOutlined />}
										className="cursor-pointer"
									/>
								</a>
							</Tooltip>
						))}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default HistoryJamCard;
