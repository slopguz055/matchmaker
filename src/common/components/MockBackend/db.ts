type Game = {
  id: string;
  title: string;
  image: string;
};

type User = {
  id: string;
  username: string;
  avatar: string;
};

type Jam = {
  id: string;
  userId: string;
  gameId: string;
  maxPlayers: number;
  currentPlayers: User[];
  description: string;
  status: string;
  date: string;
  time: string;
  user?: User;
  game?: Game;
};

export const getJamsByUser = (userId: string): Promise<Jam[]> => {
  const games: Game[] = [
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
  ];

  const users: User[] = [
    {
      id: "user1",
      username: "PlayerOne",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "user2",
      username: "GamerGirl",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "user3",
      username: "NoobMaster69",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const jams: Jam[] = [
    {
      id: "jam1",
      userId: "user1",
      gameId: "game1",
      maxPlayers: 4,
      currentPlayers: [users[1], users[2]],
      description: "¡Buscando dos más para un 2v2 competitivo!",
      status: "en curso",
      date: "2025-05-18",
      time: "20:00",
    },
    {
      id: "jam2",
      userId: "user1",
      gameId: "game2",
      maxPlayers: 5,
      currentPlayers: [users[2]],
      description: "Valorant chill, no ranked.",
      status: "en curso",
      date: "2025-05-19",
      time: "18:30",
    },
    {
      id: "jam3",
      userId: "user1",
      gameId: "game3",
      maxPlayers: 10,
      currentPlayers: [users[1], users[2], users[0]],
      description: "Among Us con amigos, se permite voice chat.",
      status: "en curso",
      date: "2025-05-20",
      time: "22:00",
    },
  ];

  return Promise.resolve(
    jams
      .filter((j) => j.userId === userId)
      .map((jam) => ({
        ...jam,
        user: users.find((u) => u.id === jam.userId),
        game: games.find((g) => g.id === jam.gameId),
      }))
  );
};
