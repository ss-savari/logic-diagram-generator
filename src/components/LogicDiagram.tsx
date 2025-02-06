import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
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
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default LogicDiagram;