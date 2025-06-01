interface ModalJamProps {
  isVisible: boolean;
  onCancel: () => void;
  onUpdate: (jam: any) => void;
  players: number;
  jamData: {
    date?: string;
    time?: string;
    maxPlayers?: number;
    [key: string]: any;
  };
}
