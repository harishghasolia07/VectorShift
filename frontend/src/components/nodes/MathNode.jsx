import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const MathNode = ({ data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const operationSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    modulo: '%',
    power: '^',
  };

  return (
    <BaseNode
      title="Math"
      icon="🔢"
      color="accent"
      inputs={[
        { id: 'a', label: 'A' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
      selected={selected}
      minWidth={160}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 mt-5">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="modulo">Modulo (%)</option>
            <option value="power">Power (^)</option>
          </select>
        </div>
        <div className="text-center py-2">
          <span className="text-3xl text-accent">
            {operationSymbols[operation]}
          </span>
        </div>
      </div>
    </BaseNode>
  );
};

export default MathNode;
