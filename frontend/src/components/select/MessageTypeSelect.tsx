import type { MessageType } from '../../types/nodes';

type Props = {
  value: string;
  onChange: (value: MessageType) => void;
  className?: string;
};

export function MessageTypeSelect({ value, onChange, className }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MessageType)}
      className={className}
    >
      <option value="">— Choisir un canal —</option>
      <option value="email">✉️  Email</option>
      <option value="sms">💬  SMS</option>
      <option value="whatsapp">📱  WhatsApp</option>
      <option value="postal">📮  Courrier postal</option>
    </select>
  );
}
