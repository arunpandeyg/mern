import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToMongoDB } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    await connectToMongoDB();

    const url = new URL(req.url);
    const category = url.searchParams.get('category') || 'allproduct';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '4', 10);

    const filter = category === 'allproduct' ? {} : { category };
    const skip = Math.max(0, page - 1) * limit;

    const [total, productsRaw] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
    ]);

    const products = (productsRaw || []).map((p: any) => ({
      ...p,
      _id: String(p._id) // only convert ObjectId
      // no need to touch createdAt
    }));

    return NextResponse.json({ total, products, page, limit });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const product = new Product(body);
    await product.save();
    return NextResponse.json({ message: 'Product created', product });
  } catch (err) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToMongoDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

