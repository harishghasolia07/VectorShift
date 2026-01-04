# VectorShift Pipeline Builder

A React-based node editor with a FastAPI backend for building and validating data pipelines.

## Features

### Frontend
- **BaseNode Abstraction**: Reusable node component architecture
- **9 Node Types**: Input, Output, Text, LLM, Condition, Math, API, Delay, JSON Parser
- **Dynamic Text Node**: 
  - Auto-resizing textarea
  - Dynamic variable detection (e.g., `{{variableName}}`)
  - Automatic handle creation for variables
- **Modern UI**: Dark theme with consistent styling using Tailwind CSS
- **Drag & Drop**: Create nodes by dragging from toolbar or clicking

### Backend
- **DAG Validation**: Uses Kahn's algorithm to detect cycles
- **Pipeline Analysis**: Returns node count, edge count, and DAG status

## Project Structure

```
VectorShift/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── nodes/       # All node type components
│   │   │   │   ├── BaseNode.jsx
│   │   │   │   ├── InputNode.jsx
│   │   │   │   ├── OutputNode.jsx
│   │   │   │   ├── TextNode.jsx
│   │   │   │   ├── LLMNode.jsx
│   │   │   │   ├── ConditionNode.jsx
│   │   │   │   ├── MathNode.jsx
│   │   │   │   ├── APINode.jsx
│   │   │   │   ├── DelayNode.jsx
│   │   │   │   └── JSONParserNode.jsx
│   │   │   ├── PipelineEditor.jsx
│   │   │   ├── Toolbar.jsx
│   │   │   └── SubmitButton.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/                  # FastAPI backend
│   ├── main.py
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The API will be available at `http://localhost:8000`

## Usage

1. **Add Nodes**: Click on node types in the toolbar or drag them onto the canvas
2. **Connect Nodes**: Drag from one handle to another to create connections
3. **Configure Nodes**: Click on nodes to edit their properties
4. **Text Node Variables**: Type `{{variableName}}` to create dynamic input handles
5. **Submit Pipeline**: Click "Submit Pipeline" to validate the graph

## API Endpoints

### `POST /pipelines/parse`

Analyzes a pipeline and returns:
- `num_nodes`: Number of nodes in the pipeline
- `num_edges`: Number of connections
- `is_dag`: Whether the graph is a valid DAG (no cycles)

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Technologies Used

- **Frontend**: React 19.2.3, React Flow, Tailwind CSS, Vite
- **Backend**: FastAPI, Pydantic, Uvicorn
