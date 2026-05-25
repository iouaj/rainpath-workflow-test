import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

type PostalNodeData = {
  subject: string;
  address: string;
};

export type SendPostalNode = Node<PostalNodeData, 'sendPostalAction'>;

export default function PostalNode({ data }: NodeProps<SendPostalNode>) {
  return (
    <div className="flow-node flow-node--action">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Courrier</span>
      <p className="flow-node__title">{data.subject.trim() || 'Sans objet'}</p>
      <p className="flow-node__detail">
        {data.address.trim() || 'Adresse postale…'}
      </p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
