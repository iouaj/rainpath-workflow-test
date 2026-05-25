import type { Edge, Node } from '@xyflow/react';

const STORAGE_KEY = 'rainpath-workflow';

export type SavedWorkflow = {
  nodes: Node[];
  edges: Edge[];
  name: string;
};

export function loadWorkflow(): SavedWorkflow | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedWorkflow;
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveWorkflow(nodes: Node[], edges: Edge[], name : string): void {
  const payload: SavedWorkflow = { nodes, edges, name };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearStoredWorkflow(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getInitialWorkflow(): SavedWorkflow {
  return loadWorkflow() ?? { nodes: [], edges: [] };
}
