import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const DelayNode = ({ data, selected }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const formatDelay = () => {
    if (unit === 'ms') return `${delay}ms`;
    if (unit === 's') return `${delay}s`;
    if (unit === 'm') return `${delay}min`;
    return delay;
  };

  return (
    <BaseNode
      title="Delay"
      icon="⏱️"
      color="yellow"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
      selected={selected}
      minWidth={180}
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1 mt-5">Duration</label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              min={0}
              className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-yellow"
            />
          </div>
          <div className="w-20">
            <label className="block text-xs text-gray-400 mb-1 mt-5">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-yellow"
            >
              <option value="ms">ms</option>
              <option value="s">sec</option>
              <option value="m">min</option>
            </select>
          </div>
        </div>
        <div className="text-center py-2">
          <span className="text-lg text-accent-yellow font-mono">
            ⏸ {formatDelay()}
          </span>
        </div>
      </div>
    </BaseNode>
  );
};

export default DelayNode;
