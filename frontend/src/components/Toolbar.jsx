const nodeTypes = [
  { type: 'input', label: 'Input', icon: '📥', color: 'bg-accent-green' },
  { type: 'output', label: 'Output', icon: '📤', color: 'bg-accent-red' },
  { type: 'text', label: 'Text', icon: '📝', color: 'bg-accent-yellow' },
  { type: 'llm', label: 'LLM', icon: '🤖', color: 'bg-accent-purple' },
  { type: 'condition', label: 'Condition', icon: '🔀', color: 'bg-accent-orange' },
  { type: 'math', label: 'Math', icon: '🔢', color: 'bg-accent' },
  { type: 'api', label: 'API', icon: '🌐', color: 'bg-accent-purple' },
  { type: 'delay', label: 'Delay', icon: '⏱️', color: 'bg-accent-yellow' },
  { type: 'jsonParser', label: 'JSON Parser', icon: '{ }', color: 'bg-accent-green' },
];

/* eslint-disable react/prop-types */
const Toolbar = ({ onAddNode }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-node-bg border border-node-border rounded-xl p-4 shadow-xl">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
        Nodes
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {nodeTypes.map((node) => (
          <button
            key={node.type}
            onClick={() => onAddNode(node.type)}
            onDragStart={(e) => onDragStart(e, node.type)}
            draggable
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg
              bg-node-header border border-node-border
              hover:border-accent hover:bg-node-header/80
              transition-all duration-200 cursor-grab active:cursor-grabbing
              group
            `}
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
              {node.icon}
            </span>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
              {node.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
