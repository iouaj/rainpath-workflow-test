import React, { useState, useRef } from 'react';
import { useReactFlow } from '@xyflow/react';
import type { ConditionalNodeData, ConditonType, MessageType } from '@/types/nodes';
import { MessageTypeSelect } from '../select/MessageTypeSelect';
import { useClickOutsideAndEscape } from '@/utils/useClickOutsideAndEscape';
import './modal.css';

interface EditConditionNodeModalProps {
  isOpen: boolean;
  nodeId: string;
  nodeData: ConditionalNodeData;
  onClose: () => void;
}

export default function ConditionEditModal({ isOpen, nodeId, nodeData, onClose }: EditConditionNodeModalProps) {
  const [typeInput,   setTypeInput]   = useState<ConditonType>(nodeData.data.conditionType || 'resource');
  const [targetInput, setTargetInput] = useState<MessageType>(nodeData.data.target || 'email');

  const modalRef = useRef<HTMLDivElement>(null);
  const { setNodes } = useReactFlow();

  useClickOutsideAndEscape(modalRef, onClose, isOpen, onClose);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, data: { conditionType: typeInput, target: targetInput } } }
          : node
      )
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal modal--sm">
        <div className="modal__header">
          <div className="modal__icon">🔀</div>
          <h3 className="modal__title">Configuration de la condition</h3>
        </div>
        <div className="modal__divider" />
        <form onSubmit={handleSubmit} className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Type de vérification</label>
            <select
              className="modal__select"
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value as ConditonType)}
            >
              <option value="resource">Ressource</option>
              <option value="status">Statut</option>
            </select>
          </div>
          <div className="modal__field">
            <label className="modal__label">Cible (canal)</label>
            <MessageTypeSelect
              value={targetInput}
              onChange={setTargetInput}
              className="modal__select"
            />
          </div>
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn--primary">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
