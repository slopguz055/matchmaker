"use client";
import React, { useEffect } from "react";
import {
  Modal,
  DatePicker,
  TimePicker,
  InputNumber,
  Form,
  message,
} from "antd";
import dayjs from "dayjs";

const ModalJam: React.FC<ModalJamProps> = ({
  isVisible,
  onCancel,
  onUpdate,
  currentPlayers,
  jamData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (jamData) {
      form.setFieldsValue({
        date: jamData.date ? dayjs(jamData.date) : null,
        time: jamData.time ? dayjs(jamData.time, "HH:mm") : null,
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
        date,
        time,
        maxPlayers: values.maxPlayers,
      });

      onCancel();
      message.success("Jam actualizada");
    } catch {
      message.error("Completa todos los campos");
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
