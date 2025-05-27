"use client";
import { Avatar, Button, Card, Image, Modal } from "antd";
import { FC, useState, useEffect } from "react";
import Meta from "antd/es/card/Meta";

interface User {
	id: string;
	username: string;
	avatar: string;
}

interface CardAntdProps {
	game: string;
	alt: string;
	src: string;
	user: string;
	desc: string;
}

const CardAntd: FC<CardAntdProps> = ({ game, alt, src, user, desc }) => {
	const [isClient, setIsClient] = useState(false);
	const [infoModalVisible, setInfoModalVisible] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<>
			<Card
				className="h-[30vh] flex flex-col justify-between border border-transparent hover:border-slate-400 transition-all duration-500 hover:scale-105"
				style={{ maxWidth: 460, width: "100%" }}
				cover={<Image alt={alt} src={src} preview={false} />}
				actions={[
					<Button
						key="more-info"
						type="primary"
						onClick={() => setInfoModalVisible(true)}
					>
						Más info
					</Button>,
				]}
			>
				<Meta
					avatar={<Avatar src={user} />}
					title={game}
					description={
						<span style={{ color: "black" }}>
							{desc.length > 20 ? desc.slice(0, 20) + "..." : desc}
						</span>
					}
				/>
			</Card>

			<Modal
				open={infoModalVisible}
				onCancel={() => setInfoModalVisible(false)}
				footer={null}
				title="Información de la Jam"
			>
				<div className="flex flex-col gap-4">
					<Image alt={alt} src={src} preview={false} className="rounded-md" />
					<div>
						<h2 className="text-lg font-semibold">{game}</h2>
						<p className="text-gray-700">{desc}</p>
					</div>

					<div className="mt-6 text-center text-sm text-gray-400">
						Navega por Jams para más información
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CardAntd;
