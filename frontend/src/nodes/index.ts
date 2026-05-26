import type { NodeTypes } from '@xyflow/react';

import ExamDoneNode from './ExamDoneNode';
import EndNode from './EndNode';
import DelayNode from './DelayNode';

import type { NodeType } from '../types/nodes';
import MessageNode from './MessageNode';
import ConditionNode from './ConditonalNode';

export type NodeCategory =
  | 'trigger'
  | 'action'
  | 'timing'
  | 'condition-data'
  | 'condition-action'
  | 'end';

export type NodeDefinition = {
  type: NodeType;
  label: string;
  description: string;
  defaultData: Record<string, unknown>;
};

export const NODE_CATEGORIES: Record<
  NodeCategory,
  { label: string; order: number }
> = {
  trigger: { label: 'Départ', order: 0 },
  action: { label: 'Actions', order: 1 },
  timing: { label: 'Temporisation', order: 2 },
  'condition-data': { label: 'Conditions · Données client', order: 3 },
  'condition-action': { label: 'Conditions · Résultat action', order: 4 },
  end: { label: 'Fin', order: 5 },
};

export const Nodes : NodeDefinition[] = [
  {
    type: 'messageAction',
    label: 'Message',
    description: 'Envoyer un message',
    defaultData: {
      type: 'messageAction',
      data: {
        messageType: 'email',
        content: "AAAAAAAAA"
      }
    }
  },
  {
    type: 'timing',
    label: 'Attendre',
    description: "Attendre x jours",
    defaultData: {
      type: 'timing',
      data: {
        delay: 5
      }
    }
  },
  {
    type: 'conditional',
    label: 'Condition',
    description: '',
    defaultData : {
      type: 'conditional',
      data : {
        conditionType: 'resource',
        target: 'email'
      }
    }
  },
  {
    type: 'examDone',
    label: 'Examen effectué',
    description: "",
    defaultData: {}
  },
  {
    type: 'endNode',
    label: 'Fin',
    description: "",
    defaultData: {}
  }
];

export type CustomNodeType = (typeof Nodes)[number]['type'];

export const nodeTypes = {
  messageAction: MessageNode,
  timing: DelayNode,
  conditional: ConditionNode,
  examDone: ExamDoneNode,
  endNode: EndNode,
} satisfies NodeTypes;
