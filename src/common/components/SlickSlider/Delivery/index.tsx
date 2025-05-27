// TODO: El responsive no funciona
import { FC } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardAntd from "../../Cards/CardAntd";

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

interface CustomArrowsProps {
	items: {
		game: string;
		alt: string;
		src: string;
		user: string;
		desc: string;
	}[];
}

const SampleArrow: FC<ArrowProps & { direction: "left" | "right" }> = ({
	className,
	style,
	onClick,
	direction,
}) => {
	const Icon = direction === "left" ? LeftOutlined : RightOutlined;
	const position = direction === "left" ? { left: -50 } : { right: -50 };

	return (
		<div
			className={`${className} custom-slick-arrow`}
			style={{
				...style,
				...position,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(255, 0, 0, 0.9)",
				borderRadius: "35%",
				width: 70,
				height: 200,
				zIndex: 20,
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			<Icon
				style={{
					color: "#f8fafc",
					fontSize: "40px",
					fontWeight: "bold",
					display: "block",
					margin: "0 auto",
				}}
			/>
		</div>
	);
};

const CustomArrows: FC<CustomArrowsProps> = ({ items }) => {
	const settings = {
		arrows: true,
		centerMode: true,
		centerPadding: "20px",
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <SampleArrow direction="right" />,
		prevArrow: <SampleArrow direction="left" />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
				},
			},
		],
	};

	return (
		<div className="slider-container rounded-lg shadow-md overflow-visible px-2 sm:px-4 md:px-6 py-6">
			<style>
				{`
          .slick-prev::before, .slick-next::before {
            display: none !important;
            content: '' !important;
          }
          .custom-slick-arrow {
            display: flex !important;
            align-items: center;
            justify-content: center;
            opacity: 1 !important;
          }
          .slick-disabled .custom-slick-arrow {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
          }
          .slick-slide > div {
            display: flex;
            justify-content: center;
          }
        `}
			</style>

			<Slider {...settings}>
				{items.map((item, index) => (
					<div key={index} className="px-2 sm:px-4 md:px-6 flex justify-center">
						<CardAntd
							game={item.game}
							alt={item.alt}
							src={item.src}
							user={item.user}
							desc={item.desc}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default CustomArrows;
