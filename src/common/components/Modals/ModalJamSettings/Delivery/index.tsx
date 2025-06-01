"use client";
import React, { useEffect } from "react";
import {
	Modal,
	DatePicker,
	TimePicker,
	InputNumber,
	Form,
	Input,
	Select,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalJamProps {
	isVisible: boolean;
	onCancel: () => void;
	onUpdate: (updatedJam: any) => Promise<boolean>;
	players: number;
	jamData: any;
	isLoading?: boolean;
}

const { TextArea } = Input;
const { Option } = Select;

const gameModeOptions = [
	{ value: "CASUAL", label: "🎮 Casual" },
	{ value: "COMPETITIVE", label: "⚔️ Competitivo" },
	{ value: "COMPLETIST", label: "🏆 Completista" },
];

const voiceModeOptions = [
	{ value: "TEXT", label: "🔇 Texto" },
	{ value: "HEAR", label: "👂 Escuchar" },
	{ value: "TALK", label: "💬 Hablar" },
];

const languageOptions = [
	{ value: "INDEF", label: "🌐 Indefinido" },
	{ value: "ES", label: "🇪🇸 Español" },
	{ value: "EN", label: "🇬🇧 Inglés" },
	{ value: "FR", label: "🇫🇷 Francés" },
	{ value: "PT", label: "🇵🇹 Portugués" },
	{ value: "IT", label: "🇮🇹 Italiano" },
];

const durationOptions = [
	{ value: "15-30", label: "⏱️ 15–30 min" },
	{ value: "30-60", label: "⏱️ 30–60 min" },
	{ value: "60-120", label: "⏱️ 1–2 h" },
	{ value: "120-180", label: "⏱️ 2–3 h" },
	{ value: "180-240", label: "⏱️ 3–4 h" },
	{ value: "240+", label: "⏱️ +4 h" },
];

const ModalJam: React.FC<ModalJamProps> = ({
	isVisible,
	onCancel,
	onUpdate,
	players,
	jamData,
	isLoading = false,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (jamData) {
			form.setFieldsValue({
				title: jamData.title,
				description: jamData.description,
				date: jamData.jamDate ? dayjs(jamData.jamDate) : null,
				time: jamData.jamTime ? dayjs(jamData.jamTime, "HH:mm") : null,
				maxPlayers: jamData.maxPlayers,
				gameMode: jamData.gameMode,
				voiceMode: jamData.voiceMode,
				language: jamData.language,
				duration: jamData.duration,
			});
		}
	}, [jamData, form]);

	const handleOk = async () => {
		try {
			const values = await form.validateFields();

			const updatedJam = {
				id: jamData.id,
				title: values.title,
				description: values.description,
				jamDate: values.date?.format("YYYY-MM-DD"),
				jamTime: values.time?.format("HH:mm"),
				maxPlayers: values.maxPlayers,
				gameMode: values.gameMode,
				voiceMode: values.voiceMode,
				language: values.language,
				duration: values.duration,
			};

			const success = await onUpdate(updatedJam);

			if (success) {
				onCancel();
			}
		} catch (error) {
			toast.error("Completa todos los campos correctamente");
			console.error("Error en el formulario:", error);
		}
	};

	return (
		<Modal
			open={isVisible}
			onCancel={onCancel}
			onOk={handleOk}
			title="Editar Jam"
			okText="Actualizar"
			cancelText="Cancelar"
			confirmLoading={isLoading}
			width={700}
			className="custom-modal" // Clase adicional para estilos específicos
		>
			<Form form={form} layout="vertical" className="space-y-4">
				<Form.Item
					name="title"
					label="Título"
					rules={[{ required: true, message: "El título es requerido" }]}
				>
					<Input placeholder="Título de la Jam" maxLength={100} />
				</Form.Item>

				<Form.Item
					name="description"
					label="Descripción"
					rules={[{ required: true, message: "La descripción es requerida" }]}
				>
					<TextArea
						rows={4}
						placeholder="Describe tu Jam..."
						maxLength={500}
						showCount
					/>
				</Form.Item>

				<div className="grid grid-cols-2 gap-4">
					<Form.Item
						name="date"
						label="Fecha"
						rules={[{ required: true, message: "Selecciona una fecha" }]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>

					<Form.Item
						name="time"
						label="Hora"
						rules={[{ required: true, message: "Selecciona una hora" }]}
					>
						<TimePicker format="HH:mm" style={{ width: "100%" }} />
					</Form.Item>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Form.Item
						name="maxPlayers"
						label="Jugadores máximos"
						rules={[{ required: true, message: "Número requerido" }]}
					>
						<InputNumber
							min={players}
							max={100}
							style={{ width: "100%" }}
							disabled={players > jamData.maxPlayers}
						/>
					</Form.Item>

					<Form.Item
						name="duration"
						label="Duración"
						rules={[{ required: true, message: "Selecciona una duración" }]}
					>
						<Select options={durationOptions} />
					</Form.Item>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<Form.Item
						name="gameMode"
						label="Modo de juego"
						rules={[{ required: true, message: "Selecciona un modo" }]}
					>
						<Select options={gameModeOptions} />
					</Form.Item>

					<Form.Item
						name="voiceMode"
						label="Modo de voz"
						rules={[{ required: true, message: "Selecciona un modo" }]}
					>
						<Select options={voiceModeOptions} />
					</Form.Item>

					<Form.Item
						name="language"
						label="Idioma"
						rules={[{ required: true, message: "Selecciona un idioma" }]}
					>
						<Select options={languageOptions} />
					</Form.Item>
				</div>
			</Form>
		</Modal>
	);
};

export default ModalJam;
