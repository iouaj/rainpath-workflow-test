import {
  Handle,
  Position,
  useNodeId,
  useReactFlow,
  type Node,
  type NodeProps,
} from '@xyflow/react';

import '../shared/flow-node.css';

type DelayNodeData = {
  days: number;
};

export type WaitDaysNode = Node<DelayNodeData, 'waitDaysDelay'>;

export default function DelayNode({ data }: NodeProps<WaitDaysNode>) {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();
  const days = data.days ?? 1;

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!nodeId) return;

    const raw = event.target.value;
    if (raw === '') {
      updateNodeData(nodeId, { days: 0 });
      return;
    }

    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      updateNodeData(nodeId, { days: parsed });
    }
  };

  const daysLabel = days <= 1 ? `${days} jour` : `${days} jours`;

  return (
    <div className="flow-node flow-node--timing">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Temporisation</span>
      <p className="flow-node__title">Attendre X jours</p>
      <label className="flow-node__field nodrag">
        <span className="flow-node__field-label">Nombre de jours</span>
        <input
          type="number"
          min={0}
          step={1}
          className="flow-node__input nodrag"
          value={days}
          onChange={handleDaysChange}
          onPointerDown={(event) => event.stopPropagation()}
        />
      </label>
      <p className="flow-node__detail">{daysLabel}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
