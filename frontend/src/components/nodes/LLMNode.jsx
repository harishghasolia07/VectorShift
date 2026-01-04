import BaseNode from './BaseNode';

/* eslint-disable react/prop-types */
const LLMNode = ({ selected }) => {
  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      color="purple"
      inputs={[
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      selected={selected}
      minWidth={220}
    >
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🧠</div>
        <p className="text-xs text-gray-400">
          This is an LLM node.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Connect a prompt to get an AI response.
        </p>
      </div>
    </BaseNode>
  );
};

export default LLMNode;
