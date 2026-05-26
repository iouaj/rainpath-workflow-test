import type { DelayNodeData, MessageNodeData, NodeData } from "@/types/nodes";

export function isMessageNodeData(data: NodeData) : data is MessageNodeData {
    return data.type === 'messageAction';
}

export function isDelayNodeData(data: NodeData) : data is DelayNodeData {
    return data.type === 'timing';
}