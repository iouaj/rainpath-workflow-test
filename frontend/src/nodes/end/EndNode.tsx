import { Handle, Position, type Node } from '@xyflow/react';

import '../shared/flow-node.css';

type EndNodeData = Record<string, never>;

export type FlowEndNode = Node<EndNodeData, 'endNode'>;

export default function EndNode() {
  return (
    <div className="flow-node flow-node--end">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Fin</span>
      <p className="flow-node__title">Fin du workflow</p>
    </div>
  );
}
