"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Card, Typography, Skeleton, Tag, Button } from "antd";

const { Title } = Typography;

type User = {
	id: number;
	steamId: string;
	name: string;
	avatar: string;
};

export default function PerfilPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const steamIdFromUrl = searchParams.get("id");

	const [usuario, setUsuario] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		if (!steamIdFromUrl) {
			// No hay id en URL: fetch para obtener user actual
			fetch("http://localhost:8080/auth/me", { credentials: "include" })
				.then(async (res) => {
					if (!res.ok) {
						throw new Error("No autenticado o token inválido");
					}
					const data = await res.json();
					if (!data?.steamId) {
						throw new Error("No se ha proporcionado una id de usuario válida");
					}
					// Redirigir a /perfil?id=steamId
					router.replace(`/perfil?id=${data.steamId}`);
				})
				.catch((err) => {
					setError(err instanceof Error ? err.message : "Error desconocido");
					setCargando(false);
				});
			return;
		}

		// Si hay id en URL, cargar usuario normal
		setCargando(true);
		setError(null);
		setUsuario(null);

		const fetchUserBySteamId = async (steamId: string) => {
			try {
				const res = await fetch(
					`http://localhost:8080/users/byId/mongo/${steamId}`
				);

				if (res.status === 404) {
					setError("No se ha encontrado un usuario con la ID proporcionada");
					setUsuario(null);
					setCargando(false);
					return;
				}

				if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

				const data = await res.json();

				if (!data || Object.keys(data).length === 0) {
					setError("No se ha encontrado un usuario con la ID proporcionada");
					setUsuario(null);
				} else {
					setUsuario(data);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error desconocido");
				setUsuario(null);
			} finally {
				setCargando(false);
			}
		};

		fetchUserBySteamId(steamIdFromUrl);
	}, [steamIdFromUrl, router]);

	if (cargando)
		return (
			<div className="w-1/2 mx-auto mt-12">
				<Skeleton avatar paragraph={{ rows: 3 }} active />
			</div>
		);

	if (error) return <p className="text-red-500 text-center mt-12">{error}</p>;
	if (!usuario)
		return <p className="text-center mt-12">No se encontró el usuario.</p>;

	const profileUrl = `https://steamcommunity.com/profiles/${usuario.steamId}`;

	return (
		<div className="w-1/2 mx-auto mt-12">
			<Card
				className="bg-[#181E2C] text-white"
				style={{ borderRadius: "1rem" }}
			>
				<div className="flex items-center gap-4 mb-4">
					<Avatar size={80} src={usuario.avatar} />
					<div>
						<Title level={1} className="text-accent m-0">
							{usuario.name}
						</Title>
						<Tag color="geekblue" className="mt-1">
							Steam ID: {usuario.steamId}
						</Tag>
					</div>
				</div>

				<div className="mx-4 mr-4 flex justify-end">
					<Button
						type="default"
						href={profileUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Ir al perfil de Steam
					</Button>
				</div>
			</Card>
		</div>
	);
}
