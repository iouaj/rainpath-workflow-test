import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  BackgroundVariant,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from '@xyflow/react';
import { useState } from 'react';

import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from '@xyflow/react';

import WorkflowToolbar from './components/WorkflowToolbar';
import { nodeTypes } from './nodes';
import { getInitialWorkflow } from './workflow/storage';

import '@xyflow/react/dist/style.css';
import './WorkFlow.css';

function WorkFlowCanvas() {
  const [nodes, setNodes] = useState<Node[]>(() => getInitialWorkflow().nodes);
  const [edges, setEdges] = useState<Edge[]>(() => getInitialWorkflow().edges);

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  return (
    <div className="workflow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <WorkflowToolbar />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--border)"
        />
        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}

function WorkFlow() {
  return (
    <ReactFlowProvider>
      <WorkFlowCanvas />
    </ReactFlowProvider>
  );
}

export default WorkFlow;
