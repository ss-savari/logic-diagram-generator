import React, { useState } from 'react';
import LogicInput from '@/components/LogicInput';
import LogicDiagram from '@/components/LogicDiagram';
import { parseLogicExpression, generateDiagramElements } from '@/utils/logicParser';
import { Node, Edge } from '@xyflow/react';
import { toast } from 'sonner';

const Index = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const handleExpressionSubmit = (expression: string) => {
    try {
      console.log('Parsing expression:', expression);
      const gates = parseLogicExpression(expression);
      console.log('Parsed gates:', gates);
      const { nodes: newNodes, edges: newEdges } = generateDiagramElements(gates);
      console.log('Generated diagram elements:', { nodes: newNodes, edges: newEdges });
      setNodes(newNodes);
      setEdges(newEdges);
      toast.success('Diagram generated successfully');
    } catch (error) {
      console.error('Error generating diagram:', error);
      toast.error('Invalid logic expression. Please check your syntax.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Logic Gate Diagram Generator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your logic expression and visualize the circuit
          </p>
        </div>
        
        <LogicInput onExpressionSubmit={handleExpressionSubmit} />
        
        {(nodes.length > 0 || edges.length > 0) && (
          <LogicDiagram nodes={nodes} edges={edges} />
        )}
      </div>
    </div>
  );
};

export default Index;