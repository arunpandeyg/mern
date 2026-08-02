// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import {connectToMongoDB} from "@/lib/mongodb"; // adjust to your db util
import Product from "@/models/Product"; // adjust path

// GET /api/products/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongoDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToMongoDB();
  const { id } = params;
  const body = await req.json();

  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToMongoDB();
  const { id } = params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json({ message: "Product deleted" });
}




