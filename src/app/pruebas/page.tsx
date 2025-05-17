import UserNavAvatar from "@/common/components/Navigation/UserNavAvatar/Delivery";

export default function PagePruebas() {
	const usuario = {
		avatar:
			"https://avatars.steamstatic.com/274b80c245f0daab9db805507e79753c0568ca09_full.jpg",
		name: "guineapig.driver gamehag.com",
		profileUrl: "https://steamcommunity.com/profiles/76561198847318451/",
		steamId: "76561198847318451",
	};
	return (
		<div>
			<UserNavAvatar user={usuario} />
		</div>
	);
}
