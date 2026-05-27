import { useState, useEffect, useRef } from 'react';
import './modal.css';

interface WorkflowSummary {
  id: string;
  name: string;
  updatedAt: string;
}

interface LoadWorkflowModalProps {
  isOpen: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function LoadWorkflowModal({ isOpen, onSelect, onClose }: LoadWorkflowModalProps) {
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Charger la liste des workflows
  useEffect(() => {
    if (!isOpen) return;

    const fetchWorkflows = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/workflow');
        if (!response.ok) throw new Error('Erreur de chargement');
        const data = await response.json();
        setWorkflows(data);
      } catch {
        setWorkflows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflows();
  }, [isOpen]);

  // Fermeture (Échap + clic extérieur)
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

  const handleSelectWorkflow = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal">
        <div className="modal__header">
          <div className="modal__icon">📂</div>
          <h3 className="modal__title">Ouvrir un workflow</h3>
        </div>
        <div className="modal__divider" />
        <div className="modal__body">
          {isLoading ? (
            <div className="modal__loading">Chargement…</div>
          ) : workflows.length === 0 ? (
            <div className="modal__empty">Aucun workflow enregistré pour le moment.</div>
          ) : (
            <div className="modal__list">
              {workflows.map((flow) => (
                <button
                  key={flow.id}
                  type="button"
                  className="modal__list-item"
                  onClick={() => handleSelectWorkflow(flow.id)}
                >
                  <span className="modal__list-item-name">{flow.name}</span>
                </button>
              ))}
            </div>
          )}
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
