import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

type WhatsAppNodeData = {
  message: string;
  recipient: string;
};

export type SendWhatsAppNode = Node<WhatsAppNodeData, 'sendWhatsAppAction'>;

export default function WhatsAppNode({ data }: NodeProps<SendWhatsAppNode>) {
  return (
    <div className="flow-node flow-node--action">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">WhatsApp</span>
      <p className="flow-node__title">
        {data.message.trim() || 'Sans message'}
      </p>
      <p className="flow-node__detail">
        {data.recipient.trim() || 'Numéro WhatsApp…'}
      </p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
