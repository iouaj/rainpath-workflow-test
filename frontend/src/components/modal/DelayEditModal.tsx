import React, { useState, useEffect, useRef } from 'react';
import type { DelayNodeData } from '@/types/nodes';
import { useReactFlow } from '@xyflow/react';

interface EditDelayNodeModalProps {
  isOpen: boolean;
  nodeId: string;
  nodeData: DelayNodeData;
  onClose: () => void;
}

export default function DelayEditModal({
  isOpen,
  nodeId,
  nodeData,
  onClose,
}: EditDelayNodeModalProps) {
  const [delayInput, setDelayInput] = useState<number>(nodeData.data.day || 1);
  const modalRef = useRef<HTMLDivElement>(null);

  const { setNodes } = useReactFlow();

  // Fermetures de sécurité (Échap et Clic extérieur)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                data : {
                  day: delayInput,
                }
              },
            };
          }
          return node;
        })
    );

    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div ref={modalRef} style={styles.modal}>
        <h3 style={styles.modalTitle}>Configuration du Délai</h3>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre de jours à attendre</label>
            <input
              type="number"
              min="1"
              max="999"
              value={delayInput}
              // Sécurité : évite les nombres négatifs ou vides en forçant au moins 1
              onChange={(e) => setDelayInput(Math.max(1, parseInt(e.target.value) || 1))}
              style={styles.input}
              autoFocus
            />
          </div>

          {/* Boutons */}
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Annuler
            </button>
            <button type="submit" style={styles.saveBtn}>
              Enregistrer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// Styles minimalistes et propres
const styles: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'sans-serif' },
  modal: { background: '#fff', padding: '24px', borderRadius: '12px', width: '320px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  modalTitle: { margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', color: '#1f2937', width: '100%', boxSizing: 'border-box', outline: 'none' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' },
  cancelBtn: { padding: '9px 16px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#4b5563', fontWeight: '500' },
  saveBtn: { padding: '9px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }
};