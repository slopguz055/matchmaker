import { FC } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

const CustomArrow: FC<ArrowProps & { direction: "left" | "right" }> = ({
	className,
	style,
	onClick,
	direction,
}) => {
	const Icon = direction === "left" ? LeftOutlined : RightOutlined;
	const position = direction === "left" ? { left: -16 } : { right: -16 };

	return (
		<div
			className={className}
			style={{
				...style,
				...position,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(0,0,0,0.5)",
				borderRadius: "50%",
				width: 32,
				height: 32,
				zIndex: 10,
			}}
			onClick={onClick}
		>
			<Icon style={{ color: "white", fontSize: 16 }} />
		</div>
	);
};

export default CustomArrow;
