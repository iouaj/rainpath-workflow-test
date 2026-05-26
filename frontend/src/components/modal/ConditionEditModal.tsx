import React, { useState, useRef } from 'react';
import type { ConditionalNodeData, ConditonType, MessageType } from '@/types/nodes';
import { useReactFlow } from '@xyflow/react';
import { MessageTypeSelect } from '../select/MessageTypeSelect';
import { useClickOutsideAndEscape } from '@/utils/useClickOutsideAndEscape';

interface EditConditionNodeModalProps {
  isOpen: boolean;
  nodeId: string;
  nodeData: ConditionalNodeData;
  onClose: () => void;
}

export default function ConditionEditModal({
  isOpen,
  nodeId,
  nodeData,
  onClose,
}: EditConditionNodeModalProps) {
  // États locaux pour les deux choix de la condition
  const [typeInput, setTypeInput] = useState<ConditonType>(nodeData.data.conditionType || 'resource');
  const [targetInput, setTargetInput] = useState<MessageType>(nodeData.data.target || 'email');
  
  const modalRef = useRef<HTMLDivElement>(null);

  const { setNodes } = useReactFlow();

  useClickOutsideAndEscape(modalRef, onClose, isOpen, onClose);

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
                      conditionType: typeInput,
                      target: targetInput,
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
        <h3 style={styles.modalTitle}>Configuration de la Condition</h3>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* 1. Le Type de Condition */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Type de vérification</label>
            <select
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value as ConditonType)}
              style={styles.select}
            >
              <option value="resource">Ressource</option>
              <option value="status">Statut</option>
            </select>
          </div>

          {/* 2. La Cible (Message Type) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Cible (Type de message)</label>
            <MessageTypeSelect
              value={targetInput}
              onChange={setTargetInput}
              styles={styles.select}
            />
          </div>

          {/* Boutons d'action */}
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

// Alignement sur la charte graphique de tes autres modals
const styles: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, fontFamily: 'sans-serif' },
  modal: { background: '#fff', padding: '24px', borderRadius: '12px', width: '350px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  modalTitle: { margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' },
  select: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', backgroundColor: '#fff', outline: 'none', cursor: 'pointer' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' },
  cancelBtn: { padding: '9px 16px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#4b5563', fontWeight: '500' },
  saveBtn: { padding: '9px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' } // Bouton couleur indigo assorti au nœud conditionnel
};