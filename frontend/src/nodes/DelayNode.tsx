import {
  Handle,
  Position,
  type Node,
  type NodeProps,
} from '@xyflow/react';

import './flow-node.css';
import type { DelayNodeData } from '../types/nodes';

export type WaitDaysNode = Node<DelayNodeData & Record<string, unknown>, 'waitDaysDelay'>;

export default function DelayNode({ data }: NodeProps<WaitDaysNode>) {
  const days = data.data.day ?? 1;

  const daysLabel = days <= 1 ? `${days} jour` : `${days} jours`;

  return (
    <div className="flow-node flow-node--timing">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Temporisation</span>
      <p className="flow-node__title">Attendre {daysLabel}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
