import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const InputNode = ({ id, data, selected }) => {
  const [name, setName] = useState(data?.name || id.replace('input-', 'input_'));
  const [type, setType] = useState(data?.type || 'Text');

  return (
    <BaseNode
      title="Input"
      icon="📥"
      color="green"
      outputs={[{ id: 'output', label: 'Value' }]}
      selected={selected}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 mt-5">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="Text">Text</option>
            <option value="Number">Number</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

export default InputNode;
