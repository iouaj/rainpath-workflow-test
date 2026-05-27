import React, { createContext, useContext, useState } from 'react';
import type { NodeData, NodeType } from '../types/nodes';
import MessageEditModal from '../components/modal/MessageEditModal';
import DelayEditModal from '../components/modal/DelayEditModal';
import ConditionEditModal from '../components/modal/ConditionEditModal';
import WorkflowFormModal from '@/components/modal/WorkflowFormModal';
import LoadWorkflowModal from '@/components/modal/LoadWorkflowModal';
import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';

interface NodeEditContextType {
  openEditModal: (nodeId: string, currentData: NodeData) => void;
  openSaveFormModal: () => Promise<string | null>;
  openLoadForm: () => Promise<string | null>;
  openClearConfirm: () => Promise<boolean>;
}

const NodeEditContext = createContext<NodeEditContextType | undefined>(undefined);

export const NodeEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États de la modal
  const [isOpen, setIsOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [currentNodeData, setCurrentNodeData] = useState<NodeData | null>(null);

  const [type, setType] = useState<NodeType | 'saveForm' | 'loadForm' | 'clearConfirm' | null>(null);

  const [submitResolver, setSubmitResolver] = useState<((name : string | boolean | null) => void) | null>(null);

  // Fonction ouverture edit modal
  const openEditModal = (nodeId: string, currentData: NodeData) => {

    console.log(currentData);

    setCurrentNodeId(nodeId);
    setType(currentData.type);
    setCurrentNodeData(currentData);
    setIsOpen(true);
  };

  const openSaveFormModal = () => {
    setType('saveForm');
    setIsOpen(true);

    return new Promise<string | null>((resolve) => {
      setSubmitResolver(() => resolve)
    })
  }

  const openLoadForm = () => {
    setType('loadForm');
    setIsOpen(true);

    return new Promise<string | null>((resolve) => {
      setSubmitResolver(() => resolve);
    })
  }

  const openClearConfirm = () => {
    setType('clearConfirm');
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setSubmitResolver(() => resolve);
    })
  }

  const handleClearConfirm = (bool : boolean) => {
    setIsOpen(false);
    if (submitResolver) submitResolver(bool);
    setSubmitResolver(null);
  }

  const handleConfirmSave = (name : string) => {
    setIsOpen(false);
    if (submitResolver) submitResolver(name);
    setSubmitResolver(null);
  }

  const handleCloseSave = () => {
    setIsOpen(false);
    if (submitResolver) submitResolver(null);
    setSubmitResolver(null);
  }

  const handleClose = () => {
    setIsOpen(false);
    setCurrentNodeId(null);
  };

  return (
    <NodeEditContext.Provider value={{ openEditModal, openSaveFormModal, openLoadForm, openClearConfirm }}>
      {children}

      {isOpen && type === 'messageAction' && (
        <MessageEditModal
            isOpen={isOpen}
            nodeId={currentNodeId!}
            nodeData={currentNodeData!}
            onClose={handleClose}
        />
      )}

      {isOpen && type === 'timing' && (
        <DelayEditModal
            isOpen={isOpen}
            nodeId={currentNodeId!}
            nodeData={currentNodeData!}
            onClose={handleClose}
        />
      )}

      {isOpen && type === 'conditional' && (
        <ConditionEditModal
            isOpen={isOpen}
            nodeId={currentNodeId!}
            nodeData={currentNodeData!}
            onClose={handleClose}
        />
      )}

      {isOpen && type === 'saveForm' && (
        <WorkflowFormModal
          isOpen={isOpen}
          onConfirm={handleConfirmSave}
          onCancel={handleCloseSave}
        />
      )}

      {isOpen && type === 'loadForm' && (
        <LoadWorkflowModal
          isOpen={isOpen}
          onSelect={handleConfirmSave}
          onClose={handleCloseSave}
        />
      )}

      {isOpen && type == 'clearConfirm' && (
        <DeleteConfirmationModal
          isOpen={isOpen}
          onConfirm={handleClearConfirm}
          onClose={handleCloseSave}
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
