interface ModalJamProps {
  isVisible: boolean;
  onCancel: () => void;
  onUpdate: (jam: any) => void;
  currentPlayers: number;
  jamData: {
    date?: string;
    time?: string;
    maxPlayers?: number;
    [key: string]: any;
  };
}
