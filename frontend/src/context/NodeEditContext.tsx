import React, { createContext, useContext, useState } from 'react';
import type { NodeData, NodeType } from '../types/nodes';
import { isDelayNodeData, isMessageNodeData } from '../utils/functions';
import MessageEditModal from '../components/modal/MessageEditModal';
import DelayEditModal from '../components/modal/DelayEditModal';
import ConditionEditModal from '../components/modal/ConditionEditModal';

interface NodeEditContextType {
  openEditModal: (nodeId: string, currentData: NodeData) => void;
}

const NodeEditContext = createContext<NodeEditContextType | undefined>(undefined);

export const NodeEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États de la modal
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [currentNodeData, setCurrentNodeData] = useState<NodeData | null>(null);

  const [type, setType] = useState<NodeType | null>(null);

  // Fonction ouverture edit modal
  const openEditModal = (nodeId: string, currentData: NodeData) => {

    console.log(currentData);

    setCurrentNodeId(nodeId);
    setType(currentData.type);
    setCurrentNodeData(currentData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentNodeId(null);
  };

  return (
    <NodeEditContext.Provider value={{ openEditModal }}>
      {children}

      {isOpen && type === 'messageAction' && (
        <MessageEditModal
            isOpen={isOpen}
            nodeId={currentNodeId}
            nodeData={currentNodeData}
            onClose={handleClose}
        />
      )}

      {isOpen && type === 'timing' && (
        <DelayEditModal
            isOpen={isOpen}
            nodeId={currentNodeId}
            nodeData={currentNodeData}
            onClose={handleClose}
        />
      )}

      {isOpen && type === 'conditional' && (
        <ConditionEditModal
            isOpen={isOpen}
            nodeId={currentNodeId}
            nodeData={currentNodeData}
            onClose={handleClose}
        />
      )}

    </NodeEditContext.Provider>
  );
};

// Hook personnalisé pour l'appeler à la volée
export const useNodeEdit = () => {
  const context = useContext(NodeEditContext);
  if (!context) throw new Error('useNodeEdit doit être utilisé dans NodeEditProvider');
  return context;
};