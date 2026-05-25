import React, { useState, useEffect } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  placeholder?: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  title,
  message,
  placeholder = "Entrez votre texte...",
  defaultValue = "",
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  useEffect(() => { //A VOIR POUR VIRER CA ET FAIRE CA AUTREMENT
    if (isOpen) {
      setInputValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onConfirm(inputValue);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            style={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
          
          <div style={styles.buttonContainer}>
            <button 
              type="button" 
              onClick={onCancel} 
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              style={{ ...styles.button, ...styles.confirmButton }}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    color: '#333',
    fontFamily: 'sans-serif',
  },
  title: {
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  message: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
  }
};