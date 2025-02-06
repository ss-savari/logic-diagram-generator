interface ParsedGate {
  type: string;
  inputs: string[];
  output: string;
}

export function parseLogicExpression(expression: string): ParsedGate[] {
  // This is a simplified parser for demonstration
  // In a real implementation, you'd want to use a proper parser
  const gates: ParsedGate[] = [];
  
  // Split the expression into tokens
  const tokens = expression.toUpperCase().split(' ');
  
  for (let i = 0; i < tokens.length; i++) {
    if (['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'].includes(tokens[i])) {
      const gate: ParsedGate = {
        type: tokens[i],
        inputs: [],
        output: `OUT${gates.length}`
      };
      
      // For NOT gate
      if (tokens[i] === 'NOT') {
        gate.inputs = [tokens[i - 1]];
        i++;
      } else {
        // For binary gates
        gate.inputs = [tokens[i - 1], tokens[i + 1]];
        i++;
      }
      
      gates.push(gate);
    }
  }
  
  return gates;
}

export function generateDiagramElements(gates: ParsedGate[]) {
  const nodes = [];
  const edges = [];
  let nodeId = 0;
  
  // Create input nodes
  const inputs = new Set<string>();
  gates.forEach(gate => {
    gate.inputs.forEach(input => inputs.add(input));
  });
  
  // Add input nodes
  inputs.forEach(input => {
    nodes.push({
      id: `input-${input}`,
      type: 'gate',
      position: { x: 0, y: nodeId * 100 },
      data: { label: input, type: 'INPUT' }
    });
    nodeId++;
  });
  
  // Add gate nodes
  gates.forEach((gate, index) => {
    nodes.push({
      id: `gate-${index}`,
      type: 'gate',
      position: { x: 250, y: index * 100 },
      data: { label: gate.type, type: gate.type }
    });
    
    // Add edges from inputs to gates
    gate.inputs.forEach((input, inputIndex) => {
      edges.push({
        id: `edge-${nodeId}`,
        source: `input-${input}`,
        target: `gate-${index}`,
        type: 'smoothstep'
      });
      nodeId++;
    });
  });
  
  return { nodes, edges };
}