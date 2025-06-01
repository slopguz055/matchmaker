import { ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
	token: {
		colorPrimary: "#ef4444",
		borderRadius: 6,
		colorText: "#333",
		colorTextDescription: "var(--text-light)",
	},
	components: {
		Form: {
			fontSize: 15,
			labelColor: "var(--text-light)",
		},
		Card: {
			colorText: "#0A0A0A",
		},
		Menu: {
			itemBg: "var(--primary-dark)",
			itemColor: "var(--text-light)",
			itemHoverColor: "#ffffff",
			itemSelectedColor: "var(--accent)",
			itemSelectedBg: "transparent",
			horizontalItemHoverColor: "#ffffff",
			horizontalItemSelectedColor: "var(--accent)",
			horizontalItemBorderRadius: 4,
		},
		Button: {
			defaultBg: "#181E2C",
			defaultColor: "#FFFFFF",
			defaultHoverBg: "#1F2737",
			defaultHoverColor: "#91caff",
			defaultBorderColor: "#181E2C",
		},
		Input: {
			colorText: "#000000",
			colorBgContainer: "#FFFFFF",
			colorBorder: "#cccccc",
			colorTextPlaceholder: "#888888",
		},
		Select: {
			colorText: "#000000",
			colorBgContainer: "#FFFFFF",
			colorBorder: "#cccccc",
			colorTextPlaceholder: "#888888",
		},
		InputNumber: {
			colorText: "#000000",
			colorBgContainer: "#FFFFFF",
			colorBorder: "#cccccc",
			colorTextPlaceholder: "#888888",
		},
		DatePicker: {
			colorText: "#000000",
			colorBgContainer: "#FFFFFF",
			colorBorder: "#cccccc",
			colorTextPlaceholder: "#888888",
		},
	},
};

export default themeConfig;
