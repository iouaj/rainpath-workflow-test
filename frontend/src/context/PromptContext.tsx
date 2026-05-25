import React, { createContext, useContext, useState } from 'react';
import { PromptModal } from '../components/PromptModal';

interface PromptContextType {
  triggerPrompt: (title: string, message: string, onConfirm: (value: string) => void) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: (value: string) => void }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const triggerPrompt = (title: string, message: string, onConfirm: (value: string) => void) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm: (value) => {
        onConfirm(value);
        setModal((prev) => ({ ...prev, isOpen: false })); // Ferme après validation
      },
    });
  };

  return (
    <PromptContext.Provider value={{ triggerPrompt }}>
      {children}
      <PromptModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={() => setModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </PromptContext.Provider>
  );
};

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePrompt doit être utilisé dans un PromptProvider");
  return context;
};