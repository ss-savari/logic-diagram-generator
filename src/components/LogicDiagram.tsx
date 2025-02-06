import React, { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GateNode from './GateNode';

interface LogicDiagramProps {
  nodes: Node[];
  edges: Edge[];
}

const nodeTypes: NodeTypes = {
  gate: GateNode,
};

const LogicDiagram: React.FC<LogicDiagramProps> = ({ nodes, edges }) => {
  const onInit = useCallback(() => {
    console.log('Flow initialized');
  }, []);

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg animate-fade-in">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Strict}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        attributionPosition="bottom-left"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default LogicDiagram;