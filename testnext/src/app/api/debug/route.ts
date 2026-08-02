import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    return NextResponse.json({ ok: true, count });
  } catch (err: any) {
    console.error("Debug route error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
