import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

type SmsNodeData = {
  message: string;
  recipient: string;
};

export type SendSmsNode = Node<SmsNodeData, 'sendSmsAction'>;

export default function SmsNode({ data }: NodeProps<SendSmsNode>) {
  return (
    <div className="flow-node flow-node--action">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">SMS</span>
      <p className="flow-node__title">
        {data.message.trim() || 'Sans message'}
      </p>
      <p className="flow-node__detail">{data.recipient.trim() || 'Numéro…'}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
