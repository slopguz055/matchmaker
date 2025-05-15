export interface ConfirmModalAntdProps {
  title: string;
  message: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
