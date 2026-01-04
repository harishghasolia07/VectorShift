import { useState } from 'react';
import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const APINode = ({ data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      title="API Request"
      icon="🌐"
      color="purple"
      inputs={[
        { id: 'data', label: 'Data' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
      ]}
      selected={selected}
      minWidth={220}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1 mt-5">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-purple"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Base URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-purple font-mono text-xs"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export default APINode;
