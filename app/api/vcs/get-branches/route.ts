import { NextRequest, NextResponse } from "next/server";
import { vcs, getBranches } from "@/lib/vcs";
import { Branch } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    vcs.init(path);
    const branches: Branch[] = getBranches(0);

    return NextResponse.json({branches}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}