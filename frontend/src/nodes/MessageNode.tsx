import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import './flow-node.css';

import type { MessageNodeData } from '../types/nodes';

export type SendMessageNode = Node<MessageNodeData & Record<string, unknown>, 'sendEmailAction'>;

export default function MessageNode({ data }: NodeProps<SendMessageNode>) {  
    return (
    <div className="flow-node flow-node--action">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">{data.data.messageType}</span>
      <p className="flow-node__detail">
        {data.data.content || 'Contenue…'}    
      </p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}