import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * TextNode - Special node with auto-resizing and dynamic variable handles
 * Parses {{ variableName }} patterns and creates input handles dynamically
 */
/* eslint-disable react/prop-types */
const TextNode = ({ data, selected }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Parse variables from text using regex
  const parseVariables = useCallback((inputText) => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(inputText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    
    return matches;
  }, []);

  // Update variables when text changes
  useEffect(() => {
    const parsedVars = parseVariables(text);
    setVariables(parsedVars);
  }, [text, parseVariables]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Calculate dynamic width based on content
  const calculateWidth = () => {
    const baseWidth = 250;
    const maxWidth = 400;
    const charWidth = 7; // approximate character width
    const longestLine = text.split('\n').reduce((max, line) => 
      Math.max(max, line.length), 0
    );
    const calculatedWidth = Math.max(baseWidth, Math.min(longestLine * charWidth + 40, maxWidth));
    return calculatedWidth;
  };

  return (
    <div
      className={`
        rounded-xl border-2 bg-node-bg shadow-lg transition-all duration-200
        border-accent-yellow bg-accent-yellow/10
        ${selected ? 'ring-2 ring-white/30 scale-[1.02]' : ''}
      `}
      style={{ 
        minWidth: calculateWidth(),
        minHeight: 100 + variables.length * 24
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg font-semibold text-sm bg-accent-yellow text-node-bg">
        <span className="text-lg">📝</span>
        <span>Text</span>
        {variables.length > 0 && (
          <span className="ml-auto text-xs bg-node-bg/20 px-2 py-0.5 rounded-full">
            {variables.length} var{variables.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 relative">
        {/* Dynamic Variable Handles */}
        {variables.map((varName, index) => (
          <div key={varName} className="relative">
            <Handle
              type="target"
              position={Position.Left}
              id={varName}
              className="!w-3 !h-3 !border-2 !border-accent-yellow !bg-node-bg hover:!bg-accent-yellow transition-colors"
              style={{
                top: 15 + index * 28,
                left: -6,
              }}
            />
            <span
              className="absolute text-xs text-accent-yellow font-mono bg-node-header px-1.5 py-0.5 mx-1 rounded"
              style={{
                left: 8,
                top: 5 + index * 28,
              }}
            >
              {`{{ ${varName} }}`}
            </span>
          </div>
        ))}

        {/* Output Handle */}
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          className="!w-3 !h-3 !border-2 !border-accent-yellow !bg-node-bg hover:!bg-accent-yellow transition-colors"
          style={{ top: '50%' }}
        />

        {/* Text Area */}
        <div style={{ marginTop: variables.length > 0 ? variables.length * 28 + 8 : 0 }}>
          <label className="block text-xs text-gray-400 mb-1">Content</label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Type text here... Use {{variableName}} for dynamic inputs"
            className="w-full bg-node-header border border-node-border rounded-md px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-yellow resize-none overflow-hidden min-h-[60px]"
            style={{ 
              fontFamily: 'monospace',
            }}
          />
        </div>

        {/* Variable Preview */}
        {variables.length > 0 && (
          <div className="mt-2 p-2 bg-node-header rounded-md">
            <p className="text-xs text-gray-400 mb-1">Detected Variables:</p>
            <div className="flex flex-wrap gap-1">
              {variables.map((v) => (
                <span
                  key={v}
                  className="text-xs bg-accent-yellow/20 text-accent-yellow px-2 py-0.5 rounded-full font-mono"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextNode;
