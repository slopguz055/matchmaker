"use client";
import CustomArrows from "@/common/components/SlickSlider/Delivery";
import { Card, Image } from "antd";

export default function HomePage() {
	const cardItems = Array.from({ length: 10 }).map((_, i) => ({
		game: `Hola, prueba título ${i + 1}`,
		alt: "Prueba de card",
		src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
		user: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i + 1}`,
		desc: "Esto es una descripción de prueba",
	}));

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-white">¡Bienvenido/a!</h1>
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
				<h2 className="text-2xl font-semibold text-white">Últimas jams</h2>
				<Card className="bg-gray-900 border-none text-gray-300">
					<div className="w-full max-w-screen-xl">
						<CustomArrows items={cardItems} />
					</div>
				</Card>
			</div>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold text-white">Buscar jams</h2>
				<Card className="bg-gray-900 border-none text-gray-300">
					<p>Aquí iría un buscador</p>
				</Card>
			</div>
		</div>
	);
}
