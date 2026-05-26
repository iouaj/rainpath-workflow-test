import { Panel, useReactFlow } from '@xyflow/react';
import { useState } from 'react';

import { clearStoredWorkflow, saveWorkflow } from '@/workflow/storage';

import AddNodeMenu from './AddNodeMenu';

import './WorkflowToolbar.css';

type Feedback = { type: 'success' | 'error'; message: string } | null;

export default function WorkflowToolbar() {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const [feedback, setFeedback] = useState<Feedback>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
      setFeedback({ type, message });
      window.setTimeout(() => setFeedback(null), 2500);
  };

  const handleSave = () => {
    const nodes = getNodes();
    const edges = getEdges();

    const save = (name : string) => {
      saveWorkflow(nodes, edges, name);
      showFeedback('success', `Workflow ${name} sauvegardé`);
    }

  };

  const handleClear = () => {
    const confirmed = window.confirm(
      'Effacer tout le workflow actuel ? Cette action est irréversible.',
    );
    if (!confirmed) return;

    setNodes([]);
    setEdges([]);
    clearStoredWorkflow();
    showFeedback('success', 'Workflow effacé');
  };

  return (
    <Panel position="top-left" className="workflow-toolbar-panel">
      <div className="workflow-toolbar">
        <AddNodeMenu />
        <button
          type="button"
          className="workflow-toolbar__btn workflow-toolbar__btn--primary"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
        <button
          type="button"
          className="workflow-toolbar__btn workflow-toolbar__btn--danger"
          onClick={handleClear}
        >
          Effacer
        </button>
      </div>
      {feedback && (
        <p
          className={`workflow-toolbar__feedback workflow-toolbar__feedback--${feedback.type}`}
          role="status"
        >
          {feedback.message}
        </p>
      )}
    </Panel>
  );
}
