import { checkPath } from "@/lib/directory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();

    const absolutePath = checkPath(path);

    return NextResponse.json({ message: 'Directory checked', path: absolutePath }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {status: 400});
  }
}