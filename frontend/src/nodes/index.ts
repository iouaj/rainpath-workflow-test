import type { NodeTypes } from '@xyflow/react';

import EmailNode from './action/EmailNode';
import PostalNode from './action/PostalNode';
import SmsNode from './action/SmsNode';
import WhatsAppNode from './action/WhatsAppNode';
import ActionResultNode from './condition/ActionResultNode';
import HasClientDataNode from './condition/HasClientDataNode';
import EndNode from './end/EndNode';
import DelayNode from './timing/DelayNode';
import ExamDoneNode from './trigger/ExamDoneNode';

export type NodeCategory =
  | 'trigger'
  | 'action'
  | 'timing'
  | 'condition-data'
  | 'condition-action'
  | 'end';

export type NodeDefinition = {
  type: string;
  label: string;
  description: string;
  category: NodeCategory;
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

export const Nodes = [
  {
    type: 'examDoneTrigger',
    label: 'Exam effectué',
    description: 'Point de départ de tous les workflows',
    category: 'trigger',
    defaultData: {},
  },
  {
    type: 'sendEmailAction',
    label: 'Email',
    description: 'Envoyer un email',
    category: 'action',
    defaultData: { subject: '', recipient: '' },
  },
  {
    type: 'sendSmsAction',
    label: 'SMS',
    description: 'Envoyer un SMS',
    category: 'action',
    defaultData: { message: '', recipient: '' },
  },
  {
    type: 'sendWhatsAppAction',
    label: 'WhatsApp',
    description: 'Envoyer un message WhatsApp',
    category: 'action',
    defaultData: { message: '', recipient: '' },
  },
  {
    type: 'sendPostalAction',
    label: 'Courrier postal',
    description: 'Envoyer un courrier postal',
    category: 'action',
    defaultData: { subject: '', address: '' },
  },
  {
    type: 'waitDaysDelay',
    label: 'Attendre X jours',
    description: 'Pause le workflow pendant un nombre de jours',
    category: 'timing',
    defaultData: { days: 1 },
  },
  {
    type: 'hasEmailDataCondition',
    label: 'Client a un email',
    description: 'Vérifie la présence d’un email',
    category: 'condition-data',
    defaultData: { field: 'email' },
  },
  {
    type: 'hasPhoneDataCondition',
    label: 'Client a un téléphone',
    description: 'Vérifie la présence d’un numéro',
    category: 'condition-data',
    defaultData: { field: 'phone' },
  },
  {
    type: 'hasWhatsAppDataCondition',
    label: 'Client a WhatsApp',
    description: 'Vérifie la présence d’un contact WhatsApp',
    category: 'condition-data',
    defaultData: { field: 'whatsapp' },
  },
  {
    type: 'hasPostalAddressDataCondition',
    label: 'Client a une adresse',
    description: 'Vérifie la présence d’une adresse postale',
    category: 'condition-data',
    defaultData: { field: 'postalAddress' },
  },
  {
    type: 'emailRejectedCondition',
    label: 'Email rejeté',
    description: 'L’email a-t-il été rejeté ?',
    category: 'condition-action',
    defaultData: { action: 'email', outcome: 'rejected' },
  },
  {
    type: 'emailDeliveredCondition',
    label: 'Email délivré',
    description: 'L’email a-t-il été délivré ?',
    category: 'condition-action',
    defaultData: { action: 'email', outcome: 'delivered' },
  },
  {
    type: 'smsRejectedCondition',
    label: 'SMS rejeté',
    description: 'Le SMS a-t-il été rejeté ?',
    category: 'condition-action',
    defaultData: { action: 'sms', outcome: 'rejected' },
  },
  {
    type: 'whatsappRejectedCondition',
    label: 'WhatsApp rejeté',
    description: 'Le message WhatsApp a-t-il été rejeté ?',
    category: 'condition-action',
    defaultData: { action: 'whatsapp', outcome: 'rejected' },
  },
  {
    type: 'postalRejectedCondition',
    label: 'Courrier rejeté',
    description: 'Le courrier a-t-il été rejeté ?',
    category: 'condition-action',
    defaultData: { action: 'postal', outcome: 'rejected' },
  },
  {
    type: 'endNode',
    label: 'Fin',
    description: 'Marque la fin du workflow',
    category: 'end',
    defaultData: {},
  },
] as const satisfies readonly NodeDefinition[];

export type CustomNodeType = (typeof Nodes)[number]['type'];

export const nodeTypes = {
  examDoneTrigger: ExamDoneNode,
  sendEmailAction: EmailNode,
  sendSmsAction: SmsNode,
  sendWhatsAppAction: WhatsAppNode,
  sendPostalAction: PostalNode,
  waitDaysDelay: DelayNode,
  hasEmailDataCondition: HasClientDataNode,
  hasPhoneDataCondition: HasClientDataNode,
  hasWhatsAppDataCondition: HasClientDataNode,
  hasPostalAddressDataCondition: HasClientDataNode,
  emailRejectedCondition: ActionResultNode,
  emailDeliveredCondition: ActionResultNode,
  smsRejectedCondition: ActionResultNode,
  whatsappRejectedCondition: ActionResultNode,
  postalRejectedCondition: ActionResultNode,
  endNode: EndNode,
} satisfies NodeTypes;
