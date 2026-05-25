import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

type EmailNodeData = {
  subject: string;
  recipient: string;
};

export type SendEmailNode = Node<EmailNodeData, 'sendEmailAction'>;

export default function EmailNode({ data }: NodeProps<SendEmailNode>) {
  return (
    <div className="flow-node flow-node--action">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Email</span>
      <p className="flow-node__title">{data.subject.trim() || 'Sans sujet'}</p>
      <p className="flow-node__detail">
        {data.recipient.trim() || 'Destinataire…'}
      </p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
