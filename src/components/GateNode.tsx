import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface GateNodeProps {
  data: {
    label: string;
    type: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'INPUT';
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
      case 'INPUT': return 'bg-gray-300';
      default: return 'bg-gray-500';
    }
  };

  const getGateShape = () => {
    const baseClasses = `${getGateColor()} text-white font-mono shadow-md transition-transform hover:scale-105`;
    
    switch (data.type) {
      case 'INPUT':
        return `px-4 py-2 rounded-md ${baseClasses}`;
      case 'NOT':
        return `w-16 h-16 flex items-center justify-center rounded-r-full ${baseClasses}`;
      case 'AND':
        return `w-16 h-16 flex items-center justify-center rounded-r-full ${baseClasses}`;
      case 'OR':
        return `w-16 h-16 flex items-center justify-center rounded-[50%] ${baseClasses}`;
      case 'NAND':
        return `w-16 h-16 flex items-center justify-center rounded-r-full ${baseClasses}`;
      case 'NOR':
        return `w-16 h-16 flex items-center justify-center rounded-[50%] ${baseClasses}`;
      case 'XOR':
        return `w-16 h-16 flex items-center justify-center rounded-[50%] ${baseClasses}`;
      default:
        return `px-4 py-2 rounded-md ${baseClasses}`;
    }
  };

  return (
    <div className={getGateShape()}>
      {data.type !== 'INPUT' && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-2 h-2 !bg-gray-700"
        />
      )}
      <div className="text-center text-sm font-bold">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-gray-700"
      />
    </div>
  );
});

GateNode.displayName = 'GateNode';

export default GateNode;