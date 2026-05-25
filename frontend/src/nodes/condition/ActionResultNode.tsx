import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

export type ActionKind = 'email' | 'sms' | 'whatsapp' | 'postal';

export type ActionOutcome = 'rejected' | 'delivered' | 'pending';

const ACTION_LABELS: Record<ActionKind, string> = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  postal: 'Courrier postal',
};

const OUTCOME_LABELS: Record<ActionOutcome, string> = {
  rejected: 'rejeté',
  delivered: 'délivré',
  pending: 'en attente',
};

type ActionResultNodeData = {
  action: ActionKind;
  outcome: ActionOutcome;
};

export default function ActionResultNode({
  data,
}: NodeProps<Node<ActionResultNodeData>>) {
  const action = ACTION_LABELS[data.action];
  const outcome = OUTCOME_LABELS[data.outcome];

  return (
    <div className="flow-node flow-node--condition">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Condition · Action</span>
      <p className="flow-node__title">
        {action} {outcome} ?
      </p>
      <p className="flow-node__detail">Vérifie le résultat d&apos;une action</p>
      <div className="flow-node__branch-labels">
        <span>Non</span>
        <span>Oui</span>
      </div>
      <Handle type="source" position={Position.Left} id="no" />
      <Handle type="source" position={Position.Right} id="yes" />
    </div>
  );
}
