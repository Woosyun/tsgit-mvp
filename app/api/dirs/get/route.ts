import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import { readDirectories } from "@/lib/directory";

export async function GET() {
  try {
    const directories = readDirectories();
    const directoriesPrimitive = JSON.stringify(directories);
    
    return NextResponse.json({directories: directoriesPrimitive}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}