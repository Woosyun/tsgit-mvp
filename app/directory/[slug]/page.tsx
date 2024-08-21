'use client'
import { Graph } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [graph, setGraph] = useState<Graph | null>(null);
  
  const path = decodeURIComponent(params.slug);
  useEffect(() => {
    const fetchGraph = async () => {
      const res = await fetch('/api/graph/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        console.error('(fetchGraph) ' + message);
        return;
      }

      const { graph: graphPrimitive } = await res.json();
      console.log('(fetchGraph) graph', graphPrimitive);
      const graph: Graph = {
        commits: new Map(graphPrimitive.commits),
        edges: new Map(graphPrimitive.edges),
        branches: new Map(graphPrimitive.branches)
      };
      setGraph(graph);
    }

    fetchGraph();
  }, []);

  return (
    <div>
      <h1>path: {path}</h1>
    </div>
  )
}
