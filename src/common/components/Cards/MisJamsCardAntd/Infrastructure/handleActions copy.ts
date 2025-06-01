// handleActions.ts
import { Jam } from "@/common/types/utility";

export const deleteJam = async (jamId: string): Promise<void> => {
	const res = await fetch(`http://localhost:8080/jams/delete/${jamId}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Error al eliminar la jam");
	}
};

export const expelPlayer = async (
	jamId: string,
	playerId: string
): Promise<Jam> => {
	const res = await fetch(
		`http://localhost:8080/jams/${jamId}/removePlayer/${playerId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Error al expulsar al jugador");
	}

	return res.json();
};

export const leaveJam = async (
	jamId: string,
	playerId: string
): Promise<Jam | null> => {
	const res = await fetch(
		`http://localhost:8080/jams/${jamId}/removePlayer/${playerId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (res.status === 204) return null;

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Error al salir de la jam");
	}

	return res.json();
};

export const updateJam = async (
	jamId: string,
	jamData: Partial<Jam>
): Promise<Jam> => {
	const res = await fetch(`http://localhost:8080/jams/modify/${jamId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(jamData),
		credentials: "include",
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText || "Error al actualizar la jam");
	}

	return res.json();
};
