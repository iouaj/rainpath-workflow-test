import { useReactFlow } from '@xyflow/react';
import React, { useState, useEffect, useRef } from 'react';
import type { MessageNodeData } from '@/types/nodes';
import { MessageTypeSelect } from '@/components/select/MessageTypeSelect';

interface EditNodeModalProps {
    isOpen: boolean;
    nodeId: string;
    nodeData: MessageNodeData;
    onClose: () => void;
}

export default function MessageEditModal({
    isOpen,
    nodeId,
    nodeData,
    onClose,
}: EditNodeModalProps) {
  // États locaux pour gérer les champs du formulaire
  const [typeInput, setTypeInput] = useState(nodeData.data.messageType);
  const [contentInput, setContentInput] = useState(nodeData.data.content);
  
  const modalRef = useRef<HTMLDivElement>(null);

  const { setNodes } = useReactFlow();

  // Gestion de la fermeture (Échap et Clic à l'extérieur)
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

    if (!typeInput) return;

    e.preventDefault();

    setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                data : {
                  messageType: typeInput,
                  content: contentInput
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
        <h3 style={styles.modalTitle}>Configuration du bloc</h3>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* 1. Sélecteur de type */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Canal d'envoi (Badge)</label>
            <MessageTypeSelect
              value={typeInput}
              onChange={setTypeInput}
              styles={styles.select}
            />
          </div>

          {/* 2. Zone de texte pour le contenu */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contenu du message</label>
            <textarea
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder="Tapez votre message ici..."
              style={styles.textarea}
              rows={4}
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

// Styles en ligne basiques et modernes
const styles: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'sans-serif' },
  modal: { background: '#fff', padding: '24px', borderRadius: '12px', width: '380px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  modalTitle: { margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' },
  select: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', backgroundColor: '#fff', outline: 'none', cursor: 'pointer' },
  textarea: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', outline: 'none', resize: 'vertical', minHeight: '80px', fontFamily: 'inherit' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' },
  cancelBtn: { padding: '9px 16px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#4b5563', fontWeight: '500' },
  saveBtn: { padding: '9px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }
};