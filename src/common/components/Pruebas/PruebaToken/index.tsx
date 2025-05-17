"use client";
import { Image } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface User {
	id: number;
	steamId: string;
	username: string;
	avatar: string;
}

export function PruebaToken() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:8080/auth/me", { credentials: "include" })
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => setUser(data))
			.finally(() => setLoading(false));
	}, []);

	/* ───────  Render  ─────── */
	if (loading) return <p>Cargando usuario…</p>;
	if (!user) return <p>No has iniciado sesión.</p>;
	return (
		<div className="flex items-center gap-2">
			<Link href={"perfil?id=" + user.steamId}>
				<Image
					src={user.avatar}
					alt="avatar"
					width={32}
					height={32}
					className="rounded-full"
					preview={false}
				/>
			</Link>

			<span>{user.username}</span>
		</div>
	);
}
