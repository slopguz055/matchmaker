import GeneralJamList from "@/common/components/Cards/GeneralJamsList/Delivery";

export default function JamsPage() {
	return (
		<div className="text-center space-y-4 py-4">
			<h1 className="text-4xl font-bold">Jams</h1>
			<p>Lista de Jams disponibles.</p>
			<GeneralJamList />
		</div>
	);
}
