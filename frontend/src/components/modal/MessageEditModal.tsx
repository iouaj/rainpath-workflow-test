import React, { useState, useEffect, useRef } from 'react';
import { useReactFlow } from '@xyflow/react';
import type { MessageNodeData } from '@/types/nodes';
import { MessageTypeSelect } from '@/components/select/MessageTypeSelect';
import './modal.css';

interface EditNodeModalProps {
  isOpen: boolean;
  nodeId: string;
  nodeData: MessageNodeData;
  onClose: () => void;
}

export default function MessageEditModal({ isOpen, nodeId, nodeData, onClose }: EditNodeModalProps) {
  const [typeInput, setTypeInput]       = useState(nodeData.data.messageType);
  const [contentInput, setContentInput] = useState(nodeData.data.content);

  const modalRef = useRef<HTMLDivElement>(null);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const handlePointerDown = (e: PointerEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeInput) return;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, data: { messageType: typeInput, content: contentInput } } }
          : node
      )
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal modal--sm">
        <div className="modal__header">
          <div className="modal__icon">✉️</div>
          <h3 className="modal__title">Configuration du message</h3>
        </div>
        <div className="modal__divider" />
        <form onSubmit={handleSubmit} className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Canal d'envoi</label>
            <MessageTypeSelect
              value={typeInput}
              onChange={setTypeInput}
              className="modal__select"
            />
          </div>
          <div className="modal__field">
            <label className="modal__label">Contenu du message</label>
            <textarea
              className="modal__textarea"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder="Tapez votre message ici…"
              rows={4}
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
