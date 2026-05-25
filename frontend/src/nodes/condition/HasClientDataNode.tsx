import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

import '../shared/flow-node.css';

export type ClientDataField = 'email' | 'phone' | 'whatsapp' | 'postalAddress';

const FIELD_LABELS: Record<ClientDataField, string> = {
  email: 'Email',
  phone: 'Téléphone',
  whatsapp: 'WhatsApp',
  postalAddress: 'Adresse postale',
};

type HasClientDataNodeData = {
  field: ClientDataField;
};

export default function HasClientDataNode({
  data,
}: NodeProps<Node<HasClientDataNodeData>>) {
  const label = FIELD_LABELS[data.field];

  return (
    <div className="flow-node flow-node--condition">
      <Handle type="target" position={Position.Top} />
      <span className="flow-node__badge">Condition · Donnée</span>
      <p className="flow-node__title">Client possède {label} ?</p>
      <p className="flow-node__detail">Vérifie la présence de la donnée</p>
      <div className="flow-node__branch-labels">
        <span>Non</span>
        <span>Oui</span>
      </div>
      <Handle type="source" position={Position.Left} id="no" />
      <Handle type="source" position={Position.Right} id="yes" />
    </div>
  );
}
