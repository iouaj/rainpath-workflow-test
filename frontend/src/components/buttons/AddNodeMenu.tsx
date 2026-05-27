import { useReactFlow } from '@xyflow/react';
import { useId, useRef, useState } from 'react';

import { Nodes, type CustomNodeType } from '@/nodes';
import { useClickOutsideAndEscape } from '@/utils/useClickOutsideAndEscape';

import './AddNodeMenu.css';

function createNodeId(type: CustomNodeType) {
  return `${type}-${crypto.randomUUID()}`;
}

export default function AddNodeMenu() {
  const dialogId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const closeMenu = () => setOpen(false);
  const openMenu  = () => setOpen(true);

  const addNode = (type: CustomNodeType) => {
    const definition = Nodes.find((node) => node.type === type);
    if (!definition) return;

    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    setNodes((nodes) => [
      ...nodes,
      {
        id: createNodeId(type),
        type: definition.type,
        position: {
          x: center.x + nodes.length * 24,
          y: center.y + nodes.length * 24,
        },
        data: { ...definition.defaultData },
      },
    ]);
    closeMenu();
  };

  useClickOutsideAndEscape(menuRef, closeMenu, open);

  return (
    <div className="add-node" ref={menuRef}>
      <button
        type="button"
        className="add-node__trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        <span>＋</span>
        <span>Ajouter un nœud</span>
      </button>

      {open && (
        <div
          id={dialogId}
          className="add-node__popover"
          role="dialog"
          aria-label="Ajouter un nœud au workflow"
        >
          <p className="add-node__heading">Choisir un type</p>
          <ul className="add-node__list">
            {Nodes.map((node) => (
              <li key={node.type}>
                <button
                  type="button"
                  className="add-node__option"
                  onClick={() => addNode(node.type as CustomNodeType)}
                >
                  <span className="add-node__option-icon" aria-hidden="true">
                    {node.icon}
                  </span>
                  <span className="add-node__option-text">
                    <span className="add-node__option-label">{node.label}</span>
                    {node.description && (
                      <span className="add-node__option-desc">{node.description}</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
