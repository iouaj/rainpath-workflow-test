import { useReactFlow } from '@xyflow/react';
import {
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  NODE_CATEGORIES,
  Nodes,
  type CustomNodeType,
  type NodeCategory,
} from '../nodes';

import './AddNodeMenu.css';
import { useClickOutsideAndEscape } from '../utils/useClickOutsideAndEscape';

type MenuStep = 'category' | 'node';

function createNodeId(type: CustomNodeType) {
  return `${type}-${crypto.randomUUID()}`;
}

function getSortedCategories(): { id: NodeCategory; label: string }[] {
  return (Object.keys(NODE_CATEGORIES) as NodeCategory[])
    .sort((a, b) => NODE_CATEGORIES[a].order - NODE_CATEGORIES[b].order)
    .map((id) => ({ id, label: NODE_CATEGORIES[id].label }));
}

export default function AddNodeMenu() {
  const dialogId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const closeMenu = () => {
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

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
        Add Node
      </button>

      {open && (
        <div
          id={dialogId}
          className="add-node__popover"
          role="dialog"
          aria-label="Ajouter un node au workflow"
        >
            <>
              <ul className="add-node__list">
                {Nodes.map((node) => (
                  <li key={node.type}>
                    <button
                      type="button"
                      className="add-node__option"
                      onClick={() => addNode(node.type as CustomNodeType)}
                    >
                      <span className="add-node__option-label">
                        {node.label}
                      </span>
                      <span className="add-node__option-desc">
                        {node.description}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
        </div>
      )}
    </div>
  );
}
