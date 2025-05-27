"use client";

import LoginButton from "../../LoginButton/Delivery";
import { Image, Layout, Menu } from "antd";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@/common/types/utility";
import UserNavAvatar from "../UserNavAvatar/Delivery";

const { Header } = Layout;

const navItems = [
	{ key: "jams", label: "Jams", href: "/jams" },
	{ key: "crear", label: "Crear Jam", href: "/crear-jam" },
	{ key: "mis", label: "Mis Jams", href: "/mis-jams" },
	{ key: "historial", label: "Historial", href: "/historial" },
];

const menuItems = navItems.map((item) => ({
	key: item.key,
	label: <Link href={item.href}>{item.label}</Link>,
}));

const NavBar: FC = () => {
	const pathname = usePathname();
	const selectedKey = navItems.find((item) =>
		pathname.startsWith(item.href)
	)?.key;

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:8080/auth/me", { credentials: "include" })
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => setUser(data))
			.finally(() => setLoading(false));
	}, []);

	console.log(user);

	return (
		<Header className="bg-primary-dark px-10 shadow-sm h-16 flex items-center relative z-50">
			<div className="flex items-center">
				<Link
					href="/"
					className="my-2 mx-2 text-lg font-bold text-gray-800 hover:text-black flex items-center"
				>
					<Image
						src="mmkr_logov2.png"
						alt="Logo de Matchmaker"
						height={55}
						width={55}
						preview={false}
						className="inline-block align-middle"
					/>
				</Link>

				<Link
					href="/"
					className="ml-3 text-lg font-bold text-gray-800 hover:text-black"
				>
					MatchMaKeR
				</Link>
			</div>

			<div className="absolute left-1/2 transform -translate-x-1/2">
				<Menu
					mode="horizontal"
					selectedKeys={selectedKey ? [selectedKey] : []}
					className="border-none font-medium text-base bg-transparent"
					items={menuItems}
					overflowedIndicator={null}
				/>
			</div>

			<div className="ml-auto flex items-center">
				{user ? <UserNavAvatar user={user} /> : <LoginButton />}
			</div>
		</Header>
	);
};

export default NavBar;
