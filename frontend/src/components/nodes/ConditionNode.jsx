import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const ConditionNode = ({ data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <BaseNode
      title="Condition"
      icon="🔀"
      color="orange"
      inputs={[
        { id: 'input', label: 'Input' },
      ]}
      outputs={[
        { id: 'output', label: 'Output' },
      ]}
      selected={selected}
      minWidth={180}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 mt-5">Operator</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-orange"
          >
            <option value="equals">Equals (==)</option>
            <option value="not_equals">Not Equals (!=)</option>
            <option value="greater">Greater Than (&gt;)</option>
            <option value="less">Less Than (&lt;)</option>
            <option value="greater_eq">Greater or Equal (&gt;=)</option>
            <option value="less_eq">Less or Equal (&lt;=)</option>
            <option value="contains">Contains</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Routes flow based on condition result
        </p>
      </div>
    </BaseNode>
  );
};

export default ConditionNode;
