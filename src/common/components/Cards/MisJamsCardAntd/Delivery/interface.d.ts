export interface MisJamCardAntdProps {
  jam: Jam;
  onUpdate: (updatedJam: Jam) => void;
  onDelete?: (id: string) => void;
}
