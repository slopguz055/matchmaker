import HistoryJamList from "@/common/components/Cards/HistoryJamList/Delivery";

export default function HistorialPage() {
	return (
		<>
			<div className="text-center space-y-4 py-4">
				<h1 className="text-4xl font-bold">Historial de Jams</h1>
				<p>Estas son las Jams en las que has participado</p>
			</div>
			<HistoryJamList />
		</>
	);
}
