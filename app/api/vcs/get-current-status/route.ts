import { getCurrentStatus, vcs } from "@/lib/vcs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    console.log('(api/vcs/get-current-status) path: ', path);
    vcs.init(path);
    const status = getCurrentStatus();
    return NextResponse.json({ status: JSON.stringify(status) }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}