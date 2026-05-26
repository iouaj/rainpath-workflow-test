import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { ConditionalNodeData } from '../types/nodes';
import { useCallback } from 'react';

export type ConditionNodeProps = Node<ConditionalNodeData & Record<string, unknown>, 'condition'>;

export default function ConditionNode({ data }: NodeProps<ConditionNodeProps>) {
    const generateCondition = useCallback(() : string => {
        if (data.data.conditionType === 'resource') {
            return `Le patient possède ${data.data.target} ?`
        } else {
            return `${data.data.target} ouvert ?`
        }
    }, []); 

    const condition = generateCondition();
  
    return (
    <div className="flow-node flow-node--condition">
      {/* L'ENTRÉE UNIQUE (en haut) */}
      <Handle type="target" position={Position.Top} />

      {/* LE CONTENU DU NŒUD */}
      <div className="flow-node__header">
        <span className="flow-node__badge">Condition 🔀</span>
      </div>
      <p className="flow-node__title">{condition || 'Si...'}</p>

      {/* LES DEUX SORTIES DISTINCTES (en bas) */}
      <div className="flow-node__outputs">
        
        {/* Sortie VRAI (à gauche) */}
        <div className="flow-node__output-wrapper flow-node__output-wrapper--true">
          <span className="flow-node__output-label">Vrai</span>
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="true" 
            style={{ left: '25%' }}
          />
        </div>

        {/* Sortie FAUX (à droite) */}
        <div className="flow-node__output-wrapper flow-node__output-wrapper--false">
          <span className="flow-node__output-label">Faux</span>
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="false"
            style={{ left: '75%' }}
          />
        </div>

      </div>
    </div>
  );
}