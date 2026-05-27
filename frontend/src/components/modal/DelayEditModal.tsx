import React, { useState, useEffect, useRef } from 'react';
import { useReactFlow } from '@xyflow/react';
import type { DelayNodeData } from '@/types/nodes';
import './modal.css';

interface EditDelayNodeModalProps {
  isOpen: boolean;
  nodeId: string;
  nodeData: DelayNodeData;
  onClose: () => void;
}

export default function DelayEditModal({ isOpen, nodeId, nodeData, onClose }: EditDelayNodeModalProps) {
  const [delayInput, setDelayInput] = useState<number>(nodeData.data.day || 1);
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

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, data: { day: delayInput } } }
          : node
      )
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal modal--sm">
        <div className="modal__header">
          <div className="modal__icon modal__icon--warning">⏳</div>
          <h3 className="modal__title">Configuration du délai</h3>
        </div>
        <div className="modal__divider" />
        <form onSubmit={handleSubmit} className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Nombre de jours à attendre</label>
            <input
              type="number"
              className="modal__input"
              min="1"
              max="999"
              value={delayInput}
              onChange={(e) => setDelayInput(Math.max(1, parseInt(e.target.value) || 1))}
              autoFocus
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
