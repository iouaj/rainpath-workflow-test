import { useNodeEdit } from '@/context/NodeEditContext';
import { useReactFlow } from '@xyflow/react';

type Props = {
    className?: string;
    onSuccess: () => void;
    onError: () => void;
};

export function SaveButton({ className, onError, onSuccess } : Props) {
  const { toObject } = useReactFlow();
  const { openSaveFormModal } = useNodeEdit();

  const handleSave = async () => {
    const name = await openSaveFormModal();

    if (!name) return;

    const flow = toObject();

    const response = await fetch('http://localhost:3000/api/workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        nodes: flow.nodes,
        edges: flow.edges,
        viewport: flow.viewport
      }),
    });

    if (!response.ok) {
        onError()
    } else {
        onSuccess();
    }
  };

  return <button onClick={handleSave} className={className} >Sauvegarder</button>;
}