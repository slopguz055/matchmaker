"use client";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Radio,
	Select,
	TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

// Mock data types
type Game = {
	id: string;
	title: string;
	image: string;
};

const getAllGames = (): Promise<Game[]> => {
	return Promise.resolve([
		{
			id: "game1",
			title: "Rocket League",
			image:
				"https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg",
		},
		{
			id: "game2",
			title: "Valorant",
			image:
				"https://upload.wikimedia.org/wikipedia/en/2/2b/Valorant_cover_art.jpg",
		},
		{
			id: "game3",
			title: "Among Us",
			image:
				"https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
		},
	]);
};

const FormCrearJam: FC = () => {
	const [mode, setMode] = useState("casual");
	const [voice, setVoice] = useState("text");
	const [games, setGames] = useState<Game[]>([]); // ✅ Estado para juegos
	const [form] = Form.useForm();

	useEffect(() => {
		getAllGames().then(setGames); // ✅ Obtener juegos al montar
	}, []);

	const handleFinish = async (values: any) => {
		if (values.desc == "") {
			values.desc = "¡Únete a mi partida";
		}
		console.log(values);
	};

	const modeOptions = [
		{ value: "casual", emoji: "🎮", label: "Casual" },
		{ value: "competitive", emoji: "⚔️", label: "Competitivo" },
		{ value: "complecionist", emoji: "🏆", label: "Complecionista" },
	];

	const voiceOptions = [
		{ value: "text", emoji: "✍️🔇", label: "Texto" },
		{ value: "hear", emoji: "✍️👂", label: "Texto y oír" },
		{ value: "talk", emoji: "🗣️💬", label: "Hablar" },
	];

	return (
		<Form
			className="w-full"
			form={form}
			layout="vertical"
			onFinish={handleFinish}
			initialValues={{
				gameMode: "casual",
				voice: "text",
				numPlayers: 2,
				desc: "¡Únete a mi partida!",
			}}
		>
			<Form.Item
				name="game"
				label="Juego"
				rules={[{ required: true, message: "Este campo es obligatorio" }]}
			>
				<Select
					showSearch
					placeholder="Elige un juego"
					filterOption={(input, option) =>
						(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
					}
					options={games.map((game) => ({
						value: game.id,
						label: game.title,
					}))}
				/>
			</Form.Item>

			<Form.Item
				name="lang"
				label="Idioma"
				rules={[{ required: true, message: "Este campo es obligatorio" }]}
			>
				<Select
					showSearch
					placeholder="Selecciona el lenguaje preferido"
					filterOption={(input, option) =>
						(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
					}
					options={[
						{ value: "nolang", label: "🌐 - Indiferente" },
						{ value: "es", label: "🇪🇸 - Español" },
						{ value: "en", label: "🇬🇧 - English" },
						{ value: "pt", label: "🇵🇹 - Portuguese" },
						{ value: "fr", label: "🇫🇷 - French" },
						{ value: "it", label: "🇮🇹 - Italian" },
					]}
				/>
			</Form.Item>

			<Form.Item name="desc" label="Descripción" rules={[{ required: false }]}>
				<TextArea showCount rows={4} maxLength={300} />
			</Form.Item>

			<Form.Item
				name="date"
				label="Fecha"
				rules={[{ required: true, message: "Selecciona una fecha" }]}
			>
				<DatePicker style={{ width: "100%" }} minDate={dayjs()} />
			</Form.Item>

			<Form.Item name="gameMode" label="Modo de juego" className="w-full">
				<Radio.Group
					value={mode}
					onChange={(e) => setMode(e.target.value)}
					className="!flex w-full"
					buttonStyle="solid"
				>
					{modeOptions.map((opt) => (
						<Radio.Button
							key={opt.value}
							value={opt.value}
							className={`
          flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2
          ${mode === opt.value ? "!font-bold" : ""}
        `}
						>
							<div className="text-2xl bg-slate-50 rounded-lg mx-6">
								{opt.emoji}
							</div>
							<div className="mt-1 text-sm">{opt.label}</div>
						</Radio.Button>
					))}
				</Radio.Group>
			</Form.Item>

			<Form.Item name="voice" label="Comunicación" className="w-full">
				<Radio.Group
					value={voice}
					onChange={(e) => setVoice(e.target.value)}
					className="!flex w-full"
					buttonStyle="solid"
				>
					{voiceOptions.map((opt) => (
						<Radio.Button
							key={opt.value}
							value={opt.value}
							className={`flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2 ${
								voice === opt.value ? "font-bold" : ""
							}`}
						>
							<div className="text-2xl bg-slate-50 rounded-lg">{opt.emoji}</div>
							<div className="mt-1 text-sm">{opt.label}</div>
						</Radio.Button>
					))}
				</Radio.Group>
			</Form.Item>

			<Form.Item
				name="time"
				label="Hora"
				rules={[{ required: true, message: "Selecciona una hora" }]}
			>
				<TimePicker format="HH:mm" style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item
				name="numPlayers"
				label="Número de jugadores"
				rules={[{ required: true, message: "Este campo es obligatorio" }]}
			>
				<Input type="number" min={2} max={100} />
			</Form.Item>

			<Form.Item
				name="duration"
				label="Duración aproximada"
				rules={[{ required: true, message: "Este campo es obligatorio" }]}
			>
				<Select placeholder="Selecciona una opción">
					<Select.Option value="15-30">15–30 minutos</Select.Option>
					<Select.Option value="30-60">30 minutos – 1 hora</Select.Option>
					<Select.Option value="60-120">1 – 2 horas</Select.Option>
					<Select.Option value="120-180">2 – 3 horas</Select.Option>
					<Select.Option value="180-240">3 – 4 horas</Select.Option>
					<Select.Option value="240+">Más de 4 horas</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Enviar
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormCrearJam;

/* 

import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const ExampleComponent = () => {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>Modo de juego</span>
        <Tooltip title="Selecciona el modo de juego que prefieras.">
          <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
        </Tooltip>
      </div>

      <div>
        <span>Comunicación</span>
        <Tooltip title="Opciones para comunicarte con otros jugadores.">
          <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
        </Tooltip>
      </div>
    </div>
  );
};

*/
