from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict

app = FastAPI(title="VectorShift Pipeline API")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None


class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    
    A DAG is a directed graph with no cycles. We use topological sorting:
    1. Build adjacency list and compute in-degrees
    2. Start with nodes that have no incoming edges
    3. Remove edges and repeat
    4. If all nodes are processed, it's a DAG
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    node_ids = {node.id for node in nodes}
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node in nodes:
        in_degree[node.id] = 0
    
    # Build the graph
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Kahn's algorithm for topological sort
    # Queue of nodes with no incoming edges
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    processed_count = 0
    
    while queue:
        current = queue.pop(0)
        processed_count += 1
        
        # Remove edges from current node
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, it's a DAG
    return processed_count == len(node_ids)


@app.get("/")
async def root():
    return {"message": "VectorShift Pipeline API", "status": "running"}


@app.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(data: PipelineData):
    """
    Parse pipeline data and return analysis.
    
    - Counts number of nodes
    - Counts number of edges (only valid edges connecting existing nodes)
    - Determines if the graph is a valid DAG (no cycles)
    """
    num_nodes = len(data.nodes)
    
    # Count only valid edges (where both source and target nodes exist)
    node_ids = {node.id for node in data.nodes}
    valid_edges = [edge for edge in data.edges 
                   if edge.source in node_ids and edge.target in node_ids]
    num_edges = len(valid_edges)
    
    is_valid_dag = is_dag(data.nodes, valid_edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_valid_dag
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
