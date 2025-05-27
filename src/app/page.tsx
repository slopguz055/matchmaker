"use client";
import CustomArrows from "@/common/components/SlickSlider/Delivery";
import { Card, Image, message } from "antd";
import { useEffect, useState } from "react";

export default function HomePage() {
	const [cardItems, setCardItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLatestJams = async () => {
			try {
				const response = await fetch(`http://localhost:8080/jams/`);
				if (!response.ok) throw new Error("Error al obtener las jams");

				const jams = await response.json();

				const latestFive = jams
					.sort(
						(a: any, b: any) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
					.slice(0, 5)
					.map((jam: any) => ({
						game: jam.game.name,
						alt: jam.game.name,
						src: jam.game.headerImage,
						user: jam.createdBy.avatar,
						desc: jam.description || "Sin descripción disponible",
					}));

				setCardItems(latestFive);
			} catch (error) {
				console.error(error);
				message.error("No se pudieron cargar las últimas jams");
			} finally {
				setLoading(false);
			}
		};

		fetchLatestJams();
	}, []);

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold">¡Bienvenido/a!</h1>
				<Image
					src="matchmaker_big_v2.png"
					preview={false}
					className="rounded-xl mx-auto shadow-lg max-w-full"
					alt="Matchmaker banner"
				/>
				<p className="text-gray-300 text-lg">
					Inicia sesión con tu cuenta de Steam y busca grupos de juego o créalos
					tú mismo/a y diviértete jugando cuando, como y con quien quieras.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Últimas jams</h2>
				<Card className="bg-gray-900 border-none text-gray-300">
					<div className="w-full max-w-screen-xl">
						{loading ? (
							<p className="text-center text-white">Cargando...</p>
						) : cardItems.length > 0 ? (
							<CustomArrows items={cardItems} />
						) : (
							<p className="text-center text-white">No hay jams disponibles</p>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
}
