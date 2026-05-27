import { useNodeEdit } from '@/context/NodeEditContext';
import { useReactFlow } from '@xyflow/react';

type Props = {
    className?: string;
    onSuccess: () => void;
    onError: () => void;
};

export function LoadButton({ className, onError, onSuccess } : Props) {
  const { openLoadForm } = useNodeEdit();
  const { setNodes, setEdges, setViewport } = useReactFlow();

  const handleLoad = async () => {
    const id = await openLoadForm();

    if (!id) return;

    const response = await fetch(`http://localhost:3000/api/workflow/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        onError();
    } else {
        onSuccess();

        const result = await response.json();

        setNodes(result.nodes);
        setEdges(result.edges);
        setViewport(result.viewport);
    }
  };

  return <button onClick={handleLoad} className={className} >Charger</button>;
}