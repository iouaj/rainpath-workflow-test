import React, { useEffect, useRef } from 'react';
import './modal.css';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bool: boolean) => void;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(true);
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal modal--sm">
        <div className="modal__header">
          <div className="modal__icon modal__icon--danger">🗑️</div>
          <h3 className="modal__title">Effacer le workflow ?</h3>
        </div>
        <div className="modal__divider" />
        <form onSubmit={handleDelete} className="modal__body">
          <p className="modal__text">
            Tous les nœuds et connexions seront supprimés. Cette action est irréversible.
          </p>
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn--danger">
              Effacer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
