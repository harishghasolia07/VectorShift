import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  InputNode,
  OutputNode,
  TextNode,
  LLMNode,
  ConditionNode,
  MathNode,
  APINode,
  DelayNode,
  JSONParserNode,
} from './nodes';
import Toolbar from './Toolbar';
import SubmitButton from './SubmitButton';

// Register custom node types
const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  condition: ConditionNode,
  math: MathNode,
  api: APINode,
  delay: DelayNode,
  jsonParser: JSONParserNode,
};

// Initial nodes for demo
const initialNodes = [
  // {
  //   id: 'input-1',
  //   type: 'input',
  //   position: { x: 100, y: 100 },
  //   data: { name: 'user_input' },
  // },
  // {
  //   id: 'llm-1',
  //   type: 'llm',
  //   position: { x: 400, y: 100 },
  //   data: { prompt: 'Hello' },
  // },
  // {
  //   id: 'output-1',
  //   type: 'output',
  //   position: { x: 700, y: 100 },
  //   data: { name: 'result' },
  // },
];

const initialEdges = [
  { id: 'e1-2', source: 'input-1', target: 'llm-1', sourcsourceHandleeHandle: 'output', targetHandle: 'prompt' },
  { id: 'e2-3', source: 'llm-1', target: 'output-1', sourceHandle: 'response', targetHandle: 'input' },
];

let nodeId = 10;

const PipelineEditor = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: `e${connection.source}-${connection.target}-${Date.now()}`,
            animated: true,
            style: { stroke: '#89b4fa', strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${nodeId++}`,
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onAddNode = useCallback(
    (type) => {
      const position = {
        x: Math.random() * 400 + 200,
        y: Math.random() * 300 + 100,
      };

      const newNode = {
        id: `${type}-${nodeId++}`,
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <div className="w-full h-screen" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#89b4fa', strokeWidth: 2 },
        }}
      >
        <Background color="#313244" gap={20} size={1} />
        <Controls className="!bg-node-bg !border-node-border !rounded-lg" />
        <MiniMap
          nodeColor={(node) => {
            const colors = {
              input: '#a6e3a1',
              output: '#f38ba8',
              text: '#f9e2af',
              llm: '#cba6f7',
              condition: '#fab387',
              math: '#89b4fa',
              api: '#cba6f7',
              delay: '#f9e2af',
              jsonParser: '#a6e3a1',
            };
            return colors[node.type] || '#89b4fa';
          }}
          maskColor="rgba(15, 15, 26, 0.8)"
          className="!bg-node-bg !border-node-border"
        />
      </ReactFlow>

      <Toolbar onAddNode={onAddNode} />
      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
};

// Wrap with provider
const PipelineEditorWithProvider = () => (
  <ReactFlowProvider>
    <PipelineEditor />
  </ReactFlowProvider>
);

export default PipelineEditorWithProvider;
