import JamList from "@/common/components/JamList";

export default function MisJamsPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 my-6">
			<div className="container max-w-3xl bg-slate-800/70 p-6 rounded-lg shadow-md  px-10 py-10">
				<JamList />
			</div>
		</div>
	);
}
