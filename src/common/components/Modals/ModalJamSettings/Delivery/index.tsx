"use client";
import React, { useEffect } from "react";
import { Modal, DatePicker, TimePicker, InputNumber, Form } from "antd";
import dayjs from "dayjs";

interface ModalJamProps {
	isVisible: boolean;
	onCancel: () => void;
	onUpdate: (updatedJam: any) => void;
	currentPlayers: number;
	jamData: any;
	messageApi: any; // Recibimos el messageApi para toasts
}

const ModalJam: React.FC<ModalJamProps> = ({
	isVisible,
	onCancel,
	onUpdate,
	currentPlayers,
	jamData,
	messageApi,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (jamData) {
			form.setFieldsValue({
				date: jamData.jamDate ? dayjs(jamData.jamDate) : null,
				time: jamData.jamTime ? dayjs(jamData.jamTime, "HH:mm") : null,
				maxPlayers: jamData.maxPlayers,
			});
		}
	}, [jamData, form]);

	const handleOk = async () => {
		try {
			const values = await form.validateFields();

			const date = values.date?.format("YYYY-MM-DD");
			const time = values.time?.format("HH:mm");

			onUpdate({
				...jamData,
				jamDate: date,
				jamTime: time,
				maxPlayers: values.maxPlayers,
			});

			onCancel();
			messageApi.success("Jam actualizada correctamente");
		} catch {
			messageApi.error("Completa todos los campos correctamente");
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
		>
			<Form form={form} layout="vertical">
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

				<Form.Item
					name="maxPlayers"
					label="Jugadores máximos"
					rules={[{ required: true, message: "Número requerido" }]}
				>
					<InputNumber
						min={currentPlayers}
						max={100}
						style={{ width: "100%" }}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalJam;
