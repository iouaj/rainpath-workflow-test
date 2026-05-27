import type { NodeTypes } from '@xyflow/react';

import ExamDoneNode from './ExamDoneNode';
import EndNode from './EndNode';
import DelayNode from './DelayNode';

import type { NodeType } from '@/types/nodes';
import MessageNode from './MessageNode';
import ConditionNode from './ConditonalNode';

export type NodeDefinition = {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  defaultData: Record<string, unknown>;
};

export const Nodes: NodeDefinition[] = [
  {
    type: 'messageAction',
    label: 'Message',
    description: 'Envoyer un email, SMS ou WhatsApp',
    icon: '✉️',
    defaultData: {
      type: 'messageAction',
      data: {
        messageType: 'email',
        content: '',
      },
    },
  },
  {
    type: 'timing',
    label: 'Attendre',
    description: 'Introduire un délai entre deux étapes',
    icon: '⏳',
    defaultData: {
      type: 'timing',
      data: {
        day: 5,
      },
    },
  },
  {
    type: 'conditional',
    label: 'Condition',
    description: 'Bifurquer selon une condition',
    icon: '🔀',
    defaultData: {
      type: 'conditional',
      data: {
        conditionType: 'resource',
        target: 'email',
      },
    },
  },
  {
    type: 'examDone',
    label: 'Examen effectué',
    description: 'Déclencheur de départ du workflow',
    icon: '⚡',
    defaultData: {},
  },
  {
    type: 'endNode',
    label: 'Fin',
    description: 'Terminer le workflow',
    icon: '🔴',
    defaultData: {},
  },
];

export type CustomNodeType = (typeof Nodes)[number]['type'];

export const nodeTypes = {
  messageAction: MessageNode,
  timing: DelayNode,
  conditional: ConditionNode,
  examDone: ExamDoneNode,
  endNode: EndNode,
} satisfies NodeTypes;
