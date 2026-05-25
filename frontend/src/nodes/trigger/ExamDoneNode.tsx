import { Handle, Position, type Node } from '@xyflow/react';

import '../shared/flow-node.css';

type ExamDoneNodeData = Record<string, never>;

export type ExamDoneNode = Node<ExamDoneNodeData, 'examDoneTrigger'>;

export default function ExamDoneNode() {
  return (
    <div className="flow-node flow-node--trigger">
      <span className="flow-node__badge">Départ</span>
      <p className="flow-node__title">Exam effectué</p>
      <p className="flow-node__detail">Point de départ du workflow</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
