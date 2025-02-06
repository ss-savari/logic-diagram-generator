import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface GateNodeProps {
  data: {
    label: string;
    type: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR';
  };
}

const GateNode: React.FC<GateNodeProps> = memo(({ data }) => {
  const getGateColor = () => {
    switch (data.type) {
      case 'AND': return 'bg-gate-and';
      case 'OR': return 'bg-gate-or';
      case 'NOT': return 'bg-gate-not';
      case 'NAND': return 'bg-gate-nand';
      case 'NOR': return 'bg-gate-nor';
      case 'XOR': return 'bg-gate-xor';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-md shadow-md ${getGateColor()} text-white font-mono`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <div className="text-center">{data.label}</div>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
});

GateNode.displayName = 'GateNode';

export default GateNode;