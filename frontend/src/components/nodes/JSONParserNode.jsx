import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const JSONParserNode = ({ data, selected }) => {
  const [path, setPath] = useState(data?.path || '');
  const [mode, setMode] = useState(data?.mode || 'extract');

  return (
    <BaseNode
      title="JSON Parser"
      icon="{ }"
      color="green"
      inputs={[{ id: 'json', label: 'JSON Input' }]}
      outputs={[
        { id: 'output', label: 'Output' },
      ]}
      selected={selected}
      minWidth={200}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 mt-5">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-green"
          >
            <option value="extract">Extract Value</option>
            <option value="parse">Parse String</option>
            <option value="stringify">Stringify Object</option>
            <option value="validate">Validate JSON</option>
          </select>
        </div>
        {mode === 'extract' && (
          <div>
            <label className="block text-xs text-gray-400 mb-1">JSON Path</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="e.g., data.users[0].name"
              className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-green font-mono text-xs"
            />
          </div>
        )}
        <div className="text-center py-2 bg-node-header rounded-md">
          <code className="text-xs text-accent-green">
            {mode === 'extract' && path ? `$.${path}` : `JSON.${mode}()`}
          </code>
        </div>
      </div>
    </BaseNode>
  );
};

export default JSONParserNode;
