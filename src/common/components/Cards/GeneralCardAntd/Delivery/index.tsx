"use client";

import React from "react";
import { Card, Typography, Link } from "antd";
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
}

const GeneralJamCard: React.FC<JamCardProps> = ({ jam }) => {
	return (
		<Card
			className="max-w-4xl mx-auto my-6 flex"
			hoverable
			styles={{ body: { padding: 0 } }}
			style={{ minHeight: 250 }} // altura mínima fija para que tome referencia la imagen
		>
			{/* Contenedor imagen */}
			<div className="flex-shrink-0 h-full flex items-center justify-center w-[250px] overflow-hidden">
				<img
					src={jam.game.headerImage}
					alt={jam.game.name}
					className="h-full object-cover"
					// ancho automático para mantener proporción, pero ocupando toda la altura
					style={{ width: "auto" }}
				/>
			</div>

			{/* Contenido textual */}
			<div className="flex flex-col p-6 flex-grow">
				<Title level={4} className="mb-1">
					{jam.title}
				</Title>

				<Text type="secondary" className="mb-3">
					{dayjs(jam.jamDate).format("DD/MM/YYYY")} - {jam.jamTime}
				</Text>

				<Paragraph
					ellipsis={{ rows: 3, expandable: false }}
					className="mb-4 text-gray-700"
				>
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
			</div>
		</Card>
	);
};

export default GeneralJamCard;
