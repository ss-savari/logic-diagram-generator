import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface LogicInputProps {
  onExpressionSubmit: (expression: string) => void;
}

const LogicInput: React.FC<LogicInputProps> = ({ onExpressionSubmit }) => {
  const [expression, setExpression] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expression.trim()) {
      toast.error("Please enter a logic expression");
      return;
    }
    onExpressionSubmit(expression.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="expression" className="block text-sm font-medium text-gray-700">
          Logic Expression
        </label>
        <div className="flex gap-2">
          <Input
            id="expression"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter logic expression (e.g., A AND B)"
            className="font-mono"
          />
          <Button type="submit">
            Generate
          </Button>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        <p>Supported operators: AND, OR, NOT, NAND, NOR, XOR</p>
        <p>Use parentheses to group expressions: (A AND B) OR C</p>
      </div>
    </form>
  );
};

export default LogicInput;