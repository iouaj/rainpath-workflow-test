import type { MessageType } from "../../types/nodes";

type Props = {
    value: string;
    onChange: (value : MessageType) => void;
    styles: any;
}

export function MessageTypeSelect(data : Props) {
    return (
        <select
            value={data.value}
            onChange={(e) => data.onChange(e.target.value as MessageType)}
            style={data.styles}
        >
            <option value="">-- Choisir un type de message--</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="postal">Postal</option>
        </select>
    );
}