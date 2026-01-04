import { memo } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable node abstraction for React Flow
 * All node types should use this component and pass configuration props
 */
/* eslint-disable react/prop-types */
const BaseNode = ({
  title,
  icon,
  color = 'accent',
  inputs = [],
  outputs = [],
  children,
  selected,
  minWidth = 200,
}) => {
  const colorClasses = {
    accent: 'border-accent bg-accent/10',
    green: 'border-accent-green bg-accent-green/10',
    red: 'border-accent-red bg-accent-red/10',
    yellow: 'border-accent-yellow bg-accent-yellow/10',
    purple: 'border-accent-purple bg-accent-purple/10',
    orange: 'border-accent-orange bg-accent-orange/10',
  };

  const headerColorClasses = {
    accent: 'bg-accent text-node-bg',
    green: 'bg-accent-green text-node-bg',
    red: 'bg-accent-red text-node-bg',
    yellow: 'bg-accent-yellow text-node-bg',
    purple: 'bg-accent-purple text-node-bg',
    orange: 'bg-accent-orange text-node-bg',
  };

  return (
    <div
      className={`
        rounded-xl border-2 bg-node-bg shadow-lg transition-all duration-200
        ${colorClasses[color] || colorClasses.accent}
        ${selected ? 'ring-2 ring-white/30 scale-[1.02]' : ''}
      `}
      style={{ minWidth }}
    >
      {/* Header */}
      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-t-lg font-semibold text-sm
          ${headerColorClasses[color] || headerColorClasses.accent}
        `}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{title}</span>
      </div>

      {/* Content */}
      <div className="p-3 relative">
        {/* Input Handles */}
        {inputs.map((input, index) => (
          <div key={input.id} className="relative">
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              className="!w-3 !h-3 !border-2 !border-accent !bg-node-bg hover:!bg-accent transition-colors"
              style={{
                top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
              }}
            />
            {input.label && (
              <span
                className="absolute left-4 text-xs text-gray-400 whitespace-nowrap"
                style={{
                  top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                {input.label}
              </span>
            )}
          </div>
        ))}

        {/* Output Handles */}
        {outputs.map((output, index) => (
          <div key={output.id} className="relative">
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              className="!w-3 !h-3 !border-2 !border-accent !bg-node-bg hover:!bg-accent transition-colors"
              style={{
                top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
              }}
            />
            {output.label && (
              <span
                className="absolute right-4 text-xs text-gray-400 whitespace-nowrap text-right"
                style={{
                  top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                {output.label}
              </span>
            )}
          </div>
        ))}

        {/* Node Content */}
        {children}
      </div>
    </div>
  );
};

export default memo(BaseNode);
