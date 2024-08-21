import { NextRequest, NextResponse } from "next/server";
import { addDirectory } from "@/lib/directory";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    
    const absolutePath = addDirectory(path);
    
    return NextResponse.json({message: 'Directory added', path: absolutePath}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}