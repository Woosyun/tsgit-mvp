import { getGraph } from "@/lib/graph";
import { Graph } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();

    const {commits, edges, branches}: Graph = getGraph(path);
    
    const graph = {
      commits: Array.from(commits),
      edges: Array.from(edges),
      branches: Array.from(branches)
    };

    console.log('(api/graph/get)graph: ', graph);

    return NextResponse.json({ graph }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}