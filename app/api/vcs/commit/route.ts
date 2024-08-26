import { vcs } from "@/lib/vcs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const { path, message } = await req.json();
    vcs.init(path);
    vcs.commit(message);
    return new Response(null, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({message: error.message}, { status: 400 });
  }
}