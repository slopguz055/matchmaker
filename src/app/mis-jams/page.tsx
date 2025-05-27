import JamTabs from "@/common/components/JamTabs/Delivery";

export default function MisJamsPage() {
	return (
		<div className="text-center space-y-4 py-4">
			<h1 className="text-4xl font-bold">Mis Jams</h1>
			<p>Explora las Jams a las que te has unido o que has creado.</p>
			<div className="min-h-screen flex items-center justify-center px-4 my-6">
				<div className="container max-w-3xl bg-slate-800/70 p-10 rounded-lg shadow-md">
					<JamTabs />
				</div>
			</div>
		</div>
	);
}
