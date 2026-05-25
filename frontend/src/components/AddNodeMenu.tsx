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
  const [step, setStep] = useState<MenuStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<NodeCategory | null>(
    null,
  );
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const categories = useMemo(() => getSortedCategories(), []);

  const nodesInCategory = useMemo(
    () =>
      selectedCategory
        ? Nodes.filter((node) => node.category === selectedCategory)
        : [],
    [selectedCategory],
  );

  const resetMenu = () => {
    setStep('category');
    setSelectedCategory(null);
  };

  const closeMenu = () => {
    setOpen(false);
    resetMenu();
  };

  const openMenu = () => {
    resetMenu();
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

  const selectCategory = (category: NodeCategory) => {
    setSelectedCategory(category);
    setStep('node');
  };

  const goBackToCategories = () => {
    setStep('category');
    setSelectedCategory(null);
  };

  const selectedCategoryLabel = selectedCategory
    ? NODE_CATEGORIES[selectedCategory].label
    : '';

  useClickOutsideAndEscape(menuRef, closeMenu, open, step === 'node' ? goBackToCategories : undefined);

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
          {step === 'category' ? (
            <>
              <p className="add-node__heading">1. Choisir une catégorie</p>
              <ul className="add-node__list add-node__list--categories">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className="add-node__category"
                      onClick={() => selectCategory(category.id)}
                    >
                      <span className="add-node__category-label">
                        {category.label}
                      </span>
                      <span className="add-node__category-hint">
                        {(() => {
                          const count = Nodes.filter(
                            (n) => n.category === category.id,
                          ).length;
                          return `${count} node${count > 1 ? 's' : ''}`;
                        })()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="add-node__step-header">
                <button
                  type="button"
                  className="add-node__back"
                  onClick={goBackToCategories}
                >
                  ← Catégories
                </button>
                <p className="add-node__heading">2. Choisir un node</p>
                <p className="add-node__breadcrumb">{selectedCategoryLabel}</p>
              </div>
              <ul className="add-node__list">
                {nodesInCategory.map((node) => (
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
          )}
        </div>
      )}
    </div>
  );
}
