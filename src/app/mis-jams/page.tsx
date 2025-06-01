import JamTabs from "@/common/components/JamTabs/Delivery";
import { FolderOpenOutlined } from "@ant-design/icons";

export default function MisJamsPage() {
	return (
		<div className="text-center space-y-4 py-4">
			<h1 className="text-4xl font-bold flex justify-center items-center gap-2">
				<FolderOpenOutlined className="relative -top-[2px] mr-2" />
				Mis Jams
				<FolderOpenOutlined className="relative -top-[2px] ml-2" />
			</h1>
			<p>Explora las Jams a las que te has unido o que has creado.</p>
			<div className="min-h-screen flex items-center justify-center px-4 my-6">
				<div className="container max-w-3xl bg-slate-800/70 p-10 rounded-lg shadow-md">
					<JamTabs />
				</div>
			</div>
		</div>
	);
}
