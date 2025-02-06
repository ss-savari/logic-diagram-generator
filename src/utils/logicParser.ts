interface ParsedGate {
  type: string;
  inputs: string[];
  output: string;
}

export function parseLogicExpression(expression: string): ParsedGate[] {
  console.log('Parsing expression:', expression);
  const gates: ParsedGate[] = [];
  
  // Replace symbols with words
  let normalizedExp = expression
    .toUpperCase()
    .replace(/\+/g, ' OR ')
    .replace(/-([A-Z])/g, 'NOT $1')
    .replace(/\s+/g, ' ')
    .trim();

  console.log('Normalized expression:', normalizedExp);
  
  // Split the expression into tokens
  const tokens = normalizedExp.split(' ');
  
  for (let i = 0; i < tokens.length; i++) {
    if (['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'].includes(tokens[i])) {
      const gate: ParsedGate = {
        type: tokens[i],
        inputs: [],
        output: `OUT${gates.length}`
      };
      
      // For NOT gate
      if (tokens[i] === 'NOT') {
        if (i + 1 < tokens.length) {
          gate.inputs = [tokens[i + 1]];
          i++; // Skip the next token as it's the input
        }
      } else {
        // For binary gates (AND, OR, etc.)
        if (i > 0 && i + 1 < tokens.length) {
          gate.inputs = [tokens[i - 1], tokens[i + 1]];
          i++; // Skip the next token as it's the second input
        }
      }
      
      gates.push(gate);
    }
  }
  
  console.log('Parsed gates:', gates);
  return gates;
}

export function generateDiagramElements(gates: ParsedGate[]) {
  const nodes = [];
  const edges = [];
  const inputNodes = new Set<string>();
  let nodeId = 0;
  
  // First pass: collect all inputs
  gates.forEach(gate => {
    gate.inputs.forEach(input => inputNodes.add(input));
  });
  
  // Create input nodes
  const inputPositions = new Map<string, { x: number, y: number }>();
  Array.from(inputNodes).forEach((input, index) => {
    const position = { x: 50, y: index * 100 + 50 };
    inputPositions.set(input, position);
    nodes.push({
      id: `input-${input}`,
      type: 'gate',
      position,
      data: { label: input, type: 'INPUT' }
    });
  });
  
  // Create gate nodes with proper spacing
  gates.forEach((gate, index) => {
    const gateNode = {
      id: `gate-${index}`,
      type: 'gate',
      position: { x: 300, y: index * 100 + 50 },
      data: { label: gate.type, type: gate.type }
    };
    nodes.push(gateNode);
    
    // Connect inputs to gates
    gate.inputs.forEach((input, inputIndex) => {
      edges.push({
        id: `edge-${nodeId++}`,
        source: `input-${input}`,
        target: `gate-${index}`,
        type: 'smoothstep'
      });
    });
  });
  
  console.log('Generated diagram elements:', { nodes, edges });
  return { nodes, edges };
}