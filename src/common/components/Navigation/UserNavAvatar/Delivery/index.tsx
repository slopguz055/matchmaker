"use client";

import { User } from "@/common/types/utility";
import { Image } from "antd";
import Link from "next/link";
import { FC, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "@/common/components/Modals/ConfirmModalAntd/Delivery";
import logout from "../Infrastructure/sessionFunctions";

interface UserNavAvatarProps {
	user: User;
}
const UserNavAvatar: FC<UserNavAvatarProps> = ({ user }) => {
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const handleLogoutClick = () => {
		setIsConfirmVisible(true);
	};

	const handleConfirmLogout = () => {
		logout();
		setIsConfirmVisible(false);
	};

	return (
		<div className="flex items-center gap-3">
			{/* Modal de confirmación */}
			<ConfirmModalAntd
				title="¿Cerrar sesión?"
				icon={<PoweroffOutlined className="text-4xl" />}
				message="¿Estás seguro de que quieres cerrar sesión?"
				open={isConfirmVisible}
				onCancel={() => setIsConfirmVisible(false)}
				onConfirm={handleConfirmLogout}
			/>

			<Link
				href={"perfil?id=" + user.steamId}
				onClick={(e) => e.preventDefault()}
				className="flex items-center"
			>
				<div className="flex items-center gap-3">
					<Image
						src={user.avatar}
						alt="avatar"
						width={46}
						height={46}
						className="rounded-full border-2 border-white cursor-pointer mr-2"
						preview={false}
					/>
					<p>{user.name}</p>
				</div>
			</Link>
			<span
				onClick={handleLogoutClick}
				className="text-white cursor-pointer hover:text-gray-300 transition"
			>
				<PoweroffOutlined />
			</span>
		</div>
	);
};

export default UserNavAvatar;
