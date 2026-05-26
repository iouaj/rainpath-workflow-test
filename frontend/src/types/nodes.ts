export type MessageType = 
    | 'email'
    | 'sms'
    | 'whatsapp'
    | 'postal';

export type NodeType = 
    | 'messageAction'
    | 'timing'
    | 'conditional'
    | 'examDone'
    | 'endNode';

export interface NodeData {
    type: NodeType;
    data: any;
}

export interface MessageNodeData extends NodeData {
    data: {
        messageType: MessageType;
        content: string;
    }
}

export interface DelayNodeData extends NodeData {
    data: {
        day: number;
    }
}

export type ConditonType = 
    | 'resource'
    | 'status';

export interface ConditionalNodeData extends NodeData {
    data: {
        conditionType: ConditonType;
        target: MessageType;
    }
}