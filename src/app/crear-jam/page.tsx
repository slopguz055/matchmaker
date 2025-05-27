import FormCrearJam from "@/common/components/Forms/FormCrearJam/Delivery";

export default function PageCrearJam() {
	return (
		<div className="text-center space-y-4 py-4">
			<h1 className="text-4xl font-bold">Nueva Jam</h1>
			<p>Rellena los siguientes campos para crear una nueva Jam</p>
			<div className="min-h-screen flex items-center justify-center px-4 my-6">
				<div className="container max-w-3xl bg-slate-800/70 p-6 rounded-lg shadow-md  px-10 py-10">
					<FormCrearJam />
				</div>
			</div>
		</div>
	);
}
