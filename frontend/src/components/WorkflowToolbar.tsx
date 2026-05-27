import { Panel, useReactFlow } from '@xyflow/react';
import { useState } from 'react';

import AddNodeMenu from '@/components/buttons/AddNodeMenu';

import './WorkflowToolbar.css';
import { SaveButton } from './buttons/SaveButton';
import { LoadButton } from './buttons/LoadButton';
import { useNodeEdit } from '@/context/NodeEditContext';

type Feedback = { type: 'success' | 'error'; message: string } | null;

export default function WorkflowToolbar() {
  const { setNodes, setEdges } = useReactFlow();
  const [feedback, setFeedback] = useState<Feedback>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
      setFeedback({ type, message });
      window.setTimeout(() => setFeedback(null), 2500);
  };

  const { openClearConfirm } = useNodeEdit();

  const handleClear = async () => {
    const confirmed = await openClearConfirm();
    if (!confirmed) return;

    setNodes([]);
    setEdges([]);
    showFeedback('success', 'Workflow effacé');
  };

  return (
    <Panel position="top-left" className="workflow-toolbar-panel">
      <div className="workflow-toolbar">
        <AddNodeMenu />
        <SaveButton
          className="workflow-toolbar__btn workflow-toolbar__btn--primary"
          onError={() => showFeedback('error', 'Une erreur est survenue.')}
          onSuccess={() => showFeedback("success", "Workflow sauvegardé !")}
        />
        <LoadButton
          className="workflow-toolbar__btn workflow-toolbar__btn--primary"
          onError={() => showFeedback('error', 'Une erreur est survenue.')}
          onSuccess={() => showFeedback("success", 'Workflow chargé !')}
        />
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
