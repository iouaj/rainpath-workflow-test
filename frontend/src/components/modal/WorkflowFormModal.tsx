import React, { useState, useEffect, useRef } from 'react';
import './modal.css';

interface SaveWorkflowModalProps {
  isOpen: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export default function WorkflowFormModal({ isOpen, onConfirm, onCancel }: SaveWorkflowModalProps) {
  const [nameInput, setNameInput] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    const handlePointerDown = (e: PointerEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onConfirm(nameInput.trim());
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal modal--sm">
        <div className="modal__header">
          <div className="modal__icon">💾</div>
          <h3 className="modal__title">Enregistrer le workflow</h3>
        </div>
        <div className="modal__divider" />
        <form onSubmit={handleSubmit} className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Nom du workflow *</label>
            <input
              type="text"
              className="modal__input"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Ex : Suivi post-examen"
              required
              autoFocus
            />
          </div>
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn btn--primary" disabled={!nameInput.trim()}>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
