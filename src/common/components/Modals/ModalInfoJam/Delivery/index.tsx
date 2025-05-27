import {
	RedditOutlined,
	DiscordOutlined,
	MehOutlined,
	FrownOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { FC } from "react";

interface User {
	id: string;
	username: string;
	avatar: string;
}

interface ModalInfoJamProps {
	visible: boolean;
	onClose: () => void;
	participants: User[];
	onRemoveUser: (userId: string) => void;
}

const ModalInfoJam: FC<ModalInfoJamProps> = ({
	visible,
	onClose,
	participants,
	onRemoveUser,
}) => {
	return (
		<Modal
			title="Participantes en la Jam"
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<h1>ModalInfoJam</h1>
			<RedditOutlined />
			<DiscordOutlined />
			<MehOutlined />
			<FrownOutlined />
			<p>Hasta luego</p>
		</Modal>
	);
};

export default ModalInfoJam;
